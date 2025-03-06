import React, { useEffect, useState } from "react";

const ImageInput = ({ file, setFile, inputId, label }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    console.log(objectUrl)
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  return (
    <div
      className="w-72 h-80 flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer mb-4 "
    >
      <input
        type="file"
        className="hidden"
        id={inputId}
        onChange={handleFileSelect}
      />
      <label
        htmlFor={inputId}
        className="text-gray-600 cursor-pointer w-full h-full flex justify-center items-center relative"
      >
        {preview ? (
          <img
            src={preview}
            alt={`${label} preview`}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-center">{`${label} Dosyanızı Sürükleyin`}</span>
        )}
      </label>
    </div>
  );
};

export default ImageInput;
