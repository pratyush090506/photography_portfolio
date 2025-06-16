import React from "react";
import {Camera, Calendar } from "lucide-react";

const About: React.FC = () => {
  const stats = [
    { icon: Camera, value: "500+", label: "Photographs" },
    { icon: Calendar, value: "3+", label: "Years" },
  ];

  const skills = [
    "Portrait Photography",
    "Landscape Photography",
    "Street Photography",
    "Adobe Lightroom",
    "Adobe Photoshop",
    "Film Photography",
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
                I’m at the very start of my photography journey, but I’m deeply
              passionate about capturing moments, stories, and emotions through
              my lens. Photography lets me see the world in a unique way — from
              the small details we often miss, to the grand stories that unfold
              all around us.
              </p>
                
              <p className="text-lg">
                It’s my way of freezing a feeling, a memory, a
              piece of life — and letting it live on forever. As an active
              member of the Media Club in my college, I get the opportunity to
              shoot all kinds of events — from concerts and workshops to
              ceremonies — using advanced equipment like DSLRs and gimbals.
              </p>
              <p className="text-lg">
              Each event is a new experience, a chance for me to learn, grow, and
              become a better storyteller with my camera. I’m excited to keep
              exploring this path and developing my craft. I’m open to
              opportunities — whether it’s internships, collaborations, or
              freelance projects — that allow me to bring stories to life
              through my photos. 
              </p>
              <p className="text-lg">
              Photography isn’t just a hobby for me; it’s a
              way to connect, to express myself, and to show the world how I see
              it.
              </p>

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
                  <div className="text-2xl font-light text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-light tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;

