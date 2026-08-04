import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ProductGrid from "@/components/ProductGrid";
import Manifesto from "@/components/Manifesto";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Home() {
  const [products, setProducts] = useState([]);
  const productsRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => setProducts(res.data))
      .catch((e) => console.error("Erro ao carregar produtos", e));
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
      <Manifesto />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </main>
  );
}
