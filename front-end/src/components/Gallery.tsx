import React, { useEffect, useState } from 'react';

type ImageData = {
  id: string;
  name: string;
  url: string;
};

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://photography-portfolio-z5yx.onrender.com/api/images')
      .then((res) => res.json()) 
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching images!', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black">
      <h2 className="text-3xl font-semibold mb-6 text-gray-100">
        Gallery
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          {/* Loading spinner while we fetch metadata */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.length > 0 ? (
            images.map((image) => (
              <div
                key={image.id}
                className="group relative transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden rounded-lg"
              >
                {/* Loading fallback */}
                <img
                   src={image.url}
                   alt={image.name}
                   loading="lazy"
                   onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                   className="w-full h-auto transition-all duration-500 ease-in-out filter grayscale group-hover:filter-none opacity-0"
                 />
                 {/* caption on hover */}
                 <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-80 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                   <p className="text-gray-100 font-semibold tracking-wide">
                      {image.name}
                   </p>
                 </div>
               </div>
            ))
          ) : (
            <p className="text-gray-100">No images found</p>
          )}

        </div>
      )}

    </div>
  );
};

export default Gallery;
