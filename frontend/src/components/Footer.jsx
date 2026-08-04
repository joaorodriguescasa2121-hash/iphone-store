import { Instagram, Twitter, Youtube, Facebook, ShieldCheck, Lock } from "lucide-react";

const COLS = [
  {
    title: "Loja",
    links: ["iPhone 17", "iPhone 16", "iPhone 15", "Ofertas do dia"],
  },
  {
    title: "Suporte",
    links: ["Central de ajuda", "Rastrear pedido", "Trocas e devoluções", "Garantia"],
  },
  {
    title: "Empresa",
    links: ["Sobre a iStore", "Trabalhe conosco", "Termos de uso", "Privacidade"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-istore-bg border-t border-istore-border pt-16 pb-8 px-5 md:px-8" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-2xl font-bold tracking-tight text-istore-ink">
              iStore
            </span>
            <p className="text-sm text-istore-muted mt-3 max-w-xs">
              Sua loja premium de iPhones. Originais, lacrados e com os melhores
              preços do Brasil.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#contato"
                  className="h-9 w-9 rounded-full border border-istore-border grid place-items-center text-istore-muted hover:text-istore-blue hover:border-istore-blue transition-colors"
                  data-testid={`social-link-${i}`}
                  aria-label="Rede social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-istore-ink text-sm mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#iphones"
                      className="text-sm text-istore-muted hover:text-istore-ink transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-istore-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-istore-muted order-2 md:order-1">
            © 2026 iStore — Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5 order-1 md:order-2">
            <div className="flex items-center gap-1.5 text-xs text-istore-muted">
              <Lock size={13} /> Site seguro
            </div>
            <div className="flex items-center gap-1.5 text-xs text-istore-muted">
              <ShieldCheck size={13} /> Compra garantida
            </div>
            <div className="flex gap-1.5">
              {["Visa", "Master", "Pix", "Amex"].map((p) => (
                <span
                  key={p}
                  className="text-[10px] font-medium text-istore-ink bg-istore-alt border border-istore-border rounded px-2 py-1"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
