import React from 'react';
import { Award, Users, Camera, Calendar } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Camera, value: '500+', label: 'Photographs' },
    { icon: Users, value: '50+', label: 'Clients' },
    { icon: Award, value: '3', label: 'Awards' },
    { icon: Calendar, value: '3+', label: 'Years' },
  ];

  const skills = [
    'Portrait Photography',
    'Landscape Photography', 
    'Street Photography',
    'Adobe Lightroom',
    'Adobe Photoshop',
    'Film Photography'
  ];

  return (
    <section id="about" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* About Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-extralight mb-12 tracking-wider text-white">
              ABOUT
            </h2>
            <div className="w-24 h-px bg-white mb-12"></div>
            
            <div className="space-y-8 text-gray-300 font-light leading-relaxed">
              <p className="text-lg">
                I am a dedicated photographer with over three years of experience capturing 
                the essence of human emotion and the beauty of natural landscapes. My work 
                focuses on creating timeless images that tell compelling stories.
              </p>
              
              <p className="text-lg">
                Specializing in portrait, landscape, and street photography, I believe in 
                the power of visual storytelling to connect people and preserve moments 
                that matter. Each photograph is carefully composed to reveal the authentic 
                character of its subject.
              </p>
              
              <p className="text-lg">
                Currently seeking opportunities to expand my professional experience through 
                internships and collaborative projects with established photographers and 
                creative agencies.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-16">
              <h3 className="text-xl font-light text-white mb-8 tracking-wide uppercase">
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="text-gray-400 font-light text-sm tracking-wide py-2 border-b border-gray-800"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <button className="inline-flex items-center text-sm font-light text-white border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-500 tracking-wider uppercase">
                Download Resume
              </button>
            </div>
          </div>

          {/* Photo and Stats */}
          <div className="space-y-12">
            <div className="relative">
              <img
                src="https://i.ibb.co/pj7YRH0X/Screenshot-2025-06-10-at-11-28-50-PM.png"
                alt="Pratyush Mohanty - Photographer"
                className="w-full h-96 object-cover grayscale"
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center border border-gray-800 p-8 hover:border-gray-700 transition-colors duration-500"
                >
                  <stat.icon className="h-6 w-6 text-white mx-auto mb-4" />
                  <div className="text-2xl font-light text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-light tracking-wide uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;