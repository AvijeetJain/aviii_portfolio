import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motion";
import { socials } from "../constants";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_981uulv', 
      'template_258k2hd',
      {
        from_name: form.name,
        to_name: 'Avijeet',
        from_email: form.email,
        to_email: 'jainavijeet@gamil.com',
        message: form.message,
      },
      'l6vGP7D9UaKAPHCoj'
      )
      .then( () => {
        setLoading(false);
        alert('Thank You! I will get back to you as soon as possible');

        setForm({
          name: '',
          email: '',
          message: '',
        });
      }, 
      (error) => {
        setLoading(false);
        console.error(error);

        alert('Alas! Something went wrong. Please try again')
      }
      );
  };

  return (
    <>
    <div className="xl:mt-8 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div 
      variants = {slideIn('left', 'tween', 0.2, 1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Get in Touch</p>

        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form 
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-2 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your Name
            </span>

            <input 
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Whats's your Name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your Email
            </span>

            <input 
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Whats's your Email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your Message
            </span>

            <textarea
              rows="3"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message here"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" />
          </label>

          <button
          type="submit"
          className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl">
            {loading ? "Sending..." : "Send"}
          </button>

        </form>
      </motion.div>

      <motion.div
      variants = {slideIn('right', 'tween', 0.2, 1)}
      className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </motion.div>
    </div>

    <motion.div variants = {slideIn('right', 'tween', 0.7, 1)}>
      <div className="flex flex-row flex-wrap justify-end gap-10 mt-10">
        <p className="text-[23px] text-secondary tracking-wider text-white font-bold">Find me on : </p>
        {socials.map((social) => (
          <div className="w-9 h-9 relative" key={social.name}>
            <a href={social.link} target="_blank">
              <img src={social.icon} 
              className="hover:scale-125"/> 
            </a>
          </div>
        ))}
      </div>
    </motion.div>
    
    </>
  )
}

export default SectionWrapper(Contact, "contact");