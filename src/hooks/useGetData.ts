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
import { useDataQuery } from '../contexts/QueryContext'; 
import { metaInfoUtils, createSearchUrlFromObj } from '../config/chartMetaData';
import { MetaInfo, Facet as MetaInfoFacet, RefUrl } from '../../src/interfaces/MetaInfoTypes';

interface BucketDataType {
    label: string | number;
    population: number;
}
interface BucketDataWithConfig extends BucketDataType {
    objectConfig?: {
        objectId: (string | number)[];
        color: string;
        label?: string;
        url?: string;
    };
}
interface ExtendedChartObjectInterface extends ChartObjectInterface {
    objectConfig?: {
        objectId?: (string | number)[];
        color?: string;
        label?: string;
        url?: string;
    };
}
interface ChartObjectDetails {
    existingFacets?: MetaInfoFacet;
    ref_url?: RefUrl; 
}

const getGrowthObjectDetails = (chartObjectType: string): ChartObjectDetails => {
    const growthObject: MetaInfo | undefined = metaInfoUtils.getGrowthObject(chartObjectType);
    const existingFacets = growthObject?.facets?.[0];
    const ref_url = growthObject?.ref_url;

    return { existingFacets, ref_url };
};
const getDistributionObjectDetails = (chartObjectType: string): ChartObjectDetails => {
    const distributionObject: MetaInfo | undefined = metaInfoUtils.getDistributionObject(chartObjectType);
    const existingFacets = distributionObject?.facets?.[0];
    const ref_url = distributionObject?.ref_url;

    return { existingFacets, ref_url };
};

function fetchData(searchRequest: any): Promise<any> {
    const url = 'https://search.rcsb.org/rcsbsearch/v2/query';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchRequest)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}


/// GROWTH DATA /////////////////////////////////////////////////////////////////////////////////////////////////////////
const GetOverallStructuresData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getGrowthObjectDetails('growth-released-structures');

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

    return fetchChartDataWithProps(colors, overallStructuresQuery, false, ref_url, setProperty);
};
const GetOverallSmallMoleculesData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getGrowthObjectDetails('overall-small-molecules');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for overall-small-molecules');
    }

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

    return fetchChartDataWithProps(colors, overallSmallMoleculesQuery, false, ref_url, setProperty);
};
const GetExperimentalMethodsData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getGrowthObjectDetails('experimental-method');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for experimental-method');
    }

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

    return fetchChartDataWithProps(colors, experimentalMethodsQuery, false, ref_url, setProperty);
};
const GetMolecularCompositionData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getGrowthObjectDetails('molecular-composition');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for molecular-composition');
    }

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

    return fetchChartDataWithProps(colors, molecularCompositionQuery, false, ref_url, setProperty);
};
const GetAssemblySymmetryData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getGrowthObjectDetails('assembly-symmetry');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for assembly-symmetry');
    }

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

    return fetchChartDataWithProps(colors, assemblySymmetryQuery, false, ref_url, setProperty);
};
const GetNumberOfDomainsData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getGrowthObjectDetails('number-of-domains');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for number-of-domains');
    }

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

    return fetchChartDataWithProps(colors, numberOfDomainsQuery, false, ref_url, setProperty);
};
const GetNumberOfUniqueProtienSequences = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getGrowthObjectDetails('unique-protein-sequences');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for unique-protein-sequences');
    }

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

    return fetchChartDataWithProps(colors, numberOfDomainsQuery, false, ref_url, setProperty);
};


