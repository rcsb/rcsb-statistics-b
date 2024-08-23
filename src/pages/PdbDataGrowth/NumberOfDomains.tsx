import React, { useState } from 'react';
import { FACET_STORE } from './FacetStore';
import { FacetPlot } from '../../components/FacetPlots/Growth/FacetPlotDomains';
import { ReturnType } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';
import { StatsFacetInterface } from '../../interfaces/StatsFacetInterface';
import { Container, Row, Col } from 'react-bootstrap';
import {RcsbSearchMetadata} from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
import {
    AggregationType,
    Interval
} from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import {ChartType} from "@rcsb/rcsb-charts/lib/RcsbChartComponent/ChartConfigInterface";
import {
  Article,
} from './GrowthStyles'; 

interface DataGrowthNumberOfDomainsState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
  selectedDataSet: string;
}

const NumberOfDomains: React.FC = () => {
  const [state, setState] = useState<DataGrowthNumberOfDomainsState>({
    mainAttribute: FACET_STORE[0],
    selectedDataSet: 'cumulative'
  });

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h4>PDB Data Growth By Number of Domains</h4>
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
                  name: `FACET/Domain Classification`,
                  aggregation_type: AggregationType.Terms,
                  attribute: "rcsb_polymer_instance_annotation.type",
                  min_interval_population: 1,
                  facets: [
                    {
                      "name": "Unique Domains Count",
                      aggregation_type: AggregationType.Cardinality,
                      "attribute": "rcsb_polymer_instance_annotation.annotation_id"
                    }
                  ]
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

export default NumberOfDomains;
