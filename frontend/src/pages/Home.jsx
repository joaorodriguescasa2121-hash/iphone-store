import { useEffect, useState, useRef, lazy, Suspense } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ProductGrid from "@/components/ProductGrid";
import { FALLBACK_PRODUCTS } from "@/data/fallbackProducts";

const Manifesto = lazy(() => import("@/components/Manifesto"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Newsletter = lazy(() => import("@/components/Newsletter"));
const Footer = lazy(() => import("@/components/Footer"));
const CartDrawer = lazy(() => import("@/components/CartDrawer"));

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Home() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const productsRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => {
        setProducts(Array.isArray(res.data) && res.data.length > 0 ? res.data : FALLBACK_PRODUCTS);
      })
      .catch((e) => {
        console.error("Erro ao carregar produtos, usando dados de fallback", e);
        setProducts(FALLBACK_PRODUCTS);
      });
  }, []);

  const scrollToProducts = () => {
    document.getElementById("iphones")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-istore-bg text-istore-ink" ref={productsRef}>
      <Header />
      <Hero onCta={scrollToProducts} />
      <Benefits />
      <ProductGrid products={products} />
      <Suspense fallback={null}>
        <Manifesto />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <Footer />
        <CartDrawer />
      </Suspense>
    </main>
  );
}
