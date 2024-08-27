import { MetaInfo, RefUrl, Facet } from '../interfaces/MetaInfoTypes';
import { findObjectInArrayByKey, findQueryObjectInArrayByKey } from '../utils/utils';
import { RcsbSearchMetadata } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
import { AggregationType, Interval, ReturnType } from '@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums';


export const statsDataMetaInfo: MetaInfo[] = [
  {
    key: 'summary',
    title: 'by Experimental Method and Molecular Type',
    description: 'PDB Data Distribution by Experimental Method and Molecular Type',
    request_options: {
      facets: [
        {
          name: 'rcsb_entry_info.experimental_method',
          aggregation_type: 'terms',
          attribute: 'rcsb_entry_info.experimental_method',
          facets: [
            {
              name: 'rcsb_entry_info.selected_polymer_entity_types',
              aggregation_type: 'terms',
              attribute: 'rcsb_entry_info.selected_polymer_entity_types',
            },
          ],
        },
      ],
      paginate: {
        start: 0,
        rows: 0,
      },
    },
  },
  {
    key: 'distribution-source-organism-natural',
    title: 'by Natural Source Organism',
    description: 'PDB Data Distribution by Natural Source Organism',
    header_label: 'Natural Source Organism',
    stats_notes: 'Source organism for these structures is from a natural, non-modified source.',
    header_label_sort: 'alphabetical',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entity_source_organism.ncbi_scientific_name',
            operator: 'exact_match',
          },
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entity_source_organism.source_type',
            operator: 'exact_match',
            value: 'natural',
          },
        },
      ],
    },
    facets: [
      {
        name: 'rcsb_entity_source_organism.ncbi_scientific_name',
        aggregation_type: 'terms',
        attribute: 'rcsb_entity_source_organism.ncbi_scientific_name',
        filter: {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entity_source_organism.source_type',
            operator: 'exact_match',
            value: 'natural',
          },
        },
        min_interval_population: 1,
      },
    ],
  },  
  {
    key: 'distribution-modified-organism-gene',
    title: 'by Engineered Source Organism',
    description: 'PDB Data Distribution by Engineered Source Organism',
    header_label: 'Engineered Source Organism',
    stats_notes: 'Source organism for these structures is from a genetically manipulated source.',
    header_label_sort: 'alphabetical',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entity_source_organism.ncbi_scientific_name',
            operator: 'exact_match',
            value: 'Homo sapiens',
          },
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entity_source_organism.source_type',
            operator: 'exact_match',
            value: 'genetically engineered',
          },
        },
      ],
    },
    facets: [
      {
        name: 'rcsb_entity_source_organism.ncbi_scientific_name',
        aggregation_type: 'terms',
        attribute: 'rcsb_entity_source_organism.ncbi_scientific_name',
        filter: {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entity_source_organism.source_type',
            operator: 'exact_match',
            value: 'genetically engineered',
          },
        },
        min_interval_population: 1,
      },
    ],
  },
  
  {
    key: 'distribution-expression-organism-gene',
    title: 'by Expression System Organism',
    description: 'PDB Data Distribution by Expression System Organism',
    header_label: 'Expression System Organism',
    stats_notes: 'Expression organism for these structures is from a genetically manipulated source.',
    header_label_sort: 'alphabetical',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entity_host_organism.ncbi_scientific_name',
            operator: 'exact_match',
          },
        },
      ],
    },
    facets: [
      {
        name: 'rcsb_entity_host_organism.ncbi_scientific_name',
        aggregation_type: 'terms',
        attribute: 'rcsb_entity_host_organism.ncbi_scientific_name',
        min_interval_population: 1,
      },
    ],
  },
  {
    key: 'distribution-resolution',
    title: 'by Resolution',
    description: 'PDB Data Distribution by Resolution',
    header_label: 'Resolution (&#8491;ngstrom)',
    stats_notes:
      'Distribution by structure <a target=\'_blank\' href=\'https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/crystallographic-data\'>resolution</a>. Data shown include structures solved by X-ray crystallography or electron microscopy.',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.resolution_combined',
            operator: 'range',
          },
        },
      ],
    },
    facets: getRangeFacets('rcsb_entry_info.resolution_combined', 1, 4.6, 0.2, true),
  },
  {
    key: 'distribution-software',
    title: 'by Software',
    description: 'PDB Data Distribution by Processing Software',
    header_label: 'Software Used',
    stats_notes: 'Data shown include structures solved by any experiment methods.',
    header_label_sort: 'alphabetical',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.software_programs_combined',
            operator: 'exact_match',
          },
        },
      ],
    },
    facets: [
      {
        name: 'rcsb_entry_info.software_programs_combined',
        aggregation_type: 'terms',
        attribute: 'rcsb_entry_info.software_programs_combined',
        min_interval_population: 1,
      },
    ],
  },
  {
    key: 'distribution-r-free',
    title: 'by R-free',
    description: 'PDB Data Distribution by R-free',
    header_label: 'R-free (%)',
    stats_notes:
      'Distribution of PDB structures by <a target=\'_blank\' href=\'https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/crystallographic-data\'>R-free</a>. Data shown include structures solved by X-ray crystallography or electron microscopy.',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'refine.ls_R_factor_R_free',
            operator: 'range',
          },
        },
      ],
    },
    facets: getRangeFacets('refine.ls_R_factor_R_free', 0.14, 0.32, 0.01, true),
  },
  {
    key: 'distribution-space-group',
    title: 'by Space Group',
    description: 'PDB Data Distribution by Space Group',
    header_label: 'Space Group',
    stats_notes: 'Distribution of Hermann-Mauguin Space Groups of released structures in the PDB.',
    header_label_sort: 'alphabetical',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'symmetry.space_group_name_H_M',
            operator: 'exact_match',
          },
        },
      ],
    },
    facets: [
      {
        name: 'symmetry.space_group_name_H_M',
        aggregation_type: 'terms',
        attribute: 'symmetry.space_group_name_H_M',
        min_interval_population: 1,
      },
    ],
  },
  {
    key: 'distribution-journal',
    title: 'by Journal',
    description: 'PDB Data Distribution by Journal',
    header_label: 'Journal',
    stats_notes: 'Distribution by journal for the primary reference associated with a structure.',
    header_label_sort: 'alphabetical',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_primary_citation.rcsb_journal_abbrev',
            operator: 'exact_match',
          },
        },
      ],
    },
    facets: [
      {
        name: 'rcsb_primary_citation.rcsb_journal_abbrev',
        aggregation_type: 'terms',
        attribute: 'rcsb_primary_citation.rcsb_journal_abbrev',
        min_interval_population: 1,
      },
    ],
  },
  {
    key: 'distribution-molecular-weight-structure',
    title: 'by Molecular Weight (Structure)',
    description: 'PDB Data Distribution by Molecular Weight (Structure)',
    header_label: 'Molecular Weight (Daltons)',
    stats_notes:
      'All macromolecules, small molecules, and ions are included, except for water molecules. Molecular weight is calculated for all atoms, including those not observed in the experiment. Molecular weight of all non-water atoms in the <a target=\'_blank\' href=\'https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/biological-assemblies\'>asymmetric unit</a>.',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.molecular_weight',
            operator: 'range',
          },
        },
      ],
    },
    facets: getRangeFacets('rcsb_entry_info.molecular_weight', 20, 380, 20, false),
  },
  {
    key: 'distribution-molecular-weight-entity',
    title: 'by Molecular Weight (Entity)',
    description: 'PDB Data Distribution by Molecular Weight (Entity)',
    header_label: 'Molecular Weight (Daltons)',
    stats_notes: 'Molecular weight is calculated for each chemically distinct component of a PDB structure, e.g. protein, nucleic acid.',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_polymer_entity.formula_weight',
            operator: 'range',
          },
        },
      ],
    },
    return_type: 'polymer_entity',
    facets: getRangeFacets('rcsb_polymer_entity.formula_weight', 5, 75, 5, false),
  },
  {
    key: 'distribution-atom-count',
    title: 'by Atom Count',
    description: 'PDB Data Distribution by Atom Count',
    header_label: 'Atom Count Range',
    stats_notes: 'Distribution of released structures by the number of observed atoms excluding atoms in water molecules.',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.deposited_atom_count',
            operator: 'range',
          },
        },
      ],
    },
    facets: getRangeFacets('rcsb_entry_info.deposited_atom_count', 1000, 19000, 1000, false),
  },
  {
    key: 'distribution-residue-count',
    title: 'by Residue Count',
    description: 'PDB Data Distribution by Residue Count',
    header_label: 'Residue Count Range',
    stats_notes:
      'Distribution of released structures by the number of residues in macromolecules. All residues specified in macromolecular chains (i.e. full sequence) are counted even if not all of them are observed in the structure.',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.deposited_polymer_monomer_count',
            operator: 'range',
          },
        },
      ],
    },
    facets: getRangeFacets('rcsb_entry_info.deposited_polymer_monomer_count', 100, 1900, 100, false),
  },
  {
    key: 'distribution-structural-genomics-centers',
    title: 'by Structural Genomics Centers',
    description: 'PDB Data Distribution by Structural Genomics Centers',
    header_label: 'Structural Genomics Center',
    stats_notes:
      'Distribution of PDB structures contributed by Structural Genomics projects. These efforts are pursued by dedicated centers focused on the high throughput determination of large numbers of protein structures.',
    header_label_sort: 'alphabetical',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'pdbx_SG_project.full_name_of_center',
            operator: 'exact_match',
          },
        },
      ],
    },
    facets: [
      {
        name: 'pdbx_SG_project.full_name_of_center',
        aggregation_type: 'terms',
        attribute: 'pdbx_SG_project.full_name_of_center',
        min_interval_population: 1,
      },
    ],
  },
];


