import React, { useEffect, useState } from "react";

type ImageData = {
  id: string;
  name: string;
  url: string;
};

type SectionedImages = {
  [section: string]: ImageData[];
};

const Gallery: React.FC = () => {
  const [imagesBySection, setImagesBySection] = useState<SectionedImages>({});
  const [loaded, setLoaded] = useState<{ [id: string]: boolean }>({});
  const [selectedSection, setSelectedSection] = useState<string>("Portraits");

  // Auto-import all images
  useEffect(() => {
    const portraits = import.meta.glob('/src/assets/images/portrait/*.{jpg,png}', { eager: true });
    const travel = import.meta.glob('/src/assets/images/travel/*.{jpg,png}', { eager: true });
    const landscape = import.meta.glob('/src/assets/images/landscape/*.{jpg,png}', { eager: true });
    const events = import.meta.glob('/src/assets/images/events/*.{jpg,png}', { eager: true });


    const formatImages = (images: Record<string, unknown>, section: string): ImageData[] =>
      Object.entries(images).map(([path], i) => {
        const parts = path.split("/");
        const filename = parts[parts.length - 1];
        const name = filename.split(".")[0].replace(/[-_]/g, " ");
        return {
          id: `${section}-${i}`,
          name,
          url: new URL(path, import.meta.url).href,
        };
      });

    setImagesBySection({
      Portraits: formatImages(portraits, "Portraits"),
      Travel: formatImages(travel, "Travel"),
      Landscape: formatImages(landscape, "Landscape"),
      Events: formatImages(events, "Events"),
    });
  }, []);

  const handleImageLoad = (id: string) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const fixedSections = ["Portraits","Travel", "Landscape", "Events"];
  const images = imagesBySection[selectedSection] || [];

  return (
    <div id="gallery" className="p-6 min-h-screen bg-black text-white space-y-12">
      <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-center">Gallery</h2>

      {/* Section Tabs */}
      <div className="flex justify-center gap-6 mb-8">
        {fixedSections.map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`px-5 py-2 text-sm sm:text-base rounded-full border tracking-wide uppercase transition duration-300 ${
              selectedSection === section
                ? "bg-white text-black"
                : "text-white border-white hover:bg-white/10"
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-10">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              className="group relative transform transition-all duration-500 ease-in-out hover:scale-105 overflow-hidden rounded-xl"
            >
              {!loaded[image.id] && (
                <div className="h-60 w-full bg-gray-700 bg-opacity-20 animate-pulse rounded-lg absolute top-0 left-0 z-0" />
              )}
              <img
                src={image.url}
                alt={image.name}
                onLoad={() => handleImageLoad(image.id)}
                className={`w-full h-auto transition-all duration-500 ease-in-out filter grayscale group-hover:filter-none ${
                  loaded[image.id] ? "opacity-100 relative z-10" : "opacity-0"
                }`}
              />
              {/* Caption */}
              {loaded[image.id] && (
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-80 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20">
                  <p className="text-gray-100 font-semibold tracking-wide">
                    {image.name}
                  </p>
                </div>
              )}
              {/* Watermark */}
              <p className="text-xs text-center text-gray-400 mt-2">© Pratyush Mohanty</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No images found in this section.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
