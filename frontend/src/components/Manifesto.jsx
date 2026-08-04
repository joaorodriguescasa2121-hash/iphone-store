import { motion } from "framer-motion";

const CHAPTERS = [
  {
    n: "01",
    title: "Originais e lacrados",
    body: "Todos os aparelhos são 100% Apple, novos e lacrados. Nada de recondicionados disfarçados — apenas o produto que você espera.",
  },
  {
    n: "02",
    title: "Preços que fazem sentido",
    body: "Compramos em grande volume e repassamos a economia para você. Do topo de linha ao custo-benefício, sempre imbatível.",
  },
  {
    n: "03",
    title: "Entrega que você acompanha",
    body: "Enviamos para todo o Brasil com rastreio em tempo real e embalagem premium. Do carrinho à sua porta, sem surpresas.",
  },
];

export default function Manifesto() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 bg-istore-bg" data-testid="manifesto-section">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-5xl font-medium tracking-tight text-istore-ink max-w-3xl mb-16 md:mb-24"
        >
          Uma loja pensada para quem ama a Apple tanto quanto você.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-istore-ink/15 pt-6"
              data-testid={`manifesto-chapter-${c.n}`}
            >
              <span className="font-display text-sm font-semibold text-istore-blue tracking-widest">
                {c.n}
              </span>
              <h3 className="font-display text-2xl font-medium tracking-tight text-istore-ink mt-4">
                {c.title}
              </h3>
              <p className="text-istore-muted mt-3 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