export const growthRelatedKeys: MetaInfo[] = [
  {
    key: 'growth-released-structures',
    title: 'Overall',
    description: 'Overall Growth of Released Structures Per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        }
      ]
    },
    facets: [
      {
          name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
          aggregation_type: AggregationType.DateHistogram,
          attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
          interval: Interval.Year,
          min_interval_population: 1
      }
    ]
  },
  {
    key: 'overall-small-molecules',
    title: 'by Small Molecules Only',
    description: 'Small Molecule-only Structures Released Per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.selected_polymer_entity_types',
            operator: 'exact_match',
            value: 'Small Molecule (only)'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },
  {
    key: 'experimental-method',
    title: 'Growth',
    description: 'Overall Growth By Experimental Method',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range',
          },
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.experimental_method',
            operator: 'exact_match',
          },
        },
      ],
    },
    facets: [
      {
        name: `FACET/${RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path}`,
        aggregation_type: 'date_histogram',
        attribute: RcsbSearchMetadata.RcsbAccessionInfo.InitialReleaseDate.path,
        interval: Interval.Year,
        min_interval_population: 1,
        facets: [
          {
            name: `FACET/${RcsbSearchMetadata.Exptl.Method.path}`,
            aggregation_type: AggregationType.Terms,
            attribute: "rcsb_entry_info.experimental_method",
            min_interval_population: 1,
          },
        ],
      },
    ],
    return_type: ReturnType.Entry,
  },
  {
    key: 'growth-xray',
    title: 'by X-ray',
    description: 'Growth of Structures from X-ray Crystallography Experiments Released per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.experimental_method',
            operator: 'exact_match',
            value: 'X-ray'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },
  {
    key: 'growth-nmr',
    title: 'by NMR',
    description: 'Growth of Structures from NMR Experiments Released per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.experimental_method',
            operator: 'exact_match',
            value: 'NMR'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },
  {
    key: 'growth-em',
    title: 'by Electron Microscopy',
    description: 'Growth of Structures from 3DEM Experiments Released per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.experimental_method',
            operator: 'exact_match',
            value: 'EM'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },
  {
    key: 'growth-multi-method',
    title: 'by Multi-method',
    description: 'Growth of Structures by Multi-method per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.experimental_method',
            operator: 'exact_match',
            value: 'Multiple methods'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },
  {
    key: 'growth-protein',
    title: 'by Protein-only',
    description: 'Protein-only Structures Released Per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.selected_polymer_entity_types',
            operator: 'exact_match',
            value: 'Protein (only)'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },
  {
    key: 'growth-protein-na-complex',
    title: 'by Protein-Nucleic Acid Complexes',
    description: 'Protein-Nucleic Acid Complexes Released Per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.selected_polymer_entity_types',
            operator: 'exact_match',
            value: 'Protein/NA'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },
  {
    key: 'growth-dna',
    title: 'by DNA-only',
    description: 'DNA-only Structures Released Per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.polymer_composition',
            operator: 'exact_match',
            value: 'DNA'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },
  {
    key: 'growth-rna',
    title: 'by RNA-only',
    description: 'RNA-only Structures Released Per Year',
    ref_url: {
      type: 'group',
      logical_operator: 'and',
      nodes: [
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_accession_info.initial_release_date',
            operator: 'range'
          }
        },
        {
          type: 'terminal',
          service: 'text',
          parameters: {
            attribute: 'rcsb_entry_info.polymer_composition',
            operator: 'exact_match',
            value: 'RNA'
          }
        }
      ]
    },
    facets: [
      {
        name: 'rcsb_accession_info.initial_release_date',
        aggregation_type: 'date_histogram',
        attribute: 'rcsb_accession_info.initial_release_date',
        interval: 'year'
      }
    ]
  },

];


