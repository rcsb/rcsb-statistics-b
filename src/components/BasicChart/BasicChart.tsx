import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LegendItem,
  ChartEvent,
  ChartDataset
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import styled from 'styled-components';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { ChartObjectInterface } from "@rcsb/rcsb-charts/lib/RcsbChartComponent/ChartConfigInterface";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

interface BasicChartProps {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
}

interface DatasetVisibility {
  label: string;
  visible: boolean;
}

const ControlSection = styled.div`
  padding-left: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const StyledCheckbox = styled.input`
  margin-right: 20px;
`;

const StyledLabel = styled.label`
  font-size: 12px;
  margin-left: 5px;
  font-weight: normal;
  margin-bottom: 0 !important;
`;

const DataOptionsHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 15px;
`;

const StyledChartContainer = styled.div`
  height: 550px;
`;

const ToggleRadioContainer = styled.div`
  margin-top: 20px;
  label {
    font-size: 12px;
    font-weight: normal;
    margin-left: 5px;
    margin-bottom: 0 !important;
    margin-top: 4px !important;
  }
  .form-check {
      display: flex;
      align-items: center;
      margin-bottom:3px;
  }
`;

const COLOR_PALETTE = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const BasicChart: React.FC<BasicChartProps> = ({ data, options }) => {
  const chartRef = useRef<ChartJS<'bar'>>(null);
  const [visibility, setVisibility] = useState<DatasetVisibility[]>(
    data.datasets.map((dataset) => ({ label: dataset.label || '', visible: true }))
  );
  const [selectedView, setSelectedView] = useState<'Annual' | 'Cumulative'>('Annual');
  const [currentData, setCurrentData] = useState<ChartData<'bar'>>(data);

  useEffect(() => {
    const syncVisibilityWithChart = () => {
      if (chartRef.current) {
        const newVisibility = chartRef.current.data.datasets.map((dataset) => ({
          label: dataset.label || '',
          visible: !dataset.hidden,
        }));
        setVisibility(newVisibility);
      }
    };

    syncVisibilityWithChart();
  }, [currentData]);

  const updateChart = (newData: ChartData<'bar'>) => {
    if (chartRef.current) {
      chartRef.current.data = newData;
      chartRef.current.update();
    }
  };

  const toggleDatasetVisibility = (label: string) => {
    setVisibility((prevVisibility) => {
        const newVisibility = prevVisibility.map((item) =>
            item.label === label ? { ...item, visible: !item.visible } : item
        );

        updateChart({
            ...currentData,
            datasets: currentData.datasets.map((dataset) => ({
                ...dataset,
                hidden: !newVisibility.find((item) => item.label === dataset.label)?.visible,
            })),
        });

        return newVisibility;
    });
};

  const handleViewChange = (view: 'Annual' | 'Cumulative') => {
    setSelectedView(view);
    if (view === 'Cumulative') {
      const cumulativeData = calculateCumulativeData(data.datasets);
      const updatedData: ChartData<'bar'> = {
        labels: data.labels,
        datasets: cumulativeData.map((dataset, index) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.borderColor,
          borderWidth: 1,
        })),
      };
      setCurrentData(updatedData);
      updateChart(updatedData);
    } else {
      setCurrentData(data); // Reset to original data
      updateChart(data);
    }
  };

  const calculateCumulativeData = (datasets: ChartDataset<'bar'>[]): ChartDataset<'bar'>[] => {
    return datasets.map(dataset => {
      const cumulativeDataArray: number[] = [];
      let cumulativeSum = 0;

      dataset.data.forEach((value) => {
        cumulativeSum += value as number; // Ensure value is treated as a number
        cumulativeDataArray.push(cumulativeSum);
      });

      return {
        ...dataset,
        data: cumulativeDataArray,
      };
    });
  };

  return (
    <Container>
      <Row>
        <Col md={10}>
          <StyledChartContainer>
            <Bar ref={chartRef} data={currentData} options={options} />
          </StyledChartContainer>
        </Col>
        <Col md={2}>
          <ControlSection>
            <DataOptionsHeader>Data Options</DataOptionsHeader>
            {visibility.map((item) => (
              <CheckboxContainer key={item.label}>
                <StyledCheckbox
                  type="checkbox"
                  id={item.label}
                  checked={item.visible}
                  onChange={() => toggleDatasetVisibility(item.label)}
                />
                <StyledLabel htmlFor={item.label}>{item.label}</StyledLabel>
              </CheckboxContainer>
            ))}
            <ToggleRadioContainer>
              <Form.Check
                type="radio"
                id="view-annual"
                label="Annual"
                name="view-switch"
                value="Annual"
                checked={selectedView === 'Annual'}
                onChange={() => handleViewChange('Annual')}
              />
              <Form.Check
                type="radio"
                id="view-cumulative"
                label="Cumulative"
                name="view-switch"
                value="Cumulative"
                checked={selectedView === 'Cumulative'}
                onChange={() => handleViewChange('Cumulative')}
              />
            </ToggleRadioContainer>
          </ControlSection>
        </Col>
      </Row>
    </Container>
  );
};

export default BasicChart;
