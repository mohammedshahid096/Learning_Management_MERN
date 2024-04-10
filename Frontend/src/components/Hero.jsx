import React from "react";
import bannerImage from "../assets/images/Learning-amico.png";
import "../styles/hero.css";
import { motion } from "framer-motion";

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
const Hero = () => {
  return (
    <div className="flex max-sm:flex-col justify-around items-center mt-9 gap-15">
      {/* Left side with learning image */}
      <div className="w-[75vh] h-[75vh] flex justify-center items-center hero_animation px-4 rounded-full">
        <motion.img
          animate="repeat"
          variants={variants}
          src={bannerImage}
          alt="bannerlogo"
          className="w-[80%] h-full object-contain"
        />
      </div>

      {/* Right side with title and search input */}
      <div className=" flex flex-col justify-center items-center max-md:mt-5">
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
      </div>
    </div>
  );
};

export default Hero;
