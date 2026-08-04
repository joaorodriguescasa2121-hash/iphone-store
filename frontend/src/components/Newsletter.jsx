import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/newsletter`, { email });
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string" ? detail : "E-mail inválido. Verifique e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-16 md:py-24 px-5 md:px-8" data-testid="newsletter-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto bg-istore-alt rounded-[2.5rem] p-10 md:p-16 text-center"
      >
        <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-istore-ink">
          Ofertas antes de todo mundo.
        </h2>
        <p className="text-istore-muted mt-4 max-w-md mx-auto">
          Assine e receba lançamentos, cupons exclusivos e promoções relâmpago
          direto no seu e-mail.
        </p>

        <form
          onSubmit={submit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          data-testid="newsletter-form"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="flex-1 bg-istore-surface border border-istore-border rounded-full px-6 py-4 text-istore-ink placeholder:text-istore-muted focus:outline-none focus:ring-2 focus:ring-istore-blue/40 transition"
            data-testid="newsletter-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-istore-blue text-white rounded-full px-7 py-4 font-medium hover:bg-[#0077ED] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            data-testid="newsletter-submit"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <>Assinar <ArrowRight size={17} /></>}
          </button>
        </form>
        <p className="text-xs text-istore-muted mt-4">
          Sem spam. Cancele quando quiser.
        </p>
      </motion.div>
    </section>
  );
}
