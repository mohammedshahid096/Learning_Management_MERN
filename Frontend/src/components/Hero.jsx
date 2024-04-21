import React from "react";
import bannerImage from "../assets/images/Learning-amico.png";
import "../styles/hero.css";
import { motion } from "framer-motion";
import { Avatar } from "flowbite-react";

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

export default Hero;
