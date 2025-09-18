export function calcTotals(data) {
    const totals = data.reduce(
      (acc, item) => {
        const impressions = Number(item.impressions);
        const clicks = Number(item.clicks);
        const position = Number(item.position);

        acc.impressions += impressions;
        acc.clicks += clicks;
        acc.positions.push(position);

        return acc;
      },
      { impressions: 0, clicks: 0, positions: [] }
    );

    // Tính CTR tổng thể
    const ctr = (totals.clicks * 100) / (totals.impressions || 1);

    // Tính vị trí trung bình
    const avgPosition =
      totals.positions.reduce((a, b) => a + b, 0) / totals.positions.length;

    return {
      impressions: totals.impressions,
      clicks: totals.clicks,
      ctr: ctr.toFixed(2), // % với 2 số thập phân
      position: avgPosition.toFixed(2), // trung bình với 2 số thập phân
    };
  }