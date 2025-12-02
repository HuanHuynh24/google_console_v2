export function calcTotals(data) {
  const totals = data.reduce(
    (acc, item) => {
      const impressions = Number(item.impressions) || 0;
      const clicks = Number(item.clicks) || 0;
      const position = Number(item.position);

      acc.impressions += impressions;
      acc.clicks += clicks;

      // chỉ cộng nếu position là số hợp lệ
      if (!Number.isNaN(position)) {
        acc.weightedPositionSum += position * impressions;
      }

      return acc;
    },
    { impressions: 0, clicks: 0, weightedPositionSum: 0 }
  );

  // CTR tổng
  const ctr =
    totals.impressions > 0
      ? (totals.clicks * 100) / totals.impressions
      : 0;

  // Vị trí trung bình theo chuẩn GSC (weighted by impressions)
  const avgPosition =
    totals.impressions > 0
      ? totals.weightedPositionSum / totals.impressions
      : 0;

  return {
    impressions: totals.impressions,
    clicks: totals.clicks,
    ctr: ctr.toFixed(2),       // %
    position: avgPosition.toFixed(2), // avg position
  };
}
