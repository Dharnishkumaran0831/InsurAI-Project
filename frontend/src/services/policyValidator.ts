/**
 * Policy Data & Format Validation Helper Utility
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates insurance policy claim form inputs before database submission.
 */
export function validateClaimForm(
  policyId: string,
  claimAmount: number,
  description: string
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!policyId || policyId.trim() === '') {
    errors.policyId = 'Policy ID is required';
  }

  if (isNaN(claimAmount) || claimAmount <= 0) {
    errors.claimAmount = 'Claim amount must be a positive number';
  }

  if (!description || description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
