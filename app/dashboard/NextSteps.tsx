import Link from "next/link";
import { Search, WandSparkles } from "lucide-react";
import { Button } from "../components/ui/Button";

export function NextSteps() {
  return (
    <section className="vn-card vn-row">
      <div>
        <h2 className="vn-card-title">Próximos passos recomendados</h2>

        <p className="vn-description">
          Vamos deixar seu currículo ainda mais competitivo!
        </p>
      </div>

      <div className="vn-actions">
        <Link href="/dashboard/compare" className="vn-button vn-button--outline">
          <Search size={18} aria-hidden="true" />
          Comparar com vaga
        </Link>

        <Button variant="primary">
          <WandSparkles size={18} aria-hidden="true" />
          Otimizar currículo
        </Button>
      </div>
    </section>
  );
}