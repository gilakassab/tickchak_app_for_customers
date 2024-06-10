import React from 'react';
import emailjs from 'emailjs-com';

function Contact({phoneToContact,emailToContact}) {
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
      <form className="contact-form" onSubmit={sendEmail}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" required ></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
      <div className="contact-info">
        <div>
          <span role="img" aria-label="phone">📞</span>
          <p>{phoneToContact}</p>
        </div>
        <div>
          <span role="img" aria-label="email">📧</span>
          <p>{emailToContact}</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
