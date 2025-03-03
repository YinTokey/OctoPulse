import { TrendData } from '@/types/github';

export function generateQuickChartUrl(trendData: TrendData, width = 500, height = 300): string {
    const chartConfig = {
        type: 'line',
        data: {
            labels: trendData.labels,
            datasets: [
                {
                    label: 'Stars',
                    data: trendData.data,
                    borderColor: trendData.color,
                    backgroundColor: trendData.color,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        },
    };

    const encodedConfig = encodeURIComponent(JSON.stringify(chartConfig));
    return `https://quickchart.io/chart?c=${encodedConfig}&w=${width}&h=${height}`;
}