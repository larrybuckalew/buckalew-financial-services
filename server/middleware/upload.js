// File Upload Middleware
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set upload directory based on file type
        let uploadDir = 'public/uploads/';
        if (file.mimetype.startsWith('image/')) {
            uploadDir += 'images/';
        } else if (file.mimetype.startsWith('video/')) {
            uploadDir += 'videos/';
        } else {
            uploadDir += 'documents/';
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = crypto.randomBytes(16).toString('hex');
        cb(null, `${Date.now()}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Allowed file types
    const allowedTypes = {
        'image/jpeg': true,
        'image/png': true,
        'image/webp': true,
        'image/gif': true,
        'video/mp4': true,
        'application/pdf': true,
        'application/msword': true,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true
    };

    if (allowedTypes[file.mimetype]) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 5 // Maximum 5 files per upload
    }
});

// Error handler middleware
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File size too large. Maximum size is 5MB.'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                error: 'Too many files. Maximum is 5 files per upload.'
            });
        }
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    next(err);
};

// File processor middleware
const processUploadedFile = async (req, res, next) => {
    if (!req.file && !req.files) {
        return next();
    }

    try {
        const files = req.files || [req.file];
        const processedFiles = [];

        for (const file of files) {
            // Generate file metadata
            const metadata = {
                originalName: file.originalname,
                filename: file.filename,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype,
                dimensions: null,
                hash: null
            };

            // Generate file hash for integrity
            metadata.hash = await generateFileHash(file.path);

            // Get image dimensions if it's an image
            if (file.mimetype.startsWith('image/')) {
                const dimensions = await getImageDimensions(file.path);
                metadata.dimensions = dimensions;
            }

            processedFiles.push(metadata);
        }

        req.processedFiles = processedFiles;
        next();
    } catch (error) {
        next(error);
    }
};

// Helper function to generate file hash
async function generateFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
    });
}

// Helper function to get image dimensions
async function getImageDimensions(filePath) {
    const sharp = require('sharp');
    const metadata = await sharp(filePath).metadata();
    return {
        width: metadata.width,
        height: metadata.height
    };
}

// Export configured middleware
module.exports = {
    single: (fieldName) => [
        upload.single(fieldName),
        handleUploadError,
        processUploadedFile
    ],
    array: (fieldName, maxCount) => [
        upload.array(fieldName, maxCount),
        handleUploadError,
        processUploadedFile
    ],
    fields: (fields) => [
        upload.fields(fields),
        handleUploadError,
        processUploadedFile
    ],
    processUploadedFile,
    handleUploadError
};
