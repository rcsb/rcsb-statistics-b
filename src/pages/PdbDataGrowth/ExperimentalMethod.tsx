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

interface DataGrowthExpState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
  selectedDataSet: string;
}

const ExperimentalMethod: React.FC = () => {
  const [state, setState] = useState<DataGrowthExpState>({
    mainAttribute: FACET_STORE[0],
    selectedDataSet: 'cumulative'
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


  const handleDataSetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      selectedDataSet: event.target.value,
    }));
  };

  return state.mainAttribute.facet && state.mainAttribute.chartType ? (
    <Article>
      <h4>PDB Data Growth By Experimental Method</h4>
      <Container>
        <Row>
          <Col md={10}>
            <FacetPlot
              // firstDim={{
              //     name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
              //     aggregation_type: AggregationType.DateHistogram,
              //     attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
              //     interval: Interval.Year,
              //     min_interval_population: 0
              // }}
              // secondDim={{
              //     name: `FACET/${RcsbSearchMetadata.Exptl.Method.path}`,
              //     aggregation_type: AggregationType.Terms,
              //     attribute: RcsbSearchMetadata.Exptl.Method.path
              // }}
              firstDim={{
                name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
                aggregation_type: AggregationType.DateHistogram,
                attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
                interval: Interval.Year,
                min_interval_population: 1
            }}
            secondDim={{
              "name": "Experimental Method",
              "aggregation_type": "terms",
              "attribute": "rcsb_entry_info.experimental_method",
              "min_interval_population": 1
            }}
              chartType={state.mainAttribute.chartType}
              returnType={ReturnType.Entry}
              chartConfig={state.mainAttribute.chartConfig}
            />
          </Col>
        </Row>
      </Container>
    </Article>
  ) : null;
};

export default ExperimentalMethod;
