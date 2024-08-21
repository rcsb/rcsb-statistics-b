import React, { useState, useEffect } from 'react';
import { FacetSelector, SelectorRoleType } from '../../components/FacetSelector';
import { FacetCheckbox, CheckboxRoleType } from '../../components/FacetCheckbox';
import { ADDITIONAL_FACET_STORE, FACET_STORE } from './FacetStore';
import { FacetPlot } from '../../components/FacetPlots';
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
import {
  Article,
} from './GrowthStyles'; 

interface DataGrowthMolecularCompState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
  selectedDataSet: string;
}

const MolecularComposition: React.FC = () => {
  const [state, setState] = useState<DataGrowthMolecularCompState>({
    mainAttribute: FACET_STORE[0],
    selectedDataSet: 'cumulative'
  });

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h4>PDB Data Growth By Molecular Composition</h4>
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
                  attribute: "rcsb_entry_info.selected_polymer_entity_types"
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

export default MolecularComposition;
