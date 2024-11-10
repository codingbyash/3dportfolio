import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full bg-gradient-to-r from-purple-500 to-pink-500 p-[1px] rounded-[20px] shadow-card transition-transform duration-300 transform hover:scale-105'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-[#000000] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain transition-transform duration-300 transform hover:scale-110'
        />

        <h3 className='text-white text-[22px] font-semibold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Know About Me</p>
        <h2 className={styles.sectionHeadText}>Look at Here 👀</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-gray-300 text-[18px] max-w-3xl leading-[30px]'
      >
       Hello! I'm a passionate web developer with expertise in TypeScript and JavaScript, 
       skilled in crafting dynamic applications using frameworks like React and Node.js.
       I pride myself on being a quick learner and a collaborative partner, working closely 
       with clients to create efficient, scalable, and user-friendly solutions that effectively 
       address real-world challenges. Let’s team up and turn your innovative ideas into reality!
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
