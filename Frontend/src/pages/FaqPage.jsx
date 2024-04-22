import React from "react";
import { Accordion } from "flowbite-react";
import MetaData from "../utils/MetaData";
import FaqBanner from "../assets/images/FAQs-bro.png";

const FaqPage = () => {
  const staticFAQ = [
    {
      question: "What is a Learning Management System (LMS)?",
      answer:
        "An LMS is a software platform used to create, deliver, and manage online courses. It allows instructors to upload content, track student progress, and administer assessments.",
    },
    {
      question: "How do I enroll in a course on the LMS?",
      answer:
        "Enrollment procedures can vary depending on the specific LMS. Usually, you'll find an enrollment button or link on the course description page. You might need to create an account on the LMS platform first.",
    },
    {
      question: "How do I access course materials?",
      answer:
        "Once enrolled, course materials are typically accessed through the LMS dashboard. They can be organized in modules or folders, containing videos, documents, quizzes, and other learning resources.",
    },
    {
      question: "How do I submit assignments and take tests?",
      answer:
        "The LMS will have dedicated sections for assignments and tests. Uploading documents, recording video responses, or answering multiple-choice questions often happens directly within the platform.",
    },
    {
      question: "How can I communicate with the instructor and other students?",
      answer:
        "Many LMS platforms offer communication tools like discussion forums, chat rooms, or even video conferencing options. These allow you to ask questions, share insights, and collaborate with others in the course.",
    },
  ];
  return (
    <div>
      <div className="flex justify-center p-5 bg-gray-300 dark:bg-violet-300 rounded-full max-sm:rounded-2xl">
        <img
          src={FaqBanner}
          alt="faqbanner"
          className="w-[300px] h-[250px] object-cover"
        />
      </div>
      <br />
      <Accordion className="border-none">
        <MetaData title="FAQ Page" />
        {staticFAQ.map((singleFaq, index) => (
          <Accordion.Panel key={"faq" + index + 1}>
            <Accordion.Title>
              <b className="text-purple-400">{index + 1}. </b>
              {singleFaq.question}
            </Accordion.Title>
            <Accordion.Content>
              <p>{singleFaq.answer}</p>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqPage;
