import React from 'react';
import BarChart from '../../components/BarChart/BarChart';
import { ChartData } from 'chart.js';
import useGetExperimentalMethodsData from '../../hooks/useGetExperimentalMethodsData';
import ChartSkeleton from '../../components/BarChart/BarChartSkeleton';
import { experimentalMethodChartOptions } from '../../config/chartConfigs';

const ExperimentalMethod: React.FC = () => {
    const { data, isLoading, error } = useGetExperimentalMethodsData();

    if (isLoading) {
        return <ChartSkeleton />;
    }

    if (error) return <div>Error loading data</div>;

    const chartData: ChartData<'bar'> | null = data && data.length > 0 ? {
        labels: data[0].map((item: any) => item.label),
        datasets: data.map((dataset: any[], index: number) => {
            const datasetMap: Record<string, number> = {};
            dataset.forEach(item => {
                datasetMap[item.label] = item.population;
            });

            return {
                label: dataset[0].objectConfig.objectId[1],
                data: data[0].map(labelItem => datasetMap[labelItem.label] || 0),
                backgroundColor: dataset[0].objectConfig.color,
                borderColor: dataset[0].objectConfig.color,
                borderWidth: 1,
            };
        }),
    } : null;

    return (
        chartData ? (
            <BarChart data={chartData} options={experimentalMethodChartOptions} isOverallPlot={false}/>
        ) : (
            <div>No data available</div>
        )
    );
};

export default ExperimentalMethod;
