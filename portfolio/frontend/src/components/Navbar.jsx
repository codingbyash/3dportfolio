import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Ensure you're importing Link from react-router-dom

import { styles } from "../styles";
import { AshGPT, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setActive(sectionId.charAt(0).toUpperCase() + sectionId.slice(1)); // Update active state
    setToggle(false); // Close mobile menu
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={AshGPT} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Ashish &nbsp;
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
        <li className={`${
            active === "Blog" ? "text-white" : "text-secondary"
          } hover:text-white text-[18px] font-medium cursor-pointer`}>
            <Link to="/blogs" onClick={() => setActive("Blog")}>Blogs</Link>
          </li>
          <li className={`${
            active === "About" ? "text-white" : "text-secondary"
          } hover:text-white text-[18px] font-medium cursor-pointer`}>
            <a onClick={() => handleScrollToSection("about")}>About</a>
          </li>
          <li className={`${
            active === "Work" ? "text-white" : "text-secondary"
          } hover:text-white text-[18px] font-medium cursor-pointer`}>
            <a onClick={() => handleScrollToSection("work")}>Work</a>
          </li>
          <li className={`${
            active === "Contact" ? "text-white" : "text-secondary"
          } hover:text-white text-[18px] font-medium cursor-pointer`}>
            <a onClick={() => handleScrollToSection("contact")}>Contact</a>
          </li>
       
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === "About" ? "text-white" : "text-secondary"
                }`}
                onClick={() => handleScrollToSection("about")}
              >
                About
              </li>
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === "Work" ? "text-white" : "text-secondary"
                }`}
                onClick={() => handleScrollToSection("work")}
              >
                Work
              </li>
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === "Contact" ? "text-white" : "text-secondary"
                }`}
                onClick={() => handleScrollToSection("contact")}
              >
                Contact
              </li>
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === "Blog" ? "text-white" : "text-secondary"
                }`}
              >
                <Link to="/blogs" onClick={() => setActive("Blog")}>Blog</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
