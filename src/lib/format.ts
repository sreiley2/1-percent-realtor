const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(Math.round(value));
}

export function formatCompactCurrency(value: number) {
  return compactCurrencyFormatter.format(value);
}

export function formatPercent(value: number) {
  return `${value.toFixed(1).replace(/\.0$/, "")}%`;
}

export function parseCurrencyInput(raw: string) {
  const numeric = raw.replace(/[^\d.]/g, "");
  if (!numeric) return 0;
  return Number(numeric);
}
