export default function LoadingIndicator({ size = "medium", text = "Loading..." }) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24"
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl"
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className="relative">
        {/* Orbital rings */}
        <div className={`${sizeClasses[size]} border-4 border-sphere-electric-blue/10 rounded-full`}></div>
        <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-sphere-electric-blue border-r-sphere-neon-cyan rounded-full animate-spin`}></div>

        {/* Rotating inner sphere */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size === 'large' ? 'medium' : 'small']} bg-linear-to-br from-sphere-electric-blue to-sphere-neon-cyan rounded-full opacity-80 animate-pulse`}></div>

        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-sphere-cosmic-purple rounded-full animate-bounce"></div>
        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-sphere-neon-cyan rounded-full animate-bounce delay-75"></div>
      </div>
      {/* Loading text */}
      {text && (
        <p className={`text-sphere-graphite font-medium ${textSizes[size]} bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan bg-clip-text text-transparent`}>
          {text}
        </p>
      )}
    </div>
  );
}