import React from 'react';
import { useParams } from 'react-router-dom';
import BarChart from '../../components/BarChart/BarChart';
import ChartSkeletonBarVerticle from '../../components/BarChart/BarChartSkeleton';
import { FadeInContainer } from '../../styles/ChartStyles';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import useGetData from '../../hooks/useGetData';
import chartOptions from '../../config/chartConfigs';

const Distribution: React.FC = () => {
    const plotname = useParams<{ plotname: string }>().plotname || '';
    const key = plotname || 'defaultKey';

    const distPlots = [
        'distribution-space-group',
        'distribution-resolution',
        'distribution-r-free',
        'distribution-molecular-weight-structure',
        'distribution-atom-count',
        'distribution-residue-count',
        'distribution-source-organism-natural',
        'distribution-software',
        'distribution-journal',
        'distribution-structural-genomics-centers',
        'assembly-symmetry-dist',
        'taxonomy',
        'enzyme-classification-name',
        'scop-classification'
    ];

    const isDistPlot = distPlots.includes(plotname);

    const { data, isLoading, error } = useGetData(key);

    if (isLoading) {
        return (
            <FadeInContainer>
                <ChartSkeletonBarVerticle />
            </FadeInContainer>
        );
    }

    if (error) {
        return (
            <FadeInContainer>
                <ErrorPage error={error} />
            </FadeInContainer>
        );
    }

    const chartData = data && data.length > 0 ? {
        labels: data[0].map((item: any) => item.label),
        datasets: data.map((dataset: any[], index: number) => {
            const datasetMap: Record<string, number> = {};
            dataset.forEach(item => {
                datasetMap[item.label] = item.population;
            });

            const datasetLabel = dataset[0]?.objectConfig?.objectId?.[1] ?? `Dataset ${index + 1}`;

            return {
                label: datasetLabel,
                data: data[0].map(labelItem => datasetMap[labelItem.label] || 0),
                backgroundColor: dataset[0]?.objectConfig?.color || 'rgba(0, 0, 0, 0.1)',
                borderColor: dataset[0]?.objectConfig?.color || 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
                objectConfig: dataset.map(item => item.objectConfig) 
            };
        }),
    } : null;

    const selectedChartOptions = plotname && chartOptions[plotname];

    return (
        <FadeInContainer key={plotname}>
            {chartData && selectedChartOptions ? (
                <>
                    <BarChart 
                        data={chartData} 
                        options={selectedChartOptions}
                        isOverallPlot={false}
                        isDistPlot={isDistPlot}
                    />
                </>
            ) : (
                <FadeInContainer>
                    <ErrorPage error={new Error("No data available.")} />
                </FadeInContainer>
            )}
        </FadeInContainer>
    );
};

export default Distribution;
