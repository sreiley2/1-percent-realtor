export const LISTING_COMMISSION_RATE = 0.01;
export const DEFAULT_HOME_VALUE = 2_500_000;
export const DEFAULT_TRADITIONAL_RATE = 2.5;
export const MIN_HOME_VALUE = 400_000;
export const MAX_HOME_VALUE = 10_000_000;
export const HOME_VALUE_STEP = 25_000;
export const MIN_TRADITIONAL_RATE = 1.5;
export const MAX_TRADITIONAL_RATE = 3.5;
export const TRADITIONAL_RATE_STEP = 0.1;

export type CommissionBreakdown = {
  homeValue: number;
  traditionalRate: number;
  traditionalCommission: number;
  listingCommission: number;
  estimatedSavings: number;
};

export function calculateCommission(
  homeValue: number,
  traditionalRatePercent: number
): CommissionBreakdown {
  const value = Number.isFinite(homeValue) ? Math.max(0, homeValue) : 0;
  const rate = Number.isFinite(traditionalRatePercent)
    ? Math.max(0, traditionalRatePercent)
    : 0;

  const traditionalCommission = value * (rate / 100);
  const listingCommission = value * LISTING_COMMISSION_RATE;
  const estimatedSavings = traditionalCommission - listingCommission;

  return {
    homeValue: value,
    traditionalRate: rate,
    traditionalCommission,
    listingCommission,
    estimatedSavings,
  };
}
