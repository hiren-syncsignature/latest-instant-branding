import React, { useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  setProfileImage,
  removeProfileImage,
  setProfilePosition,
} from "../../store/editorSlice";

const ProfilePhotoUpload: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current profile image from store
  const profileImage = useSelector(
    (state: RootState) => state.editor.profileImage
  );

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  }, []);

  // Handle file selection via input
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files[0]);
      }
    },
    []
  );

  // Process the selected file
  const handleFiles = useCallback(
    (file: File) => {
      setIsUploading(true);
      setErrorMessage("");

      // Check file type
      if (!file.type.match("image.*")) {
        setErrorMessage("Please select an image file.");
        setIsUploading(false);
        return;
      }

      // Check file size (max 2MB for profile photo)
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("Image must be less than 2MB.");
        setIsUploading(false);
        return;
      }

      // Create a FileReader to process the image
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          // Create image for dimension checking
          const img = new Image();
          img.onload = () => {
            const imageData = {
              src: e.target?.result as string,
              width: img.width,
              height: img.height,
              originalName: file.name,
              position: "right", // Default position
              size: "medium", // Default size
            };

            // Dispatch action to update store
            dispatch(setProfileImage(imageData));
            setIsUploading(false);
          };

          img.onerror = () => {
            setErrorMessage("Failed to load image. Please try another file.");
            setIsUploading(false);
          };

          img.src = e.target?.result as string;
        } catch (error) {
          setErrorMessage("An error occurred while processing the image.");
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        setErrorMessage("Failed to read file. Please try again.");
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  // Remove the current image
  const handleRemoveImage = useCallback(() => {
    dispatch(removeProfileImage());
  }, [dispatch]);

  // Open file input dialog
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Change profile image position
  const handlePositionChange = (position: "left" | "right" | "center") => {
    if (profileImage) {
      dispatch(setProfilePosition({ ...profileImage, position }));
    }
  };

  // Change profile image size
  const handleSizeChange = (size: "small" | "medium" | "large") => {
    if (profileImage) {
      dispatch(setProfilePosition({ ...profileImage, size }));
    }
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="p-3">
        <h3 className="font-medium text-gray-700 mb-2 text-sm">
          Profile Photo
        </h3>

        {/* Display current profile image if it exists */}
        {profileImage && (
          <div className="mb-3">
            <div className="relative flex justify-center rounded-md overflow-hidden border border-gray-200">
              <img
                src={profileImage.src}
                alt="Profile"
                className="object-cover max-h-40"
                style={{ maxWidth: "100%" }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                <button
                  onClick={handleRemoveImage}
                  className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center mt-1">
              {profileImage.width}×{profileImage.height}px
            </div>
          </div>
        )}

        {/* Upload area */}
        {!profileImage && (
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {isUploading ? "Uploading..." : "Add your profile photo"}
              </p>
              <p className="text-xs text-gray-500 mb-2">PNG or JPG, max 2MB</p>
              <button
                onClick={triggerFileInput}
                disabled={isUploading}
                className={`px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs ${
                  isUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Select Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            {errorMessage && (
              <p className="text-xs text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        )}

        {/* Photo position controls */}
        {profileImage && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-medium text-gray-600">Position</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                className={`p-1.5 border rounded text-xs hover:bg-gray-50 ${
                  profileImage.position === "left"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : ""
                }`}
                onClick={() => handlePositionChange("left")}
              >
                Left
              </button>
              <button
                className={`p-1.5 border rounded text-xs hover:bg-gray-50 ${
                  profileImage.position === "center"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : ""
                }`}
                onClick={() => handlePositionChange("center")}
              >
                Center
              </button>
              <button
                className={`p-1.5 border rounded text-xs hover:bg-gray-50 ${
                  profileImage.position === "right"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : ""
                }`}
                onClick={() => handlePositionChange("right")}
              >
                Right
              </button>
            </div>

            <div className="mb-2">
              <h4 className="text-xs font-medium text-gray-600 mb-2">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`p-1.5 border rounded text-xs hover:bg-gray-50 ${
                    profileImage.size === "small"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : ""
                  }`}
                  onClick={() => handleSizeChange("small")}
                >
                  Small
                </button>
                <button
                  className={`p-1.5 border rounded text-xs hover:bg-gray-50 ${
                    profileImage.size === "medium"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : ""
                  }`}
                  onClick={() => handleSizeChange("medium")}
                >
                  Medium
                </button>
                <button
                  className={`p-1.5 border rounded text-xs hover:bg-gray-50 ${
                    profileImage.size === "large"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : ""
                  }`}
                  onClick={() => handleSizeChange("large")}
                >
                  Large
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
