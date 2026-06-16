import { CldUploadWidget } from "next-cloudinary";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fitgpt_preset");
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
