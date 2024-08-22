import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BasicChartProps {
  data: any;
  options: any;
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

const BasicChart: React.FC<BasicChartProps> = ({ data, options }) => {
  const chartRef = useRef<any>(null);
  const [visibility, setVisibility] = useState<DatasetVisibility[]>(
    data.datasets.map((dataset: any) => ({ label: dataset.label, visible: true }))
  );

  useEffect(() => {
    setVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      data.datasets.forEach((dataset: any) => {
        if (!newVisibility.find((item) => item.label === dataset.label)) {
          newVisibility.push({ label: dataset.label, visible: true });
        }
      });
      return newVisibility.filter((item) => data.datasets.find((dataset: any) => dataset.label === item.label));
    });
  }, [data.datasets]);

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
      }
      chart.update();
    });
  };

  return (
    <Container>
      <Row>
        <Col md={10}>
          <Bar ref={chartRef} data={data} options={options} />
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
          </ControlSection>
        </Col>
      </Row>
    </Container>
  );
};

export default BasicChart;
