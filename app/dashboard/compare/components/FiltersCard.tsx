"use client";

import { useState } from "react";
import Card from "@/app/components/ui/Card";

export function FiltersCard() {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("todas");

  return (
    <Card className="cmp-card">
      <div className="vn-card-heading">
        <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">🔎</div>
        <h2 className="vn-card-title">Filtrar vagas</h2>
      </div>

      <div className="cmp-filters">
        <div className="cmp-field--wide">
          <label htmlFor="cargo" className="vn-label">
            Buscar por cargo ou palavra-chave
          </label>

          <input
            type="text"
            id="cargo"
            className="vn-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ex.: Vendedor, Enfermeiro, Desenvolvedor..."
          />
        </div>

        <div>
          <label htmlFor="area" className="vn-label">Área profissional</label>

          <select
            id="area"
            className="vn-input"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          >
            <option value="todas">Todas as áreas</option>
            <option value="administrativo">Administrativo</option>
            <option value="comercial">Comercial e Vendas</option>
            <option value="educacao">Educação</option>
            <option value="engenharia">Engenharia</option>
            <option value="saude">Saúde</option>
            <option value="tecnologia">Tecnologia</option>
          </select>
        </div>

        <div>
          <label htmlFor="localizacao" className="vn-label">Localização</label>

          <input
            type="text"
            id="localizacao"
            className="vn-input"
            placeholder="Cidade ou estado"
          />
        </div>

        <div>
          <label htmlFor="modalidade" className="vn-label">Modalidade</label>

          <select id="modalidade" className="vn-input" defaultValue="todas">
            <option value="todas">Todas</option>
            <option value="remoto">Remoto</option>
            <option value="hibrido">Híbrido</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>

        <div>
          <label htmlFor="nivel" className="vn-label">Nível profissional</label>

          <select id="nivel" className="vn-input" defaultValue="todos">
            <option value="todos">Todos</option>
            <option value="estagio">Estágio</option>
            <option value="assistente">Assistente</option>
            <option value="junior">Júnior</option>
            <option value="pleno">Pleno</option>
            <option value="senior">Sênior</option>
            <option value="gestao">Coordenação/Gerência</option>
          </select>
        </div>

        <div>
          <label htmlFor="contrato" className="vn-label">Tipo de contrato</label>

          <select id="contrato" className="vn-input" defaultValue="todos">
            <option value="todos">Todos</option>
            <option value="clt">CLT</option>
            <option value="pj">PJ</option>
            <option value="estagio">Estágio</option>
            <option value="temporario">Temporário</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>

        <div>
          <label htmlFor="ordenacao" className="vn-label">Ordenar por</label>

          <select id="ordenacao" className="vn-input" defaultValue="compativeis">
            <option value="compativeis">Mais compatíveis</option>
            <option value="recentes">Mais recentes</option>
            <option value="salario">Maior salário</option>
          </select>
        </div>

        <button
          type="button"
          className="vn-button vn-button--outline cmp-filters__clear"
        >
          Limpar filtros
        </button>
      </div>
    </Card>
  );
}