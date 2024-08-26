import React from 'react';
import { useParams } from 'react-router-dom';
import BarChart from '../../components/BarChart/BarChart';
import { ChartData } from 'chart.js';
import useGetData from '../../hooks/useGetData';
import ChartSkeleton from '../../components/BarChart/BarChartSkeleton';
import { experimentalMethodChartOptions } from '../../config/chartConfigs';

const Growth: React.FC = () => {
    const { plotname } = useParams<{ plotname: string }>();
    const key = plotname || 'defaultKey';
    const isOverallPlot = plotname === 'overall-structures' || plotname === 'overall-small-molecules';

    const { data, isLoading, error } = useGetData(key, 'specificParameter');

    if (isLoading) {
        return <ChartSkeleton />;
    }

    if (error) return <div>Error loading data: {error.message}</div>;

    const chartData: ChartData<'bar'> | null = data && data.length > 0 ? {
        labels: data[0].map((item: any) => item.label),
        datasets: data.map((dataset: any[], index: number) => {
            const datasetMap: Record<string, number> = {};
            dataset.forEach(item => {
                datasetMap[item.label] = item.population;
            });



            const datasetLabel = isOverallPlot
                ? (index === 0 ? 'Annual' : 'Cumulative')
                : dataset[0]?.objectConfig?.objectId?.[1] ?? `Dataset ${index + 1}`;

            return {
                label: datasetLabel,
                data: data[0].map(labelItem => datasetMap[labelItem.label] || 0),
                backgroundColor: dataset[0]?.objectConfig?.color || 'rgba(0, 0, 0, 0.1)',
                borderColor: dataset[0]?.objectConfig?.color || 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
            };
        }),
    } : null;

    return (
        <div key={plotname}>
            {chartData ? (
                <BarChart 
                    data={chartData} 
                    options={experimentalMethodChartOptions} 
                    isOverallPlot={isOverallPlot}
                />
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default Growth;
