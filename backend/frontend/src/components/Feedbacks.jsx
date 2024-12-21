import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-8 rounded-3xl xs:w-[320px] w-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-primary"
  >
    <p className="text-white font-black text-[48px] mb-4 opacity-70">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[16px] leading-7">{testimonial}</p>

      <div className="mt-7 flex justify-between items-center gap-3">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-semibold text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[14px]">
            {designation} at {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px] overflow-hidden">
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[400px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Your Opinions, My Inspiration</h2>
        </motion.div>
      </div>
      <div className="-mt-16 pb-14 px-6 flex flex-wrap gap-8">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
