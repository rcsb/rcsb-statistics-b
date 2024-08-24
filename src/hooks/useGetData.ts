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


const GetOverallStructures = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
    const overallStructuresQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim: {
            name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
            aggregation_type: AggregationType.DateHistogram,
            attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
            interval: Interval.Year,
            min_interval_population: 1
        },
        returnType: ReturnType.Entry
    };

    return fetchChartDataWithProps(colors, overallStructuresQuery);
};

const GetOverallSmallMolecules = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
    const overallSmallMoleculesQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim: {
            name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
            aggregation_type: AggregationType.DateHistogram,
            attribute: "rcsb_chem_comp_info.initial_release_date",
            interval: Interval.Year,
            min_interval_population: 1
        },
        returnType: ReturnType.MolDefinition
    };

    return fetchChartDataWithProps(colors, overallSmallMoleculesQuery);
};

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
        returnType: ReturnType.Entry
    };

    return fetchChartDataWithProps(colors, experimentalMethodsQuery);
};

const GetMolecularComposition = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
    const molecularCompositionQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim: {
            name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
            aggregation_type: AggregationType.DateHistogram,
            attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
            interval: Interval.Year,
            min_interval_population: 0
        },
        secondDim: {
            name: `FACET/${RcsbSearchMetadata.Exptl.Method.path}`,
            aggregation_type: AggregationType.Terms,
            attribute: "rcsb_entry_info.selected_polymer_entity_types"
        },
        returnType: ReturnType.Entry
    };

    return fetchChartDataWithProps(colors, molecularCompositionQuery);
};

const GetAssemblySymmetry = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
    const assemblySymmetryQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim: {
            name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
            aggregation_type: AggregationType.DateHistogram,
            attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
            interval: Interval.Year,
            min_interval_population: 0
        },
        secondDim: {
            name: `FACET/${RcsbSearchMetadata.RcsbStructSymmetry.Kind.enum['Global Symmetry']}`,
            aggregation_type: AggregationType.Terms,
            attribute: "rcsb_struct_symmetry.type",
        },
        returnType: ReturnType.Entry
    };

    return fetchChartDataWithProps(colors, assemblySymmetryQuery);
};

const GetNumberOfDomains = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
    const numberOfDomainsQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim: {
            name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
            aggregation_type: AggregationType.DateHistogram,
            attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
            interval: Interval.Year,
            min_interval_population: 0
        },
        secondDim: {
            name: `FACET/Domain Classification`,
            aggregation_type: AggregationType.Terms,
            attribute: "rcsb_polymer_instance_annotation.type",
            min_interval_population: 1,
            facets: [
                {
                    name: "Unique Domains Count",
                    aggregation_type: AggregationType.Cardinality,
                    attribute: "rcsb_polymer_instance_annotation.annotation_id"
                }
            ]
        },
        returnType: ReturnType.Entry
    };

    return fetchChartDataWithProps(colors, numberOfDomainsQuery);
};

const fetchChartDataWithProps = async (
    colors: string[],
    props: Omit<FacetPlotInterface, "chartType">
): Promise<ChartObjectInterface[][]> => {
    const searchQuery: SearchQueryType = props.searchQuery ?? buildAttributeQuery({
        attribute: RcsbSearchMetadata.RcsbEntryInfo.StructureDeterminationMethodology.path,
        value: RcsbSearchMetadata.RcsbEntryInfo.StructureDeterminationMethodology.enum.experimental,
        operator: RcsbSearchMetadata.RcsbEntryInfo.StructureDeterminationMethodology.operator.ExactMatch,
        service: Service.Text
    });

    const facet: AttributeFacetType | FilterFacetType = cloneDeep(props.firstDim);
    if (props.secondDim) {
        buildMultiFacet(props.secondDim, facet);
    }

    const searchRequest: SearchRequestType = buildRequestFromSearchQuery(
        searchQuery,
        props.returnType,
        {
            facets: [facet]
        }
    );

    const queryResults: QueryResult | null = await SearchClient.get().request(searchRequest);
    if (!queryResults) return [[]];
    const buckets = getFacetsFromSearch(queryResults);
    const secondDim = props.secondDim;
    if (secondDim) {
        return drillFacets(buckets.filter(f => f.name === getFacetName(secondDim)), colors);
    } else {
        return [buckets[0].data.map(d => ({
            ...d,
            objectConfig: {
                objectId: [d.label, d.population],
                color: colors[0 % colors.length],
            }
        }))];
    }
};

const drillFacets = (facets: SearchBucketFacetType[], colors: string[]): ChartObjectInterface[][] => {
    const labelSet: Set<string> = new Set();
    const domList: string[] = [];
    const valueMap: Map<string, Map<string, number>> = new Map();
    facets.forEach(f => {
        domList.push(f.labelPath[0]);
        f.data.forEach(d => {
            labelSet.add(d.label.toString());
            if (!valueMap.has(f.labelPath[0])) {
                valueMap.set(f.labelPath[0], new Map());
            }
            valueMap.get(f.labelPath[0])?.set(d.label.toString(), d.population);
        });
    });

    const labelList: string[] = Array.from(labelSet);
    const out: ChartObjectInterface[][] = [];
    labelList.forEach((label, n) => {
        const row: ChartObjectInterface[] = [];
        domList.forEach(dom => {
            if (valueMap.get(dom)?.get(label)) {
                row.push({
                    label: dom,
                    population: valueMap.get(dom)?.get(label) ?? 0,
                    objectConfig: {
                        objectId: [dom, label, valueMap.get(dom)?.get(label)],
                        color: colors[n % colors.length],
                    }
                });
            }
        });
        out.push(row);
    });

    return out;
};

const getFacetName = (facet: AttributeFacetType | FilterFacetType): string => {
    if ('name' in facet) return facet.name;
    if (!facet.facets || facet.facets.length !== 1) throw new Error("Multiple facets are not allowed");
    return getFacetName(facet.facets[0]);
};



const useGetData = (key: string, parameter: any) => {
    const { settings } = useSettings();

    return useQuery({
        queryKey: [key, parameter, settings.colorScheme],
        queryFn: () => {
            if (key === 'experimental-method') {
                return GetExperimentalMethodsData(settings.colorScheme);
            } else if (key === 'molecular-composition') {
                return GetMolecularComposition(settings.colorScheme);
            } else if (key === 'assembly-symmetry') {
                return GetAssemblySymmetry(settings.colorScheme);
            } else if (key === 'number-of-domains') {
                return GetNumberOfDomains(settings.colorScheme);
            } else if (key === 'overall-structures') {
                return GetOverallStructures(settings.colorScheme);
            } else if (key === 'overall-small-molecules') {
                return GetOverallSmallMolecules(settings.colorScheme);
            }

            //overall-structures overall-small-molecules
            // You can add more conditions for other API calls as needed
            throw new Error(`Unknown query key: ${key}`);
        },
        enabled: !!key && !!parameter, // Ensure query is only run if key and parameter are valid
    });
};

export default useGetData;
