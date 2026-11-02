/**
 * InsurAI Claims Analytics and Telemetry Data Models
 */

export interface MetricSummary {
  totalPolicies: number;
  activeClaims: number;
  approvedClaims: number;
  rejectedClaims: number;
  totalCoverageDisbursed: number;
  claimSettlementRatio: number; // percentage (e.g. 98.4)
}

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
}

export interface MonthlyClaimTrend {
  month: string;
  submitted: number;
  approved: number;
  amountDisbursed: number;
}
