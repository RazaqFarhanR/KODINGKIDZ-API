const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'kodingKidz/images',
    allowed_formats: ['jpeg', 'png', 'jpg'], 
  },
});

const fileFilter = (req, file, cb) => {
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"]

    if (allowedFormats.includes(file.mimetype)) {
        cb(null, true)
    } else {
        const res = {
            status: 400,
            description: 'Bad Request',
            result: 'Only JPEG,PNG and JPG are allowed.'
        }

        cb(JSON.stringify(res, null, 2), false)
    }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: fileFilter
});

module.exports = upload;
