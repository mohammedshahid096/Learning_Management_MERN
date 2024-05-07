import React from "react";
import bannerImage from "../assets/images/Learning-amico.png";
import "../styles/hero.css";
import { motion } from "framer-motion";
import { Avatar, Card, Accordion, Carousel } from "flowbite-react";
import RatingComponent from "../utils/RatingComponent";

const variants = {
  repeat: {
    rotate: [30, 120, 0, -120, 0],
    scale: [1, 0.7, 1, 0.7, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatDelay: 2,
      ease: "easeOut",
    },
  },
};

const StaticImages = [
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const Hero = () => {
  return (
    <div className="flex max-sm:flex-col justify-around items-center mt-9 gap-15">
      {/* Left side with learning image */}
      <div className="animate__animated animate__backInLeft">
        <div className="w-[75vh] h-[75vh] max-sm:w-full max-sm:h-full flex justify-center items-center hero_animation px-4 rounded-full ">
          <motion.img
            animate="repeat"
            variants={variants}
            src={bannerImage}
            alt="bannerlogo"
            className="w-[80%] h-full object-contain"
          />
        </div>
      </div>

      {/* Right side with title and search input */}
      <div className=" flex flex-col justify-center items-center max-sm:p-4 max-md:mt-5 animate__animated animate__backInRight">
        <h1 className="text-4xl font-bold mb-4 leading-10 tracking-wider">
          Improve Your Online <br />
          Learning Experience <br />
          Better Instantly
        </h1>
        <h4 className="font-bold mb-8">
          We have 40k+ Online courses & 500k+ Online <br /> registered students.
          Find your <br /> desired Courses from here
        </h4>
        <input
          type="text"
          placeholder="Search courses..."
          //   value={searchQuery}
          //   onChange={handleSearchChange}
          className="border border-gray-400 px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full dark:bg-gray-800 bg-black text-white"
        />

        <div className="mt-8 flex items-center gap-4 max-sm:flex-col">
          <Avatar.Group>
            {StaticImages.map((item) => (
              <Avatar key={item} img={item} rounded stacked />
            ))}
            <Avatar.Counter total={99} href="#" />
          </Avatar.Group>
          <div className="font-semibold">
            people Already Trusted <br /> our{" "}
            <span className=" text-green-600">View Course</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeReviews = () => {
  const staticReviews = [
    {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      profession: "Software Engineer",
      rating: 4,
      comment:
        "The learning course platform is amazing! I've learned so much in such a short time. Very happy to use platform",
    },
    {
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/75.jpg",
      profession: "Data Analyst",
      rating: 5,
      comment:
        "I highly recommend this platform. The courses are well-structured and the instructors are very knowledgeable.",
    },
    {
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/men/70.jpg",
      profession: "UI/UX Designer",
      rating: 5,
      comment:
        "This platform has helped me improve my skills significantly. I'm so glad I found it.",
    },
    {
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/women/80.jpg",
      profession: "UI/UX Designer",
      rating: 4,
      comment:
        "This platform has helped me improve my skills significantly. I'm so glad I found it.",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
      {staticReviews.map((item) => (
        <Card
          key={item.avatar}
          className="w-full h-max dark:bg-gray-300 dark:bg-opacity-10 border border-gray-300 backdrop-blur shadow-md"
        >
          <div className="flex w-full justify-between">
            <div className="flex items-center justify-center ">
              <img
                src={item.avatar}
                alt={item.name}
                className="w=[50px] h-[50px] rounded-full object-cover"
              />
              <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                <div>{item.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.profession}
                </div>
              </div>
            </div>
            <RatingComponent rating={item.rating} NumberRating={false} />
          </div>
          <p className=" font-thin">{item.comment}</p>
        </Card>
      ))}
    </div>
  );
};

export const FrequentAskedQuestons = () => {
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
    <Accordion className="border-none">
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
  );
};

export const CarouselComponent = () => {
  const imagesArray = [
    "https://cdn.pixabay.com/photo/2018/09/04/10/27/never-stop-learning-3653430_640.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfuzYQG8XY1ixXpl2UQxQ7RZZ87KJ_YXjnbix2SfOujw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdrh5RtZ578gBJ6SuFVsKGLU2GE7f2yePmLrAMV0N6r7IXBrLHHI5S6A8Xz3QFiEC5Ac&usqp=CAU",
  ];
  return (
    <div className=" w-11/12 m-auto sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>
        {imagesArray.map((item, index) => (
          <img
            src={item}
            className=" object-cover"
            alt={`carousel${index + 1}`}
            key={`carousel${index + 1}`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
