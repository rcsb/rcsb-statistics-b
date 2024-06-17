import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { FacetSelector, SelectorRoleType } from "../../components/FacetSelector"
import { ADDITIONAL_FACET_STORE, FACET_STORE } from "./FacetStore";
import { FacetPlot } from "../../components/FacetPlot";
import { ReturnType } from "@rcsb/rcsb-api-tools/build/RcsbSearch/Types/SearchEnums";
import { Observer } from "rxjs";
import {StatsFacetInterface} from "../../interfaces/StatsFacetInterface";

const DistSourceOrgNat: React.FC = () => {
  return (
    <main className="container mt-5">
      <section className="row">
        <article className="col-12">
          <div className="card">
            <div className="card-body">
              <h2>PDB Statistics: PDB Data Distribution by Natural Source Organism.......</h2>
              <Link to="/">Return Home</Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default DistSourceOrgNat;