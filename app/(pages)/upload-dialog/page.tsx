"use client";

import { useState } from "react";
import UploadMediaDialog from "@/components/dialogs/UploadMediaDialog";
import { Button } from "@/components/ui/button";
import type { CloudinaryUploadResult } from "@/lib/api/cloudinary";

export default function TestPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<CloudinaryUploadResult | null>(null);

  const handleUploadSuccess = (result: CloudinaryUploadResult) => {
    console.log("File uploaded successfully:", result);
    setUploadedFile(result);
    // TODO: Send result.public_id to your workflow execution API
    // The public_id is what you'll use as the upload media params
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Media Node Test
        </h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          Open Upload Dialog
        </Button>
      </div>

      {uploadedFile && (
        <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Last Upload Result:</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Public ID:</strong> {uploadedFile.public_id}</p>
            <p><strong>URL:</strong> <a href={uploadedFile.secure_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{uploadedFile.secure_url}</a></p>
            <p><strong>Type:</strong> {uploadedFile.resource_type}</p>
            <p><strong>Format:</strong> {uploadedFile.format}</p>
            <p><strong>Size:</strong> {(uploadedFile.bytes / 1024).toFixed(2)} KB</p>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-xs text-gray-600 mb-2">Use this for workflow execution:</p>
            <code className="text-xs bg-white p-2 rounded block overflow-x-auto">
              {JSON.stringify({ media_id: uploadedFile.public_id }, null, 2)}
            </code>
          </div>
        </div>
      )}

      <UploadMediaDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
