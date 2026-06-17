const ImageUpload = () => {
  return (
    <section className="bg-white  rounded-xl p-8 shadow-sm ">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">
            {/* image */}
          </span>
          <h3 className="font-semibold text-2xl  max-md:texl-lg">Media Gallery</h3>
        </div>
        <span className="text-sm max-md:text-xs text-gray-700 font-medium">
          Recommended: 1200 x 1200px
        </span>
      </div>
      <div
        className="border-2 border-dashed border-gray-400 rounded-xl p-12 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer hover:bg-surface-container-low group"
        id="drop-zone"
      >
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-primary text-3xl">
            {/* cloud_upload */}
          </span>
        </div>
        <p className="font-medium tracking-wider text-lg text-gray-700 mb-1">
          Drag and drop images here
        </p>
        <p className="tracking-wider text-lg  text-gray-700">
          or <span className="text-nav-blue-active font-bold">browse files</span> from
          your computer
        </p>
        <input className="hidden" multiple type="file" />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="aspect-square rounded-lg bg-gray-100 border border-outline-variant flex items-center justify-center relative group overflow-hidden">
          <img
            alt="Product Preview"
            className="w-full h-full object-cover"
            data-alt="A high-end studio product photograph of professional wireless headphones. The headphones feature sleek, matte black finishes with chrome accents, resting on a textured light gray marble surface. The lighting is dramatic yet soft, coming from the side to emphasize the contours and premium materials. The background is a neutral, clean white, aligning with a luxury e-commerce gallery aesthetic."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxqdbAM7J-VZuvAw0lX0sgc4Qc003GVjQEdt48mmyd8212j1asP4SV4T_6xYloDe1do2e3GAC_u2QH5tg10GZQbMFmDtAVc9-DHWAmFc2D1gYTBLhtAIuhKT9uh_T4afdq9DDHRQy1fiOPl2TYtHavs78ggfx4OkCromQsh2fyzysQeichZnieDHHhvii5-JSuEvWLGzYq4VNnV3Bzyy83nkogQ8zhP81HCV8B2CxGcMytXkbTuvist66UM4uHqo6AlzGKJd_cSGI"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              className="p-2 bg-white rounded-full text-error shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        </div>
        <div className="aspect-square rounded-lg bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center text-on-surface-variant/40">
          {/* <span className="material-symbols-outlined">add_photo_alternate</span> */}
        </div>
        <div className="aspect-square rounded-lg bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center text-on-surface-variant/40">
          {/* <span className="material-symbols-outlined">add_photo_alternate</span> */}
        </div>
        <div className="aspect-square rounded-lg bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center text-on-surface-variant/40">
          {/* <span className="material-symbols-outlined">add_photo_alternate</span> */}
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;
