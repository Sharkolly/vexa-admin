import React, { useState, useEffect, useMemo } from "react";
// import { useForm, UseFormSetValue } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FaCamera, FaTrash } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { Film, Trash2, Play, Pause, Upload } from "lucide-react";
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
    <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/80 transition-all hover:shadow-md/50">
      {/* Title Header Layout Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl ring-1 ring-blue-100">
            <MdPermMedia className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              Media Showcase
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              High-quality photos and videos boost sales conversions
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          Recommended: 1200 x 1200px
        </span>
      </div>

      {/* Video Upload Context Interface Screen Layout block */}
      {!videoPreviewUrl ? (
        <div className="relative border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center min-h-[200px]">
          <input
            type="file"
            accept="video/*"
            name="video"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
            onChange={handleVideoExtraction}
          />
          <div className="flex flex-col items-center justify-center space-y-3 relative z-10 pointer-events-none">
            <div className="p-3.5 bg-gray-50 group-hover:bg-blue-100 group-hover:text-blue-600 rounded-2xl text-gray-400 transition-all duration-200 ring-1 ring-gray-100 group-hover:ring-blue-200 group-hover:scale-105">
              <Film size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                Click or drag video file to upload
              </p>
              <p className="text-xs text-gray-400 font-medium mt-1">
                Supports MP4, MOV, WebM up to 50MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 w-full">
          <div className="relative rounded-2xl w-full overflow-hidden bg-black aspect-video shadow-md border border-gray-900 max-h-88 mx-auto group">
            <video
              ref={videoPlayerRef}
              src={videoPreviewUrl}
              className="w-full h-full object-cover"
              onEnded={() => setIsPlaying(false)}
              playsInline
              controls
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={togglePlayState}
                className="pointer-events-auto p-4 bg-white/95 text-slate-900 rounded-full hover:scale-110 active:scale-95 shadow-xl transition-all duration-150 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between w-full px-1">
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Video preview ready
            </span>
            <button
              type="button"
              onClick={removeVideoFile}
              className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-bold bg-rose-50 hover:bg-rose-100/80 py-2 px-3.5 rounded-xl transition-all cursor-pointer border border-rose-100"
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
          <div className="relative aspect-square w-full group" key={index}>
            <label
              className={`w-full h-full overflow-hidden rounded-2xl ${
                image
                  ? "border border-gray-200 shadow-xs"
                  : "border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/20"
              } cursor-pointer flex flex-col items-center justify-center relative transition-all bg-gray-50/50`}
            >
              {image ? (
                <>
                  <img
                    src={imagePreviews[index]}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-xs font-semibold gap-1">
                    <Upload className="w-4 h-4" />
                    <span>Replace</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 p-3 text-center">
                  <div className="p-2.5 rounded-xl bg-white shadow-xs border border-gray-100 text-gray-400 group-hover:text-blue-600 transition-colors">
                    <FaCamera className="text-base" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-gray-700 font-bold text-xs block">
                      {index === 0 ? "Cover Photo" : `Photo ${index + 1}`}
                    </span>
                    <span className="text-gray-400 font-medium text-[10px] block">
                      PNG, JPG
                    </span>
                  </div>
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
                className="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-md z-10 cursor-pointer ring-2 ring-white"
                title="Remove photo"
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