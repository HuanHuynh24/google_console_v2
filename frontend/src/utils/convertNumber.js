// 1. Hàm format số lượng (clicks, impressions)
export function formatNumber(num) {
  if (num >= 1_000_000) {
    return (
      parseFloat((num / 1_000_000).toFixed(2))
        .toString()
        .replace(".", ",") + " Tr"
    ); // Triệu
  }
  if (num >= 1_000) {
    return (
      parseFloat((num / 1_000).toFixed(2))
        .toString()
        .replace(".", ",") + " N"
    ); // Nghìn
  }
  return num.toString().replace(".", ",");
}

// 2. Hàm format phần trăm (CTR)
export function formatPercent(value) {
  return value.toString().replace(".", ",") ; // 1 chữ số thập phân
}

// 3. Hàm format số thập phân (position)
export function formatDecimal(value, digits = 1) {
  console.log("thập phân ", value);
  return value.toFixed(digits);
}

// 4. Hàm tổng hợp format toàn bộ stats
export function formatStats(stats) {
  return {
    clicks: formatNumber(stats.clicks), // VD: 18 → "18"
    impressions: formatNumber(stats.impressions), // VD: 2850 → "2.85 N"
    ctr: formatPercent(stats.ctr), // VD: 0.006 → "0.6%"
    position: formatPercent(stats.position), // VD: 30.333 → "30.3"
  };
}
