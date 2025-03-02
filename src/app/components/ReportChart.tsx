'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export type TrendData = {
    labels: string[];
    data: number[];
    color: string;
};

type RepoChartProps = {
    trendData: TrendData;
};

export default function RepoChart({ trendData }: RepoChartProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: trendData.labels,
                    datasets: [
                        {
                            label: 'Stars',
                            data: trendData.data,
                            borderColor: trendData.color,
                            backgroundColor: trendData.color.replace('1)', '0.2)'),
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: false },
                    },
                    plugins: {
                        legend: { display: false },
                    },
                },
            });
        }
    }, [trendData]);

    return <canvas ref={chartRef} className="rounded shadow" />;
}