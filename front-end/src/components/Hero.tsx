import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToGallery = () => {
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2927762/pexels-photo-2927762.jpeg?cs=srgb&dl=pexels-adilgkkya-2927762.jpg&fm=jpg)'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-7xl md:text-7xl font-extralight mb-8 tracking-wider shadow-md shadow-black/80">
          <span className="text-white">PRATYUSH MOHANTY</span>
        </h1>
        
        <div className="w-24 h-px bg-white mx-auto mb-8"></div>
        
        <p className="text-lg md:text-xl font-light text-gray-200 tracking-wide uppercase mb-12">
          Photographer
        </p>
        
        <button
          onClick={scrollToGallery}
          className="group inline-flex items-center text-sm font-light text-white border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-500 tracking-wider uppercase"
        >
          View Portfolio
          <ArrowDown className="ml-3 h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      <button
        onClick={scrollToGallery}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors duration-500"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;