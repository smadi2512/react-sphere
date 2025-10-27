export default function ErrorBlock({ title, message }) {
  return (
    <div className="flex items-start p-6 bg-red-50 border-l-4 border-red-500 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <div className="shrink-0">
        <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
      </div>
      <div className="ml-4 flex-1">
        <h2 className="text-xl font-bold text-red-800 mb-2">
          {title}
        </h2>
        <p className="text-red-700 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}