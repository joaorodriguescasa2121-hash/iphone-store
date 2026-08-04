import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Marina Alves",
    role: "São Paulo, SP",
    quote:
      "Comprei o iPhone 16 e chegou em 2 dias, lacrado e com nota fiscal. Atendimento impecável, virei cliente fiel!",
    img: "https://images.unsplash.com/photo-1649258539566-c061ee4cf45a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxoYXBweSUyMHBlcnNvbiUyMHVzaW5nJTIwc21hcnRwaG9uZSUyMGNsZWFuJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1NzB8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Rafael Costa",
    role: "Belo Horizonte, MG",
    quote:
      "Melhor preço que encontrei no iPhone 15, e ainda parcelei em 12x sem juros. Recomendo de olhos fechados.",
    img: "https://images.unsplash.com/photo-1694057336527-fbc3e7c84890?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMHVzaW5nJTIwc21hcnRwaG9uZSUyMGNsZWFuJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1NzB8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Juliana Ferraz",
    role: "Curitiba, PR",
    quote:
      "A experiência de compra é linda, do site à entrega. Embalagem premium e o aparelho perfeito. Nota 10!",
    img: "https://images.unsplash.com/photo-1680339566629-3c1360364f31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxoYXBweSUyMHBlcnNvbiUyMHVzaW5nJTIwc21hcnRwaG9uZSUyMGNsZWFuJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1NzB8MA&ixlib=rb-4.1.0&q=85",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 bg-istore-alt" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-istore-blue">
              Quem comprou, aprovou
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-istore-ink mt-4">
              +12 mil clientes felizes.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-istore-ink">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-istore-blue text-istore-blue" />
              ))}
            </div>
            <span className="font-medium">4,9/5 · 3.400 avaliações</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-istore-surface rounded-[2rem] p-8 border border-istore-border"
              data-testid={`testimonial-${i}`}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={15} className="fill-istore-blue text-istore-blue" />
                ))}
              </div>
              <blockquote className="text-istore-ink leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-6">
                <img
                  src={t.img}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-istore-ink text-sm">{t.name}</p>
                  <p className="text-istore-muted text-xs">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
