import React from "react";
import PolicyImage from "../../assets/images/Privacy_Policy.png";

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="h-[70vh]">
        <img src={PolicyImage} alt="policy image" className="w-full h-full" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to the Privacy Policy of our Learning Management System (LMS).
        This Privacy Policy aims to inform you about the collection, use, and
        disclosure of personal data when you use our service, and the choices
        you have associated with that data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Information Collection and Use
      </h2>
      <p className="mb-4">
        When you use our LMS, we collect various types of information for
        different purposes. This information includes personally identifiable
        information that can be used to contact or identify you. The types of
        personal data we collect may include but are not limited to your email
        address, first name, last name, and usage data such as cookies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Personal Data</h2>
      <p className="mb-4">
        We collect personal data when you register for an account on our LMS,
        subscribe to our newsletter, fill out a form, or interact with our
        service in any other way. This data is used to provide and maintain our
        service, notify you about changes to our service, provide customer
        support, and improve the user experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Usage Data</h2>
      <p className="mb-4">
        In addition to personal data, we also collect usage data that may
        include information about how you interact with our service. This data
        helps us analyze and improve the performance of our LMS, customize your
        user experience, and provide relevant content and recommendations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Security</h2>
      <p className="mb-4">
        We are committed to ensuring the security of your personal data and take
        appropriate measures to protect it from unauthorized access, disclosure,
        alteration, or destruction. These measures include encryption, access
        controls, and regular security audits.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Third-party Services</h2>
      <p className="mb-4">
        We may use third-party services such as payment processors and analytics
        providers to help us operate our LMS and improve its functionality.
        These third-party services may have their own privacy policies governing
        the use of your personal data, so we encourage you to review them before
        providing any information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Data Retention</h2>
      <p className="mb-4">
        We retain your personal data only for as long as necessary to fulfill
        the purposes outlined in this Privacy Policy unless a longer retention
        period is required or permitted by law. When we no longer need your
        personal data, we will securely delete or anonymize it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights</h2>
      <p className="mb-4">
        You have certain rights regarding your personal data, including the
        right to access, correct, or delete it. You also have the right to
        opt-out of certain data processing activities, such as marketing
        communications. If you would like to exercise any of these rights,
        please contact us using the information provided at the end of this
        Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Changes to this Privacy Policy
      </h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time to reflect changes in
        our practices or legal requirements. We will notify you of any material
        changes by posting the new Privacy Policy on this page. We encourage you
        to review this Privacy Policy periodically for any updates or changes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at [contact email address].
      </p>
    </div>
  );
};

export default PrivacyPolicy;
