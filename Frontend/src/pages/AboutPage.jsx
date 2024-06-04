import React from "react";

function AboutPage() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-col items-center mb-4">
        <img
          src="https://github.com/mohammedshahid096/ShahidProtfolio/blob/main/src/images/shahidprofile.jpg?raw=true"
          alt="Mohammed Shahid"
          className="w-48 h-48 rounded-full mb-4 border-2 border-purple-800"
        />
        <h1 className="text-3xl font-bold mb-2">Mohammed Shahid</h1>
        <p className="text-lg text-gray-600">MERN Stack Developer</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">🌟 About Me</h2>
        <p className="text-lg">
          I am a passionate MERN (MongoDB, Express.js, React.js, and Node.js)
          Stack Developer with a strong track record in creating innovative and
          dynamic web applications. My expertise lies in developing robust and
          scalable solutions, with a particular focus on e-commerce projects.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">🚀 My Journey</h2>
        <p className="text-lg">
          With a background in web development and a deep understanding of
          front-end and back-end technologies, I have successfully delivered
          projects that have enhanced user experiences. I thrive in dynamic
          environments where I can leverage my problem-solving skills to
          overcome challenges and deliver exceptional results.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">🔧 Tech Stack</h2>
        <ul className="list-none mb-4">
          <li className="flex items-center mb-2">
            <span className="text-lg mr-2">MongoDB</span>
            <i className="fas fa-leaf text-green-500" />
          </li>
          <li className="flex items-center mb-2">
            <span className="text-lg mr-2">Express.js</span>
            <i className="fas fa-rocket text-orange-500" />
          </li>
          <li className="flex items-center mb-2">
            <span className="text-lg mr-2">React.js</span>
            <i className="fas fa-react text-blue-500" />
          </li>
          <li className="flex items-center mb-2">
            <span className="text-lg mr-2">Node.js</span>
            <i className="fas fa-server text-purple-500" />
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">💼 Notable Projects</h2>
        <ul className="list-none mb-4">
          <li className="mb-4">
            <h3 className="text-lg font-bold mb-2">LMS Project</h3>
            <p className="text-lg">
              A comprehensive Learning Management System built using React.js,
              Node.js, and MongoDB. The system allows users to create and manage
              courses, assignments, and quizzes, and provides a seamless
              learning experience.
            </p>
          </li>
          <li className="mb-4">
            <h3 className="text-lg font-bold mb-2">E-commerce Project</h3>
            <p className="text-lg">
              A fully functional e-commerce platform built using React.js,
              Node.js, and MongoDB. The platform allows users to browse and
              purchase products, and provides features such as cart management,
              payment gateway integration, and order tracking.
            </p>
          </li>
          <li className="mb-4">
            <h3 className="text-lg font-bold mb-2">Chat App using Socket.io</h3>
            <p className="text-lg">
              A real-time chat application built using React.js, Node.js, and
              Socket.io. The app allows users to create and join chat rooms, and
              provides features such as live messaging, file sharing, and user
              presence detection.
            </p>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">🌱 Continuous Growth</h2>
        <p className="text-lg">
          I am committed to staying up-to-date with the latest industry trends
          and best practices. My curiosity and eagerness to learn have been
          instrumental in my success as a developer. I constantly seek
          opportunities to expand my knowledge and skill set, ensuring that I
          deliver top-notch solutions.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">📫 Let's Connect!</h2>
        <p className="text-lg">
          Feel free to reach out to me if you have any questions, project ideas,
          or just want to say hi! You can connect with me via{" "}
          <a
            href="mailto:your-email@example.com"
            className="text-blue-500 hover:text-blue-700"
          >
            Email
          </a>{" "}
          or find me on{" "}
          <a
            href="https://www.linkedin.com/in/your-linkedin-profile/"
            className="text-blue-500 hover:text-blue-700"
          >
            LinkedIn
          </a>
          . I'm always excited to collaborate and learn from fellow developers.
          Let's build amazing things together!
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
