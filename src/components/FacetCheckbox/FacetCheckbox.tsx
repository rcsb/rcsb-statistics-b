import * as React from "react";
import { useEffect } from "react";
import { fromEvent, map, Observer } from 'rxjs';
import styled from 'styled-components';
import { StatsFacetInterface } from '../../interfaces/StatsFacetInterface';

export type CheckboxRoleType = 'main' | 'additional';

export interface FacetCheckboxProps {
  componentId: string;
  facets: { facetId: string; facetName: string; checked: boolean }[];
  selectorRole: CheckboxRoleType;
  observer: Observer<{ facet: StatsFacetInterface; role: CheckboxRoleType }>;
}

const CheckboxContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  font-weight: normal;
`;

const CheckboxInput = styled.input`
  margin-right: 8px !important;
`;

export function FacetCheckbox(props: FacetCheckboxProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, facetIndex: number) => {
    const updatedFacet = props.facets[facetIndex];
    updatedFacet.checked = event.target.checked;
    props.observer.next({ facet: updatedFacet, role: props.selectorRole });
  };

  return (
    <CheckboxContainer id={`facet-checkbox-${props.componentId}`}>
      {props.facets.map((facet, n) => (
        <Label key={facet.facetId}>
          <CheckboxInput
            type="checkbox"
            value={n.toString()}
            checked={facet.checked}
            onChange={(event) => handleCheckboxChange(event, n)}
          />{' '}
          {facet.facetName}
        </Label>
      ))}
    </CheckboxContainer>
  );
}