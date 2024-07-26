import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FacetSelector, SelectorRoleType } from '../../components/FacetSelector';
import { ADDITIONAL_FACET_STORE, FACET_STORE } from './FacetStore';
import { FacetPlot } from '../../components/FacetPlot';
import { ReturnType } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';
import { Observer } from 'rxjs';
import { StatsFacetInterface } from '../../interfaces/StatsFacetInterface';
import { Container, Row, Col, Form } from 'react-bootstrap';

interface MethodState {
  label: string;
  key: string;
  checked: boolean;
  color: string;
}

interface DistSourceOrgNatState {
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

const ControlSection = styled.div`
  margin-bottom: 20px;
`;

const FullWidthCol = styled.div`
  width: 100%;
  padding: 0 15px;
`;

const DataOptionsHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const MethodsShownWrapper = styled.div`
  margin-bottom: 10px;
`;

const MethodsShownText = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledFormCheckLabel = styled(Form.Check.Label)`
  margin-left: 5px;
  font-weight: normal;
  margin-bottom: -7px;
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

const DistSourceOrgNat: React.FC = () => {
  const [state, setState] = useState<DistSourceOrgNatState>({
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

  useEffect(() => {
    console.log('mainAttribute=', state.mainAttribute);
    console.log('methods=', state.methods);
  }, [state.mainAttribute, state.methods]);

  const handleDataSetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      selectedDataSet: event.target.value,
    }));
  };

  const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMethods = [...state.methods];
    newMethods[index].checked = event.target.checked;
    setState((prevState) => ({
      ...prevState,
      methods: newMethods,
    }));
  };

  useEffect(() => {
    // Placeholder for data filtering logic
  }, [state.methods]);

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h3>PDB Data Growth By Experimental Method</h3>
      <Container>
        <Row>
          <Col md={10}>
            <FacetPlot
              firstDim={state.mainAttribute.facet}
              secondDim={
                state.mainAttribute.facetId !== state.additionalAttribute?.facetId
                  ? state.additionalAttribute?.facet
                  : undefined
              }
              chartType={state.mainAttribute.chartType}
              returnType={ReturnType.Entry}
              chartConfig={state.mainAttribute.chartConfig}
              // Pass filtered data here if needed
            />
          </Col>
          <Col md={2}>
            <DataOptionsHeader>Data Options</DataOptionsHeader>
            {state.methods.length > 0 && (
              <MethodsShownWrapper>
                <MethodsShownText>Methods Shown</MethodsShownText>
                <Form>
                  {state.methods.map((method, index) => (
                    <Form.Check
                      key={method.key}
                      type="checkbox"
                      id={`method-${method.key}`}
                      checked={method.checked}
                      onChange={handleCheckboxChange(index)}
                      label={<StyledFormCheckLabel>{method.label}</StyledFormCheckLabel>}
                    />
                  ))}
                </Form>
              </MethodsShownWrapper>
            )}
            <MethodsShownWrapper>
              <MethodsShownText>Data Set</MethodsShownText>
              <Form>
                <Form.Check
                  type="radio"
                  id="dataset1"
                  name="dataset"
                  value="cumulative"
                  checked={state.selectedDataSet === 'cumulative'}
                  onChange={handleDataSetChange}
                  label={<StyledFormCheckLabel>Cumulative</StyledFormCheckLabel>}
                />
                <Form.Check
                  type="radio"
                  id="dataset2"
                  name="dataset"
                  value="releasedAnnually"
                  checked={state.selectedDataSet === 'releasedAnnually'}
                  onChange={handleDataSetChange}
                  label={<StyledFormCheckLabel>Released Annually</StyledFormCheckLabel>}
                />
              </Form>
            </MethodsShownWrapper>
            <ControlSection>
              <FacetSelector
                componentId="additional-attribute"
                observer={selectorObserver}
                selectorRole="additional"
                facets={ADDITIONAL_FACET_STORE}
              />
            </ControlSection>
          </Col>
        </Row>
        <Row>
          <FullWidthCol>
            <div>Cumulative (available each year) number of PDB structures determined by</div>
            <ColorBoxesContainer>
              {state.methods.filter(method => method.checked).map((method, index) => (
                <ColorBoxWrapper key={index}>
                  <ColorBox bgColor={method.color} />
                  <BoxText>{method.label}</BoxText>
                </ColorBoxWrapper>
              ))}
            </ColorBoxesContainer>
          </FullWidthCol>
        </Row>
      </Container>
    </Article>
  ) : null;
};

export default DistSourceOrgNat;
