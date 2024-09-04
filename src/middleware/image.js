const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diizinkan!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter,
});

const compressImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uploadsDir = path.join(__dirname, '..',  'image', 'profile');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `image-${Date.now()}.jpeg`;
    const outputPath = path.join(uploadsDir, fileName);

    let quality = 80;
    let buffer = req.file.buffer;
    let compressedBuffer;
    let fileSize;

    do {
      compressedBuffer = await sharp(buffer)
        .resize(800, 800, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFormat('jpeg')
        .jpeg({ quality: quality })
        .toBuffer();

      fileSize = Buffer.byteLength(compressedBuffer);
      quality -= 10;
    } while (fileSize > 2 * 1024 * 1024 && quality > 10);

    await sharp(compressedBuffer).toFile(outputPath);

    req.file.path = outputPath;
    req.file.filename = fileName;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, compressImage };
