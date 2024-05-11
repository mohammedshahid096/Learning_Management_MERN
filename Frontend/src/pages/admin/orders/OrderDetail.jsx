import React, { useEffect, useState } from "react";
import { Card, Table } from "flowbite-react";
import { useParams } from "react-router-dom";
import { GetSingleOrderDetailAPI } from "../../../Apis/order.api";
import moment from "moment";
const OrderDetail = () => {
  const [orderDetails, setorderDetails] = useState(null);
  const { orderid } = useParams();

  const fetchOrderDetails = async () => {
    const response = await GetSingleOrderDetailAPI(orderid);
    if (response.success) {
      setorderDetails(response.data);
    }
  };

  const renderProperties = (obj) => {
    return (
      obj &&
      Object.entries(obj).map(([key, value]) => (
        <Table.Row key={key} className="mb-2">
          <Table.Cell className="font-semibold">{key}</Table.Cell>
          <Table.Cell className="font-semibold">
            {typeof value === "object" ? JSON.stringify(value) : value && value}
          </Table.Cell>
        </Table.Row>
      ))
    );
  };
  const renderProperties2 = (obj) => {
    return (
      obj &&
      Object.entries(obj).map(([key, value]) => (
        <Table.Row key={key} className="mb-2">
          <Table.Cell className="font-semibold">{key}</Table.Cell>
          <Table.Cell className="font-semibold">
            {typeof value === "object"
              ? renderProperties(value)
              : value && value}
          </Table.Cell>
        </Table.Row>
      ))
    );
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderid]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-3">OrderDetail</h1>
      <h2 className=" text-md font-semibold text-center mb-3">{orderid}</h2>
      <Card>
        <p>Details :</p>
        <Table>
          <Table.Head>
            <Table.HeadCell>Property</Table.HeadCell>
            <Table.HeadCell>Value</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Mongo ID</Table.Cell>
              <Table.Cell>{orderDetails?._id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>UUID</Table.Cell>
              <Table.Cell>{orderDetails?.uuid}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Course</Table.Cell>
              <Table.Cell>
                {orderDetails?.courseid?.name} ({orderDetails?.courseid?._id})
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>User</Table.Cell>
              <Table.Cell>
                {orderDetails?.user?.name} ({orderDetails?.user?._id})
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Order Status</Table.Cell>
              <Table.Cell>{orderDetails?.orderStatus}</Table.Cell>
            </Table.Row>

            <Table.Row className=" border-y">
              <Table.Cell>OrderInfo</Table.Cell>
              <Table.Cell>
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Property</Table.HeadCell>
                    <Table.HeadCell>Value</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {renderProperties(orderDetails?.orderInfo)}
                  </Table.Body>
                </Table>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>PaymentInfo</Table.Cell>
              <Table.Cell>
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Property</Table.HeadCell>
                    <Table.HeadCell>Value</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {renderProperties2(orderDetails?.paymentInfo)}
                  </Table.Body>
                </Table>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Created At</Table.Cell>
              <Table.Cell>
                {moment(orderDetails?.createdAT).format("LLL")}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Updated At</Table.Cell>
              <Table.Cell>
                {" "}
                {moment(orderDetails?.updatedAT).format("LLL")}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
};

export default OrderDetail;
