const httpErrors = require("http-errors");
const {
  errorConstant,
  successConstant,
  paymentConstant,
} = require("../Utils/constants");
const Razorpay = require("razorpay");
const {
  CreateOrderValidation,
  VerifyPaymentValidation,
} = require("../JoiSchemas/payment.schema");
const { v4: uuidv4 } = require("uuid");
const coursesModel = require("../Models/course.model");
const orderModel = require("../Models/order.model");
const crypto = require("crypto");
const {
  RAZOPAY_API_KEY,
  RAZOPAY_API_SECRET,
  RAZOPAY_REDIRECT_URL,
} = require("../Config/index");

// order payment gateway
module.exports.checkoutRazorpayController = async (req, res, next) => {
  try {
    const { error } = CreateOrderValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const isCourseExist = await coursesModel.findById(req.body.courseid);
    if (!isCourseExist) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_FOUND));
    }

    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit => 500.00
      currency: "INR",
      receipt: uuidv4(),
      //   payment_caputure: 1,
    };

    const razorpay = new Razorpay({
      key_id: RAZOPAY_API_KEY,
      key_secret: RAZOPAY_API_SECRET,
    });

    const checkout_pay = await razorpay.orders.create(options);
    if (!checkout_pay) {
      return next(httpErrors.BadRequest(paymentConstant.ORDER_CREATED_FAIL));
    }
    // need to save in our database also
    const UserOrder = new orderModel({
      uuid: uuidv4(),
      courseid: req.body.courseid,
      user: req.userid,
      orderStatus: "pending",
      orderInfo: checkout_pay,
    });
    await UserOrder.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: paymentConstant.ORDER_CREATED_SUCCESS,
      data: UserOrder,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// verify the payment
module.exports.paymentVerificationController = async (req, res, next) => {
  try {
    const { error } = VerifyPaymentValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    let decrypt_value = razorpay_order_id + "|" + razorpay_payment_id;

    generated_signature = crypto
      .createHmac("sha256", RAZOPAY_API_SECRET)
      .update(decrypt_value.toString())
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      next(httpErrors.PaymentRequired(paymentConstant.PAYMENT_SIGNATURE_FAIL));
    }

    let OrderDetails = await orderModel.findOne({
      "orderInfo.id": razorpay_order_id,
    });

    const razorpay = new Razorpay({
      key_id: RAZOPAY_API_KEY,
      key_secret: RAZOPAY_API_SECRET,
    });

    const paymentInfo = await razorpay.payments.fetch(razorpay_payment_id);
    OrderDetails = await orderModel.findByIdAndUpdate(
      OrderDetails._id,
      { paymentInfo, orderStatus: "approved" },
      { new: true }
    );

    res.redirect(
      `${RAZOPAY_REDIRECT_URL}/${OrderDetails.courseid}?order_id=${razorpay_order_id}&uuid=${OrderDetails.uuid}`
    );
    // res.status(200).json({
    //   success: true,
    //   statusCode: 201,
    //   paymentVerified: true,
    //   message: "success fully payment is  done",
    // });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message ?? error));
  }
};
