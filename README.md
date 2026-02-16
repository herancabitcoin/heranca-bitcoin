<p align="center">
  <img src="https://img.shields.io/badge/Bitcoin-Inheritance-f59e0b?style=for-the-badge&logo=bitcoin&logoColor=white" alt="Herança Bitcoin" />
  <img src="https://img.shields.io/badge/100%25-Client--Side-22c55e?style=for-the-badge" alt="Client-Side" />
  <img src="https://img.shields.io/badge/Zero-Data%20Collection-ef4444?style=for-the-badge" alt="Zero Data" />
  <img src="https://img.shields.io/badge/PT--BR%20%7C%20EN-Bilingual-3b82f6?style=for-the-badge" alt="Bilingual" />
</p>

# ₿ Herança Bitcoin

**Ferramenta gratuita e open-source de planejamento de herança para Bitcoin.**

*Free and open-source Bitcoin inheritance planning tool.*

---

## O Problema

Estima-se que 3–4 milhões de BTC (11–18% do supply total) foram **perdidos para sempre**. A maioria dos bitcoiners não tem um plano funcional de herança. Quando o detentor morre, os herdeiros — muitas vezes leigos — não sabem que o Bitcoin existe, onde estão as chaves, ou como acessar os fundos.

**Herança Bitcoin** resolve esse problema.

## O que a ferramenta faz

Um wizard interativo de 8 passos que mapeia seu setup, identifica pontos de falha, e gera documentos prontos para seus herdeiros.

### Wizard

1. **Custódia** — Singlesig, multisig ou custódia colaborativa. Configuração de quorum, passphrase, wallet software e hardware wallets.
2. **Patrimônio** — Faixa de BTC, UTXOs, locais de seeds, backup do output descriptor.
3. **Herdeiros** — Nome, relação, nível técnico em Bitcoin, localização.
4. **Cenários de Falha** — Análise automática de cenários baseada no seu setup: perda de seed, passphrase não documentada, descriptor ausente, wrench attack, provedor offline, herdeiro desinformado.
5. **Plano de Ação** — Ações concretas priorizadas (CRÍTICO → ESSENCIAL → MANUTENÇÃO).
6. **Documentos** — Cartas-instrução personalizadas por herdeiro (adapta linguagem ao nível técnico) + checklist de revisão semestral. Campos sensíveis em branco para preenchimento à caneta.
7. **Fire Drill** — Simulação interativa do cenário de herança, passo a passo.
8. **FAQ** — 10 perguntas frequentes sobre herança Bitcoin.

### Diferenciais

- **100% client-side** — Nenhum dado é enviado a servidores. Fechou a aba, perdeu tudo (feature, not bug).
- **Platform-agnostic** — Funciona com qualquer wallet (Sparrow, Nunchuk, Electrum, etc.) e qualquer hardware wallet.
- **Bilíngue** — Português brasileiro e inglês, com toggle instantâneo.
- **Análise de output descriptor** — Explica por que, em multisig, sem o descriptor a redundância do quorum NÃO se aplica.
- **Zero KYC, zero cadastro, zero tracking.**

## Segurança

- Nenhum dado é coletado, transmitido ou armazenado.
- Não usa `localStorage` nem qualquer persistência no navegador.
- Campos sensíveis nas cartas de instrução são linhas em branco (`__________`) para preenchimento manual à caneta após impressão.
- Recomenda-se usar em **janela anônima** (sem extensões de navegador) ou desconectar a internet após carregar a página.
- Os documentos gerados **NÃO devem ser salvos digitalmente**. Imprima e destrua qualquer cópia digital.

## Stack

- React (single-file component)
- Zero dependências externas além do React
- CSS-in-JS (inline styles)
- IBM Plex Mono + IBM Plex Sans (Google Fonts)

## Como usar

### Opção 1: Online (recomendado para teste)

Acesse a versão hospedada em: *[em breve]*

### Opção 2: Localmente

```bash
# Clone o repositório
git clone https://github.com/herancabitcoin/heranca-bitcoin.git

# O arquivo principal é bitcoin-heranca-v2.jsx
# Pode ser usado em qualquer ambiente React ou importado em um projeto existente
```

### Opção 3: Artifact do Claude

O arquivo `.jsx` pode ser colado diretamente como artifact no [claude.ai](https://claude.ai) para execução imediata.

## Contribuindo

Contribuições são bem-vindas. Áreas prioritárias:

- **Geração de PDF client-side** — Implementar exportação via jsPDF/html2canvas
- **Novas traduções** — Espanhol, francês, alemão
- **Novos cenários de falha** — Timelocks, dead man's switch, social recovery
- **Testes** — Cobertura de testes para a lógica de cenários
- **UI/UX** — Melhorias de acessibilidade e responsividade mobile

## Apoie o projeto

Esta ferramenta é 100% gratuita. Se ela te ajudou a proteger seus bitcoins, considere contribuir:

⚡ **Lightning:** `expresstask226@walletofsatoshi.com`

## Acompanhe

- [YouTube](https://youtube.com/@herancabitcoin)
- [X (Twitter)](https://x.com/herancabitcoin)
- [Nostr](https://njump.me/npub1mstrwvvw2046l758rtnvy0pwe22k9ngznsf0t6twll2gas0rt3jsejeju6)

## Licença

MIT License — use, modifique e distribua livremente.

```
MIT License

Copyright (c) 2025 Herança Bitcoin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  <strong>Seu Bitcoin sobrevive a você?</strong><br/>
  <em>Does your Bitcoin survive you?</em>
</p>
