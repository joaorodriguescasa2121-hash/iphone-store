# iStore — E-commerce de iPhones (PRD)

## Problem Statement
Site moderno de e-commerce de iPhones, visual clean/premium/minimalista estilo Apple, mobile-first, foco em conversão. pt-BR. Nome: iStore.

## Architecture
- Backend: FastAPI + MongoDB (motor). Rotas com prefixo /api.
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll). shadcn/ui (accordion, sonner).
- Design: guidelines em /app/design_guidelines.json. Fonte display "Outfit", cores istore (bg #FBFBFD, ink #1D1D1F, blue #0071E3).

## Core Requirements (static)
- Header fixo + barra de anúncio, hero cinético (reveal linha-a-linha + parallax), grid de 6 iPhones, benefícios (marquee), manifesto numerado, depoimentos, FAQ, newsletter, footer.
- Carrinho lateral com checkout (pedido salvo no banco).

## Implemented (2026-08-04)
- Backend endpoints: GET /api/products, GET /api/products/{slug}, POST /api/orders, GET /api/orders/{id}, POST /api/newsletter, POST /api/contact. Seed automático de 6 produtos.
- Frontend: Home com todas as seções, CartContext, CartDrawer com checkout, Newsletter integrada.
- Verificado: produtos (6), carrinho (add/qty/total), checkout (toast de pedido confirmado), newsletter (duplicado tratado). Cores/fontes OK.

## Backlog (P1/P2)
- P1: Página de detalhe do produto (rota /produto/:slug), busca funcional, autenticação de conta.
- P2: Pagamento real (Stripe/Pix), envio de e-mail (Resend), painel admin de pedidos, cupons.

## Notes
- Sem autenticação (ícone de conta é placeholder). Checkout simula pedido (sem pagamento real).
- window.__lenis exposto para automação de testes.
