Frontend das telas 02 e 04 (Next.js)

A ideia é a mesma do backend: primeiro a tela com dados falsos, depois liga na API. Assim você não depende do Python estar pronto para avançar.

Onde fica cada tela:
- Tela 02 (escolher a vaga): app/dashboard/compare/page.tsx — já existe
- Tela 04 (análise de compatibilidade): app/dashboard/compare/[jobId]/page.tsx — nova

========================================
TELA 04 — ANÁLISE DE COMPATIBILIDADE
========================================

Passo F0 — Preparar

NÃO mexer no compare/page.tsx: ele é a tela 02 (lista de vagas)
Criar a pasta compare/[jobId]/ (com colchetes no nome) para a tela 04
Criar .env.local com NEXT_PUBLIC_AI_URL=http://localhost:8000
Colocar as cores da paleta como variáveis (laranja, marrom, amarelo, preto, branco)

Concluído quando: /dashboard/compare/123 abrir uma página vazia com o título “Análise de compatibilidade”, e a /dashboard/compare continuar igual.

Passo F1 — Tipos (types.ts)

Criar o tipo MatchResult igual ao do Python (score, breakdown, matched_skills, to_develop, not_found, evidence, explanation, notes, versions)
Criar BreakdownItem, Evidence e Explanation
Lembrar que value, job_excerpt e explanation podem vir null
Não quebrar os tipos que a tela 02 já usa

Concluído quando: o TypeScript não reclamar de nenhum campo.

Passo F2 — Dados falsos (lib/matchMock.ts)

Criar um MatchResult falso com o exemplo da tela 04 (86%, Python, pytest, APIs REST, Docker, FastAPI)
Usar esse mock em todos os passos até o F9

Concluído quando: a página conseguir importar o mock sem erro.

Passo F3 — Esqueleto da página

Topo: card da vaga + score
Meio: coluna esquerda (evidências e gaps) e coluna direita (cálculo e limites)
Baixo: botões
No celular, as colunas viram uma só

Concluído quando: as caixas aparecerem no lugar certo, mesmo vazias.

Passo F4 — Card da vaga e score (JobScoreCard)

Mostrar título, empresa, cidade, modalidade e o currículo usado
Mostrar o score grande (86%)
Mostrar o aviso “Compatibilidade não é chance de contratação”
Botões “Salvar vaga” e “Ver anúncio original”

Concluído quando: o card ficar igual ao da imagem.

Passo F5 — “Por que combina” (EvidenceList)

Percorrer evidence e mostrar uma linha por skill
Em cada linha: a skill, o trecho do currículo e o trecho da vaga
Mostrar a origem (Projetos, Experiência, Requisitos)
Se job_excerpt for null, mostrar “Citada na lista de skills da vaga”
Se resume_source for "skills", mostrar que a evidência é fraca

Concluído quando: as 3 linhas do mock aparecerem certas.

Passo F6 — “Como o score é calculado” (ScoreBreakdown)

Uma linha por item do breakdown, com o nome, o peso e os pontos
Barra de progresso usando value
Se value for null, mostrar “sem dados” no lugar da barra
Linha de total no final
Texto “Pesos iniciais (v1)”

Concluído quando: 30,8 + 27 + 12 + 10 + 6 bater com o total.

Passo F7 — Gaps e próximo passo (3 cards)

“Ponto a desenvolver” com to_develop
“Não encontrado” com not_found, sempre com a frase “Isso não significa que você não saiba”
“Próximo passo” com explanation.next_steps
Esconder o card quando a lista estiver vazia

Concluído quando: uma vaga sem gaps não mostrar cards vazios.

Passo F8 — Limites e avisos

Card “Limites da análise” com o texto fixo
Mostrar os notes (ex.: “Local não informado na vaga”)
Rodapé “Detalhes técnicos” com versions (modelo de embeddings e versão dos pesos)

Concluído quando: os avisos do mock aparecerem.

Passo F9 — Ligar na API (lib/matchApi.ts)

Criar a função que faz POST /match com o currículo confirmado e a vaga
Pegar o currículo confirmado da tela 01 e a vaga pelo jobId da URL
Trocar o mock pela resposta da API

