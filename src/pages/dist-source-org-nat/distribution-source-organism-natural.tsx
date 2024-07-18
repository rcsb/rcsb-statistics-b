import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FacetSelector, SelectorRoleType } from '../../components/FacetSelector';
import { ADDITIONAL_FACET_STORE, FACET_STORE } from './FacetStore';
import { FacetPlot } from '../../components/FacetPlot';
import { ReturnType } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';
import { Observer } from 'rxjs';
import { StatsFacetInterface } from '../../interfaces/StatsFacetInterface';

interface DistSourceOrgNatState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
}

const Article = styled.article`
  width: 100%;
  margin: 0 auto;

  canvas {
    margin-left: -100px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const Col = styled.div<{ size: number }>`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  width: ${(props) => (props.size / 12) * 100}%;
`;

const MarginBottomDiv = styled.div`
  margin-bottom: 20px;
`;

const FullWidthCol = styled.div`
  width: 100%;
  padding: 0 15px;
`;

const DistSourceOrgNat: React.FC = () => {
  const [state, setState] = useState<DistSourceOrgNatState>({ mainAttribute: FACET_STORE[0] });

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

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h3>PDB Data Growth By ...</h3>
      <Row>
        <Col size={10}>
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
          />
        </Col>
        <Col size={2}>
          <MarginBottomDiv>
            <FacetSelector
              componentId="main-attribute"
              observer={selectorObserver}
              selectorRole="main"
              facets={FACET_STORE}
            />
            <FacetSelector
              componentId="additional-attribute"
              observer={selectorObserver}
              selectorRole="additional"
              facets={ADDITIONAL_FACET_STORE}
            />
          </MarginBottomDiv>
        </Col>
      </Row>
      <Row>
        <FullWidthCol>
          <Link to="/">All Statistics</Link>
        </FullWidthCol>
      </Row>
    </Article>
  ) : null;
};

export default DistSourceOrgNat;