export const nrMetaInfo = [
  {
      key: 'cluster-ids-',
      title: 'Number of Unique Protein Sequences within Released PDB Structures (Annual)',
      description: 'Number of Unique Protein Sequences within Released PDB Structures (Annual) at Identity ',
      header_label: 'Number of Unique Protein Sequences',
      stats_notes: '<p>This chart shows the total number of unique protein sequence clusters in PDB structures released within each year. ' +
          'Unique sequence clusters are defined using the sequence identity (SI). A value of 95% SI is used by default, ' +
          'since for practical purposes this identifies proteins with few differences, and thus can be considered to be the same sequence. ' +
          'The chart can also be redrawn with a more stringent 100% SI criterion, or with lower SI values that ' +
          'identify unique protein families (70% SI) or unique protein folds (30% SI).<br>' +
          'The annual numbers of protein sequences may be displayed by specific levels of SI, either separately in different charts ' +
          'or simultaneously in the same chart. </p>' +
          '<p><em>Note</em>: The number of unique sequences in the statistics table is linked to the sequence cluster search result page. ' +
          'There is a default precision threshold in calculating the numbers for performance balance. So the statistics count ' +
          'may have a slight discrepancy compared to the actual non-redundant group search result when the result count approaches or goes above 10,000. ' +
          'The group search result page provides an accurate count. The statistics page provides the trend.</p>'
  },
  {
      key: 'matching-uniprot',
      title: 'UniProtKB Entries with Known 3D Structure (Annual)',
      description: 'UniProtKB Entries with Known 3D Structure (Annual) ',
      header_label: 'UniProtKB Entries with Known 3D Structure',
      stats_notes: 'This chart shows the total number of unique UniProtKB entries in PDB structures released within each year. ' +
          '<p><em>Note</em>: The number of unique UniProtKB entries in the statistics table is linked to the group search result page. ' +
          'There is a default precision threshold in calculating the numbers for performance balance. So the statistics count ' +
          'may have a slight discrepancy compared to the actual non-redundant group search result when the result count approaches or goes above 10,000. ' +
          'The group search result page provides an accurate count. The statistics page provides the trend.</p>'
  }
];

