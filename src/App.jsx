import React from "react";
import "animate.css";
import { Download, Trash2, Upload } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useStore } from "./zustand/useStore";

const FIVE_MB = 5 * 1024 * 1024;
const App = () => {
  const { images, setImage, deleteImage } = useStore();

  const chooseFile = (e) => {
    const input = e.target;
    const file = input.files[0];
    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image file", {
        position: "top-center",
      });
    if (file.size > FIVE_MB)
      return toast.error("File size should be less than 5MB", {
        position: "top-center",
      });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImage({
        id: Date.now(),
        name: file.name,
        size: file.size,
        binary: fileReader.result,
        uploadedAt: new Date().toLocaleString(),
      });
      toast.success("Image uploaded successfully", { position: "top-center" });
    };
  };

  const downloadImage = (item) => {
    const a = document.createElement("a");
    a.href = item.binary;
    a.download = item.name;
    a.click();
    toast.success("Download started", { position: "top-center" });
    a.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#203a43] px-4 flex justify-center">
      <div className="lg:w-9/12 w-full py-10 space-y-10">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-xl tracking-wide">
          ✨ Image Storage Gallery
        </h1>

        {/* Upload Section */}
        <button className="relative cursor-pointer hover:scale-105 transition-transform duration-300 w-full md:w-8/12 mx-auto border-2 border-dashed border-white/40 flex flex-col items-center gap-3 text-white py-12 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md">
          <Upload className="w-16 h-16 text-white animate-bounce" />
          <h1 className="text-lg md:text-xl font-medium">
            Click here to upload an image
          </h1>
          <input
            className="absolute top-0 left-0 opacity-0 w-full h-full rounded-3xl cursor-pointer"
            type="file"
            onChange={chooseFile}
          />
        </button>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white/10 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-white/20"
            >
              <img
                src={item.binary}
                className="w-full h-[200px] object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-4 text-white">
                <h1 className="font-semibold truncate">{item.name}</h1>
                <p className="text-sm text-gray-300">
                  {(item.size / 1024 / 1024).toFixed(1)} Mb
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => downloadImage(item)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteImage(item.id)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
