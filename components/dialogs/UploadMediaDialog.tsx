"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary, type CloudinaryUploadResult } from "@/lib/api/cloudinary";

interface UploadMediaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (result: CloudinaryUploadResult) => void;
}

export default function UploadMediaDialog({ 
  isOpen, 
  onClose,
  onUploadSuccess 
}: UploadMediaDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles(accepted);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadToCloudinary(files[0]);
      console.log("Upload successful:", result);
      
      // Call success callback with the result
      onUploadSuccess?.(result);
      
      // Reset and close
      setFiles([]);
      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-xl p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isUploading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Upload Media
        </h2>

        {/* Dropzone Box */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
            ${isDragActive ? "border-black bg-gray-100" : "border-gray-300 bg-gray-50"}
            ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input {...getInputProps()} disabled={isUploading} />

          <div className="flex flex-col items-center gap-4">
            {/* Upload Icon Circle */}
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
              <Upload className="w-7 h-7 text-gray-600" />
            </div>

            <p className="text-gray-700">
              {isDragActive ? "Drop the file here" : "Drag & drop a file here"}
            </p>

            <Button variant="secondary" className="px-4 py-1" disabled={isUploading}>
              Browse Files
            </Button>

            {files.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Selected: {files[0].name}
              </p>
            )}

            <p className="text-xs text-gray-400 mt-2">
              Supports: Images, PDFs, Word documents, Text files
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Upload Button */}
        <Button
          className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-6 text-lg rounded-xl disabled:opacity-50"
          onClick={handleUpload}
          disabled={isUploading || files.length === 0}
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </span>
          ) : (
            "Upload"
          )}
        </Button>
      </div>
    </div>
  );
}
