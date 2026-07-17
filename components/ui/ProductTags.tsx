// const ProductTags = () => {
//   return (
//     <section className="bg-white p-6 rounded-xl shadow-sm">
//       <h2 className="font-semibold text-xl mb-4">
//         Tags
//       </h2>

//       <input
//         placeholder="Enter tags"
//         className="w-full border rounded-lg p-3"
//       />
//     </section>
//   );
// };

// export default ProductTags;

import React, { useState, useRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Film, Trash2, Play, Pause } from 'lucide-react';

interface IFormInput {
  productVideo: File | null;
}

export default function VideoPreviewUploader(): React.JSX.Element {
  const { setValue, handleSubmit } = useForm<IFormInput>({
    defaultValues: { productVideo: null }
  });

  // Track the string blob URL for the player playback src
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // Create a ref for controlling the video element directly (Play/Pause hooks)
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  // 1. Extract the file and generate the local preview stream
  const handleVideoExtraction = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    
    if (!fileList || fileList.length === 0) return;

    const selectedFile = fileList[0];

    // Security check: Verify it's actually a video file type
    if (!selectedFile.type.startsWith('video/')) {
      alert("Please upload a valid video file (MP4, MOV, etc.)");
      return;
    }

    // Pass the raw file object directly into react-hook-form state
    setValue('productVideo', selectedFile, { shouldValidate: true });

    // Revoke previous blob strings to prevent memory leaks in the browser session
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }

    // Magic Sauce: Turn the local file binary into an instant playable stream URL
    const generatedStreamUrl = URL.createObjectURL(selectedFile);
    setVideoPreviewUrl(generatedStreamUrl);
    setIsPlaying(false); // Reset play state button for new video
  };

  // 2. Clear the video player and purge form state
  const removeVideoFile = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoPreviewUrl(null);
    setValue('productVideo', null);
    setIsPlaying(false);
  };

  // 3. Optional: Custom toggle button overlay action
  const togglePlayState = () => {
    if (!videoPlayerRef.current) return;

    if (isPlaying) {
      videoPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      videoPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const onFormSubmit = (data: IFormInput) => {
    console.log("Form Raw Video File Payload ready to pack into FormData:", data.productVideo);
    // Build your FormData payload here to post straight down to Multer
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <label className="block text-sm font-bold text-gray-800 mb-3">
        Product Demonstration Video
      </label>

      {/* Conditionally swap the upload zone out with the real-time player screen */}
      {!videoPreviewUrl ? (
        /* Dropzone Upload Trigger Layout */
        <div className="relative border-2 border-dashed border-gray-300 hover:border-blue-800 bg-gray-50/50 rounded-xl p-8 text-center transition-all duration-200 cursor-pointer group">
          <input
            type="file"
            accept="video/*"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
            onChange={handleVideoExtraction}
          />
          <div className="flex flex-col items-center justify-center space-y-2 relative z-10">
            <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 text-gray-400 group-hover:text-blue-800 transition-all duration-200">
              <Film size={24} />
            </div>
            <p className="text-sm font-semibold text-gray-700">Click to upload product video</p>
            <p className="text-xs text-gray-400 font-medium">Supports MP4, MOV, WebM up to 50MB</p>
          </div>
        </div>
      ) : (
        /* Video Player Preview Layout Dashboard */
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-black aspect-video group shadow-md border border-gray-900">
            
            {/* HTML5 Native Video Element */}
            <video
              ref={videoPlayerRef}
              src={videoPreviewUrl}
              className="w-full h-full object-contain mx-auto"
              onEnded={() => setIsPlaying(false)}
              playsInline
              controls // Keep default bar or build custom overlay controls using the ref status hooks
            />

            {/* Custom Overlay Control Button Block */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={togglePlayState}
                className="pointer-events-auto p-4 bg-white/90 text-slate-900 rounded-full hover:scale-110 active:scale-95 shadow-lg transition-all duration-150"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Action Row - Meta details and clear triggers */}
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

      <button
        onClick={handleSubmit(onFormSubmit)}
        className="mt-5 w-full bg-blue-800 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl transition shadow-sm"
      >
        Verify Payload File
      </button>
    </div>
  );
}