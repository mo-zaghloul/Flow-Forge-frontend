// Cloudinary upload utilities
// Make sure to set these environment variables:
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
// NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  bytes: number;
  url: string;
}

/**
 * Upload a file to Cloudinary (unsigned upload)
 * Supports images, PDFs, and documents
 */
export async function uploadToCloudinary(
  file: File
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary configuration missing. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as CloudinaryUploadResult;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * Get the file type based on resource_type
 */
export function getFileType(resourceType: string): 'image' | 'document' | 'video' | 'other' {
  switch (resourceType) {
    case 'image':
      return 'image';
    case 'raw':
      return 'document';
    case 'video':
      return 'video';
    default:
      return 'other';
  }
}
