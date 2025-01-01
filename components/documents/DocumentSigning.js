import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SignatureCanvas from 'react-signature-canvas';
import { Card } from '@/components/ui/card';
import { Pen, Download, Trash2, Check, RefreshCw } from 'lucide-react';

export default function DocumentSigning({ document }) {
  const [signatures, setSignatures] = useState([]);
  const [currentField, setCurrentField] = useState(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const sigPadRef = useRef();

  const handleSignatureComplete = () => {
    if (sigPadRef.current.isEmpty()) return;

    const signature = {
      id: Date.now(),
      field: currentField,
      image: sigPadRef.current.toDataURL(),
      timestamp: new Date().toISOString()
    };

    setSignatures([...signatures, signature]);
    setShowSignaturePad(false);
    setCurrentField(null);
    sigPadRef.current.clear();
  };

  const clearSignature = (signatureId) => {
    setSignatures(signatures.filter(sig => sig.id !== signatureId));
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/documents/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: document.id,
          signatures
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${document.name}_signed.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download signed document:', error);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{document.name}</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleDownload}
            disabled={signatures.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Download className="h-5 w-5" />
            <span>Download Signed</span>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Document Preview */}
        <div className="border rounded-lg p-4 min-h-[600px] relative">
          {/* Document content */}
          <iframe 
            src={`/api/documents/${document.id}/preview`}
            className="w-full h-full border-none"
            title="Document Preview"
          />

          {/* Signature Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {signatures.map((sig) => (
              <div
                key={sig.id}
                className="absolute"
                style={{
                  top: sig.field.top,
                  left: sig.field.left,
                  width: sig.field.width,
                  height: sig.field.height
                }}
              >
                <img
                  src={sig.image}
                  alt="Signature"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => clearSignature(sig.id)}
                  className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-lg text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Signature Fields */}
          {document.signatureFields.map((field) => {
            const isSigned = signatures.some(sig => sig.field.id === field.id);
            
            return (
              <button
                key={field.id}
                onClick={() => {
                  setCurrentField(field);
                  setShowSignaturePad(true);
                }}
                disabled={isSigned}
                className={`
                  absolute border-2 rounded p-2
                  ${isSigned
                    ? 'border-green-500 bg-green-50 cursor-default'
                    : 'border-blue-500 bg-blue-50 cursor-pointer hover:bg-blue-100'
                  }
                `}
                style={{
                  top: field.top,
                  left: field.left,
                  width: field.width,
                  height: field.height
                }}
              >
                {isSigned ? (
                  <Check className="h-6 w-6 text-green-500" />
                ) : (
                  <Pen className="h-6 w-6 text-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Signature Pad Modal */}
      {showSignaturePad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-[600px]"
          >
            <h3 className="text-lg font-semibold mb-4">Add Your Signature</h3>
            
            <div className="border rounded-lg bg-gray-50 mb-4">
              <SignatureCanvas
                ref={sigPadRef}
                penColor="black"
                canvasProps={{
                  className: 'w-full h-48'
                }}
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => sigPadRef.current.clear()}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Clear</span>
              </button>

              <div className="space-x-4">
                <button
                  onClick={() => setShowSignaturePad(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignatureComplete}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Signature
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Card>
  );
}
