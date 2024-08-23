import React, { useState, useEffect } from 'react';
import {  FACET_STORE } from './FacetStore';
import { FacetPlot } from '../../components/FacetPlots/Growth/FacetPlotAssemblySymmetry';
import { ReturnType } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';
import { StatsFacetInterface } from '../../interfaces/StatsFacetInterface';
import { Container, Row, Col, Form } from 'react-bootstrap';
import {RcsbSearchMetadata} from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
import {
    AggregationType,
    Interval
} from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import {
  Article,
} from './GrowthStyles'; 

interface DataGrowthAssemblySymmetryState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
  selectedDataSet: string;
}

const AssemblySymmetry: React.FC = () => {
  const [state, setState] = useState<DataGrowthAssemblySymmetryState>({
    mainAttribute: FACET_STORE[0],
    selectedDataSet: 'cumulative'
  });

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h4>PDB Data Growth By Assemply Symmetry</h4>
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
                  name: `FACET/${RcsbSearchMetadata.RcsbStructSymmetry.Kind.enum['Global Symmetry']}`,
                  aggregation_type: AggregationType.Terms,
                  attribute: "rcsb_struct_symmetry.type",
              }}
              chartType={state.mainAttribute.chartType}
              returnType={ReturnType.Entry}
              chartConfig={state.mainAttribute.chartConfig}
            />
          </Col>
          <Col md={2}>
          </Col>
        </Row>
      </Container>
    </Article>
  ) : null;
};

export default AssemblySymmetry;
