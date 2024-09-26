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
  ChartDataset,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import styled from 'styled-components';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCog, FaRegWindowMaximize, FaSync, FaInfoCircle, FaTable, FaArrowDown, FaChartLine } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);
interface StyledChartContainerProps {
  displaySize: "Large" | "Small";
}

interface BasicChartProps {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
  isOverallPlot: boolean;
  displaySize: "Large" | "Small";
  isDistPlot: boolean;
}

interface DatasetVisibility {
  label: string;
  visible: boolean;
}

const ControlSection = styled.div`
  padding-left: 7px;
  margin-top: 40px;
`;

const ButtonSection = styled(Col)`
  margin-top: 40px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const StyledIcon = styled.div`
  background-color: #f0f0f0;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #808080;
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

const StyledChartContainer = styled.div<StyledChartContainerProps>`
  height: ${({ displaySize }) => (displaySize === 'Large' ? '550px' : '400px')};
  width: ${({ displaySize }) => (displaySize === 'Small' ? '500px' : 'auto')};
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

const BarChart: React.FC<BasicChartProps> = ({ data, options, isOverallPlot, displaySize, isDistPlot }) => {
  const chartRef = useRef<ChartJS<'bar'>>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [visibility, setVisibility] = useState<DatasetVisibility[]>(() => {
    const searchParams = new URLSearchParams(location.search);
    return data.datasets.map((dataset) => {
      const label = dataset.label || '';
      const visible = searchParams.get(label) !== 'false';
      return { label, visible };
    });
  });

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
    console.log('displaySize:', displaySize);
    console.log('isDistPlot:', isDistPlot);
  }, [displaySize, isDistPlot]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    visibility.forEach((item) => {
      searchParams.set(item.label, String(item.visible));
    });

    searchParams.set('view', selectedView);

    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [visibility, selectedView, location.pathname, navigate]);

  useEffect(() => {
    const updatedDatasets = currentData.datasets.map((dataset) => ({
      ...dataset,
      hidden: !visibility.find((item) => item.label === dataset.label)?.visible,
    }));

    setCurrentData({
      ...currentData,
      datasets: updatedDatasets,
    });
  }, [visibility]);

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
  }, [selectedView, data, visibility]);

  const toggleDatasetVisibility = (label: string) => {
    setVisibility((prevVisibility) =>
      prevVisibility.map((item) =>
        item.label === label ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleViewChange = (view: 'Annual' | 'Cumulative') => {
    setSelectedView(view);
  };

  const handleBarClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const elements = getElementAtEvent(chartRef.current, event);
  
      if (elements.length > 0) {
        // Get the index of the clicked bar
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
  
  const handleLegendClick = (chart: any, legendItem: any) => {
    const index = legendItem.datasetIndex;
    const label = chart.data.datasets[index].label;

    if (label) {
      toggleDatasetVisibility(label);
    }
  };

  const updatedOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        ...options.plugins?.legend,
        onClick: (event: any, legendItem: any, legend: any) => handleLegendClick(legend.chart, legendItem),
      },
    },
  };

  return (
    <Container>
      <Row>
        <Col md={10}>
          <StyledChartContainer displaySize={displaySize}>
              <Bar ref={chartRef} data={currentData} options={updatedOptions} onClick={handleBarClick} />
          </StyledChartContainer>
        </Col>
        <Col md={2}>
          <Row>
            <ButtonSection md={2}>
              <IconContainer>
                <StyledIcon><FaCog size={15} /></StyledIcon>
                <StyledIcon><FaRegWindowMaximize size={15} /></StyledIcon>
                <StyledIcon><FaSync size={15} /></StyledIcon>
                <StyledIcon><FaInfoCircle size={15} /></StyledIcon>
                <StyledIcon><FaTable size={15} /></StyledIcon>
                <StyledIcon><FaArrowDown size={15} /></StyledIcon>
                <StyledIcon><FaChartLine size={15} /></StyledIcon>
              </IconContainer>
            </ButtonSection>
            <Col md={10}>
              <ControlSection>
                <DataOptionsHeader>Data Options</DataOptionsHeader>
                {!isDistPlot ? (
                  <>
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
                  </>
                ) : (
                  <FilterSection>
                    <FiltersShownText>...</FiltersShownText>
                  </FilterSection>
                )}
              </ControlSection>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BarChart;
