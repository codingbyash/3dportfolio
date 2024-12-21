import React,{useEffect,useState} from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { linkimage } from "../assets";

import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  title,
  description,
  technologies,
  image,
  sourceCodeLink,
  livelink,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
   <div className='relative w-full h-[230px]'>
  <img
    src={image}
    alt='project_image'
    className='w-full h-full object-cover rounded-2xl'
  />

  
  <div className='absolute top-3 right-3 flex card-img_hover'>
    <div
      onClick={() => window.open(sourceCodeLink, "_blank")}
      className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
    >
      <img
        src={github}
        alt='source code'
        className='w-1/2 h-1/2 object-contain'
      />
    </div>
  </div>

  <div className='absolute bottom-3 left-3 flex card-img_hover'>
    <div
      onClick={() => window.open(livelink, "_blank")}
      className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
    >
      <img
        src={linkimage}
        alt='live link'
        className='w-1/2 h-1/2 object-contain'
      />
    </div>
  </div>
</div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{title}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {technologies.map((tech) => (
            <p
              key={`${title}-${tech}`}
              className={`text-[14px]}`}
            >
              {/* #{tag.name} */}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
      {projects.map((project, index) => (
          <ProjectCard
            key={`project-${project._id}`}
            index={index}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            image={project.image}
            sourceCodeLink={project.sourceCodeLink}
            liveLink={project.liveLink}
          />
        ))}

      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
