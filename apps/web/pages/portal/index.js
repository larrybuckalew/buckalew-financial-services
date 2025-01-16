import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/card';
import PortfolioSummary from '@/components/portal/PortfolioSummary';
import DocumentCenter from '@/components/portal/DocumentCenter';
import MeetingScheduler from '@/components/portal/MeetingScheduler';

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Client Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-100' : ''}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`w-full text-left px-4 py-2 rounded ${activeTab === 'documents' ? 'bg-blue-100' : ''}`}
              >
                Documents
              </button>
              <button
                onClick={() => setActiveTab('meetings')}
                className={`w-full text-left px-4 py-2 rounded ${activeTab === 'meetings' ? 'bg-blue-100' : ''}`}
              >
                Schedule Meeting
              </button>
            </nav>
          </Card>
        </div>

        <div className="md:col-span-3">
          {activeTab === 'overview' && <PortfolioSummary />}
          {activeTab === 'documents' && <DocumentCenter />}
          {activeTab === 'meetings' && <MeetingScheduler />}
        </div>
      </div>
    </div>
  );
}
