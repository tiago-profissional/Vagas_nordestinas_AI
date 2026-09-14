"use client";

import { useState } from "react";
import Card from "@/app/components/ui/Card";


export function FiltersCard() {

  const [search, setSearch] = useState("");  
  const [area, setArea] = useState("todas");

  return (
    <Card>
      <div>
        <div>
          <label htmlFor="cargo">
            Buscar por cargo ou palavra-chave
          </label>

          <input
            type="text"
            id="cargo"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ex.: Vendedor, Enfermeiro, Desenvolvedor..."
          />
        </div>

        <div>
          <label htmlFor="area">Área profissional</label>

          <select
          id="area"
          value={area}
          onChange={(event) => setArea(event.target.value)}>
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
          <label htmlFor="localizacao">Localização</label>

          <input
            type="text"
            id="localizacao"
            placeholder="Cidade ou estado"
          />
        </div>

        <div>
          <label htmlFor="modalidade">Modalidade</label>

          <select id="modalidade" defaultValue="todas">
            <option value="todas">Todas</option>
            <option value="remoto">Remoto</option>
            <option value="hibrido">Híbrido</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>

        <div>
          <label htmlFor="nivel">Nível profissional</label>

          <select id="nivel" defaultValue="todos">
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
          <label htmlFor="contrato">Tipo de contrato</label>

          <select id="contrato" defaultValue="todos">
            <option value="todos">Todos</option>
            <option value="clt">CLT</option>
            <option value="pj">PJ</option>
            <option value="estagio">Estágio</option>
            <option value="temporario">Temporário</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>

        <div>
          <label htmlFor="ordenacao">Ordenar por</label>

          <select id="ordenacao" defaultValue="compativeis">
            <option value="compativeis">Mais compatíveis</option>
            <option value="recentes">Mais recentes</option>
            <option value="salario">Maior salário</option>
          </select>
        </div>

        <button type="button">
          Limpar filtros
        </button>
      </div>
    </Card>
  );
}