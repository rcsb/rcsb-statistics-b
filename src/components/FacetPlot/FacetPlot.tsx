import * as React from "react";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { ChartFacetPlotInterface, FacetPlotInterface } from "../../interfaces/FacetPlotInterface";
import { SearchQueryType, SearchRequestType } from "@rcsb/rcsb-search-tools/lib/SearchQueryTools/SearchQueryInterfaces";
import { buildAttributeQuery, buildMultiFacet, buildRequestFromSearchQuery } from "@rcsb/rcsb-search-tools/lib/SearchQueryTools/SearchQueryTools";
import { RcsbSearchMetadata } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchMetadata";
import { Service } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import { AttributeFacetType, FilterFacetType, SearchBucketFacetType } from "@rcsb/rcsb-search-tools/lib/SearchParseTools/SearchFacetInterface";
import { cloneDeep } from "lodash";
import { ChartComponent } from "@rcsb/rcsb-charts/lib/RcsbChartComponent/ChartComponent";
import { ChartObjectInterface, ChartType } from "@rcsb/rcsb-charts/lib/RcsbChartComponent/ChartConfigInterface";
import { SearchClient } from "@rcsb/rcsb-search-tools/lib/SearchClient/SearchClient";
import { QueryResult } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchResultInterface";
import { getFacetsFromSearch } from "@rcsb/rcsb-search-tools/lib/SearchParseTools/SearchFacetTools";
import { HistogramChartDataProvider } from "@rcsb/rcsb-charts/lib/RcsbChartDataProvider/HistogramChartDataProvider";
import { BarChartDataProvider } from "@rcsb/rcsb-charts/lib/RcsbChartDataProvider/BarChartDataProvider";
import { ChartJsBarComponent } from "@rcsb/rcsb-charts/lib/RcsbChartImplementations/ChatJsImplementations/ChartJsBarComponent";
import { ChartJsHistogramComponent } from "@rcsb/rcsb-charts/lib/RcsbChartImplementations/ChatJsImplementations/ChartJsHistogramComponent";


const ControlSection = styled.div`
  margin-left: -60px;
  border-left: 1px solid #ccc;
  padding-left: 20px;
`; 


const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const StyledCheckbox = styled.input`
  margin-right: 10px;
`;

const StyledLabel = styled.label`
    font-size: 10px;
    margin-left: 5px;
    font-weight: normal;
    margin-bottom: -7px;
`;

const DataOptionsHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const MethodsShownText = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export function FacetPlot(props: FacetPlotInterface) {
    const [data, setData] = useState<ChartObjectInterface[][]>([]);
    const [methods, setMethods] = useState<string[]>([]);
    const [selectedMethods, setSelectedMethods] = useState<Set<string>>(new Set());

    useEffect(() => {
        setData([]);
        chartFacets(props).then(data => {
            setData(data);
            const methodsSet = extractMethods(data);
            setMethods(Array.from(methodsSet));
            setSelectedMethods(methodsSet)
        });
        console.log("FacetPlot props", props);
    }, [props]);


    const extractMethods = (data: ChartObjectInterface[][]): Set<string> => {
        const methodsSet = new Set<string>();
        data.forEach(item => {
            item.forEach(subItem => {
                if (subItem.objectConfig) {
                    methodsSet.add(subItem.objectConfig.objectId[1]);
                }
            });
        });
        return methodsSet;
    };

    const handleCheckboxChange = (method: string) => {
        const updatedMethods = new Set(selectedMethods);
        if (updatedMethods.has(method)) {
            updatedMethods.delete(method);
        } else {
            updatedMethods.add(method);
        }
        setSelectedMethods(updatedMethods);
    };

    const filteredData = data.map(item => 
        item.filter(subItem => 
            selectedMethods.has(subItem.objectConfig ? subItem.objectConfig.objectId[1] : "Unknown")
        )
    );

    return (
        <Container>
            <Row>
                <Col md={10}>
                    <ChartComponent
                        data={filteredData}
                        chartComponentImplementation={props.chartType === ChartType.histogram ? ChartJsHistogramComponent : ChartJsBarComponent}
                        dataProvider={props.chartType === ChartType.histogram ? new HistogramChartDataProvider() : new BarChartDataProvider()}
                        chartConfig={props.chartConfig}
                    />
                </Col>
                <Col md={2}>
                    <ControlSection>
                        <DataOptionsHeader>Data Options</DataOptionsHeader>
                        <div>
                            <MethodsShownText>Methods Shown</MethodsShownText>
                            {methods.map(method => {
                                const checkboxId = `checkbox-${method}`;
                                return (
                                    <CheckboxContainer key={method}>
                                        <StyledCheckbox
                                            type="checkbox"
                                            id={checkboxId}
                                            value={method}
                                            checked={selectedMethods.has(method)}
                                            onChange={() => handleCheckboxChange(method)}
                                        />
                                        <StyledLabel htmlFor={checkboxId}>
                                            {method}
                                        </StyledLabel>
                                    </CheckboxContainer>
                                );
                            })}
                        </div>
                    </ControlSection>
                </Col>
            </Row>
        </Container>
    );
}

export function ChartFacetPlot(props: ChartFacetPlotInterface) {
    const [data, setData] = useState<ChartObjectInterface[][]>([]);

    useEffect(() => {
        chartFacets(props).then(data => setData(data));
    }, [props]);

    return (<ChartComponent
        data={data}
        chartComponentImplementation={props.chartComponent}
        dataProvider={props.dataProvider}
        chartConfig={props.chartConfig}
    />);
}

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
    console.log("queryResults", queryResults);
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
                        color: COLORS[n % COLORS.length],
                        objectId: [dom, label, valueMap.get(dom)?.get(label)]
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

const COLORS: string[] = [
    "#718de8",
    "#2fad30",
    "#e71f8a",
    "#f60505",
    "#a27206",
    "#60e5bd",
    "#85ff34",
    "#ea6c05"
];
