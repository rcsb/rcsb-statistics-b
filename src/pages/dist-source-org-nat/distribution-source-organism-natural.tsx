import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FacetSelector, SelectorRoleType } from '../../components/FacetSelector';
import { ADDITIONAL_FACET_STORE, FACET_STORE } from './FacetStore';
import { FacetPlot } from '../../components/FacetPlot';
import { ReturnType } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';
import { Observer } from 'rxjs';
import { StatsFacetInterface } from '../../interfaces/StatsFacetInterface';
import { Container, Row, Col, Form } from 'react-bootstrap';

interface DistSourceOrgNatState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
}

interface ColorBox {
  label: string;
  color: string;
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
  const [state, setState] = useState<DistSourceOrgNatState>({ mainAttribute: FACET_STORE[0] });

  const [colorBoxes, setColorBoxes] = useState<ColorBox[]>([
    { label: 'X-ray Diffraction', color: 'blue' },
    { label: 'Electron Microscopy', color: 'lime' },
    { label: 'NMR', color: 'red' },
    { label: 'Neutron Diffraction', color: 'brown' },
    { label: 'Multi-method', color: 'purple' },
  ]);

  const [selectedDataSet, setSelectedDataSet] = useState<string>('cumulative');

  const [checkedMethods, setCheckedMethods] = useState({
    xray: true,
    electronMicroscopy: true,
    nmr: true,
    neutronDiffraction: true,
    multiMethod: true,
    other: true,
  });

  const selectorObserver: Observer<{ facet: StatsFacetInterface; role: SelectorRoleType }> = {
    next: (selector) => {
      setState((prevState) => {
        const newFacet = selector.facet;
        return {
          ...prevState,
          [selector.role === 'main' ? 'mainAttribute' : 'additionalAttribute']: newFacet,
        };
      });
    },
    error: () => {},
    complete: () => {},
  };

  useEffect(() => {
    console.log('mainAttribute=', state.mainAttribute);
  }, [state.mainAttribute]);

  const handleDataSetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDataSet(event.target.value);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (method: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedMethods(prevState => ({
      ...prevState,
      [method]: event.target.checked,
    }));
  };

  // Placeholder for filtering logic, assuming `originalData` is available
  useEffect(() => {
    // Filter data based on checked methods
    // Update the data used in <FacetPlot> accordingly
  }, [checkedMethods]);

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h3>PDB Data Growth By ...</h3>
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
            <MethodsShownWrapper>
              <MethodsShownText>Methods Shown</MethodsShownText>
              <Form>
                <Form.Check 
                  type="checkbox"
                  id="method1"
                  checked={checkedMethods.xray}
                  onChange={handleCheckboxChange('xray')}
                  label={<StyledFormCheckLabel>X-ray Diffraction</StyledFormCheckLabel>}
                />
                <Form.Check 
                  type="checkbox"
                  id="method2"
                  checked={checkedMethods.electronMicroscopy}
                  onChange={handleCheckboxChange('electronMicroscopy')}
                  label={<StyledFormCheckLabel>Electron Microscopy</StyledFormCheckLabel>}
                />
                <Form.Check 
                  type="checkbox"
                  id="method3"
                  checked={checkedMethods.nmr}
                  onChange={handleCheckboxChange('nmr')}
                  label={<StyledFormCheckLabel>NMR</StyledFormCheckLabel>}
                />
                <Form.Check 
                  type="checkbox"
                  id="method4"
                  checked={checkedMethods.neutronDiffraction}
                  onChange={handleCheckboxChange('neutronDiffraction')}
                  label={<StyledFormCheckLabel>Neutron Diffraction</StyledFormCheckLabel>}
                />
                <Form.Check 
                  type="checkbox"
                  id="method5"
                  checked={checkedMethods.multiMethod}
                  onChange={handleCheckboxChange('multiMethod')}
                  label={<StyledFormCheckLabel>Multi-method</StyledFormCheckLabel>}
                />
                <Form.Check 
                  type="checkbox"
                  id="method6"
                  checked={checkedMethods.other}
                  onChange={handleCheckboxChange('other')}
                  label={<StyledFormCheckLabel>Other</StyledFormCheckLabel>}
                />
              </Form>
            </MethodsShownWrapper>
            <MethodsShownWrapper>
              <MethodsShownText>Data Set</MethodsShownText>
              <Form>
                <Form.Check 
                  type="radio"
                  id="dataset1"
                  name="dataset"
                  value="cumulative"
                  checked={selectedDataSet === 'cumulative'}
                  onChange={handleDataSetChange}
                  label={<StyledFormCheckLabel>Cumulative</StyledFormCheckLabel>}
                />
                <Form.Check 
                  type="radio"
                  id="dataset2"
                  name="dataset"
                  value="releasedAnnually"
                  checked={selectedDataSet === 'releasedAnnually'}
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
              {colorBoxes.map((box, index) => (
                <ColorBoxWrapper key={index}>
                  <ColorBox bgColor={box.color} />
                  <BoxText>{box.label}</BoxText>
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
