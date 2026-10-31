import axios from "axios";

  
const handleMultipleSecureUploads = async (fileList=[]) => {
  try {
    // 1. Get ONE signature from Express to use for this entire batch
    const { data: keys } = await axios.get('/api/get-upload-signature');

    // 2. Map every file into an upload promise array
    const uploadPromises = Array.from(fileList).map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', keys.apiKey);
      formData.append('timestamp', keys.timestamp);
      formData.append('signature', keys.signature);
      formData.append('folder', 'user_uploads'); // All files save to this folder

      // Fire upload directly to Cloudinary
      const response = await axios.post(
        `https://cloudinary.com${keys.cloudName}/image/upload`,
        formData
      );

      // Return just the secure URL (or the whole object if you need public_ids)
      return response.data.secure_url;
    });

    // 3. Execute all uploads concurrently (fires them all off at once)
    const uploadedUrls = await Promise.all(uploadPromises);

    // 4. Save the array of URLs into MongoDB in a single request
    await axios.post('/api/save-gallery', { urls: uploadedUrls });

    alert('All files uploaded successfully!');
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
