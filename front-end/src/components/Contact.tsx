import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message. I will respond within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'pratyushm987@gmail.com', href: 'mailto:pratyushm987@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 7787023649', href: 'tel:+917787023649' },
    { icon: MapPin, label: 'Location', value: 'Bengaluru, IN / Bhubaneswar, IN', href: '#' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/pratyushmohanty01/', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 tracking-wider text-white">
            CONTACT
          </h2>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 font-light tracking-wide">
            Available for commissions and collaborations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-light text-white mb-12 tracking-wide uppercase">
              Get In Touch
            </h3>
            
            <div className="space-y-8 mb-16">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="group flex items-center py-4 border-b border-gray-800 hover:border-gray-700 transition-colors duration-500"
                >
                  <info.icon className="h-5 w-5 text-gray-400 mr-6" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{info.label}</div>
                    <div className="text-white font-light">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-light text-white mb-8 tracking-wide uppercase">Follow</h4>
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-3 border border-gray-800 hover:border-gray-700 hover:bg-white hover:text-black transition-all duration-500"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-light text-white mb-12 tracking-wide uppercase">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors duration-500 font-light"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors duration-500 font-light"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Subject"
                  className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors duration-500 font-light"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Message"
                  className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors duration-500 font-light resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center text-sm font-light text-white border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-500 tracking-wider uppercase"
              >
                Send Message
                <Send className="ml-3 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;