import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FacetSelector, SelectorRoleType } from '../../components/FacetSelector';
import { FacetCheckbox, CheckboxRoleType } from '../../components/FacetCheckbox';
import { ADDITIONAL_FACET_STORE, FACET_STORE } from './FacetStore';
import { FacetPlot } from '../../components/FacetPlot';
import { ReturnType } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';
import { Observer } from 'rxjs';
import { StatsFacetInterface } from '../../interfaces/StatsFacetInterface';
import { Container, Row, Col, Form } from 'react-bootstrap';
import {RcsbSearchMetadata} from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
import {
    AggregationType,
    Interval
} from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import {ChartType} from "@rcsb/rcsb-charts/lib/RcsbChartComponent/ChartConfigInterface";

interface MethodState {
  label: string;
  key: string;
  checked: boolean;
  color: string;
}

interface DataGrowthExpState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
  selectedDataSet: string;
  methods: MethodState[];
}

const Article = styled.article`
  width: 100%;
  margin: 0 auto;

  canvas {
    margin-left: -100px;
    max-width: 90%;
  }
`;



const FullWidthCol = styled.div`
  width: 100%;
  padding: 0 15px;
`;


const ColorBoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ColorBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ColorBox = styled.div<{ bgColor: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.bgColor};
  margin-right: 10px;
`;

const BoxText = styled.div`
  font-size: 1.2rem;
`;

const PdbDataGrowth: React.FC = () => {
  const [state, setState] = useState<DataGrowthExpState>({
    mainAttribute: FACET_STORE[0],
    selectedDataSet: 'cumulative',
    methods: [
      { label: 'X-ray Diffraction', key: 'xray', checked: true, color: 'blue' },
      { label: 'Electron Microscopy', key: 'electronMicroscopy', checked: true, color: 'lime' },
      { label: 'NMR', key: 'nmr', checked: true, color: 'red' },
      { label: 'Neutron Diffraction', key: 'neutronDiffraction', checked: true, color: 'brown' },
      { label: 'Multi-method', key: 'multiMethod', checked: true, color: 'purple' },
      { label: 'Other', key: 'other', checked: true, color: 'gray' },
    ],
  });

  const selectorObserver: Observer<{ facet: StatsFacetInterface; role: SelectorRoleType }> = {
    next: (selector) => {
      setState((prevState) => ({
        ...prevState,
        [selector.role === 'main' ? 'mainAttribute' : 'additionalAttribute']: selector.facet,
      }));
    },
    error: () => {},
    complete: () => {},
  };

  const handleMethodsChange: Observer<{ facet: StatsFacetInterface; role: CheckboxRoleType }> = {
    next: (selector) => {
      setState((prevState) => ({
        ...prevState,
        methods: prevState.methods.map((method) =>
          method.key === selector.facet.facetId
            ? { ...method, checked: !method.checked }
            : method
        ),
      }));
    },
    error: () => {},
    complete: () => {},
  };

  useEffect(() => {
  }, [state.mainAttribute, state.methods]);

  const handleDataSetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      selectedDataSet: event.target.value,
    }));
  };

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h2>PDB Data Growth By Experimental Method</h2>
      <Container>
        <Row>
          <Col md={10}>
            <FacetPlot
              firstDim={{
                  name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
                  aggregation_type: AggregationType.DateHistogram,
                  attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
                  interval: Interval.Year,
                  min_interval_population: 0
              }}
              secondDim={{
                  name: `FACET/${RcsbSearchMetadata.Exptl.Method.path}`,
                  aggregation_type: AggregationType.Terms,
                  attribute: RcsbSearchMetadata.Exptl.Method.path
              }}
              chartType={state.mainAttribute.chartType}
              returnType={ReturnType.Entry}
              chartConfig={state.mainAttribute.chartConfig}
            />
          </Col>
          <Col md={2}>
          </Col>
        </Row>
        <Row>
          <FullWidthCol>
            <div>Cumulative (available each year) number of PDB structures determined by</div>
            {/* <ColorBoxesContainer>
              {state.methods.filter(method => method.checked).map((method, index) => (
                <ColorBoxWrapper key={index}>
                  <ColorBox bgColor={method.color} />
                  <BoxText>{method.label}</BoxText>
                </ColorBoxWrapper>
              ))}
            </ColorBoxesContainer> */}
          </FullWidthCol>
        </Row>
      </Container>
    </Article>
  ) : null;
};

export default PdbDataGrowth;
