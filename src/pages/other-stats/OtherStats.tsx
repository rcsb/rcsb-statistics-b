import React from 'react';
import {RcsbSearchMetadata} from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
import {
    AggregationType,
    Interval
} from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import { ReturnType } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import {ChartType} from "@rcsb/rcsb-charts/lib/RcsbChartComponent/ChartConfigInterface";
import { FacetPlot2 } from '../../components/FacetPlot2';

const OtherStats: React.FC = () => {

  return (
      <article className="col-12">
        <h2>Other Statistics</h2>

        <div>
          <FacetPlot2
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
            chartType={ChartType.histogram}
            returnType={ReturnType.Entry}
            chartConfig={{
                  tooltipText: (d)=>{
                      return d.id?.join(" ");
                  },
                  chartDisplayConfig: {
                      constWidth: 1200,
                      constHeight: 600
                  },
                  domainMinValue: 1980,
            }}
          />

        </div>

      </article>
  );
};

export default OtherStats;