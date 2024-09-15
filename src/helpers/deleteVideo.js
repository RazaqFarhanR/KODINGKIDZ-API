const cloudinary = require('cloudinary').v2;

const deleteVideoFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video'
    });
    console.log('video deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

module.exports = { deleteVideoFromCloudinary };
