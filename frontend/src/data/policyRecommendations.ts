import { InsurancePolicy } from '../types/policy';

export const FEATURED_POLICIES: InsurancePolicy[] = [
  {
    policyId: 'pol-101',
    title: 'Comprehensive Health Shield Plus',
    provider: 'Star Care Insurance',
    category: 'Health',
    coverageAmount: 500000,
    monthlyPremium: 1200,
    deductible: 5000,
    keyBenefits: [
      'Zero co-payment for emergency hospitalization',
      'Annual free health checkup',
      'Cashless treatment across 10,000+ network hospitals',
    ],
    complianceScore: 98,
  },
  {
    policyId: 'pol-102',
    title: 'Corporate Employee Wellness Plan',
    provider: 'MaxLife Enterprise',
    category: 'Corporate',
    coverageAmount: 1000000,
    monthlyPremium: 2500,
    deductible: 0,
    keyBenefits: [
      'Maternity and dental coverage included',
      'Mental health counseling allowance',
      'Dependent spouse and child coverage',
    ],
    complianceScore: 95,
  },
  {
    policyId: 'pol-103',
    title: 'Smart Vehicle Protection Cover',
    provider: 'HDFC Ergo Drive',
    category: 'Vehicle',
    coverageAmount: 800000,
    monthlyPremium: 850,
    deductible: 2000,
    keyBenefits: [
      '24x7 roadside assistance',
      'Engine protection and zero depreciation cover',
    ],
    complianceScore: 92,
  },
];