Concluído quando: mudar uma skill do currículo mudar o score na tela.

Passo F10 — Estados da tela

Carregando: esqueleto cinza no lugar dos cards
Erro: “Não foi possível calcular agora”, com um botão “Tentar de novo”
Sem currículo confirmado: mensagem com um link para “Meu currículo”
Vaga não encontrada ou expirada: quando o jobId da URL não existir

Concluído quando: desligar o Python mostrar o erro, sem a tela quebrar.

Passo F11 — Botões do rodapé

“Voltar” volta para a tela 02 (/dashboard/compare)
“Abrir vaga original” abre o link em nova aba
“Gerar carta de apresentação” fica desabilitado com “em breve” até a tela 05

Concluído quando: nenhum botão levar a lugar nenhum por engano.

Passo F12 — Acabamento

Texto preto nos botões laranja (texto branco no laranja fica ilegível)
Testar a tela na largura de celular
Usar <button> e <a> de verdade, nada de div clicável

Concluído quando: dá para usar a tela inteira só com o teclado (Tab e Enter).

========================================
TELA 02 — ESCOLHER A VAGA (compare/page.tsx)
========================================

Referência visual: Tela_02_Completa.png e Tela_02_Estados.png

Passo T2.1 — Ligar com a tela 04

Trocar o botão “Comparar” por “Ver análise completa →”
O botão leva para /dashboard/compare/{id da vaga}

Concluído quando: clicar numa vaga abrir a tela 04 dela.

Passo T2.2 — Card do currículo

Mostrar as skills do currículo como chips, no lugar de “3 habilidades”
Trocar “2 years” por “2 anos · Júnior”
Mostrar a modalidade preferida (ex.: “Remoto ou híbrido”)

Concluído quando: o card mostrar o que a pessoa confirmou na tela 01.

Passo T2.3 — Skills em cada vaga

Skills que você tem: com ✓
Skills que faltam: tracejadas
Contador “você tem 2 de 4”
Legenda no fim da lista (“Você tem” / “Não encontrada no currículo”)

Concluído quando: dá para ver o que falta sem abrir a vaga.

Passo T2.4 — Senioridade, motivo e origem

Selo de senioridade (“Pleno · 1 nível acima”, “Júnior · seu nível”)
Linha “Por que combina” com uma frase
Data e origem da vaga (“Publicada há 2 dias · Adzuna”)
Aviso “Compatibilidade não é chance de contratação” com o link “Como calculamos”

Concluído quando: cada card explicar o score em uma linha.

Passo T2.5 — Layout e filtros

Grade de 2 colunas no lugar do carrossel horizontal (1 coluna no celular)
Filtros mais compactos
Atalhos rápidos: “Só do meu nível”, “Só remotas”, “Fortaleza, CE”
Botão “Salvar” vira “✓ Salva” depois do clique

Concluído quando: dá para comparar 4 vagas sem rolar para o lado.

Passo T2.6 — Muitas vagas

Mostrar “Mostrando 4 de 32 vagas”
Botão “Carregar mais vagas” (nunca carregar todas de uma vez)

Concluído quando: a lista funcionar com as vagas reais do scraper.

Passo T2.7 — Estados da tela

Carregando: cards cinza no mesmo formato dos reais
Nenhuma vaga encontrada: mensagem + botão “Limpar filtros”
Currículo não confirmado: lista apagada, sem números, com botão para “Meu currículo”
Erro ao calcular: “Não foi possível calcular agora”, com “Tentar de novo” e “Ver vagas sem score”

Concluído quando: desligar o Python mostrar o erro, sem a tela quebrar.

Passo T2.8 — Scores reais

Trocar os scores fixos pela resposta do POST /match/batch (Passo 11 do backend)
Uma chamada só para todas as vagas da página

Concluído quando: mudar uma skill do currículo mudar os scores da lista.

Passo T2.9 — Busca por significado (depois do Passo 12 do backend)

Trocar a busca por palavra-chave por “Busca por significado”
O texto vai para o backend, que procura no pgvector

Concluído quando: “backend com Python” encontrar uma vaga que fala em “serviços com FastAPI”.