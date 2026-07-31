import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
// import { useForm, UseFormSetValue } from "react-hook-form";
import { FaCamera, FaTrash } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { Film, Trash2, Play, Pause } from "lucide-react";
import type { IProductFormInput } from "../../types/device.types";

type IMAGEUPLOADTYPE = {
  images: (File | string | null)[];
  setImages: React.Dispatch<React.SetStateAction<(File | string | null)[]>>;
  videoPreviewUrl: string | null;
  setVideoPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  videoPlayerRef: React.RefObject<HTMLVideoElement | null>;
  product: IProductFormInput;
  setProduct: React.Dispatch<React.SetStateAction<IProductFormInput>>;
};

const ImageUpload = ({
  images,
  setImages,
  videoPreviewUrl,
  setVideoPreviewUrl,
  videoPlayerRef,
  // product,
  setProduct,
}: IMAGEUPLOADTYPE): React.JSX.Element => {
  const { setValue } = useForm<IProductFormInput>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const imagePreviews = useMemo(() => {
    return images.map((image) => {
      if (image instanceof File) {
        return URL.createObjectURL(image);
      }
      return typeof image === "string" ? image : "";
    });
  }, [images]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imagePreviews]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0] ?? null;

    if (file && !["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Only PNG and JPG files are allowed.");
      return;
    }

    const nextImages = [...images];
    nextImages[index] = file;

    setImages(nextImages);
    setProduct((prev) => {
      return { ...prev, images: nextImages };
    });
  };

  // Remove individual slot photo entries
  const handleRemoveImage = (index: number) => {
    const nextImages = [...images];
    nextImages[index] = null;

    setImages(nextImages);
  };

  // Process video selection changes
  const handleVideoExtraction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const selectedFile = fileList[0];
    if (!selectedFile.type.startsWith("video/")) {
      alert("Please upload a valid video file (MP4, MOV, etc.)");
      return;
    }

    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }

    const generatedStreamUrl = URL.createObjectURL(selectedFile);
    console.log(generatedStreamUrl);
    setVideoPreviewUrl(generatedStreamUrl);
    setProduct((prev) => {
      return { ...prev, video: selectedFile };
    });
    setIsPlaying(false);
  };

  // Clear video track files
  const removeVideoFile = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoPreviewUrl(null);
    setValue("video", null);
    setIsPlaying(false);
  };

  // Video controller playback play/pause state toggle execution
  const togglePlayState = () => {
    if (!videoPlayerRef?.current) return;

    if (isPlaying) {
      videoPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      videoPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
      {/* Title Header Layout Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-800 rounded-md">
            <MdPermMedia className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900">Media Gallery</h3>
        </div>
        <span className="text-xs font-medium text-gray-400">
          Recommended: 1200 x 1200px
        </span>
      </div>

      {/* Video Upload Context Interface Screen Layout block */}
      {!videoPreviewUrl ? (
        <div className="relative border-2 h-64 flex flex-col justify-center border-dashed border-gray-300 hover:border-blue-800 bg-gray-50/50 rounded-xl p-6 text-center transition-all duration-200 cursor-pointer group">
          <input
            type="file"
            accept="video/*"
            name="video"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
            onChange={handleVideoExtraction}
          />
          <div className="flex flex-col items-center justify-center space-y-2 relative z-10">
            <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 text-gray-400 group-hover:text-blue-800 transition-all duration-200">
              <Film size={22} />
            </div>
            <p className="text-sm font-semibold text-gray-700">
              Click to upload product video
            </p>
            <p className="text-xs text-gray-400 font-medium">
              Supports MP4, MOV, WebM up to 50MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 w-full">
          <div className="relative rounded-xl w-full overflow-hidden bg-black aspect-video  shadow-md border border-gray-900 max-h-88  mx-auto">
            <video
              ref={videoPlayerRef}
              src={videoPreviewUrl}
              className="w-full h-full object-cover"
              onEnded={() => setIsPlaying(false)}
              playsInline
              controls
            />
            <div className="absolute  inset-0 bg-black/20 opacity- group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={togglePlayState}
                className="pointer-events-auto p-3.5 bg-white/95 text-slate-900 rounded-full hover:scale-110 active:scale-95 shadow-lg transition-all duration-150"
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end w-full">
            <button
              type="button"
              onClick={removeVideoFile}
              className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100 py-2 px-3.5 rounded-lg transition-colors"
            >
              <Trash2 size={14} />
              Remove Video
            </button>
          </div>
        </div>
      )}

      {/* Grid Image Container Wrapper Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {images.map((image, index) => (
          <div className="relative aspect-square w-full" key={index}>
            <label
              className={`w-full h-full overflow-hidden ${
                image
                  ? "border border-gray-200"
                  : "border-2 border-dashed border-gray-300 hover:border-gray-400"
              } cursor-pointer flex items-center justify-center relative transition-colors bg-gray-50 rounded-lg`}
            >
              {image ? (
                <img
                  src={imagePreviews[index]}
                  alt={`Upload index profile-${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-1.5 p-2">
                  <FaCamera className="text-gray-400 text-xl" />
                  <span className="text-gray-500 font-semibold text-xs text-center">
                    Upload Photo
                  </span>
                </div>
              )}

              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                name="images"
                onChange={(e) => handleImageUpload(e, index)}
              />
            </label>

            {image && (
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm z-10"
              >
                <FaTrash className="text-[10px]" />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageUpload;
