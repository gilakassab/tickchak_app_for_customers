import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import '../css/Contact.css';

function Contact({ phoneToContact, emailToContact }) {
  const sendEmail = (e) => {
    e.preventDefault();
   
    emailjs.sendForm('service_cg62ejf', 'template_lkopofc', e.target, 'Gg5fOmRM5xl63Jlko')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    e.target.reset();
  };

  return (
    <div className="contact-container" id="contact">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-content">
        <form className="contact-form" onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="tel" name="phone" placeholder="Phone" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" rows="4" required></textarea>
          <button type="submit">Send</button>
        </form>
        <div className="contact-info">
          <div><FiPhone /> <span>{phoneToContact}</span></div>
          <div><FiMail /> <span>{emailToContact}</span></div>
        </div>
      </div>
    </div>
  );
}

export default Contact;