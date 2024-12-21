import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast"; // Import toast
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Your Name",
          from_email: form.email,
          to_email: "your_email@example.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-10 rounded-2xl shadow-lg"
      >
        <p className={`${styles.sectionSubText} text-center`}>More Enquiries?</p>
        <h3 className={`${styles.sectionHeadText} text-center`}>Reach me</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-semibold mb-2 text-lg">Your Good Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Kindly enter your amazing name here.."
              className="bg-tertiary py-3 px-5 rounded-lg placeholder:text-secondary text-white outline-none border-none shadow-md transition-transform duration-300 hover:shadow-lg"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-semibold mb-2 text-lg">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="hey your email here.."
              className="bg-tertiary py-3 px-5 rounded-lg placeholder:text-secondary text-white outline-none border-none shadow-md transition-transform duration-300 hover:shadow-lg"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-semibold mb-2 text-lg">Your Message</span>
            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="write whatever you wanna say "
              className="bg-tertiary py-3 px-5 rounded-lg placeholder:text-secondary text-white outline-none border-none shadow-md transition-transform duration-300 hover:shadow-lg"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-full text-white font-bold shadow-lg shadow-primary transition-transform duration-300 hover:scale-105 hover:bg-opacity-90"
          >
            {loading ? "hold a sec, the message is getting sent" : "Send Message"}
          </button>
        </form>
      </motion.div>
      <motion.div
  variants={slideIn("left", "tween", 0.2, 1)}
  className="flex-[0.25] bg-gray-300 p-10 shadow-lg rounded-full"
  style={{
    width: "100%", // Use to control shape proportions
    height: "900px", // Adjust height to your preference for an ellipse
  }}
  
>

        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
