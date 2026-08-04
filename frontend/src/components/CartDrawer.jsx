import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/lib/format";
import { CHECKOUT_URL } from "@/data/checkoutLinks";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, total, count } =
    useCart();

  const checkout = () => {
    window.open(CHECKOUT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-istore-ink/30 backdrop-blur-sm z-[60]"
            data-testid="cart-overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-istore-surface z-[70] flex flex-col shadow-2xl"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-istore-border">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <ShoppingBag size={18} /> Seu carrinho
                {count > 0 && (
                  <span className="text-istore-muted font-normal text-sm">
                    ({count})
                  </span>
                )}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-istore-muted hover:text-istore-ink transition-colors"
                data-testid="cart-close-button"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 grid place-items-center text-center px-6">
                <div>
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-istore-alt grid place-items-center">
                    <ShoppingBag className="text-istore-muted" size={26} />
                  </div>
                  <p className="text-istore-ink font-medium">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-istore-muted text-sm mt-1">
                    Adicione um iPhone para começar.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" data-lenis-prevent>
                {items.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex gap-4 items-center"
                    data-testid={`cart-item-${item.product_id}`}
                  >
                    <div className="h-20 w-20 rounded-2xl bg-istore-alt overflow-hidden shrink-0 grid place-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-istore-ink truncate">
                        {item.name}
                      </p>
                      <p className="text-istore-blue font-semibold text-sm">
                        {formatBRL(item.price)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-istore-border rounded-full">
                          <button
                            onClick={() => updateQty(item.product_id, -1)}
                            className="p-1.5 text-istore-muted hover:text-istore-ink"
                            data-testid={`cart-decrease-${item.product_id}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product_id, 1)}
                            className="p-1.5 text-istore-muted hover:text-istore-ink"
                            data-testid={`cart-increase-${item.product_id}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="text-istore-muted hover:text-red-500 transition-colors"
                          data-testid={`cart-remove-${item.product_id}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t border-istore-border px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-istore-muted">Total</span>
                  <span
                    className="font-display text-2xl font-bold"
                    data-testid="cart-total"
                  >
                    {formatBRL(total)}
                  </span>
                </div>
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={checkout}
                  className="w-full bg-istore-blue text-white rounded-full py-4 font-medium hover:bg-[#0077ED] transition-colors flex items-center justify-center gap-2"
                  data-testid="checkout-button"
                >
                  Finalizar compra
                </a>
                <p className="text-center text-xs text-istore-muted">
                  Pagamento seguro · até 12x sem juros
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
