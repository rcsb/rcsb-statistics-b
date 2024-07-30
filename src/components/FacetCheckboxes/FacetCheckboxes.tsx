import * as React from "react";
import { useEffect } from "react";
import { fromEvent, map, Observer } from 'rxjs';
import styled from 'styled-components';
import { StatsFacetInterface } from "../../interfaces/StatsFacetInterface";

export type CheckboxesRoleType = "main" | "additional";

export interface FacetCheckboxesProps {
  componentId: string;
  facets: StatsFacetInterface[];
  selectorRole: CheckboxesRoleType;
  observer: Observer<{ facet: StatsFacetInterface; role: CheckboxesRoleType; }>;
}

const CheckboxesContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  font-weight: normal;
`;

const CheckboxInput = styled.input`
  margin-right: 8px !important;
`;

export function FacetCheckboxes(props: FacetCheckboxesProps) {

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
    <CheckboxesContainer id={`facet-checkbox-${props.componentId}`}>
      {props.facets.map((facet, n) => (
        <Label key={facet.facetId}>
          <CheckboxInput type="checkbox" value={n.toString()} /> {facet.facetName}
        </Label>
      ))}
    </CheckboxesContainer>
  );
}
