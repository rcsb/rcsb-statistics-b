import React from 'react';
import { useParams } from 'react-router-dom';
import BarChart from '../../components/BarChart/BarChart';
import ChartSkeleton from '../../components/BarChart/BarChartSkeleton';
import BarChartRace from '../../components/BarChartRace/BarChartRace';
import { FadeInContainer, SearchApiContainer, StyledButton } from '../../styles/ChartStyles';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import useGetData from '../../hooks/useGetData';
import chartOptions from '../../config/chartConfigs';
import { FaCog } from 'react-icons/fa';
import { useDataQuery } from '../../contexts/QueryContext';

const constructSearchApiUrl = (context: any): string => {
    const baseUrl = 'https://search.rcsb.org/query-editor.html?json=';
    if (!context?.searchRequest) {
        return baseUrl;
    }
    const encodedQuery = encodeURIComponent(JSON.stringify(context.searchRequest));
    return `${baseUrl}${encodedQuery}`;
};

const Growth: React.FC = () => {
    const { plotname } = useParams<{ plotname: string }>();
    const key = plotname || 'defaultKey';
    const isOverallPlot = plotname === 'overall-structures' || plotname === 'overall-small-molecules';
    const { data, isLoading, error } = useGetData(key);
    const context = useDataQuery();

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

            const datasetLabel = isOverallPlot
                ? (index === 0 ? 'Annual' : 'Cumulative')
                : dataset[0]?.objectConfig?.objectId?.[1] ?? `Dataset ${index + 1}`;

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

    const handleButtonClick = () => {
        const url = constructSearchApiUrl(context);
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <FadeInContainer key={plotname}>
            {chartData && selectedChartOptions ? (
                <>
                    <SearchApiContainer>
                        <StyledButton onClick={handleButtonClick}>
                            <FaCog /> Search API
                        </StyledButton>
                    </SearchApiContainer>
                    <BarChart 
                        data={chartData} 
                        options={selectedChartOptions}
                        isOverallPlot={isOverallPlot}
                        isDistPlot={false}
                    />
                    {plotname === 'experimental-method' && (
                        <BarChartRace plotname={plotname} />
                    )}
                </>
            ) : (
                <FadeInContainer>
                    <ErrorPage error={new Error("No data available")} />
                </FadeInContainer>
            )}
        </FadeInContainer>
    );
};

export default Growth;

