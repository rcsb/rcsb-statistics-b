import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FacetSelector, SelectorRoleType } from "../../components/FacetSelector"
import { ADDITIONAL_FACET_STORE, FACET_STORE } from "./FacetStore";
import { FacetPlot } from "../../components/FacetPlot";
import { ReturnType } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import { Observer } from "rxjs";
import {StatsFacetInterface} from "../../interfaces/StatsFacetInterface";

interface DistSourceOrgNatState {
  mainAttribute: StatsFacetInterface;
  additionalAttribute?: StatsFacetInterface;
}

const DistSourceOrgNat: React.FC = () => {

  const [state, setState] = useState<DistSourceOrgNatState>({mainAttribute: FACET_STORE[0]});

  const selectorObserver: Observer<{facet:StatsFacetInterface;role:SelectorRoleType;}> = {
    next: (selector) => {
       setState( prevState=>{
           const newFacet = selector.facet;
           return {
               ...prevState,
               [selector.role == "main" ? "mainAttribute" : "additionalAttribute"]: newFacet
           }
       });
    },
    error: ()=>{},
    complete: ()=>{}
  };


  useEffect(() => {
    console.log("mainAttribute=", state.mainAttribute);
  }, [state.mainAttribute]);
  
  return state.mainAttribute.facet && state.mainAttribute.chartType ?
  <main className="container mt-5">
      <section className="row">
        <article className="col-12">
          <div className="card">
            <div className="card-body">
              <div style={{marginBottom:20}}>
                  <FacetSelector
                      componentId={"main-attribute"}
                      observer={selectorObserver}
                      selectorRole={"main"}
                      facets={FACET_STORE}
                  />
                  <FacetSelector
                      componentId={"additional-attribute"}
                      observer={selectorObserver}
                      selectorRole={"additional"}
                      facets={ADDITIONAL_FACET_STORE}
                  />
              </div>
              <FacetPlot
                  firstDim={state.mainAttribute.facet}
                  secondDim={
                      state.mainAttribute.facetId != state.additionalAttribute?.facetId ? state.additionalAttribute?.facet : undefined
                  }
                  chartType={state.mainAttribute.chartType}
                  returnType={ReturnType.Entry}
                  chartConfig={state.mainAttribute.chartConfig}
              />
            </div>
          </div>
        </article>
      </section>
      <Link to="/">All Statistics</Link>
  </main> : null;
};

export default DistSourceOrgNat;