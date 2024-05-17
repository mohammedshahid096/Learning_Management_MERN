import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Company
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to={"/about"} className=" hover:underline">
                  About
                </Link>
              </li>
              <li className="mb-4">
                <Link to={"/privacy-policy"} className="hover:underline">
                  Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link to={"/websites"} className="hover:underline">
                  Important Website's
                </Link>
              </li>
              <li className="mb-4">
                <Link to={"/faq"} className="hover:underline">
                  FAQ's
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Help center
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Download
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 bg-gray-300 dark:bg-gray-800 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
          © 2023 <a href="https://flowbite.com/">Flowbite™</a>. All Rights
          Reserved.
        </span>
        <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
          <a
            href="https://www.instagram.com/mohammedshahid096?igsh=eDR2bDhmaGtpaDRp"
            target="_blank"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FaInstagram />
            <span className="sr-only">Instagram page</span>
          </a>

          <a
            href="#"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FaSquareXTwitter />
            <span className="sr-only">Twitter page</span>
          </a>
          <a
            href="https://github.com/mohammedshahid096"
            target="_blank"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FaGithub />
            <span className="sr-only">GitHub account</span>
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-shahid-9aa61222a"
            target="_blank"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FaLinkedin />
            <span className="sr-only">Linkedin account</span>
          </a>
          <a
            href=" https://leetcode.com/u/mohammedshahid096/"
            target="_blank"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <SiLeetcode />
            <span className="sr-only">Linkedin account</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
