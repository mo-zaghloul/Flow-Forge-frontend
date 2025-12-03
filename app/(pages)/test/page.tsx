"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles(accepted);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
      {isOpen && (
        <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-xl p-8">

       

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upload Media Node
          </h2>

          {/* Dropzone Box */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
              ${isDragActive ? "border-black bg-gray-100" : "border-gray-300 bg-gray-50"}
            `}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-4">

              {/* Upload Icon Circle */}
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                <Upload className="w-7 h-7 text-gray-600" />
              </div>

              <p className="text-gray-700">
                {isDragActive ? "Drop the file here" : "Drag & drop a file here"}
              </p>

              <Button variant="secondary" className="px-4 py-1">
                Browse Files
              </Button>

              {files.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {files[0].name}
                </p>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <Button
            className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-6 text-lg rounded-xl"
            onClick={() => console.log("Uploading...", files)}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
