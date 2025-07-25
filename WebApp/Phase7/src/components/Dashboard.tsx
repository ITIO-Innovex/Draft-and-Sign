import React from 'react';
import { ComplianceScoreCard } from './dashboard/ComplianceScoreCard';
import { RegulatoryOverview } from './dashboard/RegulatoryOverview';
import { RecentAuditActivity } from './dashboard/RecentAuditActivity';
import { RiskAlert } from './dashboard/RiskAlert';
import { ComplianceMetrics } from './dashboard/ComplianceMetrics';
import { UpcomingDeadlines } from './dashboard/UpcomingDeadlines';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor your organization's compliance posture and regulatory requirements</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium text-gray-900">2 minutes ago</p>
        </div>
      </div>

      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ComplianceScoreCard />
        <RiskAlert />
        <UpcomingDeadlines />
      </div>

      {/* Second Row - Regulatory Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RegulatoryOverview />
        <ComplianceMetrics />
      </div>

      {/* Third Row - Recent Activity */}
      <RecentAuditActivity />
    </div>
  );
};