import { useQuery } from '@tanstack/react-query';
import { RcsbSearchMetadata, RcsbSearchAttributeType } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
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
import { metaInfoUtils } from '../config/meta_sanitize';


interface BucketDataType {
    label: string | number;
    population: number;
}

interface BucketDataWithConfig extends BucketDataType {
    objectConfig?: {
        objectId: (string | number)[];
        color: string;
    };
}

const GetOverallStructuresData = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
    const growthObject = metaInfoUtils.getGrowthObject('growth-released-structures');
    const existingFacets = growthObject?.facets?.[0];

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for growth-released-structures');
    }

    const validFacet: AttributeFacetType = {
        name: existingFacets.name,
        aggregation_type: existingFacets.aggregation_type as AggregationType.DateHistogram,
        attribute: existingFacets.attribute as RcsbSearchAttributeType,
        interval: existingFacets.interval as Interval.Year,
        min_interval_population: existingFacets.min_interval_population,
    };


    const overallStructuresQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim: validFacet,
        returnType: ReturnType.Entry
    };

    console.log(overallStructuresQuery);

    return fetchChartDataWithProps(colors, overallStructuresQuery, true);
};

const GetOverallSmallMoleculesData = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
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

    return fetchChartDataWithProps(colors, overallSmallMoleculesQuery, true);
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

const GetMolecularCompositionData = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
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

const GetAssemblySymmetryData = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
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

const GetNumberOfDomainsData = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
    const numberOfDomainsQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim: {
            name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
            aggregation_type: AggregationType.DateHistogram,
            attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
            interval: Interval.Year,
            min_interval_population: 0
        },
        secondDim: {
            "filter": {
                "type": "terminal",
                "service": "text",
                "parameters": {
                  "attribute": "rcsb_polymer_entity_group_membership.aggregation_method",
                  "operator": "exact_match",
                  "value": "matching_uniprot_accession"
                }
              },
              "facets": [
                {
                  "name": "Unique UniProtKB Entries",
                  "aggregation_type": "cardinality",
                  "attribute": "rcsb_polymer_entity_group_membership.group_id"
                }
              ]
        },
        returnType: ReturnType.Entry
    };

    return fetchChartDataWithProps(colors, numberOfDomainsQuery);
};

const GetNumberOfUniqueProtienSequenses = async (colors: string[]): Promise<ChartObjectInterface[][]> => {
    const numberOfDomainsQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim: {
            name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
            aggregation_type: AggregationType.DateHistogram,
            attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
            interval: Interval.Year,
            min_interval_population: 0
        },
        secondDim: {
            "filter": {
                "type": "terminal",
                "service": "text",
                "parameters": {
                  "attribute": "rcsb_polymer_entity_group_membership.aggregation_method",
                  "operator": "exact_match",
                  "value": "matching_uniprot_accession"
                }
              },
              "facets": [
                {
                  "name": "Unique UniProtKB Entries",
                  "aggregation_type": "cardinality",
                  "attribute": "rcsb_polymer_entity_group_membership.group_id"
                }
              ]
        },
        returnType: ReturnType.Entry
    };

    return fetchChartDataWithProps(colors, numberOfDomainsQuery);
};

const fetchChartDataWithProps = async (
    colors: string[],
    props: Omit<FacetPlotInterface, "chartType">,
    isCumulative: boolean = false
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
    const data = buckets[0].data as BucketDataWithConfig[];

    if (isCumulative && data.length > 0) {
        let cumulativeSum = 0;

        const originalDataWithColor = data.map(item => ({
            ...item,
            objectConfig: {
                ...item.objectConfig,
                color: colors[0 % colors.length],
                label: 'Annual',
            }
        }));

        const cumulativeData = data.map(item => {
            cumulativeSum += item.population;
            return {
                ...item,
                population: cumulativeSum,
                objectConfig: {
                    objectId: [item.label, cumulativeSum],
                    color: colors[1 % colors.length],
                    label: 'Cumulative',  
                }
            };
        });

        return [originalDataWithColor, cumulativeData];
    } else if (props.secondDim) {
        return drillFacets(buckets.filter(f => f.name === getFacetName(props.secondDim!)), colors);
    } else {
        return [data.map(d => ({
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

const useGetData = (key: string, parameter?: any) => {
    const { settings } = useSettings();
    const colorSchemeKey = settings.colorScheme.join(''); // Create a unique key based on the color scheme

    type QueryFunction = (colors: string[]) => Promise<ChartObjectInterface[][]>;

    const queryFunctions: Record<string, QueryFunction> = {
        'overall-structures': GetOverallStructuresData,
        'overall-small-molecules': GetOverallSmallMoleculesData,
        'experimental-method': GetExperimentalMethodsData,
        'molecular-composition': GetMolecularCompositionData,
        'assembly-symmetry': GetAssemblySymmetryData,
        'number-of-domains': GetNumberOfDomainsData,
        'unique-protein-sequences': GetNumberOfUniqueProtienSequenses,
    };

    return useQuery({
        queryKey: [key, parameter, colorSchemeKey], // Use colorSchemeKey to force re-fetch when color scheme changes
        queryFn: () => {
            const fetchData = queryFunctions[key];

            if (!fetchData) {
                throw new Error(`Unknown query key: ${key}`);
            }

            return fetchData(settings.colorScheme);
        },
        enabled: !!key,
    });
};


export default useGetData;
