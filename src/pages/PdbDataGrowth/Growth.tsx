import React from 'react';
import { useParams } from 'react-router-dom';
import BarChart from '../../components/BarChart/BarChart';
import { ChartData } from 'chart.js';
import useGetData from '../../hooks/useGetData';
import ChartSkeleton from '../../components/BarChart/BarChartSkeleton';
import chartOptions from '../../config/chartConfigs';
import BarChartRace from '../../components/BarChartRace/BarChartRace';
import { FadeInContainer } from '../../styles/GrowthStyles';

const Growth: React.FC = () => {
    const { plotname } = useParams<{ plotname: string }>();
    const key = plotname || 'defaultKey';
    const isOverallPlot = plotname === 'overall-structures' || plotname === 'overall-small-molecules';

    const { data, isLoading, error } = useGetData(key);

    if (isLoading) {
        return (
            <FadeInContainer>
                <ChartSkeleton />
            </FadeInContainer>
        );
    }

    if (error) {
        return (
            <FadeInContainer>
                <div>Error loading data: {error.message}</div>
            </FadeInContainer>
        );
    }

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

    console.log('chartData', chartData);

    const selectedChartOptions = plotname && chartOptions[plotname];

    return (
        <FadeInContainer key={plotname}>
            {chartData && selectedChartOptions ? (
                <>
                    <BarChart 
                        data={chartData} 
                        options={selectedChartOptions}
                        isOverallPlot={isOverallPlot}
                    />
                    {(plotname === 'experimental-method' || plotname === 'molecular-composition') && (
                        <BarChartRace plotname={plotname} />
                    )}
                </>
            ) : (
                <div>No data available</div>
            )}
        </FadeInContainer>
    );
};

export default Growth;
