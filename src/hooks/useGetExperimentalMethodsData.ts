import { useQuery } from '@tanstack/react-query';
import { RcsbSearchMetadata } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
import { AggregationType, Interval } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';
import { ChartObjectInterface } from "@rcsb/rcsb-charts/lib/RcsbChartComponent/ChartConfigInterface";
import { getFacetsFromSearch } from "@rcsb/rcsb-search-tools/lib/SearchParseTools/SearchFacetTools";
import { buildAttributeQuery, buildMultiFacet, buildRequestFromSearchQuery } from "@rcsb/rcsb-search-tools/lib/SearchQueryTools/SearchQueryTools";
import { FacetPlotInterface } from "../../src/interfaces/FacetPlotInterface";
import { SearchQueryType, SearchRequestType } from "@rcsb/rcsb-search-tools/lib/SearchQueryTools/SearchQueryInterfaces";
import { Service } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import { AttributeFacetType, FilterFacetType, SearchBucketFacetType } from "@rcsb/rcsb-search-tools/lib/SearchParseTools/SearchFacetInterface";
import { cloneDeep } from "lodash";
import { QueryResult } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchResultInterface";
import { SearchClient } from "@rcsb/rcsb-search-tools/lib/SearchClient/SearchClient";
import { ReturnType } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import { useSettings } from '../../src/contexts/SettingsContext';

const GetExperimentalMethodsData = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
  const experimentalMethodsQuery: Omit<FacetPlotInterface, "chartType"> = {
    firstDim: {
      name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
      aggregation_type: 'date_histogram' as const,
      attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
      interval: Interval.Year,
      min_interval_population: 1
    },
    secondDim: {
      name: `FACET/${RcsbSearchMetadata.Exptl.Method.path}`,
      aggregation_type: AggregationType.Terms,
      attribute: "rcsb_entry_info.experimental_method",
      min_interval_population: 1
    },
    returnType:ReturnType.Entry
  };

  async function chartFacets(props: Omit<FacetPlotInterface, "chartType">): Promise<ChartObjectInterface[][]> {
    const searchQuery: SearchQueryType = props.searchQuery ?? buildAttributeQuery({
      attribute: RcsbSearchMetadata.RcsbEntryInfo.StructureDeterminationMethodology.path,
      value: RcsbSearchMetadata.RcsbEntryInfo.StructureDeterminationMethodology.enum.experimental,
      operator: RcsbSearchMetadata.RcsbEntryInfo.StructureDeterminationMethodology.operator.ExactMatch,
      service: Service.Text
    });

    const facet: AttributeFacetType | FilterFacetType = cloneDeep(props.firstDim);
    if (props.secondDim)
      buildMultiFacet(props.secondDim, facet);

    const searchRequest: SearchRequestType = buildRequestFromSearchQuery(
      searchQuery,
      props.returnType,
      {
        facets: [facet]
      }
    );

    const queryResults: QueryResult | null = await SearchClient.get().request(searchRequest);
    if (!queryResults)
      return [[]];
    const buckets = getFacetsFromSearch(queryResults);
    const secondDim = props.secondDim;
    if (secondDim)
      return drillFacets(buckets.filter(f => f.name === getFacetName(secondDim)));
    else
      return [buckets[0].data.map(d => ({
        ...d,
        objectConfig: {
          objectId: [d.label, d.population]
        }
      }))];
  }

  function drillFacets(facets: SearchBucketFacetType[]): ChartObjectInterface[][] {
    const labelSet: Set<string> = new Set();
    const domList: string[] = [];
    const valueMap: Map<string, Map<string, number>> = new Map();
    facets.forEach(f => {
      domList.push(f.labelPath[0]);
      f.data.forEach(d => {
        labelSet.add(d.label.toString());
        if (!valueMap.has(f.labelPath[0]))
          valueMap.set(f.labelPath[0], new Map());
        valueMap.get(f.labelPath[0])?.set(d.label.toString(), d.population);
      });
    });

    const labelList: string[] = Array.from(labelSet);
    const out: ChartObjectInterface[][] = [];
    labelList.forEach((label, n) => {
      const row: ChartObjectInterface[] = [];
      domList.forEach(dom => {
        if (valueMap.get(dom)?.get(label))
          row.push({
            label: dom,
            population: valueMap.get(dom)?.get(label) ?? 0,
            objectConfig: {
              objectId: [dom, label, valueMap.get(dom)?.get(label)],
               color: colors[n % colors.length], // Use colors from settings
            }
          });
      });
      out.push(row);
    });

    return out;
  }

  function getFacetName(facet: AttributeFacetType | FilterFacetType): string {
    if ('name' in facet)
      return facet.name;
    if (!facet.facets || facet.facets.length !== 1)
      throw new Error("Multiple facets are not allowed");
    return getFacetName(facet.facets[0]);
  }

  const data = await chartFacets(experimentalMethodsQuery);

  return data;
};

const useGetExperimentalMethodsData = () => {
  const { settings } = useSettings();
  console.log("settings.colorScheme", settings.colorScheme);

  return useQuery({
    queryKey: ['experimentalMethodsData'],
    queryFn: () => GetExperimentalMethodsData(settings.colorScheme),
  });
};

export default useGetExperimentalMethodsData;
