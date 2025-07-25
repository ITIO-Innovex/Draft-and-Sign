import React from 'react';
import { WelcomeSection } from '../components/dashboard/WelcomeSection';
import { StatsCards } from '../components/dashboard/StatsCards';
import { GetStartedSection } from '../components/dashboard/GetStartedSection';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <WelcomeSection />
      <StatsCards />
      <GetStartedSection />
    </div>
  );
};