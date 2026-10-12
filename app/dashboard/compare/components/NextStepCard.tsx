import Card from "@/app/components/ui/Card";

export function NextStepCard() {
  return (
    <Card className="cmp-card cmp-card--highlight">
      <div className="cmp-next">
        <div className="vn-card-icon vn-card-icon--round" aria-hidden="true">⭐</div>

        <div>
          <h2 className="vn-card-title">
            Próximo passo: escolha uma vaga para visualizar o matching detalhado.
          </h2>

          <p className="cmp-next__text">
            Ao clicar em “Comparar”, você verá um relatório completo com
            compatibilidade de skills, experiência e sugestões de melhoria.
          </p>
        </div>
      </div>
    </Card>
  );
}