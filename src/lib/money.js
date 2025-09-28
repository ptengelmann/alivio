// /lib/money.js - Currency formatting helper for UK market

export const formatMoney = (amount, currency = 'GBP', locale = 'en-GB') => {
  return new Intl.NumberFormat(locale, { 
    style: 'currency', 
    currency 
  }).format(Number(amount || 0));
};

// Helper for price ranges
export const formatPriceRange = (minPrice, maxPrice, currency = 'GBP', locale = 'en-GB') => {
  const min = formatMoney(minPrice, currency, locale);
  const max = formatMoney(maxPrice, currency, locale);
  
  if (minPrice === maxPrice) {
    return min;
  }
  
  return `${min} - ${max}`;
};

// Helper for percentage discounts
export const formatDiscount = (originalPrice, salePrice, currency = 'GBP', locale = 'en-GB') => {
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return {
    percentage: Math.round(discount),
    original: formatMoney(originalPrice, currency, locale),
    sale: formatMoney(salePrice, currency, locale),
    saved: formatMoney(originalPrice - salePrice, currency, locale)
  };
};