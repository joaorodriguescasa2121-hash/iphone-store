import { Truck, ShieldCheck, Lock, Zap } from "lucide-react";

const BENEFITS = [
  { icon: Truck, label: "Frete grátis" },
  { icon: ShieldCheck, label: "Garantia de 1 ano" },
  { icon: Lock, label: "Compra segura" },
  { icon: Zap, label: "Entrega rápida" },
];

export default function Benefits() {
  const row = [...BENEFITS, ...BENEFITS, ...BENEFITS, ...BENEFITS];
  return (
    <section className="py-8 border-y border-istore-border bg-istore-surface overflow-hidden" data-testid="benefits-strip">
      <div className="marquee-track">
        {row.map((b, i) => (
          <div key={i} className="flex items-center gap-3 px-10 shrink-0">
            <b.icon size={18} className="text-istore-blue" strokeWidth={1.8} />
            <span className="font-display text-lg md:text-xl font-medium tracking-tight text-istore-ink whitespace-nowrap">
              {b.label}
            </span>
            <span className="text-istore-muted/40 ml-6">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