export const nrGrowthMetaInfo = [
  {
      key: 'cluster-ids-',
      title: 'Growth in Number of Unique Protein Sequences in Released PDB Structures (Cumulative)',
      description: 'Growth in Number of Unique Protein Sequences in Released PDB Structures (Cumulative) at Identity ',
      header_label: 'Number of Unique Protein Sequences',
      stats_notes: '<p>This chart shows the annual and cumulative numbers of protein sequences in released PDB structures. ' +
          'The chart can be viewed for a few different levels of sequence identity since the beginning of the PDB archive. ' +
          'The cumulative bars represent the growth in unique protein sequences (number of polymeric entities) across history. ' +
          'The yearly bars (dark blue) tell how many new protein sequences were added in a certain year.</p> ' +
          '<p><em>Note</em>: The total number of sequence clusters in the statistics table is linked to the sequence cluster ' +
          'group search result page. There is a default precision threshold in calculating the numbers for performance balance. ' +
          'So the statistics count may have a slight discrepancy compared to the actual non-redundant group search result ' +
          'when the result count approaches or goes above 10,000. The group search result page provides an accurate count. The statistics page provides the trend.</p>'
  },
  {
      key: 'matching-uniprot',
      title: 'Growth in Number of UniProtKB Entries with Known 3D Structure (Cumulative)',
      description: 'Growth in Number of UniProtKB Entries with Known 3D Structure (Cumulative)',
      header_label: 'UniProtKB Entries with Known 3D Structure',
      stats_notes: 'This chart shows the annual and cumulative numbers of unique UniProtKB entries in released PDB structures. ' +
          'The yearly bars (dark blue) tell how many new UniProtKB entries were added in a certain year.' +
          '<p><em>Note</em>: The total number of unique UniProtKB entries in the statistics table is linked to the group search result page. ' +
          'There is a default precision threshold in calculating the numbers for performance balance. So the statistics count ' +
          'may have a slight discrepancy compared to the actual non-redundant group search result when the result count approaches or goes above 10,000. The group search result page provides an accurate count. The statistics page provides the trend.</p>'
  }
];

