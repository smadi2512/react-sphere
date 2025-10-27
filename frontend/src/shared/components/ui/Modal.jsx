import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(
  { children, onClose, size = "md", open = false },
  ref
) {
  const dialogRef = useRef();

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  //For uncontrolled mode
  useImperativeHandle(ref, () => ({
    open() {
      if (dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal();
      }
    },
    close() {
      if (dialogRef.current && dialogRef.current.open) {
        dialogRef.current.close();
      }
    },
  }));

  //For controlled mode
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (open === false) {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-sphere-deep-space/80 backdrop:backdrop-blur-sm bg-transparent border-none outline-none p-0 rounded-2xl shadow-2xl animate-scale-in"
      role="dialog"
      aria-modal="true"
      onClose={onClose}
      style={{
        margin: "auto",
      }}
    >
      <div
        className={`${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}
      >
        <div className="bg-linear-to-br from-sphere-mist to-white rounded-2xl shadow-2xl overflow-hidden relative">
          <div className="h-2 bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan"></div>
          <div className="p-6">{children}</div>
          {/* Close button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="cursor-pointer w-8 h-8 bg-sphere-silver/20 hover:bg-sphere-silver/30 rounded-full flex items-center justify-center transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4 text-sphere-graphite group-hover:text-sphere-deep-space transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;