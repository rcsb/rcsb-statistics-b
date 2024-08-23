import React, { useState  } from 'react';
import { FACET_STORE } from './FacetStore';
import { FacetPlot } from '../../components/FacetPlots/Growth/FacetPlotOverallSmallMol';
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

interface DataGrowthExpState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
  selectedDataSet: string;
}

const OverallSmallMolecules: React.FC = () => {
  const [state, setState] = useState<DataGrowthExpState>({
    mainAttribute: FACET_STORE[0],
    selectedDataSet: 'cumulative'
  });

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h4>PDB Data Overall Growth of Small Molecules </h4>
      <Container>
        <Row>
          <Col md={10}>
            <FacetPlot
              firstDim={{
                  name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
                  aggregation_type: AggregationType.DateHistogram,
                  attribute: "rcsb_chem_comp_info.initial_release_date",
                  interval: Interval.Year,
                  min_interval_population: 1
              }}
              chartType={state.mainAttribute.chartType}
              returnType={ReturnType.MolDefinition}
              chartConfig={state.mainAttribute.chartConfig}
            />
          </Col>
        </Row>
      </Container>
    </Article>
  ) : null;
};

export default OverallSmallMolecules;
