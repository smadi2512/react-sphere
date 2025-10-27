export default function ImagePicker({ images, selectedImage, onSelect }) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-sphere-deep-space">
        Select an event image
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image) => (
          <div
            key={image.path}
            onClick={() => onSelect(image.path)}
            className={`
              relative group cursor-pointer transform transition-all duration-300
              ${
                selectedImage === image.path
                  ? "ring-4 ring-sphere-electric-blue scale-105 shadow-2xl"
                  : "ring-2 ring-sphere-silver/30 hover:ring-sphere-neon-cyan hover:scale-105 hover:shadow-lg"
              }
              rounded-2xl overflow-hidden bg-sphere-mist p-2
            `}
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-white">
              <img
                src={`http://localhost:3000/${image.path}`}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {selectedImage === image.path && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-sphere-electric-blue rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
            <div className="mt-2">
              <p className="text-xs text-sphere-graphite text-center truncate px-1">
                {image.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
