import { useState, useEffect } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "iPhones", href: "#iphones" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50" data-testid="main-header">
      {/* Announcement bar */}
      <div
        className="bg-istore-ink text-white text-[11px] md:text-xs tracking-wide py-2 px-4 text-center"
        data-testid="announcement-bar"
      >
        Frete grátis para todo o Brasil · Garantia de 1 ano · Compra 100% segura
      </div>

      {/* Main bar */}
      <div
        className={`transition-colors duration-300 ${
          scrolled ? "bg-white/70 backdrop-blur-2xl border-b border-istore-border" : "bg-white/40 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <a
            href="#inicio"
            className="font-display text-xl md:text-2xl font-bold tracking-tight text-istore-ink"
            data-testid="logo-link"
          >
            iStore
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm text-istore-ink/80 hover:text-istore-ink transition-colors duration-200"
                data-testid={`nav-${n.label.toLowerCase()}`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <button
              className="hidden sm:grid place-items-center text-istore-ink/80 hover:text-istore-blue transition-colors"
              aria-label="Buscar"
              data-testid="search-button"
            >
              <Search size={19} strokeWidth={1.8} />
            </button>
            <button
              className="hidden sm:grid place-items-center text-istore-ink/80 hover:text-istore-blue transition-colors"
              aria-label="Conta"
              data-testid="account-button"
            >
              <User size={19} strokeWidth={1.8} />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="relative grid place-items-center text-istore-ink hover:text-istore-blue transition-colors"
              aria-label="Carrinho"
              data-testid="cart-button"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {count > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-istore-blue text-white text-[10px] font-semibold h-4 min-w-4 px-1 rounded-full grid place-items-center"
                  data-testid="cart-count"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-istore-ink"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
              data-testid="mobile-menu-button"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-istore-border px-5 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base text-istore-ink border-b border-istore-border last:border-0"
                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
