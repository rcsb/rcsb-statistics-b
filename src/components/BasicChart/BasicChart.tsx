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
  ActiveElement,
  ChartEvent
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

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
  margin-right: 10px;
`;

const StyledLabel = styled.label`
  font-size: 12px;
  margin-left: 5px;
  font-weight: normal;
`;

const DataOptionsHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 15px;
`;

const StyledChartContainer = styled.div`
  height: 550px;
`;

const BasicChart: React.FC<BasicChartProps> = ({ data, options }) => {
  const chartRef = useRef<any>(null);
  const [visibility, setVisibility] = useState<DatasetVisibility[]>(
    data.datasets.map((dataset: any) => ({ label: dataset.label, visible: true }))
  );

  useEffect(() => {
    const syncVisibilityWithChart = () => {
      if (chartRef.current) {
        const newVisibility = chartRef.current.data.datasets.map((dataset: any) => ({
          label: dataset.label,
          visible: !dataset.hidden,
        }));
        setVisibility(newVisibility);
      }
    };

    syncVisibilityWithChart(); // Sync the visibility state initially
  }, [data.datasets]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.options.plugins.legend.onClick = function (
        e: ChartEvent,
        legendItem: ActiveElement
      ) {
        const datasetIndex = legendItem.datasetIndex;
        const dataset = chart.data.datasets[datasetIndex];
  
        // Toggle visibility
        dataset.hidden = !dataset.hidden;
        chart.update();
  
        // Sync checkbox visibility
        setVisibility((prevVisibility) =>
          prevVisibility.map((item) =>
            item.label === dataset.label ? { ...item, visible: !dataset.hidden } : item
          )
        );
      };
    }
  }, []);

  const updateChart = (callback: (chart: any) => void) => {
    if (chartRef.current) {
      callback(chartRef.current);
    }
  };

  const toggleDatasetVisibility = (label: string) => {
    setVisibility((prevVisibility) =>
      prevVisibility.map((item) =>
        item.label === label ? { ...item, visible: !item.visible } : item
      )
    );
  
    updateChart((chart) => {
      const datasetIndex = chart.data.datasets.findIndex((dataset: any) => dataset.label === label);
      if (datasetIndex >= 0) {
        const dataset = chart.data.datasets[datasetIndex];
        dataset.hidden = !dataset.hidden;
  
        chart.update({
          duration: 1000,
          easing: 'easeInOutQuart',
        });
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col md={10}>
          <StyledChartContainer>
            <Bar ref={chartRef} data={data} options={options} />
          </StyledChartContainer>
        </Col>
        <Col md={2}>
          <ControlSection>
            <DataOptionsHeader>Dataset Visibility</DataOptionsHeader>
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
            

            {/* <button onClick={() => chartRef.current.resetZoom()}>Reset Zoom</button> */}
          </ControlSection>
        </Col>
      </Row>
    </Container>
  );
};

export default BasicChart;
