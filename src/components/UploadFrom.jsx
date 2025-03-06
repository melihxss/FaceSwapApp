import { useState } from "react";
import { ClockLoader } from "react-spinners";
import ImageInput from "./ImageInput";
import axios from "axios";
import questionMark from "../image/questionMark.png";
import "./uploadFormCss.css"

const UploadFrom = () => {
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [targetFile, setTargetFile] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);

  const handleUpload = async () => {
    if (!targetFile || !sourceFile) {
      alert("Lütfen iki dosya da seçin!");
      return;
    }

    setIsLoading(true); 

    const formData = new FormData();
    formData.append("targetUrl", targetFile);
    formData.append("sourceUrl", sourceFile);

    try {
      const res = await axios.post(
        "https://faceappbackend-osvp.onrender.com/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResultImage(res.data.result);
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-gray-400 p-6 mt-14 overflow-x-hidden">
      <h2 className="text-2xl font-bold text-white mb-4">Resim Yükle</h2>

      <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center w-full justify-center">
        {/* Target File */}
        <ImageInput file={targetFile} setFile={setTargetFile} inputId="targetFileInput" label="Hedef" />

        {/* Orta SVG */}
        <svg
          className="w-16 h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="url(#gradient)"
        >
          <defs>
            <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#233434" />
              <stop offset="100%" stopColor="#d1dddd" />
            </linearGradient>
          </defs>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        {/* Source File */}
        <ImageInput file={sourceFile} setFile={setSourceFile} inputId="sourceFileInput" label="Kaynak" />

        {isLoading ? (
          <ClockLoader />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="url(#reverseGradient)"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="url(#reverseGradient)"
            className="w-16 h-16"
          >
            <defs>
              <linearGradient id="reverseGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d1dddd" />
                <stop offset="100%" stopColor="#233434" />
              </linearGradient>
            </defs>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.499 8.248h15m-15 7.501h15" />
          </svg>
        )}

        {/* Sonuç Resmi */}
        <div className="relative w-72 h-80 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-4">
          {resultImage ? (
            <img src={resultImage} alt="Sonuç" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <img className="w-full h-full object-cover" src={questionMark} alt="Boş" />
          )}
        </div>
      </div>
      {resultImage && (
  <button
    onClick={() => {
      const a = document.createElement("a");
      a.href = resultImage;
      a.download = "downloaded-image.png"; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }}
    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    İndir
  </button>
)}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={isLoading}
        className={`px-6 py-2 rounded-lg shadow-md transition cursor-pointer mt-3.5 ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isLoading ? "Yükleniyor..." : "Yükle"}
      </button>
    </div>
  );
};

export default UploadFrom;
