import { RiskAnalysisResult } from '../types/policy';

/**
 * Calculates policy risk score and category based on user profile and coverage parameters.
 */
export function calculateRiskScore(
  age: number,
  preExistingConditions: boolean,
  claimHistoryCount: number,
  coverageAmount: number
): RiskAnalysisResult {
  let score = 20; // Base risk score

  if (age > 50) score += 25;
  else if (age > 35) score += 15;

  if (preExistingConditions) score += 30;

  score += Math.min(claimHistoryCount * 10, 25);

  if (coverageAmount > 1000000) score += 10;

  const finalScore = Math.min(Math.max(score, 0), 100);

  let category: 'Low Risk' | 'Moderate Risk' | 'High Risk' = 'Low Risk';
  const recommendations: string[] = [];

  if (finalScore >= 70) {
    category = 'High Risk';
    recommendations.push('Consider add-on rider policies for chronic condition coverage');
    recommendations.push('Review deductible amounts to optimize annual premium costs');
  } else if (finalScore >= 40) {
    category = 'Moderate Risk';
    recommendations.push('Maintain regular wellness checkups to qualify for premium discounts');
  } else {
    category = 'Low Risk';
    recommendations.push('Eligible for preferred tier policy rates and zero deductible options');
  }

  return {
    riskScore: finalScore,
    riskCategory: category,
    recommendations,
  };
}
