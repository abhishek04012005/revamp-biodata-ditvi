import { supabase } from './Supabase';

export const UploadFile = async (file, requestNumber, folderName) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${requestNumber}.${fileExt}`;
    const filePath = `${folderName}/${fileName}`;

    // Upload file to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from(`${folderName}`)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL of the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from(`${folderName}`)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};