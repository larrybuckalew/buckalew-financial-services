import DashboardLayout from '@/components/layouts/DashboardLayout';
import PerformanceOverview from '@/components/dashboard/PerformanceOverview';
import AssetAllocation from '@/components/dashboard/AssetAllocation';
import GoalProgress from '@/components/dashboard/GoalProgress';

export default function Dashboard() {
  const performanceData = [
    { date: '2024-01', value: 100000 },
    { date: '2024-02', value: 105000 },
    { date: '2024-03', value: 108000 },
    // Add more data points
  ];

  const allocationData = [
    { name: 'Stocks', value: 60 },
    { name: 'Bonds', value: 30 },
    { name: 'Cash', value: 10 }
  ];

  const goals = [
    {
      name: 'Retirement',
      current: 500000,
      target: 2000000,
      targetDate: '2045'
    },
    {
      name: 'College Fund',
      current: 50000,
      target: 200000,
      targetDate: '2035'
    }
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <PerformanceOverview data={performanceData} />
        </div>
        <AssetAllocation data={allocationData} />
        <GoalProgress goals={goals} />
      </div>
    </DashboardLayout>
  );
}
