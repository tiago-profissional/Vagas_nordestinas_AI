"use client";

import type { ReactNode } from "react";
import type { JobFilters } from "../data/types";
import {
  CONTRACT_LABEL,
  SENIORITY_LABEL,
  WORK_MODE_LABEL,
  capitalize,
} from "../data/jobLabels";
import {
  cardClass,
  fieldClass,
  labelClass,
  secondaryButtonClass,
  sectionTitleClass,
} from "../data/styles";

interface Props {
  filters: JobFilters;
  areas: string[];
  onChange: (patch: Partial<JobFilters>) => void;
  onClear: () => void;
}

function Field({
  id,
  label,
  wide,
  children,
}: {
  id: string;
  label: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={wide ? "cmp-field--wide" : undefined}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

const toOptions = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

export function FiltersCard({ filters, areas, onChange, onClear }: Props) {
  return (
    <section className={`${cardClass} cmp-card`}>
      <h2 className={`${sectionTitleClass} vn-card-heading`}>Filtros</h2>

      <div className="cmp-filters">
        <Field id="f-q" label="Cargo ou palavra-chave" wide>
          <input
            id="f-q"
            type="search"
            className={fieldClass}
            placeholder="Ex.: React, back-end, dados..."
            value={filters.q}
            onChange={(e) => onChange({ q: e.target.value })}
          />
        </Field>

        <Field id="f-area" label="Área profissional">
          <select
            id="f-area"
            className={fieldClass}
            value={filters.area}
            onChange={(e) => onChange({ area: e.target.value })}
          >
            <option value="">Todas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {capitalize(area)}
              </option>
            ))}
          </select>
        </Field>

        <Field id="f-location" label="Localização">
          <input
            id="f-location"
            type="text"
            className={fieldClass}
            placeholder="Cidade ou estado"
            value={filters.location}
            onChange={(e) => onChange({ location: e.target.value })}
          />
        </Field>

        <Field id="f-mode" label="Modalidade">
          <select
            id="f-mode"
            className={fieldClass}
            value={filters.mode}
            onChange={(e) =>
              onChange({ mode: e.target.value as JobFilters["mode"] })
            }
          >
            <option value="">Todas</option>
            {toOptions(WORK_MODE_LABEL)}
          </select>
        </Field>

        <Field id="f-seniority" label="Nível">
          <select
            id="f-seniority"
            className={fieldClass}
            value={filters.seniority}
            onChange={(e) =>
              onChange({ seniority: e.target.value as JobFilters["seniority"] })
            }
          >
            <option value="">Todos</option>
            {toOptions(SENIORITY_LABEL)}
          </select>
        </Field>

        <Field id="f-contract" label="Tipo de contrato">
          <select
            id="f-contract"
            className={fieldClass}
            value={filters.contract}
            onChange={(e) =>
              onChange({ contract: e.target.value as JobFilters["contract"] })
            }
          >
            <option value="">Todos</option>
            {toOptions(CONTRACT_LABEL)}
          </select>
        </Field>

        <Field id="f-sort" label="Ordenar por">
          <select
            id="f-sort"
            className={fieldClass}
            value={filters.sort}
            onChange={(e) =>
              onChange({ sort: e.target.value as JobFilters["sort"] })
            }
          >
            <option value="match">Mais compatíveis</option>
            <option value="recentes">Mais recentes</option>
          </select>
        </Field>

        <button
          type="button"
          className={`${secondaryButtonClass} cmp-filters__clear`}
          onClick={onClear}
        >
          Limpar filtros
        </button>
      </div>
    </section>
  );
}