/**
 * InsurAI Policy Analysis and Claim Data Models
 */

export type PolicyCategory = 'Health' | 'Life' | 'Property' | 'Vehicle' | 'Corporate';

export interface InsurancePolicy {
  policyId: string;
  title: string;
  provider: string;
  category: PolicyCategory;
  coverageAmount: number;
  monthlyPremium: number;
  deductible: number;
  keyBenefits: string[];
  complianceScore: number; // 0 to 100
}

export interface PolicyClaim {
  claimId: string;
  policyId: string;
  userEmail: string;
  claimAmount: number;
  incidentDate: string;
  status: 'Pending' | 'Approved' | 'Under Review' | 'Rejected';
  description: string;
}

export interface RiskAnalysisResult {
  riskScore: number; // 0 to 100
  riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  recommendations: string[];
}
