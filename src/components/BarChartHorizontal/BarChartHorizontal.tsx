import React, { useRef } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
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
  ChartDataset,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

interface BasicChartProps {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
}

const ControlSection = styled.div`
  padding-left: 20px;
  margin-top: 40px;
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

const FilterSection = styled.div`
  margin-bottom: 35px;
`;

const FiltersShownText = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const BarChartHorizontal: React.FC<BasicChartProps> = ({ data, options }) => {
  const chartRef = useRef<ChartJS<'bar'>>(null);

  const handleBarClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const elements = getElementAtEvent(chartRef.current, event);

      if (elements.length > 0) {
        const { index } = elements[0];

        // Loop through all datasets to find the first available URL for the clicked bar index
        let barUrl = '';

        for (const dataset of chartRef.current.data.datasets as ChartDataset<'bar'>[]) {
          const typedDataset = dataset as ChartDataset<'bar'> & {
            objectConfig?: { [key: number]: { url: string } };
          };

          if (typedDataset.objectConfig && typedDataset.objectConfig[index]) {
            // Set the barUrl to the URL found and break out of the loop
            barUrl = typedDataset.objectConfig[index].url;
            break;
          }
        }

        if (barUrl) {
          console.log('Navigating to URL:', barUrl);
          window.location.href = barUrl;
        }
      }
    }
  };

  const updatedOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        ...options.plugins?.legend,
        onClick: (event: any, legendItem: any, legend: any) => {
          // Add any custom functionality if needed for legend clicks.
        },
      },
    },
  };

  return (
    <Container>
      <Row>
        <Col md={10}>
          <StyledChartContainer>
            <Bar ref={chartRef} data={data} options={updatedOptions} onClick={handleBarClick} />
          </StyledChartContainer>
        </Col>
        <Col md={2}>
          <ControlSection>
            <DataOptionsHeader>Data Options</DataOptionsHeader>
            <FilterSection>
              <FiltersShownText>Data Shown</FiltersShownText>
              {/* The UI section remains for future functionality */}
              <CheckboxContainer>
                <StyledCheckbox type="checkbox" id="placeholder" disabled />
                <StyledLabel htmlFor="placeholder">Placeholder Filter</StyledLabel>
              </CheckboxContainer>
            </FilterSection>
          </ControlSection>
        </Col>
      </Row>
    </Container>
  );
};

export default BarChartHorizontal;
