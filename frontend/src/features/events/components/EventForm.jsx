import { useState } from "react";
import ImagePicker from "../../../shared/components/ui/ImagePicker.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchSelectableImages } from "../api/http.js";
import ErrorBlock from "../../../shared/components/ui/ErrorBlock.jsx";
import LoadingIndicator from "../../../shared/components/ui/LoadingIndicator.jsx";

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isPending, isError } = useQuery({
    queryKey: ["events-images"],
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-sphere-deep-space"
        >
          Event Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={inputData?.title ?? ""}
          className="w-full px-4 py-3 border-2 border-sphere-silver/30 rounded-xl focus:border-sphere-electric-blue focus:ring-2 focus:ring-sphere-electric-blue/20 transition-all duration-300"
          placeholder="Enter event title"
        />
      </div>

      {/* Image Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-sphere-deep-space">
          Event Image *
        </label>
        {isPending && (
          <div className="flex justify-center py-8">
            <LoadingIndicator size="small" text="Loading images..." />
          </div>
        )}
        {isError && (
          <ErrorBlock
            title="Failed to load images"
            message="Please try again later."
          />
        )}
        {data && (
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-sphere-deep-space"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={inputData?.description ?? ""}
          className="w-full px-4 py-3 border-2 border-sphere-silver/30 rounded-xl focus:border-sphere-electric-blue focus:ring-2 focus:ring-sphere-electric-blue/20 transition-all duration-300"
          placeholder="Describe your event..."
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-sphere-deep-space"
          >
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={inputData?.date ?? ""}
            className="w-full px-4 py-3 border-2 border-sphere-silver/30 rounded-xl focus:border-sphere-electric-blue focus:ring-2 focus:ring-sphere-electric-blue/20 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="time"
            className="block text-sm font-semibold text-sphere-deep-space"
          >
            Time *
          </label>
          <input
            type="time"
            id="time"
            name="time"
            required
            defaultValue={inputData?.time ?? ""}
            className="w-full px-4 py-3 border-2 border-sphere-silver/30 rounded-xl focus:border-sphere-electric-blue focus:ring-2 focus:ring-sphere-electric-blue/20 transition-all duration-300"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label
          htmlFor="location"
          className="block text-sm font-semibold text-sphere-deep-space"
        >
          Location *
        </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          defaultValue={inputData?.location ?? ""}
          className="w-full px-4 py-3 border-2 border-sphere-silver/30 rounded-xl focus:border-sphere-electric-blue focus:ring-2 focus:ring-sphere-electric-blue/20 transition-all duration-300"
          placeholder="Where is your event?"
        />
      </div>

      {/* Action Buttons */}
      {children}
    </form>
  );
}
