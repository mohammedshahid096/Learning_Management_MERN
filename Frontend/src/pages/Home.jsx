import React, { useState } from "react";
import Hero from "../components/Hero";
import HomeCourseList from "../components/HomeCourse/HomeCourseList";

const Home = () => {
  return (
    <main>
      <Hero />

      <br />
      <br />
      <div className=" text-center text-3xl font-bold leading-10 mt-5">
        <h3>
          Expand Your Career
          <span className="bg-gradient-to-r from-blue-700 via-violet-800 bg-clip-text text-transparent">
            {" "}
            Opportunity
          </span>
        </h3>
        <h3>Opportunity With Our Courses </h3>
      </div>

      <section className="py-8">
        <HomeCourseList />
      </section>
    </main>
  );
};

export default Home;
