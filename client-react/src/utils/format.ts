export function shortNumber(value: number): string {
  if (value > 1000000) {
    return formatNumber(value / 100000) + 'M';
    // } else if (value > 100000) {
    //   return formatNumber(value / 1000, 'en', '1.1-2') + 'K';
  } else if (value > 10000) {
    return formatNumber(value / 1000) + 'K';
  } else {
    return formatNumber(value);
  }
}

function formatNumber(value: number) {
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
