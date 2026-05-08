import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },

    fileFilter: (req, file, cb) => {
        const allowed = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
        ];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid image type. Only JPEG, PNG, WebP, GIF, and SVG are allowed"), false);
        }
    },
});

// Multer error handler middleware
export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size exceeds 5MB limit' });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ message: 'Too many files' });
        }
    }
    if (err) {
        return res.status(400).json({ message: err.message || 'Upload error' });
    }
    next();
};