// Interface for representing the URL reference structure
export interface RefUrl {
  type: string;
  logical_operator: string;
  nodes: Node[];
}

// Interface for nodes within a RefUrl, representing individual query parameters
export interface Node {
  type: string;
  service: string;
  parameters: {
      attribute: string;
      operator: string;
      value?: string | number;
  };
}

// Interface for holding metadata information used in the system, combining facets, reference URLs, and other descriptive elements
export interface MetaInfo {
  key: string;
  title: string;
  description: string;
  header_label?: string;
  stats_notes?: string;
  header_label_sort?: string;
  ref_url?: RefUrl;
  facets?: Facet[];
  request_options?: {
      facets: Facet[];
      paginate: {
          start: number;
          rows: number;
      };
  };
  return_type?: string;
}
export interface BaseFacet {
  name: string;
  aggregation_type: 'terms' | 'range' | 'date_histogram';
  attribute: string;
  min_interval_population?: number;
  interval?: string;
  facets?: Facet[];
  filter?: {
    type: string;
    service: string;
    parameters: {
      attribute: string;
      operator: string;
      value: string;
    };
  };
}

export interface TermFacet extends BaseFacet {
  aggregation_type: 'terms';
}

export interface RangeFacet extends BaseFacet {
  aggregation_type: 'range';
  filter?: never;  
}


export type Facet = TermFacet | RangeFacet | BaseFacet;


