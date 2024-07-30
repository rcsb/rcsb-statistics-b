import * as React from "react";
import { useEffect } from "react";
import { fromEvent, map, Observer } from 'rxjs';
import styled from 'styled-components';
import { StatsFacetInterface } from "../../interfaces/StatsFacetInterface";

export type CheckboxRoleType = "main" | "additional";

export interface FacetCheckboxProps {
  componentId: string;
  facets: StatsFacetInterface[];
  selectorRole: CheckboxRoleType;
  observer: Observer<{ facet: StatsFacetInterface; role: CheckboxRoleType; }>;
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

  useEffect(() => {
    const checkboxElements = document.querySelectorAll(`#facet-checkbox-${props.componentId} input[type=checkbox]`);
    const subscription = fromEvent<React.ChangeEvent<HTMLInputElement>>(checkboxElements, "change").pipe(
      map(event => ({
        facet: props.facets[parseInt(event.target.value)],
        role: props.selectorRole
      }))
    ).subscribe(props.observer);

    return () => subscription.unsubscribe();
  }, [props.facets, props.selectorRole, props.observer]);

  return (
    <CheckboxContainer id={`facet-checkbox-${props.componentId}`}>
      {props.facets.map((facet, n) => (
        <Label key={facet.facetId}>
          <CheckboxInput type="checkbox" value={n.toString()} /> {facet.facetName}
        </Label>
      ))}
    </CheckboxContainer>
  );
}
