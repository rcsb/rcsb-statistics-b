import React, { useRef, useState, useEffect } from 'react';
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
  ChartDataset
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import styled from 'styled-components';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

interface BasicChartProps {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
  isOverallPlot: boolean; 
}

interface DatasetVisibility {
  label: string;
  visible: boolean;
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
  }
`;

const FilterSection = styled.div`
  margin-bottom: 35px;
`;

const FiltersShownText = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const calculateCumulativeData = (data: ChartData<'bar'>): ChartData<'bar'> => {
  const cumulativeDatasets = data.datasets.map((dataset) => {
    const cumulativeDataArray: number[] = [];
    let cumulativeSum = 0;

    dataset.data.forEach((value) => {
      cumulativeSum += value as number;
      cumulativeDataArray.push(cumulativeSum);
    });

    return {
      ...dataset,
      data: cumulativeDataArray,
    };
  });

  return { ...data, datasets: cumulativeDatasets };
};

const BarChart: React.FC<BasicChartProps> = ({ data, options, isOverallPlot }) => {
  const chartRef = useRef<ChartJS<'bar'>>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize visibility state based on URL parameters
  const initialVisibility: DatasetVisibility[] = data.datasets.map((dataset) => {
    const searchParams = new URLSearchParams(location.search);
    const label = dataset.label || '';
    const visible = searchParams.get(label) !== 'false'; // Default to true if not explicitly set to 'false'
    return { label, visible };
  });

  const [visibility, setVisibility] = useState<DatasetVisibility[]>(initialVisibility);
  const [selectedView, setSelectedView] = useState<'Annual' | 'Cumulative'>(() => {
    const searchParams = new URLSearchParams(location.search);
    return (searchParams.get('view') as 'Annual' | 'Cumulative') || 'Annual'; 
  });
  const [currentData, setCurrentData] = useState<ChartData<'bar'>>(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = (searchParams.get('view') as 'Annual' | 'Cumulative') || 'Annual';
    return view === 'Cumulative' ? calculateCumulativeData(data) : data;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Sync URL parameters with initial state
    if (!searchParams.has('view')) {
      searchParams.set('view', selectedView);
    }

    visibility.forEach((item) => {
      if (!searchParams.has(item.label)) {
        searchParams.set(item.label, String(item.visible));
      }
    });

    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [visibility, selectedView, location.pathname, navigate]);

  useEffect(() => {
    if (selectedView === 'Cumulative') {
      const cumulativeData = calculateCumulativeData(data);
      setCurrentData({
        labels: data.labels,
        datasets: cumulativeData.datasets.map((dataset) => ({
          ...dataset,
          hidden: !visibility.find((item) => item.label === dataset.label)?.visible,
        })),
      });
    } else {
      setCurrentData({
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          hidden: !visibility.find((item) => item.label === dataset.label)?.visible,
        })),
      });
    }
  }, [visibility, selectedView, data]);

  const updateChart = (newData: ChartData<'bar'>) => {
    if (chartRef.current) {
      chartRef.current.data.datasets.forEach((dataset, index) => {
        dataset.data = newData.datasets[index].data;
        dataset.label = newData.datasets[index].label;
        dataset.backgroundColor = newData.datasets[index].backgroundColor;
        dataset.borderColor = newData.datasets[index].borderColor;
        dataset.hidden = newData.datasets[index].hidden;
      });
      chartRef.current.update();
    }
  };

  const updateUrl = (key: string, value: string | boolean) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, String(value));
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const toggleDatasetVisibility = (label: string) => {
    setVisibility((prevVisibility) => {
      const newVisibility = prevVisibility.map((item) =>
        item.label === label ? { ...item, visible: !item.visible } : item
      );

      // Update the URL parameters to reflect new visibility state
      const newState = !prevVisibility.find((item) => item.label === label)?.visible;
      updateUrl(label, newState);

      // Update the chart data with the new visibility state
      const updatedDatasets = currentData.datasets.map((dataset) => ({
        ...dataset,
        hidden: !newVisibility.find((item) => item.label === dataset.label)?.visible,
      }));

      setCurrentData({
        ...currentData,
        datasets: updatedDatasets,
      });

      return newVisibility;
    });
  };

  const handleViewChange = (view: 'Annual' | 'Cumulative') => {
    setSelectedView(view);
    updateUrl('view', view); 

    if (view === 'Cumulative') {
      const cumulativeData = calculateCumulativeData(data);
      setCurrentData({
        labels: data.labels,
        datasets: cumulativeData.datasets.map((dataset) => ({
          ...dataset,
          hidden: !visibility.find((item) => item.label === dataset.label)?.visible,
        })),
      });
    } else {
      setCurrentData({
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          hidden: !visibility.find((item) => item.label === dataset.label)?.visible,
        })),
      });
    }
  };

  const handleBarClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const elements = getElementAtEvent(chartRef.current, event);
      if (elements.length > 0) {
        const { datasetIndex, index } = elements[0];
        const dataset = chartRef.current.data.datasets[datasetIndex] as ChartDataset<'bar'> & { objectConfig?: { [key: number]: { url: string } } };
        
        if (dataset && dataset.objectConfig && dataset.objectConfig[index]) {
          const barUrl = dataset.objectConfig[index].url;
          if (barUrl) {
            window.location.href = barUrl; 
          }
        }
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col md={10}>
          <StyledChartContainer>
            <Bar ref={chartRef} data={currentData} options={options} onClick={handleBarClick} />
          </StyledChartContainer>
        </Col>
        <Col md={2}>
          <ControlSection>
            <DataOptionsHeader>Data Options</DataOptionsHeader>
            <FilterSection>
              <FiltersShownText>Data Shown</FiltersShownText>
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
            </FilterSection>
            {!isOverallPlot && (
              <ToggleRadioContainer>
                <FiltersShownText>Data Set</FiltersShownText>
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
            )}
          </ControlSection>
        </Col>
      </Row>
    </Container>
  );
};

export default BarChart;
