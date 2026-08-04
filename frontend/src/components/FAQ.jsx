import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Os iPhones são originais e lacrados?",
    a: "Sim. Todos os aparelhos são 100% originais Apple, novos, lacrados e acompanham nota fiscal e garantia oficial de 1 ano.",
  },
  {
    q: "Em quantas vezes posso parcelar?",
    a: "Você pode parcelar em até 12x sem juros no cartão de crédito. O valor das parcelas aparece em cada produto.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "Enviamos para todo o Brasil com frete grátis. O prazo varia de 2 a 7 dias úteis, com código de rastreio em tempo real.",
  },
  {
    q: "Posso trocar ou devolver?",
    a: "Sim. Você tem 7 dias corridos após o recebimento para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 bg-istore-bg" data-testid="faq-section">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-istore-blue">
            Dúvidas frequentes
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-istore-ink mt-4">
            Tudo que você precisa saber.
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-istore-border"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-medium text-istore-ink hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-istore-muted text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
