// Amounts are integer paise in storage and calculations.
export function formatINR(paise: number): string {
  if (!Number.isSafeInteger(paise)) throw new TypeError('Expected integer paise');
  return new Intl.NumberFormat('en-IN', {style:'currency',currency:'INR',minimumFractionDigits:0,maximumFractionDigits:2}).format(paise/100);
}
