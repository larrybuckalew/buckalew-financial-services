import { useState } from 'react';
import { Card } from '@/components/ui/card';

export default function DocumentCenter() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Investment Policy Statement', type: 'pdf', date: '2024-01-15' },
    { id: 2, name: 'Quarterly Performance Report', type: 'pdf', date: '2024-01-01' },
    { id: 3, name: 'Tax Documents', type: 'pdf', date: '2024-01-10' }
  ]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const newDoc = await response.json();
        setDocuments([...documents, newDoc]);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Document Center</h2>
      
      <div className="mb-6">
        <input
          type="file"
          onChange={handleUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        >
          Upload Document
        </label>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium">{doc.name}</h3>
              <p className="text-sm text-gray-500">Uploaded: {doc.date}</p>
            </div>
            <button
              onClick={() => window.open(`/api/documents/${doc.id}`)}  
              className="text-blue-500 hover:text-blue-600"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
