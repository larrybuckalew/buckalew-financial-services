import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, File, CheckCircle } from 'lucide-react';

export default function DocumentUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      status: 'pending'
    }))]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10485760 // 10MB
  });

  const uploadFiles = async () => {
    setUploading(true);
    
    for (const fileObj of files) {
      if (fileObj.status !== 'pending') continue;

      const formData = new FormData();
      formData.append('file', fileObj.file);
      formData.append('type', 'document');

      try {
        const response = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          setFiles(prevFiles =>
            prevFiles.map(f =>
              f.id === fileObj.id ? { ...f, status: 'complete' } : f
            )
          );
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.id === fileObj.id ? { ...f, status: 'error' } : f
          )
        );
      }
    }

    setUploading(false);
  };

  const removeFile = (fileId) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-600">
          {isDragActive
            ? 'Drop your files here...'
            : 'Drag and drop files here, or click to select files'
          }
        </p>
        <p className="text-sm text-gray-500 mt-1">
          PDF, DOC, DOCX, PNG, or JPG up to 10MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((fileObj) => (
            <div
              key={fileObj.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center space-x-4">
                <File className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium">{fileObj.file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {fileObj.status === 'complete' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {fileObj.status === 'error' && (
                  <span className="text-red-500 text-sm">Upload failed</span>
                )}
                <button
                  onClick={() => removeFile(fileObj.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={uploadFiles}
              disabled={uploading || !files.some(f => f.status === 'pending')}
              className="
                px-4 py-2 bg-blue-600 text-white rounded-md
                hover:bg-blue-700 disabled:opacity-50
                flex items-center space-x-2
              "
            >
              <Upload className="h-4 w-4" />
              <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
