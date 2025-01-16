import React from 'react';
import { Card } from '@/components/ui/card';
import RiskAnalytics from '../visualizations/RiskAnalytics';
import SectorAnalysis from '../visualizations/SectorAnalysis';
import ClientList from './ClientList';
import AlertCenter from './AlertCenter';

export default function AdvisorDashboard() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Top Row - Summary Cards */}
      <div className="col-span-12 grid grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total AUM</h3>
          <p className="text-2xl font-bold">$24.5M</p>
          <span className="text-green-600 text-sm">↑ 2.3%</span>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Active Clients</h3>
          <p className="text-2xl font-bold">127</p>
          <span className="text-blue-600 text-sm">+3 this month</span>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending Actions</h3>
          <p className="text-2xl font-bold">12</p>
          <span className="text-orange-600 text-sm">4 high priority</span>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Compliance Score</h3>
          <p className="text-2xl font-bold">98%</p>
          <span className="text-green-600 text-sm">All checks passed</span>
        </Card>
      </div>

      {/* Main Content */}
      <div className="col-span-8">
        <div className="space-y-6">
          {/* Risk Analytics */}
          <RiskAnalytics data={riskData} />
          
          {/* Sector Analysis */}
          <SectorAnalysis data={sectorData} />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-4 space-y-6">
        {/* Alert Center */}
        <AlertCenter />
        
        {/* Client List */}
        <ClientList />
      </div>
    </div>
  );
}
