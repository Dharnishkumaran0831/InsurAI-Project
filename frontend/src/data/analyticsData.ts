import { MetricSummary, CategoryDistribution, MonthlyClaimTrend } from '../types/analytics';

export const DEFAULT_METRIC_SUMMARY: MetricSummary = {
  totalPolicies: 1240,
  activeClaims: 48,
  approvedClaims: 1120,
  rejectedClaims: 72,
  totalCoverageDisbursed: 14500000,
  claimSettlementRatio: 98.2,
};

export const POLICY_CATEGORY_DISTRIBUTION: CategoryDistribution[] = [
  { category: 'Health Insurance', count: 620, percentage: 50 },
  { category: 'Corporate Wellness', count: 310, percentage: 25 },
  { category: 'Vehicle Protection', count: 186, percentage: 15 },
  { category: 'Property & Casualty', count: 124, percentage: 10 },
];

export const MONTHLY_CLAIM_TRENDS: MonthlyClaimTrend[] = [
  { month: 'Jun', submitted: 85, approved: 80, amountDisbursed: 1200000 },
  { month: 'Jul', submitted: 92, approved: 88, amountDisbursed: 1450000 },
  { month: 'Aug', submitted: 110, approved: 104, amountDisbursed: 1800000 },
  { month: 'Sep', submitted: 95, approved: 91, amountDisbursed: 1350000 },
  { month: 'Oct', submitted: 105, approved: 101, amountDisbursed: 1650000 },
];
