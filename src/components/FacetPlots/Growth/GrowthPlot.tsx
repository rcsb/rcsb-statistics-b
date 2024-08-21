import * as React from "react";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { FacetPlotInterface } from "../../../interfaces/FacetPlotInterface";
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
  margin-left: 5px;
  font-weight: normal;
  margin-bottom: -7px;
`;


const DataOptionsHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 15px;
`;

const FiltersShownText = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const FullWidthCol = styled.div`
  width: 100%;
  padding: 0 15px;
`;

const ColorBoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ColorBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ColorBox = styled.div<{ bgColor: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.bgColor};
  margin-right: 10px;
`;

const BoxText = styled.div`
  font-size: 1.2rem;
`;

export function FacetPlot(props: FacetPlotInterface) {
    const [data, setData] = useState<ChartObjectInterface[][]>([]);
    const [dataSets, setDataSets] = useState<string[]>([]);
    const [selectedDataSets, setSelectedDataSets] = useState<Set<string>>(new Set());

    useEffect(() => {
        setData([]);
        chartFacets(props).then(data => {
            const cumulativeData = data.length > 0 ? (() => {
                const cumulativeDataArray: { label: string | number; population: number; objectConfig: { objectId: (string | number)[]; color: string }; }[] = [];
                let cumulativeSum = 0;

                const originalColor = getDataSetColor("Annual");
                const cumulativeColor = getDataSetColor("Cumulative");

                // Iterate through the original data and create the Cumulative data with a different color
                data[0].forEach(item => {
                    cumulativeSum += item.population;
                    cumulativeDataArray.push({
                        label: item.label,
                        population: cumulativeSum,
                        objectConfig: {
                            objectId: [item.label, cumulativeSum],
                            color: cumulativeColor // Set the color for the Cumulative data
                        }
                    });
                });

                // Create a copy of the original data with the original color
                const originalDataWithColor = data[0].map(item => ({
                    ...item,
                    objectConfig: {
                        ...item.objectConfig,
                        color: originalColor // Set the color for the original data
                    }
                }));

                return [originalDataWithColor, cumulativeDataArray];
            })() : [];
            setData(cumulativeData);
            const dataSetsShown = extractDataSets(cumulativeData);
            setDataSets(Array.from(dataSetsShown));
            // Automatically select all datasets if there's more than one
            setSelectedDataSets(new Set(dataSetsShown));
        });
    }, [props]);

    const extractDataSets = (data: ChartObjectInterface[][]): Set<string> => {
        const dataSetsShown = new Set<string>();

        // Assign objectId and color based on the index of the dataset
        const datasetIds = ["Annual", "Cumulative"];

        data.forEach((dataset, index) => {
            if (dataset.length > 0) { // Only process non-empty arrays
                const datasetId = datasetIds[index] || `Dataset-${index + 1}`; // Assign "Annual" or "Cumulative" or a unique identifier
                dataSetsShown.add(datasetId); // Add the identifier to the Set

                const color = getDataSetColor(datasetId);

                // Assign the objectId and color to each item in the dataset
                dataset.forEach(item => {
                    if (item.objectConfig) {
                        item.objectConfig.objectId.unshift(datasetId); // Add the dataset ID to the start of objectId array
                        item.objectConfig.color = color; // Assign the appropriate color
                    } else {
                        item.objectConfig = {
                            objectId: [datasetId],
                            color: color
                        };
                    }
                });
            }
        });

        return dataSetsShown;
    };

    const handleCheckboxChange = (dataSet: string) => {
        const updatedDataSets = new Set(selectedDataSets);
        if (updatedDataSets.has(dataSet)) {
            updatedDataSets.delete(dataSet);
        } else {
            updatedDataSets.add(dataSet);
        }
        setSelectedDataSets(updatedDataSets);
    };

    const getSelectedDataText = (): string => {
        if (selectedDataSets.size === 2) {
            return "Cumulative (available each year) and annual number of released entries";
        } else if (selectedDataSets.has("Cumulative")) {
            return "Cumulative (available each year) number of released entries";
        } else if (selectedDataSets.has("Annual")) {
            return "Annual number of released entries";
        } else {
            return "No datasets selected";
        }
    };

    const filteredData = data.length > 0 ? data.map(item =>
        item.filter(subItem =>
            selectedDataSets.has(subItem.objectConfig ? subItem.objectConfig.objectId[0] : "Unknown")
        )
    ) : [];

    return (
        <Container>
            <Row>
                <Col md={10}>
                    <ChartComponent
                        data={filteredData}
                        chartComponentImplementation={props.chartType === ChartType.histogram ? ChartJsHistogramComponent : ChartJsBarComponent}
                        dataProvider={props.chartType === ChartType.histogram ? new HistogramChartDataProvider() : new BarChartDataProvider()}
                        chartConfig={{
                            "chartDisplayConfig": {
                                "constWidth": 900,
                                "constHeight": 500,
                                "paddingLeft": 120,
                                "paddingTopLarge": 20,
                                "xDomainPadding": 100,
                                "minBarLength": 10,
                            }
                        }}
                    />
                </Col>
                <Col md={2}>
                    <ControlSection>
                        <DataOptionsHeader>Data Options</DataOptionsHeader>
                        <div>
                            <FiltersShownText>Data Set</FiltersShownText>
                            {dataSets.length > 1 ? (
                                dataSets.map(dataSet => {
                                    const checkboxId = `checkbox-${dataSet}`;
                                    return (
                                        <CheckboxContainer key={dataSet}>
                                            <StyledCheckbox
                                                type="checkbox"
                                                id={checkboxId}
                                                value={dataSet}
                                                checked={selectedDataSets.has(dataSet)}
                                                onChange={() => handleCheckboxChange(dataSet)}
                                            />
                                            <StyledLabel htmlFor={checkboxId}>
                                                {dataSet}
                                            </StyledLabel>
                                        </CheckboxContainer>
                                    );
                                })
                            ) : (
                                <CheckboxContainer>
                                    <StyledCheckbox
                                        type="checkbox"
                                        checked={true}
                                        disabled={true} // Disable the checkbox if there's only one dataset
                                    />
                                    <StyledLabel>
                                        {dataSets[0] || 'Single Dataset'}
                                    </StyledLabel>
                                </CheckboxContainer>
                            )}
                        </div>
                    </ControlSection>
                </Col>
            </Row>
            <Row>
                <FullWidthCol>
                    <div>{getSelectedDataText()}</div>
                    <ColorBoxesContainer>
                        {Array.from(selectedDataSets).map((dataSet, index) => (
                            <ColorBoxWrapper key={index}>
                                <ColorBox bgColor={getDataSetColor(dataSet)} />
                                <BoxText>{dataSet}</BoxText>
                            </ColorBoxWrapper>
                        ))}
                    </ColorBoxesContainer>
                </FullWidthCol>
            </Row>
        </Container>
    );
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
    "#2c5889",
    "#86b5e6",
    "#e71f8a",
    "#f60505",
    "#a27206",
    "#60e5bd",
    "#85ff34",
    "#ea6c05"
];

function getDataSetColor(dataSet: string) {
    const index = ["Annual", "Cumulative"].indexOf(dataSet);
    return COLORS[index % COLORS.length];
}
