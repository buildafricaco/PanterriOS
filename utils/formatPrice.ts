export function formatPrice(amount: number, currency: string = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  }).format(amount);
}