/// DISTRIBUTION DATA /////////////////////////////////////////////////////////////////////////////////////////////////////////
const GetResolutionData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-resolution');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for distribution-resolution');
    }

    const resolutionQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Resolution Combined",
            "aggregation_type": "range",
            "attribute": "rcsb_entry_info.resolution_combined",
            "ranges": [
              {
                "to": 1
              },
              {
                "from": 2,
                "to": 2.2
              },
              {
                "from": 2.2,
                "to": 2.4
              },
              {
                "from": 4.6
              }
            ]
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, resolutionQuery, false, ref_url, setProperty);
};
const GetRFreeData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-r-free');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for distribution-r-free');
    }

    const rFreeQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "R-free",
            "aggregation_type": "range",
            "attribute": "refine.ls_R_factor_R_free",
            "ranges": [
              {
                "to": 0.14
              },
              {
                "from": 0.14,
                "to": 0.15
              },
              {
                "from": 0.15,
                "to": 0.16
              },
              {
                "from": 0.32
              }
            ]
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, rFreeQuery, false, ref_url, setProperty);
};
const GetMolecularWeightStructureData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-molecular-weight-structure');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for distribution-molecular-weight-structure');
    }

    const molecularWeightStructureQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Molecular Weight",
            "aggregation_type": "range",
            "attribute": "rcsb_entry_info.molecular_weight",
            "ranges": [
              {
                "to": 20
              },
              {
                "from": 20,
                "to": 40
              },
              {
                "from": 40,
                "to": 60
              },
              {
                "from": 380
              }
            ]
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, molecularWeightStructureQuery, false, ref_url, setProperty);
};
const GetAtomCountData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-atom-count');

    if (!existingFacets) {
        throw new Error('Facets are missing or distribution-atom-count');
    }

    const atomCountQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Atom Count",
            "aggregation_type": "range",
            "attribute": "rcsb_entry_info.deposited_atom_count",
            "ranges": [
              {
                "to": 1000
              },
              {
                "from": 1000,
                "to": 2000
              },
              {
                "from": 2000,
                "to": 3000
              },
              {
                "from": 19000
              }
            ]
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, atomCountQuery, false, ref_url, setProperty);
};
const GetResidueCountData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-residue-count');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for distribution-residue-count');
    }


    const residueCountQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Residue Count",
            "aggregation_type": "range",
            "attribute": "rcsb_entry_info.deposited_polymer_monomer_count",
            "ranges": [
              {
                "to": 100
              },
              {
                "from": 100,
                "to": 200
              },
              {
                "from": 200,
                "to": 300
              },
              {
                "from": 1900
              }
            ]
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, residueCountQuery, false, ref_url, setProperty);
};
const GetNaturalSourceOrganism = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-source-organism-natural');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for source-organism');
    }


    const naturalSourceOrganismQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Source Type",
            "aggregation_type": "terms",
            "attribute": "rcsb_entity_source_organism.source_type",
            "min_interval_population": 1,
            "facets": [
              {
                "name": "Source Type",
                "aggregation_type": "terms",
                "attribute": "rcsb_entity_source_organism.source_type",
                "min_interval_population": 1,
                "facets": [
                  {
                    "name": "Source Organism",
                    "aggregation_type": "terms",
                    "attribute": "rcsb_entity_source_organism.ncbi_scientific_name",
                    "min_interval_population": 1,
                    "max_num_intervals": 20
                  },
                  {
                    "name": "Source Organism Count",
                    "aggregation_type": "cardinality",
                    "attribute": "rcsb_entity_source_organism.ncbi_scientific_name"
                  }
                ]
              }
            ]
          },
        returnType: ReturnType.PolymerEntity
    };

    return fetchDistributionChartDataWithProps(colors, naturalSourceOrganismQuery, false, ref_url, setProperty);
};
const GetTaxonomyData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('taxonomy');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for taxonomy');
    }


    const taxonomyQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Taxonomy",
            "aggregation_type": "terms",
            "attribute": "rcsb_entity_source_organism.ncbi_parent_scientific_name",
            "min_interval_population": 1,
            "max_num_intervals": 20
          },
        returnType: ReturnType.PolymerEntity
    };

    return fetchDistributionChartDataWithProps(colors, taxonomyQuery, false, ref_url, setProperty);
};
const GetSoftwareData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-software');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for distribution-software');
    }


    const softwareQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Processing Software",
            "aggregation_type": "terms",
            "attribute": "rcsb_entry_info.software_programs_combined",
            "min_interval_population": 1,
            "max_num_intervals": 20
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, softwareQuery, false, ref_url, setProperty);
};
const GetSpaceGroupData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-space-group');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for distribution-space-group');
    }


    const spaceGroupQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Space Groups",
            "aggregation_type": "terms",
            "attribute": "symmetry.space_group_name_H_M",
            "min_interval_population": 1,
            "max_num_intervals": 20
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, spaceGroupQuery, false, ref_url, setProperty);
};
const GetJournalData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-journal');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for distribution-journal');
    }


    const journalQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Publication Journal",
            "aggregation_type": "terms",
            "attribute": "rcsb_primary_citation.rcsb_journal_abbrev",
            "min_interval_population": 1,
            "max_num_intervals": 20
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, journalQuery, false, ref_url, setProperty);
};
const GetStructuralGenomicCentersData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('distribution-structural-genomics-centers');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for distribution-structural-genomics-centers');
    }


    const GetStructuralGenomicsCentersQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "name": "Structural Genomics Centers",
            "aggregation_type": "terms",
            "attribute": "pdbx_SG_project.full_name_of_center",
            "min_interval_population": 1,
            "max_num_intervals": 20
          },
        returnType: ReturnType.Entry
    };

    return fetchDistributionChartDataWithProps(colors, GetStructuralGenomicsCentersQuery, false, ref_url, setProperty);
};
const GetEnzymeClassificationNameData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('enzyme-classification-name');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for enzyme-classification-name');
    }

    const enzymeClassificationNameQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "filter": {
                "type": "terminal",
                "service": "text",
                "parameters": {
                  "attribute": "rcsb_polymer_entity.rcsb_ec_lineage.depth",
                  "operator": "equals",
                  "value": 1
                }
              },
              "facets": [
                {
                  "name": "Enzyme Classification",
                  "aggregation_type": "terms",
                  "attribute": "rcsb_polymer_entity.rcsb_ec_lineage.name",
                  "min_interval_population": 1,
                  "max_num_intervals": 20
                }
              ]
          },
        returnType: ReturnType.PolymerEntity
    };

    return fetchDistributionChartDataWithProps(colors, enzymeClassificationNameQuery, false, ref_url, setProperty);
};
const GetAssemblySymmetryDistData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('assembly-symmetry-dist');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for assembly-symmetry-dist');
    }

    const assemblySymmetryQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "filter": {
                "type": "terminal",
                "service": "text",
                "parameters": {
                  "attribute": "rcsb_struct_symmetry.kind",
                  "operator": "exact_match",
                  "value": "Global Symmetry"
                }
              },
              "facets": [
                {
                  "name": "Global Symmetry",
                  "aggregation_type": "terms",
                  "attribute": "rcsb_struct_symmetry.type",
                  "min_interval_population": 1
                }
              ]
          },
        returnType: ReturnType.Assembly
    };

    return fetchDistributionChartDataWithProps(colors, assemblySymmetryQuery, false, ref_url, setProperty);
};
const GetScopClassificationData = async (colors: string[], setProperty: (key: string, value: any) => void): Promise<ChartObjectInterface[][]>  => {
    const { existingFacets, ref_url } = getDistributionObjectDetails('scop-classification');

    if (!existingFacets) {
        throw new Error('Facets are missing or invalid for scop-classification');
    }

    const GetScopClassificationQuery: Omit<FacetPlotInterface, "chartType"> = {
        firstDim:       {
            "filter": {
                "type": "terminal",
                "service": "text",
                "parameters": {
                  "attribute": "rcsb_polymer_instance_annotation.type",
                  "operator": "exact_match",
                  "value": "SCOP"
                }
              },
              "facets": [
                {
                  "filter": {
                    "type": "terminal",
                    "service": "text",
                    "parameters": {
                      "attribute": "rcsb_polymer_instance_annotation.annotation_lineage.depth",
                      "operator": "equals",
                      "value": 1
                    }
                  },
                  "facets": [
                    {
                      "name": "SCOP Classification",
                      "aggregation_type": "terms",
                      "attribute": "rcsb_polymer_instance_annotation.annotation_lineage.name",
                      "min_interval_population": 1,
                      "max_num_intervals": 20
                    }
                  ]
                }
              ]
          },
        returnType: ReturnType.PolymerEntity
    };

    return fetchDistributionChartDataWithProps(colors, GetScopClassificationQuery, false, ref_url, setProperty);
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fetchChartDataWithProps = async (
    colors: string[],
    props: Omit<FacetPlotInterface, "chartType">,
    isCumulative: boolean = false,
    ref_url: any,
    setProperty: (key: string, value: any) => void 
): Promise<ExtendedChartObjectInterface[][]> => {
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

    setProperty('searchRequest', searchRequest);

    const queryResults = await fetchData(searchRequest);
    
    if (!queryResults) return [[]];

    const buckets = getFacetsFromSearch(queryResults);
    const data = buckets[0].data as BucketDataWithConfig[];

    if (isCumulative && data.length > 0) {
        let cumulativeSum = 0;

        const originalDataWithColor = data.map(item => {
            const searchUrl = createSearchUrlFromObj(ref_url, item.label, props.returnType);
            return {
                ...item,
                objectConfig: {
                    ...item.objectConfig,
                    color: colors[0 % colors.length],
                    label: 'Annual',
                    url: searchUrl
                }
            };
        });

        const cumulativeData = data.map(item => {
            cumulativeSum += item.population;
            const searchUrl = createSearchUrlFromObj(ref_url, item.label, props.returnType);
            return {
                ...item,
                population: cumulativeSum,
                objectConfig: {
                    objectId: [item.label, cumulativeSum],
                    color: colors[1 % colors.length],
                    label: 'Cumulative',
                    url: searchUrl
                }
            };
        });

        return [originalDataWithColor, cumulativeData];
    } else if (props.secondDim) {
        return drillFacets(buckets.filter(f => f.name === getFacetName(props.secondDim!)), colors, ref_url); 
    } else {
        return [data.map(d => {
            const searchUrl = createSearchUrlFromObj(ref_url, d.label, props.returnType); 
            return {
                ...d,
                objectConfig: {
                    objectId: [d.label, d.population],
                    color: colors[0 % colors.length],
                    url: searchUrl 
                }
            };
        })];
    }
};

const fetchDistributionChartDataWithProps = async (
    colors: string[],
    props: Omit<FacetPlotInterface, "chartType">,
    isCumulative: boolean = false,
    ref_url: any,
    setProperty: (key: string, value: any) => void 
): Promise<ExtendedChartObjectInterface[][]> => {
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

    setProperty('searchRequest', searchRequest);

    return fetchData(searchRequest)
    .then(queryResults => {

        if (!queryResults) return [[]];
        const buckets = getFacetsFromSearch(queryResults);
        const data = buckets[0].data as BucketDataWithConfig[];
    
        if (props.secondDim) {
            return drillFacets(buckets.filter(f => f.name === getFacetName(props.secondDim!)), colors, ref_url); 
        } else {
            return [data.map(d => {
                const searchUrl = createSearchUrlFromObj(ref_url, d.label, props.returnType); 
                return {
                    ...d,
                    objectConfig: {
                        objectId: [d.label, d.population],
                        color: colors[0 % colors.length],
                        url: searchUrl 
                    }
                };
            })];
        }

    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};


const drillFacets = (facets: SearchBucketFacetType[], colors: string[], ref_url: any): ExtendedChartObjectInterface[][] => {
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
    const out: ExtendedChartObjectInterface[][] = [];
    labelList.forEach((label, n) => {
        const row: ExtendedChartObjectInterface[] = [];
        domList.forEach(dom => {
            if (valueMap.get(dom)?.get(label) !== undefined) {
                const searchUrl = createSearchUrlFromObj(ref_url, label, 'Entry'); // Generate the URL using ref_url
                
                // Ensure objectId array contains only string | number values
                row.push({
                    label: dom,
                    population: valueMap.get(dom)?.get(label) ?? 0,
                    objectConfig: {
                        objectId: [dom, label, valueMap.get(dom)?.get(label) ?? 0], // Ensure default to 0
                        color: colors[n % colors.length],
                        url: searchUrl, // Attach the generated URL
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
    const { setProperty } = useDataQuery(); 
    const colorSchemeKey = settings.colorScheme.join('');

    type QueryFunction = (
        colors: string[], 
        setProperty: (key: string, value: any) => void
    ) => Promise<ChartObjectInterface[][]>;

    const queryFunctions: Record<string, QueryFunction> = {
        'overall-structures': GetOverallStructuresData,
        'overall-small-molecules': GetOverallSmallMoleculesData,
        'experimental-method': GetExperimentalMethodsData,
        'molecular-composition': GetMolecularCompositionData,
        'assembly-symmetry': GetAssemblySymmetryData,
        'number-of-domains': GetNumberOfDomainsData,
        'unique-protein-sequences': GetNumberOfUniqueProtienSequences,
        'distribution-resolution': GetResolutionData,
        'distribution-r-free': GetRFreeData,
        'distribution-molecular-weight-structure': GetMolecularWeightStructureData,
        'distribution-atom-count': GetAtomCountData,
        'distribution-residue-count': GetResidueCountData,
        'distribution-source-organism-natural':  GetNaturalSourceOrganism,
        'taxonomy': GetTaxonomyData,
        'distribution-software': GetSoftwareData,
        'distribution-space-group': GetSpaceGroupData,
        'distribution-journal': GetJournalData,
        'distribution-structural-genomics-centers': GetStructuralGenomicCentersData,
        'enzyme-classification-name': GetEnzymeClassificationNameData,
        'assembly-symmetry-dist': GetAssemblySymmetryDistData,
        'scop-classification': GetScopClassificationData
    };

    return useQuery({
        queryKey: [key, parameter, colorSchemeKey],
        queryFn: () => {
            const fetchData = queryFunctions[key];

            if (!fetchData) {
                throw new Error(`Unknown query key: ${key}`);
            }

            return fetchData(settings.colorScheme, setProperty);
        },
        enabled: !!key,
    });
};


export default useGetData;