export const chemCompMetaInfo = [
  {
      key: 'distribution-chem-comp-molecular-weight',
      title: 'Molecular Weight Distribution',
      header_label: 'Molecular Weight (Daltons)',
      description: 'Molecular Weight Distribution',
      stats_notes: 'Distribution of molecule weight in the <a href=\'https://www.wwpdb.org/data/ccd\' target=\'_blank\'>Chemical Component Dictionary</a>' +
          ' (standard and modified amino acids/nucleotides, small molecule ligands, and solvent molecules)' +
          ' and the <a href=\'https://www.wwpdb.org/data/bird\' target=\'_blank\'>Biologically Interesting molecule Reference Dictionary</a>' +
          ' (peptide-like antibiotic and inhibitor molecules).',
      ref_url: {
          type: 'group',
          logical_operator: 'and',
          nodes: [
              {
                  type: 'terminal',
                  service: 'text_chem',
                  parameters: {
                      attribute: 'chem_comp.formula_weight',
                      operator: 'range'
                  }
              }
          ]
      },
      return_type: 'mol_definition',
      facets: getRangeFacets('chem_comp.formula_weight', 100, 2000, 100, true) // attribute, lower, upper, interval, decimal
  }
];

export const chemCompGrowthMetaInfo = [
  {
      key: 'growth-released-chem-comp',
      title: 'Growth of Released Small Molecules per Year',
      description: 'Growth of Released Small Molecules per Year',
      stats_notes: 'This chart shows the annual and cumulative numbers of the first release of chemical components ' +
          '(ligands, small molecules and monomers) described in <a href=\'https://www.wwpdb.org/data/ccd\' target=\'_blank\'>Chemical Component Dictionary</a> ' +
          ' and peptide-like molecules described in <a href=\'https://www.wwpdb.org/data/bird\' target=\'_blank\'>Biologically Interesting molecule Reference Dictionary</a>.' +
          '\n Please note that the number of CCD and BIRD molecules released before 1999 was relatively small ' +
          ' so please refer to the table below to view their counts.',
      ref_url: {
          type: 'group',
          logical_operator: 'and',
          nodes: [
              {
                  type: 'terminal',
                  service: 'text_chem',
                  parameters: {
                      attribute: 'rcsb_chem_comp_info.initial_release_date',
                      operator: 'range'
                  }
              }
          ]
      },
      return_type: 'mol_definition',
      facets: [
          {
              name: 'rcsb_chem_comp_info.initial_release_date',
              aggregation_type: 'date_histogram',
              attribute: 'rcsb_chem_comp_info.initial_release_date',
              interval: 'year'
          }
      ]
  }
];

export const exptlDataCountsInfo = [
  {
      key: 'exptl-data-counts-info',
      title: 'Experimental Data Counts Info',
      description: 'Experimental Data Counts Info Description',
      ref_url: {
          type: 'group',
          logical_operator: 'and',
          nodes: [
              {
                  type: 'terminal',
                  service: 'text',
                  parameters: {
                      attribute: 'rcsb_repository_holdings_current.repository_content_types',
                      operator: 'exact_match',
                      value: ''
                  }
              }
          ]
      },
      return_type: 'entry',
      facets: [
          {
              name: 'rcsb_repository_holdings_current.repository_content_types',
              aggregation_type: 'terms',
              attribute: 'rcsb_repository_holdings_current.repository_content_types'
          }
      ]
  }
];

// Refactor the utility methods to use modern ES6+ syntax and TypeScript

