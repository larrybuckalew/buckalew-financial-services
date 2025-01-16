import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ReportGenerator } from '@/lib/reporting/reportGenerator';
import { PermissionManager, Permission } from '@/lib/auth/permissionManager';
import { useSession } from 'next-auth/react';

const UserGrowthChart = dynamic(() => import('@/components/charts/UserGrowthChart'), { ssr: false });

const AdminReportsPage: React.FC = () => {
  const { data: session } = useSession();
  const [userGrowthReport, setUserGrowthReport] = useState<any>(null);
  const [financialOverview, setFinancialOverview] = useState<any>(null);
  const [securityAudit, setSecurityAudit] = useState<any>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!session || !PermissionManager.hasPermission(session.user.role, Permission.REPORT_VIEW)) {
        return;
      }

      try {
        const [growthData, financialData, securityData] = await Promise.all([
          ReportGenerator.getUserGrowthReport(),
          ReportGenerator.getFinancialOverview(),
          ReportGenerator.generateSecurityAuditReport()
        ]);

        setUserGrowthReport(growthData);
        setFinancialOverview(financialData);
        setSecurityAudit(securityData);
      } catch (error) {
        console.error('Failed to fetch reports', error);
      }
    };

    fetchReports();
  }, [session]);

  if (!session || !PermissionManager.hasPermission(session.user.role, Permission.REPORT_VIEW)) {
    return <div>Unauthorized Access</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Head>
        <title>Reports - Admin Dashboard</title>
      </Head>

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-brand-blue mb-8">
          Administrative Reports
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Growth Report */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-brand-blue mb-4">
              User Growth
            </h2>
            {userGrowthReport && (
              <>
                <p>Total New Users: {userGrowthReport.total}</p>
                <UserGrowthChart data={userGrowthReport.growth} />
              </>
            )}
          </div>

          {/* Financial Overview */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-brand-blue mb-4">
              Financial Overview
            </h2>
            {financialOverview && (
              <div>
                <p>Total Users: {financialOverview.totalUsers}</p>
                <p>Users by Role: {JSON.stringify(financialOverview.usersByRole)}</p>
              </div>
            )}
          </div>

          {/* Security Audit */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-brand-blue mb-4">
              Security Audit
            </h2>
            {securityAudit && (
              <div>
                <p>Recent Logins: {securityAudit.recentLogins.length}</p>
                <p>Suspicious Activities: {securityAudit.suspiciousActivities.length}</p>
                <p>Incomplete Profiles: {securityAudit.incompleteProfiles.length}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;