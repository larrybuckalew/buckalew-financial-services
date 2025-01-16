import React from 'react';
import { Card } from '@/components/ui/card';
import { File, Download, Trash2, Eye } from 'lucide-react';

export default function DocumentList({ documents }) {
  const handleDownload = async (documentId) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = response.headers.get('Content-Disposition')?.split('filename=')[1] || 'document';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  const handleDelete = async (documentId) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh document list
      }
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Documents</h2>
        <div className="flex space-x-2">
          <select
            className="border border-gray-300 rounded-md px-3 py-1"
            defaultValue="all"
          >
            <option value="all">All Documents</option>
            <option value="tax">Tax Documents</option>
            <option value="investment">Investment Reports</option>
            <option value="agreements">Agreements</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <File className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(doc.uploadedAt).toLocaleDateString()} • {doc.fileSize}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.open(`/api/documents/${doc.id}/preview`, '_blank')}
                className="p-2 text-gray-500 hover:text-blue-500"
                title="Preview"
              >
                <Eye className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDownload(doc.id)}
                className="p-2 text-gray-500 hover:text-blue-500"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="p-2 text-gray-500 hover:text-red-500"
                title="Delete"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
