import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/lib/format";
import { CHECKOUT_URL } from "@/data/checkoutLinks";

const badgeColor = {
  Lançamento: "bg-istore-blue text-white",
  "Mais vendido": "bg-istore-ink text-white",
};

function ProductCard({ product, index }) {
  const { addItem } = useCart();
  const checkoutUrl = CHECKOUT_URL;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-istore-surface rounded-[2rem] p-6 md:p-8 border border-istore-border hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_28px_60px_rgba(0,0,0,0.09)] flex flex-col"
      data-testid={`product-card-${product.slug}`}
    >
      <span
        className={`absolute top-5 left-5 z-10 text-[10px] md:text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full ${
          badgeColor[product.badge] || "bg-istore-alt text-istore-ink"
        }`}
        data-testid={`product-badge-${product.slug}`}
      >
        {product.badge}
      </span>

      <div className="relative aspect-square rounded-2xl bg-istore-alt overflow-hidden mb-6">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-istore-ink">
          {product.name}
        </h3>
        <p className="text-sm text-istore-muted mt-1">
          {product.storage} · {product.color}
        </p>

        <div className="mt-4 flex items-end gap-2">
          <span
            className="font-display text-3xl font-bold tracking-tight text-istore-ink"
            data-testid={`product-price-${product.slug}`}
          >
            {formatBRL(product.price)}
          </span>
          {product.old_price && (
            <span className="text-istore-muted line-through text-sm mb-1">
              {formatBRL(product.old_price)}
            </span>
          )}
        </div>
        <p className="text-xs text-istore-muted mt-1">{product.installment}</p>

        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => addItem(product)}
          className="mt-6 w-full bg-istore-blue text-white rounded-full py-3.5 text-sm font-medium hover:bg-[#0077ED] transition-all duration-300 active:scale-95 text-center"
          data-testid={`buy-button-${product.slug}`}
        >
          Comprar agora
        </a>
      </div>
    </motion.article>
  );
}

export default function ProductGrid({ products }) {
  const safeProducts = Array.isArray(products) ? products : [];
  return (
    <section id="iphones" className="relative py-24 md:py-32 px-5 md:px-8" data-testid="products-section">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14 md:mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-istore-blue">
            Nossa linha
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-istore-ink mt-4">
            Escolha o seu iPhone.
          </h2>
          <p className="text-base md:text-lg text-istore-muted mt-4">
            Seis modelos, um só padrão de excelência. Todos originais, lacrados e
            com garantia de 1 ano.
          </p>
        </div>

        <div id="ofertas" className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {safeProducts.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
