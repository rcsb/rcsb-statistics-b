import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RcsbSearchMetadata } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
import experimentalMethodsData from '../pages/PdbDataDistribution/experimentalMethodsData';
import { AggregationType, Interval } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';
import { ChartObjectInterface } from "@rcsb/rcsb-charts/lib/RcsbChartComponent/ChartConfigInterface";

const fetchExperimentalMethodsData = async (): Promise<ChartObjectInterface[][]> => {
  const payload = {
    "request_info": {
      "src": "ui",
      "query_id": "b708678a79cadf5347c0f1dbf41f6e0a"
    },
    "return_type": "entry",
    "request_options": {
      "paginate": {
        "start": 0,
        "rows": 0
      },
      "results_content_type": [
        "experimental"
      ],
      "facets": [
        {
          name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
          aggregation_type: AggregationType.DateHistogram,
          attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
          interval: Interval.Year,
          min_interval_population: 1
        },
        {
          name: `FACET/${RcsbSearchMetadata.Exptl.Method.path}`,
          aggregation_type: AggregationType.Terms,
          attribute: "rcsb_entry_info.experimental_method",
          min_interval_population: 1
        }
      ]
    }
  };
  
  const headers = {
    'Rcsb-Analytics-Traffic-Origin': 'internal',
    'Rcsb-Analytics-Traffic-Stage': 'development',
    'Content-Type': 'application/json'
  };

  const response = await axios.post('https://search.rcsb.org/rcsbsearch/v2/query?json=', payload, { headers });

  console.log("response data", response);

  return experimentalMethodsData;
};

const useGetExperimentalMethodsData = () => {
  return useQuery({
    queryKey: ['experimentalMethodsData'],
    queryFn: fetchExperimentalMethodsData,
  });
};

export default useGetExperimentalMethodsData;