export const metaInfoUtils = {
  getHeaderText: (plotName: string): string => {
    return findObjectInArrayByKey('key', plotName, statsDataMetaInfo)?.[0]?.header_label ?? '';
  },
  getLabelSort: (plotName: string): string => {
    return findObjectInArrayByKey('key', plotName, statsDataMetaInfo)?.[0]?.header_label_sort ?? '';
  },
  getNote: (plotName: string): string => {
    return findObjectInArrayByKey('key', plotName, statsDataMetaInfo)?.[0]?.stats_notes ?? '';
  },
  getSanitizedData: (plotName: string, rawData: any): any => {
    return sanitizeData(plotName, rawData);
  },
  getGrowthTitle: (plotName: string): string => {
    return findObjectInArrayByKey('key', plotName, growthRelatedKeys)?.[0]?.description ?? '';
  },
  getGrowthSearchUrl: (plotName: string): RefUrl | undefined => {
    return findObjectInArrayByKey('key', plotName, growthRelatedKeys)?.[0]?.ref_url;
  },
  getGrowthObject: (plotName: string): MetaInfo | undefined => {
    return findQueryObjectInArrayByKey('key', plotName, growthRelatedKeys)?.[0];
  },
  getDistributionSearchUrl: (plotName: string): RefUrl | undefined => {
    return findObjectInArrayByKey('key', plotName, statsDataMetaInfo)?.[0]?.ref_url;
  },
  getDistributionTitle: (plotName: string): string => {
    return findObjectInArrayByKey('key', plotName, statsDataMetaInfo)?.[0]?.description ?? '';
  },
  getDistributionObject: (plotName: string): MetaInfo | undefined => {
    return findQueryObjectInArrayByKey('key', plotName, statsDataMetaInfo)?.[0];
  },
  getNrObject: (plotName: string): MetaInfo | undefined => {
    if (plotName.startsWith('cluster-ids-'))
      return findQueryObjectInArrayByKey('key', 'cluster-ids-', nrMetaInfo)?.[0];
    return findQueryObjectInArrayByKey('key', plotName, nrMetaInfo)?.[0];
  },
  getNrGrowthObject: (plotName: string): MetaInfo | undefined => {
    if (plotName.startsWith('cluster-ids-'))
      return findQueryObjectInArrayByKey('key', 'cluster-ids-', nrGrowthMetaInfo)?.[0];
    return findQueryObjectInArrayByKey('key', plotName, nrGrowthMetaInfo)?.[0];
  }
};

function sanitizeData(plotName: string, plotData: any): any {
  // Sanitization logic here...
  return {}; // Return sanitized data
}


function checkUndefined(data: any): string | number {
  return data !== undefined ? data : '--';
}

function formatLabel(label: string, useInt: boolean = false, unit: string = ''): string {
  const arr = label.split('-');
  const formattedArr = arr.map((value) => (useInt && value !== '*' ? parseInt(value) : value));
  if (!unit) unit = '';

  if (formattedArr[0] === '*') return `< ${formattedArr[1]}${unit}`;
  if (formattedArr[1] === '*') return `>= ${formattedArr[0]}${unit}`;
  return `${formattedArr[0]}${unit} - ${formattedArr[1]}${unit}`;
}

function minTwoDigits(n: number): string {
  return n.toString().padStart(2, '0');
}

function getRangeFacets(
  attribute: string,
  lower: number,
  upper: number,
  interval: number,
  decimal: boolean
): Facet[] {
  const ranges = [];
  let from = lower;

  while (from < upper) {
    const to = decimal ? parseFloat((from + interval).toFixed(2)) : from + interval;
    ranges.push({
      key: `${from}-${to}`,
      value: { gte: from, lt: to },
    });
    from = to;
  }

  ranges.push({ key: `>=${upper}`, value: { gte: upper } });

  return [
    {
      name: attribute,
      aggregation_type: 'range',
      attribute,
      facets: ranges.map((range) => ({
        name: `${range.key}`,
        aggregation_type: 'range',
        attribute,
        filter: {
          type: 'range',
          service: 'text',
          parameters: {
            attribute: attribute,
            operator: 'range',
            value: `${range.value.gte}-${range.value.lt}`,
          },
        },
      })),
    },
  ];
}

