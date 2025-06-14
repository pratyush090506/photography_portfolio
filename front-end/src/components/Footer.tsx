import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <img src="https://i.ibb.co/vvzVwJWL/Black-and-White-Illustrative-Photography-Logo.png" alt="Logo" className="h-20 w-35 rounded-full" />
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm font-light tracking-wide">
              © 2025 Pratyush Mohanty Photography. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;