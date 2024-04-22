import React from "react";
import Hero, { FrequentAskedQuestons, HomeReviews } from "../components/Hero";
import HomeCourseList from "../components/HomeCourse/HomeCourseList";
import bannerImage from "../assets/images/Programming-amico.png";

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

      <section className="grid grid-cols-2 max-sm:grid-cols-1 items-center gap-3 p-10">
        <div className="text-3xl font-bold leading-10 mt-5">
          {" "}
          <h3>
            Our Students Are
            <span className="bg-gradient-to-r from-blue-700 via-violet-800 bg-clip-text text-transparent">
              {" "}
              Our Strength
            </span>
          </h3>
          <h3>See What They Say About Us</h3>
          <p className="text-sm indent-5 font-normal mt-2 font-mono">
            Enrolling in a programming course unlocks a world of creation and
            opportunity. Not only will you learn a valuable skill in high
            demand, but you'll also develop essential problem-solving and
            critical thinking abilities. The course will guide you through the
            logic of programming, giving you the power to bring your ideas to
            life. Imagine building websites, creating games, or even designing
            apps - the possibilities are endless. With supportive instruction
            and a structured learning environment, you'll gain the confidence to
            tackle challenges and become a proficient programmer.
          </p>
        </div>
        <div>
          <img
            src={bannerImage}
            alt="banner Image"
            className="h-auto max-w-full rounded-lg"
          />
        </div>
      </section>

      <section className="p-8">
        <h1 className="text-3xl text-center font-semibold">Reviews</h1>
        <br />
        <HomeReviews />
      </section>

      <section className="p-8">
        <h1 className="text-3xl text-center font-semibold">
          Frequently Asked Questions
        </h1>
        <br />
        <FrequentAskedQuestons />
      </section>
    </main>
  );
};

export default Home;
