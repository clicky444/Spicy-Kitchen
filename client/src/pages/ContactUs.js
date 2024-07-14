import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const ContactUs = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "fbf45bde-b13c-4366-b6af-c45611586ea6");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div>
      <Header/>
      <HeroSection title='Contact'/>
      <section className='contact-info mx-24 my-24'>
        <div className='text-center'>
          <h2 className='text-4xl font-normal text-gray-800 mb-8'>
            Get in <span className='text-red-400'>Touch</span>
          </h2>
          <p className='text-lg text-gray-600 mb-16'>
            We'd love to hear from you! Reach out to us using any of the methods below.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
          <div>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Contact Information</h3>
            <p className='text-lg text-gray-600 mb-2'>Address: No. 24, Lotus Road, Colombo 01</p>
            <p className='text-lg text-gray-600 mb-2'>Phone: +94 11 2345678</p>
            <p className='text-lg text-gray-600 mb-2'>Email: spicykitchen56@email.com</p>
            <p className='text-lg text-gray-600'>Hours: Mon-Sun 08:00 AM - 09:00 PM</p>
            <div className='mt-8'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Follow Us</h3>
              <div className='flex space-x-4'>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} className='w-8 h-8'/>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className='w-8 h-8'/>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} className='w-8 h-8'/>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Send Us a Message</h3>
            <form className='space-y-4 mb-4' onSubmit={onSubmit}>
              <div>
                <label className='block text-lg text-gray-600' htmlFor='name'>Name</label>
                <input className='w-full p-2 border border-gray-300 rounded' type='text' id='name' name='name' />
              </div>
              <div>
                <label className='block text-lg text-gray-600' htmlFor='email'>Email</label>
                <input className='w-full p-2 border border-gray-300 rounded' type='email' id='email' name='email' />
              </div>
              <div>
                <label className='block text-lg text-gray-600' htmlFor='phone'>Phone (optional)</label>
                <input className='w-full p-2 border border-gray-300 rounded' type='tel' id='phone' name='phone' />
              </div>
              <div>
                <label className='block text-lg text-gray-600' htmlFor='message'>Message</label>
                <textarea className='w-full p-2 border border-gray-300 rounded' id='message' name='message' rows='5'></textarea>
              </div>
              <div>
                <button className='px-4 py-2 bg-red-400 text-white rounded'>Submit</button>
              </div>
            </form>
            <span>{result}</span>
          </div>
          
        </div>
        <div className='mt-16'>
          <h3 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>Find Us Here</h3>
          <div className='flex justify-center'>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63321.01686791662!2d79.83977708453042!3d6.927079391756785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591e39d4b291%3A0x80b8f15e8cfecd0e!2sNo.%2024%2C%20Lotus%20Road%2C%20Colombo%2001%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1622400429387!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
            >  
          </iframe>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default ContactUs
