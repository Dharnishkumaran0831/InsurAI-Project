/**
 * Premium Discount and Incentive Calculation Engine
 */

export interface DiscountBreakdown {
  originalPremium: number;
  discountPercentage: number;
  discountAmount: number;
  finalPremium: number;
  appliedIncentives: string[];
}

/**
 * Calculates premium discounts based on policyholder safety records and health compliance.
 */
export function calculatePremiumDiscount(
  basePremium: number,
  yearsWithoutClaims: number,
  healthCheckupCompleted: boolean,
  isNonSmoker: boolean
): DiscountBreakdown {
  let discountPercentage = 0;
  const appliedIncentives: string[] = [];

  // No-claim bonus: 5% per claim-free year up to 25%
  if (yearsWithoutClaims > 0) {
    const claimFreeBonus = Math.min(yearsWithoutClaims * 5, 25);
    discountPercentage += claimFreeBonus;
    appliedIncentives.push(`No-Claim Bonus (${yearsWithoutClaims} years): -${claimFreeBonus}%`);
  }

  // Annual wellness incentive
  if (healthCheckupCompleted) {
    discountPercentage += 10;
    appliedIncentives.push('Annual Wellness Compliance: -10%');
  }

  // Non-smoker discount
  if (isNonSmoker) {
    discountPercentage += 5;
    appliedIncentives.push('Non-Smoker Preferred Rate: -5%');
  }

  // Cap total discount at 40%
  const finalDiscountPct = Math.min(discountPercentage, 40);
  const discountAmount = Math.round((basePremium * finalDiscountPct) / 100);
  const finalPremium = Math.max(basePremium - discountAmount, 0);

  return {
    originalPremium: basePremium,
    discountPercentage: finalDiscountPct,
    discountAmount,
    finalPremium,
    appliedIncentives,
  };
}
