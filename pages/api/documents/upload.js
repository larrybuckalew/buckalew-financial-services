import { authenticate } from '@/lib/auth';
import { uploadToS3 } from '@/lib/s3';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default authenticate(async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const file = req.files?.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadToS3(file);

    await prisma.document.create({
      data: {
        name: file.name,
        url: result.Location,
        userId: req.user.id,
        type: file.mimetype
      }
    });

    res.status(200).json({
      id: result.Key,
      name: file.name,
      type: file.mimetype,
      date: new Date().toISOString()
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});
