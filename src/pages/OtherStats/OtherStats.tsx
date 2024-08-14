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
        <h4>Other Statistics</h4>

        <div>
          <FacetPlot2
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