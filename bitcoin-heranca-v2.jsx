import { useState, useEffect, useCallback, useRef } from "react";

// ─── i18n ───────────────────────────────────────────────────────────────────

const translations = {
  pt: {
    appName: "Herança Bitcoin",
    appSub: "Plano de Sucessão",
    start: "Começar",
    next: "Próximo",
    back: "Voltar",
    restart: "Recomeçar",
    savePlan: "Salvar Plano",
    planSaved: "Plano salvo!",
    exportPlan: "Exportar PDF",
    free: "Grátis",
    month: "mês",
    year: "ano",
    or: "ou",
    satsYear: "sats/ano",
    step: "Passo",
    of: "de",

    // Step labels
    steps: {
      intro: "Início",
      custodia: "Custódia",
      patrimonio: "Patrimônio",
      herdeiros: "Herdeiros",
      cenarios: "Cenários",
      plano: "Plano",
      documentos: "Documentos",
      fireDrill: "Fire Drill",
      faq: "FAQ",
      donate: "Doar",
    },

    // Intro
    introTag: "Bitcoin Inheritance Planner",
    introTitle1: "Seu Bitcoin sobrevive",
    introTitle2: "a você?",
    introDesc: "A maioria dos bitcoiners não tem um plano de herança funcional. Esta ferramenta mapeia seu setup, identifica pontos de falha, e gera um plano completo com documentos prontos para seus herdeiros.",
    introFeature1: "Mapa de cenários de falha",
    introFeature2: "Cartas-instrução por herdeiro",
    introFeature3: "Checklist de segurança",
    introFeature4: "Fire drill interativo",
    securityWarning: "Aviso de segurança:",
    securityText: "Esta ferramenta roda 100% no seu navegador. Nenhum dado é enviado a servidores. Mesmo assim, não insira seeds, chaves privadas ou endereços reais. Use apenas informações estruturais.",
    securityTextExtra: "RECOMENDAÇÃO: Use em janela anônima (sem extensões de navegador) ou desconecte a internet após carregar a página. Extensões maliciosas podem ler o conteúdo da tela.",

    // Custody
    custodyTitle: "Modelo de Custódia",
    custodyDesc: "Como seus bitcoins estão guardados hoje?",
    singlesig: "Singlesig",
    singlesigDesc: "Uma única chave privada controla os fundos. Mais simples, mais risco de ponto único de falha.",
    multisig: "Multisig",
    multisigDesc: "Múltiplas chaves necessárias para movimentar fundos. Mais resiliente, mais complexo de herdar.",
    collaborative: "Custódia Colaborativa",
    collaborativeDesc: "Multisig com uma chave mantida por terceiro (Nunchuk, Casa, Unchained).",
    quorum: "Quorum (M)",
    totalKeys: "Total de chaves (N)",
    select: "Selecione",
    usesPassphrase: "Usa passphrase (25ª palavra)?",
    yes: "Sim",
    no: "Não",
    walletSoftware: "Wallet software",
    hardwareWallets: "Hardware wallets utilizadas",

    // Patrimonio
    patrimonioTitle: "Patrimônio",
    patrimonioDesc: "Informações estruturais sobre como seus fundos estão distribuídos.",
    btcRange: "Faixa de patrimônio em BTC",
    prefNaoInformar: "Prefiro não dizer",
    utxoCount: "Quantos UTXOs distintos (estimativa)?",
    dontKnow: "Não sei",
    seedLocations: "Onde as seeds/chaves estão guardadas fisicamente?",
    locHome: "Casa própria",
    locBank: "Cofre bancário",
    locFamily: "Casa de familiar",
    locOffice: "Escritório",
    locOther: "Outro local seguro",
    locMetal: "Placa de metal",
    locPaper: "Papel",
    descriptorBackup: "Backup do wallet descriptor / output descriptor?",
    dontKnowWhatIs: "Não sei o que é",
    descriptorWarning: "Sem o descriptor, seus herdeiros podem ter a seed mas não conseguir reconstruir a wallet. Isso é crítico em multisig.",
    descriptorInfo: "O output descriptor é o \"mapa\" da sua wallet — descreve como as chaves se combinam pra gerar endereços. Em multisig, é tão importante quanto as seeds.",

    // Herdeiros
    heirsTitle: "Herdeiros",
    heirsDesc: "Quem deve ter acesso aos seus bitcoins? Use apelidos se preferir.",
    heir: "Herdeiro",
    nameLabel: "Nome / Apelido",
    namePlaceholder: "Ex: Esposa, Filho, Irmão...",
    relation: "Relação",
    relSpouse: "Cônjuge",
    relChild: "Filho(a)",
    relParent: "Pai/Mãe",
    relSibling: "Irmão(ã)",
    relFriend: "Amigo de confiança",
    relOther: "Outro",
    techLevel: "Nível técnico em Bitcoin",
    techZero: "Zero",
    techBasic: "Básico",
    techIntermediate: "Intermediário",
    techAdvanced: "Avançado",
    location: "Localização",
    locationPlaceholder: "Ex: São Paulo, Brasil",
    addHeir: "+ Adicionar herdeiro",
    remove: "Remover",

    // Cenarios
    cenariosTitle: "Cenários de Falha",
    cenariosDesc: "Baseado no seu setup, estes são os cenários que você precisa considerar.",
    protected: "PROTEGIDO",
    risk: "RISCO",
    fail: "FALHA",
    criticalFailures: "cenário(s) de falha crítica identificados.",
    criticalAction: "O plano gerado no próximo passo vai endereçar cada um deles.",

    // Scenarios text
    scenSinglesigDeath: "Você morre, herdeiro encontra seed",
    scenSinglesigDeathOk: "Pelo menos um herdeiro tem capacidade técnica para recuperar.",
    scenSinglesigDeathRisk: "Nenhum herdeiro tem conhecimento suficiente para usar a seed.",
    scenSeedLost: "Seed é perdida ou destruída",
    scenSeedLostDetail: "Singlesig = ponto único de falha. Se a seed for perdida, os fundos são irrecuperáveis.",
    scenPassphraseNoHeir: "Herdeiro tem seed mas não tem passphrase",
    scenPassphraseDetail: "Sem a passphrase, a seed abre uma wallet vazia. Fundos inacessíveis.",
    scenWrench: "Roubo/coerção física",
    scenWrenchSinglesig: "Singlesig é vulnerável a ataque de $5 wrench. Não há quorum para proteger.",
    scenMultisigDeath: "herdeiros localizam {m} de {n} chaves",
    scenMultisigDeathOk: "Há redundância de {r} chave(s). Margem para perda.",
    scenMultisigDeathRisk: "Zero redundância. Todas as chaves são necessárias.",
    scenKeysLost: "{x} chaves perdidas simultaneamente",
    scenKeysLostDetail: "Se mais de {r} chave(s) forem perdidas, os fundos ficam inacessíveis.",
    scenNoDescriptor: "Herdeiros não encontram o wallet descriptor",
    scenNoDescriptorOk: "Descriptor tem backup. Herdeiros podem reconstruir a wallet com apenas {m} seeds.",
    scenNoDescriptorFail: "Sem o descriptor, a redundância do quorum {m}-de-{n} NÃO se aplica. Herdeiros precisariam de TODAS as {n} xpubs para reconstruir o esqueleto da wallet — mesmo que só {m} seeds sejam necessárias para gastar. Na prática, sem descriptor e sem todas as xpubs, os fundos ficam inacessíveis.",
    scenPassphraseMultisig: "Passphrase não documentada",
    scenPassphraseMultisigDetail: "Em multisig com passphrase, cada seed sem a passphrase correspondente é inútil.",
    scenProviderDeath: "Provedor colaborativo fecha/desaparece",
    scenProviderOk: "Com redundância, a perda de uma chave do provedor é tolerável.",
    scenProviderRisk: "Se o provedor tiver uma chave e fechar, você perde acesso ao quorum.",
    scenWrenchMultisigOk: "Atacante precisaria de {m} chaves em locais diferentes. Multisig protege.",
    scenWrenchMultisigRisk: "Quorum de 1 não protege contra coerção.",
    scenNoOneKnows: "Herdeiros não sabem que Bitcoin existe",
    scenNoOneKnowsDetail: "Se nenhum herdeiro sabe que você tem Bitcoin, nenhum plano técnico importa.",

    // Plano
    planoTitle: "Seu Plano de Herança",
    planoDesc: "Ações concretas baseadas no seu setup. Ordenadas por prioridade.",
    critical: "CRÍTICO",
    essential: "ESSENCIAL",
    important: "IMPORTANTE",
    action: "AÇÃO",
    maintenance: "MANUTENÇÃO",

    actionDescriptor: "Fazer backup do output descriptor",
    actionDescriptorDetail: "Exporte o descriptor da sua wallet e guarde em pelo menos 2 locais físicos separados. Sem isso, as seeds são inúteis em multisig.",
    actionPassphrase: "Documentar passphrase separadamente",
    actionPassphraseDetail: "A passphrase deve estar documentada e acessível aos herdeiros, mas SEPARADA das seeds.",
    actionMigrateMultisig: "Considerar migração para multisig",
    actionMigrateDetail: "Singlesig tem ponto único de falha para herança e para roubo. Um setup 2-de-3 resolve ambos.",
    actionInformHeir: "Informar pelo menos 1 herdeiro sobre a existência do Bitcoin",
    actionInformDetail: "Pelo menos uma pessoa de confiança precisa saber: que você tem Bitcoin, onde encontrar as instruções, quem contactar.",
    actionExecutor: "Designar um 'executor técnico'",
    actionExecutorDetail: "Nenhum herdeiro tem conhecimento técnico suficiente. Designe alguém que possa guiá-los no processo.",
    actionLetter: "Criar carta-instrução para {name}",
    actionLetterDetail: "Nível técnico: {level}. A carta será gerada no próximo passo.",
    actionReview: "Agendar revisão semestral",
    actionReviewDetail: "A cada 6 meses: verificar seeds, endereços de herdeiros, firmware, e se o plano reflete sua situação.",
    actionFireDrill: "Fazer \"fire drill\" anual",
    actionFireDrillDetail: "Simule o cenário de herança: peça a um herdeiro para seguir as instruções sem mover fundos reais.",

    // Documentos
    docsTitle: "Documentos",
    docsDesc: "Cartas-instrução personalizadas e checklist de revisão. Os campos [__________] são para preenchimento à mão, após impressão.",
    docsWarning: "⚠ NÃO SALVE ESTE ARQUIVO DIGITALMENTE. IMPRIMA AGORA E FECHE A ABA. O ARQUIVO DIGITAL É TÓXICO. Se este documento for encontrado no seu Google Drive, Desktop ou email, ele se torna um mapa do tesouro para qualquer atacante.",
    docsPenTip: "Os campos marcados com [__________] devem ser preenchidos À MÃO, com caneta, APÓS a impressão. Nunca digite locais físicos reais nesta tela.",
    docsCopyTip: "Selecione o texto, cole em um editor de texto offline, imprima e destrua o arquivo digital imediatamente.",
    checklist: "Checklist",

    // Fire Drill
    fireDrillTitle: "Fire Drill",
    fireDrillDesc: "Simule o cenário de herança. Siga cada passo como se você fosse o herdeiro tentando recuperar os fundos.",
    fireDrillIntro: "O fire drill é o teste definitivo do seu plano. Se um herdeiro não consegue seguir as instruções e chegar até a tela de confirmação de saldo, o plano tem falhas.",
    fireDrillStart: "Iniciar Fire Drill",
    fireDrillStep: "Etapa",
    fireDrillPass: "Passou",
    fireDrillFailed: "Falhou",
    fireDrillNotes: "Anotações",
    fireDrillNotesPlaceholder: "O que deu errado? O que pode melhorar?",
    fireDrillComplete: "Concluir Fire Drill",
    fireDrillHistory: "Histórico de Fire Drills",
    fireDrillNoHistory: "Nenhum fire drill realizado ainda.",
    fireDrillDate: "Data",
    fireDrillResult: "Resultado",
    fireDrillPassRate: "Taxa de sucesso",
    lastDrill: "Último fire drill",
    nextDrill: "Próximo recomendado",
    never: "Nunca",
    overdue: "ATRASADO",
    daysLeft: "dias restantes",

    // Reminders
    remindersTitle: "Lembretes",
    reminderSemestral: "Revisão semestral do plano",
    reminderFireDrill: "Fire drill anual",
    reminderFirmware: "Verificar firmware das hardware wallets",
    reminderHeirs: "Confirmar dados dos herdeiros",
    reminderStatus: "Status",
    reminderDue: "Vencimento",
    reminderDone: "Concluído",
    reminderPending: "Pendente",
    reminderMarkDone: "Marcar como feito",
    reminderOverdue: "Atrasado",


    // Letter content
    letterTitle: "CARTA DE INSTRUÇÕES",
    letterIntro: "Se você está lendo isto, significa que algo aconteceu comigo e você precisa acessar meus bitcoins. Siga estas instruções com calma. Não há pressa — o Bitcoin não vai a lugar nenhum.",
    letterBtcExplain: "O QUE É BITCOIN (RESUMO)\nBitcoin é dinheiro digital. Não existe em nenhum banco. Ele é controlado por \"chaves\" — pense nelas como senhas muito longas. Quem tem as chaves, tem o Bitcoin. Não existe \"recuperar senha\".",
    letterCustodyType: "TIPO DE CUSTÓDIA",
    letterLocateSeed: "Localizar a seed phrase",
    letterLocateSeedDesc: "A seed está guardada em: __________________________________________\nFormato: ______________________ (papel / placa de metal / outro)",
    letterLocatePassphrase: "Localizar a passphrase (25ª palavra)",
    letterPassphraseWarning: "ATENÇÃO: Além da seed, existe uma palavra/frase adicional chamada \"passphrase\". Sem ela, a seed vai abrir uma wallet VAZIA.\nA passphrase está em: __________________________________________",
    letterRecover: "Recuperar os fundos",
    letterLocateDescriptor: "Localizar o wallet descriptor",
    letterDescriptorExplain: "O \"descriptor\" é o mapa que explica como as chaves se combinam. SEM ELE, mesmo tendo todas as chaves, não é possível acessar o Bitcoin.",
    letterLocateKeys: "Localizar {m} das {n} chaves",
    letterCollabNote: "NOTA SOBRE CUSTÓDIA COLABORATIVA",
    letterCollabDetail: "Uma das chaves é mantida por: __________________________________________\nContato: __________________________________________\nEles podem ajudar na recuperação, mas NÃO têm acesso sozinhos.",
    letterTechContact: "CONTATO PARA AJUDA TÉCNICA\nSe precisar de ajuda, contate: __________________________________________",
    letterSecurityAlerts: "ALERTAS DE SEGURANÇA\n• NUNCA compartilhe seeds ou passphrases por WhatsApp, email ou qualquer meio digital\n• NUNCA digite seeds em sites desconhecidos\n• Desconfie de QUALQUER pessoa que ofereça \"ajuda\" espontaneamente\n• Não tenha pressa — golpistas criam urgência artificial\n• Na dúvida, NÃO faça nada e consulte o contato técnico",
    letterEnd: "FIM DAS INSTRUÇÕES",

    // Checklist content
    checklistTitle: "CHECKLIST DE REVISÃO SEMESTRAL",
    checklistNextReview: "Próxima revisão",
    checklistSeeds: "SEEDS E CHAVES",
    checklistSeedsIntact: "Seeds ainda estão intactas e legíveis",
    checklistPassphraseOk: "Passphrase(s) documentada(s) e acessível(is)",
    checklistDescriptorOk: "Wallet descriptor tem backup atualizado",
    checklistHwOk: "Hardware wallets funcionando e firmware atualizado",
    checklistHeirs: "HERDEIROS",
    checklistHeirLocation: "ainda mora em",
    checklistHeirLetter: "carta-instrução ainda reflete o setup atual",
    checklistHeirAware: "Pelo menos 1 herdeiro sabe da existência do Bitcoin",
    checklistTechContact: "Contato técnico de emergência ainda é válido",
    checklistSecurity: "SEGURANÇA GERAL",
    checklistNoExposure: "Nenhuma seed foi exposta a dispositivo digital",
    checklistLocsSafe: "Locais de armazenamento seguros e acessíveis",
    checklistLegal: "Nenhuma mudança na legislação que afete o plano",
    checklistProviderOk: "Provedor colaborativo ainda está operacional",
    checklistFireDrill: "FIRE DRILL (anual)",
    checklistLastDrill: "Último fire drill realizado em",
    checklistDrillResult: "Resultado",
    checklistSuccess: "Sucesso",
    checklistFailures: "Falhas encontradas",
    checklistFixed: "Falhas corrigidas",

    // FAQ
    faqTitle: "Perguntas Frequentes",
    faqDesc: "Dúvidas comuns sobre herança Bitcoin e como proteger seu patrimônio.",
    faqItems: [
      {
        q: "Onde devo guardar a carta de instruções?",
        a: "NUNCA junto com as seeds. A carta é um mapa do tesouro — se alguém encontra a carta e a seed no mesmo lugar, game over. A carta deve ficar em local acessível ao herdeiro: cofre pessoal, gaveta trancada, ou com advogado de confiança em envelope lacrado. O princípio é separação de informação: a carta diz onde ir e o que fazer, mas sozinha não dá acesso a nada. A seed dá acesso, mas sem a carta o herdeiro leigo não sabe o que fazer."
      },
      {
        q: "Posso guardar a carta digitalmente?",
        a: "Não. A carta contém a estrutura do seu setup — tipo de custódia, quorum, onde as seeds estão, quem contactar. Esse mapa digital é tóxico. Se estiver no Google Drive, email, ou desktop e alguém acessar, tem toda a informação pra te roubar (ou pressionar). Imprima, preencha à mão os campos sensíveis, e destrua qualquer cópia digital."
      },
      {
        q: "Preciso de um advogado para herança de Bitcoin?",
        a: "Depende da jurisdição e do valor. O Bitcoin em si não precisa de testamento pra ser transferido — basta ter as chaves. Mas um advogado pode ser útil pra: guardar uma cópia lacrada da carta de instruções, garantir que o processo legal não trave o acesso dos herdeiros, e integrar o plano Bitcoin ao planejamento sucessório geral. O advogado NÃO precisa saber os detalhes técnicos — apenas que existe um plano e onde encontrá-lo."
      },
      {
        q: "O que é um output descriptor e por que é tão importante?",
        a: "O output descriptor é o 'esqueleto' da sua wallet — ele descreve como as chaves se combinam para gerar endereços. Em singlesig, a seed sozinha é suficiente (o descriptor pode ser reconstruído). Em multisig, é diferente: sem o descriptor, seus herdeiros precisariam de TODAS as xpubs (chaves públicas estendidas) de TODOS os co-signatários para reconstruir a wallet, mesmo que o quorum exija apenas M de N seeds para gastar. Na prática, sem descriptor = sem acesso."
      },
      {
        q: "E se meu herdeiro não entende nada de Bitcoin?",
        a: "Isso é o cenário mais comum. Por isso a carta de instruções adapta a linguagem ao nível técnico do herdeiro. Mas a carta sozinha pode não ser suficiente para um leigo total. Recomenda-se designar um 'executor técnico' — alguém de confiança com conhecimento de Bitcoin que possa guiar o herdeiro. Esse executor NÃO deve ter acesso às seeds, apenas saber o processo. A carta deve incluir o contato dessa pessoa."
      },
      {
        q: "Com que frequência devo revisar meu plano?",
        a: "A cada 6 meses, no mínimo. A revisão semestral cobre: integridade física das seeds (papel degrada, metal pode ser danificado), firmware das hardware wallets, se os herdeiros ainda moram nos endereços documentados, e se o setup ainda reflete sua situação. Além disso, faça um 'fire drill' anual — peça ao herdeiro principal para seguir as instruções do plano sem mover fundos reais."
      },
      {
        q: "Multisig é melhor que singlesig para herança?",
        a: "Na maioria dos casos, sim. Singlesig tem ponto único de falha: se a seed é comprometida ou perdida, acabou. Multisig (2-de-3, por exemplo) permite redundância — você pode perder uma seed e ainda acessar os fundos. Também protege contra coerção física ($5 wrench attack), porque o atacante precisaria de múltiplas chaves em locais diferentes. A desvantagem: a complexidade para os herdeiros aumenta. Por isso o output descriptor e as instruções claras são ainda mais críticos."
      },
      {
        q: "A passphrase deve ficar junto com a seed?",
        a: "Jamais. A passphrase (25ª palavra) é sua última camada de defesa. Se alguém encontra sua seed, abre uma wallet vazia (ou uma wallet 'isca' com pouco saldo). A passphrase deve estar documentada em local separado, acessível ao herdeiro, mas NUNCA no mesmo lugar que a seed. Idealmente, a carta de instruções menciona onde encontrar a passphrase, mas a passphrase em si está em outro local físico."
      },
      {
        q: "E se eu mudar meu setup depois de criar o plano?",
        a: "O plano deve ser atualizado imediatamente. Se você migrar de singlesig pra multisig, trocar hardware wallet, ou alterar o quorum, todas as cartas de instrução ficam desatualizadas e potencialmente perigosas. A revisão semestral existe exatamente pra capturar essas mudanças. Regra: toda mudança no setup = atualização imediata do plano de herança."
      },
      {
        q: "Esta ferramenta armazena meus dados?",
        a: "Não. Zero. A ferramenta roda 100% no navegador (client-side). Nenhum dado é enviado a servidores, nenhuma informação é salva em banco de dados, e não existe conta de usuário. Quando você fecha a aba, tudo desaparece da memória RAM. Isso é uma feature de segurança, não uma limitação. Recomendamos usar em janela anônima para evitar que extensões de navegador leiam o conteúdo da tela."
      },
    ],

    // Donate
    donateTitle: "Apoie o Projeto",
    donateDesc: "Esta ferramenta é 100% gratuita e open-source. Se ela te ajudou a proteger seus bitcoins, considere contribuir para manter o desenvolvimento ativo.",
    donateLN: "Lightning Network",
    donateLNDesc: "Escaneie o QR code ou copie o endereço Lightning abaixo:",
    donatePlaceholderLN: "expresstask226@walletofsatoshi.com",
    donateThank: "Cada sat conta. Obrigado por apoiar a soberania financeira.",
    donateCopied: "Copiado!",
    donateCopy: "Copiar",
    donateTab: "Doar",
    donateNostr: "Nostr",
    donateX: "X (Twitter)",
    donateGH: "GitHub",
    donateYT: "YouTube",
  },
  en: {
    appName: "Bitcoin Inheritance",
    appSub: "Succession Plan",
    start: "Get Started",
    next: "Next",
    back: "Back",
    restart: "Restart",
    savePlan: "Save Plan",
    planSaved: "Plan saved!",
    exportPlan: "Export PDF",
    free: "Free",
    month: "month",
    year: "year",
    or: "or",
    satsYear: "sats/year",
    step: "Step",
    of: "of",

    steps: {
      intro: "Start",
      custodia: "Custody",
      patrimonio: "Holdings",
      herdeiros: "Heirs",
      cenarios: "Failure Scenarios",
      plano: "Plan",
      documentos: "Documents",
      fireDrill: "Fire Drill",
      faq: "FAQ",
      donate: "Donate",
    },

    introTag: "Bitcoin Inheritance Planner",
    introTitle1: "Does your Bitcoin",
    introTitle2: "survive you?",
    introDesc: "Most bitcoiners don't have a working inheritance plan. This tool maps your setup, identifies failure points, and generates a complete plan with ready-made documents for your heirs.",
    introFeature1: "Failure scenario mapping",
    introFeature2: "Heir instruction letters",
    introFeature3: "Security checklist",
    introFeature4: "Interactive fire drill",
    securityWarning: "Security notice:",
    securityText: "This tool runs 100% in your browser. No data is sent to servers. Still, never enter seeds, private keys, or real addresses. Use only structural information.",
    securityTextExtra: "RECOMMENDATION: Use in an incognito/private window (no browser extensions) or disconnect from the internet after loading the page. Malicious extensions can read screen content.",

    custodyTitle: "Custody Model",
    custodyDesc: "How are your bitcoins stored today?",
    singlesig: "Singlesig",
    singlesigDesc: "A single private key controls the funds. Simpler, but single point of failure.",
    multisig: "Multisig",
    multisigDesc: "Multiple keys required to move funds. More resilient, more complex to inherit.",
    collaborative: "Collaborative Custody",
    collaborativeDesc: "Multisig with one key held by a third party (Nunchuk, Casa, Unchained).",
    quorum: "Quorum (M)",
    totalKeys: "Total keys (N)",
    select: "Select",
    usesPassphrase: "Uses passphrase (25th word)?",
    yes: "Yes",
    no: "No",
    walletSoftware: "Wallet software",
    hardwareWallets: "Hardware wallets used",

    patrimonioTitle: "Holdings",
    patrimonioDesc: "Structural information about how your funds are distributed.",
    btcRange: "BTC holdings range",
    prefNaoInformar: "Prefer not to say",
    utxoCount: "How many distinct UTXOs (estimate)?",
    dontKnow: "Don't know",
    seedLocations: "Where are seeds/keys stored physically?",
    locHome: "Home",
    locBank: "Bank vault",
    locFamily: "Family member's home",
    locOffice: "Office",
    locOther: "Other secure location",
    locMetal: "Metal plate",
    locPaper: "Paper",
    descriptorBackup: "Wallet descriptor / output descriptor backup?",
    dontKnowWhatIs: "Don't know what that is",
    descriptorWarning: "Without the descriptor, heirs may have the seed but can't reconstruct the wallet. Critical for multisig.",
    descriptorInfo: "The output descriptor is your wallet's \"map\" — it describes how keys combine to generate addresses. In multisig, it's as important as the seeds.",

    heirsTitle: "Heirs",
    heirsDesc: "Who should have access to your bitcoins? Use nicknames if you prefer.",
    heir: "Heir",
    nameLabel: "Name / Nickname",
    namePlaceholder: "E.g.: Spouse, Son, Brother...",
    relation: "Relationship",
    relSpouse: "Spouse",
    relChild: "Child",
    relParent: "Parent",
    relSibling: "Sibling",
    relFriend: "Trusted friend",
    relOther: "Other",
    techLevel: "Bitcoin technical level",
    techZero: "None",
    techBasic: "Basic",
    techIntermediate: "Intermediate",
    techAdvanced: "Advanced",
    location: "Location",
    locationPlaceholder: "E.g.: New York, US",
    addHeir: "+ Add heir",
    remove: "Remove",

    cenariosTitle: "Failure Scenarios",
    cenariosDesc: "Based on your setup, these are the scenarios you need to consider.",
    protected: "PROTECTED",
    risk: "RISK",
    fail: "FAIL",
    criticalFailures: "critical failure scenario(s) identified.",
    criticalAction: "The plan in the next step will address each one.",

    scenSinglesigDeath: "You die, heir finds seed",
    scenSinglesigDeathOk: "At least one heir has technical capability to recover.",
    scenSinglesigDeathRisk: "No heir has sufficient knowledge to use the seed.",
    scenSeedLost: "Seed is lost or destroyed",
    scenSeedLostDetail: "Singlesig = single point of failure. If the seed is lost, funds are unrecoverable.",
    scenPassphraseNoHeir: "Heir has seed but not passphrase",
    scenPassphraseDetail: "Without the passphrase, the seed opens an empty wallet. Funds inaccessible.",
    scenWrench: "Physical theft/coercion",
    scenWrenchSinglesig: "Singlesig is vulnerable to $5 wrench attack. No quorum to protect.",
    scenMultisigDeath: "heirs locate {m} of {n} keys",
    scenMultisigDeathOk: "Redundancy of {r} key(s). Room for loss.",
    scenMultisigDeathRisk: "Zero redundancy. All keys are required.",
    scenKeysLost: "{x} keys lost simultaneously",
    scenKeysLostDetail: "If more than {r} key(s) are lost, funds become inaccessible.",
    scenNoDescriptor: "Heirs can't find the wallet descriptor",
    scenNoDescriptorOk: "Descriptor has backup. Heirs can reconstruct the wallet with just {m} seeds.",
    scenNoDescriptorFail: "Without the descriptor, the {m}-of-{n} quorum redundancy DOES NOT apply. Heirs would need ALL {n} xpubs to reconstruct the wallet skeleton — even though only {m} seeds are needed to spend. In practice, without descriptor and without all xpubs, funds are inaccessible.",
    scenPassphraseMultisig: "Passphrase not documented",
    scenPassphraseMultisigDetail: "In multisig with passphrase, each seed without its passphrase is useless.",
    scenProviderDeath: "Collaborative provider shuts down",
    scenProviderOk: "With redundancy, losing the provider's key is tolerable.",
    scenProviderRisk: "If the provider holds a key and shuts down, you lose quorum access.",
    scenWrenchMultisigOk: "Attacker would need {m} keys in different locations. Multisig protects.",
    scenWrenchMultisigRisk: "Quorum of 1 doesn't protect against coercion.",
    scenNoOneKnows: "Heirs don't know Bitcoin exists",
    scenNoOneKnowsDetail: "If no heir knows you own Bitcoin, no technical plan matters.",

    planoTitle: "Your Inheritance Plan",
    planoDesc: "Concrete actions based on your setup. Ordered by priority.",
    critical: "CRITICAL",
    essential: "ESSENTIAL",
    important: "IMPORTANT",
    action: "ACTION",
    maintenance: "MAINTENANCE",

    actionDescriptor: "Back up the output descriptor",
    actionDescriptorDetail: "Export the descriptor from your wallet and store in at least 2 separate physical locations.",
    actionPassphrase: "Document passphrase separately",
    actionPassphraseDetail: "The passphrase must be documented and accessible to heirs, but SEPARATE from seeds.",
    actionMigrateMultisig: "Consider migrating to multisig",
    actionMigrateDetail: "Singlesig has a single point of failure for inheritance and theft. A 2-of-3 setup solves both.",
    actionInformHeir: "Inform at least 1 heir about Bitcoin's existence",
    actionInformDetail: "At least one trusted person needs to know: you own Bitcoin, where to find instructions, who to contact.",
    actionExecutor: "Designate a 'technical executor'",
    actionExecutorDetail: "No heir has sufficient technical knowledge. Designate someone who can guide them.",
    actionLetter: "Create instruction letter for {name}",
    actionLetterDetail: "Technical level: {level}. The letter will be generated in the next step.",
    actionReview: "Schedule semi-annual review",
    actionReviewDetail: "Every 6 months: verify seeds, heir addresses, firmware, and that the plan reflects your situation.",
    actionFireDrill: "Perform annual fire drill",
    actionFireDrillDetail: "Simulate the inheritance scenario: have an heir follow the instructions without moving real funds.",

    docsTitle: "Documents",
    docsDesc: "Personalized instruction letters and review checklist. Blank fields [__________] are for handwriting after printing.",
    docsWarning: "⚠ DO NOT SAVE THIS FILE DIGITALLY. PRINT NOW AND CLOSE THE TAB. THE DIGITAL FILE IS TOXIC. If this document is found on your Google Drive, Desktop, or email, it becomes a treasure map for any attacker.",
    docsPenTip: "Fields marked with [__________] must be filled BY HAND, with a pen, AFTER printing. Never type real physical locations on this screen.",
    docsCopyTip: "Select the text, paste into an offline text editor, print, and destroy the digital file immediately.",
    checklist: "Checklist",

    fireDrillTitle: "Fire Drill",
    fireDrillDesc: "Simulate the inheritance scenario. Follow each step as if you were the heir trying to recover funds.",
    fireDrillIntro: "The fire drill is the ultimate test of your plan. If an heir can't follow the instructions to the balance confirmation screen, the plan has flaws.",
    fireDrillStart: "Start Fire Drill",
    fireDrillStep: "Step",
    fireDrillPass: "Pass",
    fireDrillFailed: "Failed",
    fireDrillNotes: "Notes",
    fireDrillNotesPlaceholder: "What went wrong? What can be improved?",
    fireDrillComplete: "Complete Fire Drill",
    fireDrillHistory: "Fire Drill History",
    fireDrillNoHistory: "No fire drills performed yet.",
    fireDrillDate: "Date",
    fireDrillResult: "Result",
    fireDrillPassRate: "Pass rate",
    lastDrill: "Last fire drill",
    nextDrill: "Next recommended",
    never: "Never",
    overdue: "OVERDUE",
    daysLeft: "days left",

    remindersTitle: "Reminders",
    reminderSemestral: "Semi-annual plan review",
    reminderFireDrill: "Annual fire drill",
    reminderFirmware: "Check hardware wallet firmware",
    reminderHeirs: "Confirm heir information",
    reminderStatus: "Status",
    reminderDue: "Due",
    reminderDone: "Done",
    reminderPending: "Pending",
    reminderMarkDone: "Mark as done",
    reminderOverdue: "Overdue",


    letterTitle: "INSTRUCTION LETTER",
    letterIntro: "If you're reading this, something has happened to me and you need to access my bitcoins. Follow these instructions calmly. There's no rush — Bitcoin isn't going anywhere.",
    letterBtcExplain: "WHAT IS BITCOIN (SUMMARY)\nBitcoin is digital money. It doesn't exist in any bank. It's controlled by \"keys\" — think of them as very long passwords. Whoever has the keys has the Bitcoin. There is no \"forgot password\".",
    letterCustodyType: "CUSTODY TYPE",
    letterLocateSeed: "Locate the seed phrase",
    letterLocateSeedDesc: "The seed is stored at: __________________________________________\nFormat: ______________________ (paper / metal plate / other)",
    letterLocatePassphrase: "Locate the passphrase (25th word)",
    letterPassphraseWarning: "WARNING: Besides the seed, there's an additional word/phrase called \"passphrase\". Without it, the seed opens an EMPTY wallet.\nThe passphrase is at: __________________________________________",
    letterRecover: "Recover the funds",
    letterLocateDescriptor: "Locate the wallet descriptor",
    letterDescriptorExplain: "The \"descriptor\" is a map that explains how keys combine. WITHOUT IT, even with all keys, Bitcoin cannot be accessed.",
    letterLocateKeys: "Locate {m} of {n} keys",
    letterCollabNote: "NOTE ON COLLABORATIVE CUSTODY",
    letterCollabDetail: "One key is held by: __________________________________________\nContact: __________________________________________\nThey can help with recovery but do NOT have access alone.",
    letterTechContact: "TECHNICAL HELP CONTACT\nIf you need help, contact: __________________________________________",
    letterSecurityAlerts: "SECURITY ALERTS\n• NEVER share seeds or passphrases via WhatsApp, email, or any digital means\n• NEVER enter seeds on unknown websites\n• Be suspicious of ANYONE who offers unsolicited \"help\"\n• Don't rush — scammers create artificial urgency\n• When in doubt, DO NOTHING and consult the technical contact",
    letterEnd: "END OF INSTRUCTIONS",

    checklistTitle: "SEMI-ANNUAL REVIEW CHECKLIST",
    checklistNextReview: "Next review",
    checklistSeeds: "SEEDS AND KEYS",
    checklistSeedsIntact: "Seeds still intact and readable",
    checklistPassphraseOk: "Passphrase(s) documented and accessible",
    checklistDescriptorOk: "Wallet descriptor backup is up to date",
    checklistHwOk: "Hardware wallets working and firmware updated",
    checklistHeirs: "HEIRS",
    checklistHeirLocation: "still lives at",
    checklistHeirLetter: "instruction letter still reflects current setup",
    checklistHeirAware: "At least 1 heir knows Bitcoin exists",
    checklistTechContact: "Emergency technical contact still valid",
    checklistSecurity: "GENERAL SECURITY",
    checklistNoExposure: "No seed was exposed to a digital device",
    checklistLocsSafe: "Storage locations still secure and accessible",
    checklistLegal: "No legal changes affecting the plan",
    checklistProviderOk: "Collaborative provider still operational",
    checklistFireDrill: "FIRE DRILL (annual)",
    checklistLastDrill: "Last fire drill performed on",
    checklistDrillResult: "Result",
    checklistSuccess: "Success",
    checklistFailures: "Failures found",
    checklistFixed: "Failures corrected",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqDesc: "Common questions about Bitcoin inheritance and how to protect your wealth.",
    faqItems: [
      {
        q: "Where should I store the instruction letter?",
        a: "NEVER with the seeds. The letter is a treasure map — if someone finds the letter and the seed in the same place, game over. The letter should be in a location accessible to the heir: personal safe, locked drawer, or with a trusted attorney in a sealed envelope. The principle is information separation: the letter says where to go and what to do, but alone grants no access. The seed grants access, but without the letter a non-technical heir won't know what to do."
      },
      {
        q: "Can I store the letter digitally?",
        a: "No. The letter contains the structure of your setup — custody type, quorum, where seeds are, who to contact. That digital map is toxic. If it's on Google Drive, email, or your desktop and someone accesses it, they have all the information to rob you (or coerce you). Print it, fill in sensitive fields by hand, and destroy any digital copy."
      },
      {
        q: "Do I need a lawyer for Bitcoin inheritance?",
        a: "Depends on jurisdiction and value. Bitcoin itself doesn't need a will to be transferred — you just need the keys. But a lawyer can be useful to: hold a sealed copy of the instruction letter, ensure the legal process doesn't block heirs' access, and integrate the Bitcoin plan with general estate planning. The lawyer does NOT need to know technical details — only that a plan exists and where to find it."
      },
      {
        q: "What is an output descriptor and why is it so important?",
        a: "The output descriptor is the 'skeleton' of your wallet — it describes how keys combine to generate addresses. In singlesig, the seed alone is sufficient (the descriptor can be reconstructed). In multisig, it's different: without the descriptor, your heirs would need ALL xpubs (extended public keys) from ALL co-signers to reconstruct the wallet, even if the quorum only requires M of N seeds to spend. In practice, no descriptor = no access."
      },
      {
        q: "What if my heir knows nothing about Bitcoin?",
        a: "This is the most common scenario. That's why the instruction letter adapts its language to the heir's technical level. But the letter alone may not be enough for a complete novice. It's recommended to designate a 'technical executor' — a trusted person with Bitcoin knowledge who can guide the heir. This executor should NOT have access to seeds, only know the process. The letter should include their contact information."
      },
      {
        q: "How often should I review my plan?",
        a: "Every 6 months, minimum. The semi-annual review covers: physical integrity of seeds (paper degrades, metal can be damaged), hardware wallet firmware, whether heirs still live at documented addresses, and whether the setup still reflects your situation. Additionally, do an annual 'fire drill' — have the primary heir follow the plan instructions without moving real funds."
      },
      {
        q: "Is multisig better than singlesig for inheritance?",
        a: "In most cases, yes. Singlesig has a single point of failure: if the seed is compromised or lost, it's over. Multisig (2-of-3, for example) allows redundancy — you can lose one seed and still access funds. It also protects against physical coercion ($5 wrench attack), because the attacker would need multiple keys in different locations. The downside: complexity for heirs increases. That's why the output descriptor and clear instructions are even more critical."
      },
      {
        q: "Should the passphrase be stored with the seed?",
        a: "Never. The passphrase (25th word) is your last line of defense. If someone finds your seed, they open an empty wallet (or a 'decoy' wallet with little balance). The passphrase must be documented in a separate location, accessible to the heir, but NEVER in the same place as the seed. Ideally, the instruction letter mentions where to find the passphrase, but the passphrase itself is at another physical location."
      },
      {
        q: "What if I change my setup after creating the plan?",
        a: "The plan must be updated immediately. If you migrate from singlesig to multisig, change hardware wallets, or alter the quorum, all instruction letters become outdated and potentially dangerous. The semi-annual review exists precisely to catch these changes. Rule: any setup change = immediate inheritance plan update."
      },
      {
        q: "Does this tool store my data?",
        a: "No. Zero. The tool runs 100% in the browser (client-side). No data is sent to servers, no information is saved in databases, and there are no user accounts. When you close the tab, everything disappears from RAM. This is a security feature, not a limitation. We recommend using in an incognito window to prevent browser extensions from reading screen content."
      },
    ],

    // Donate
    donateTitle: "Support the Project",
    donateDesc: "This tool is 100% free and open-source. If it helped you protect your bitcoins, consider contributing to keep development active.",
    donateLN: "Lightning Network",
    donateLNDesc: "Scan the QR code or copy the Lightning address below:",
    donatePlaceholderLN: "expresstask226@walletofsatoshi.com",
    donateThank: "Every sat counts. Thank you for supporting financial sovereignty.",
    donateCopied: "Copied!",
    donateCopy: "Copy",
    donateTab: "Donate",
    donateNostr: "Nostr",
    donateX: "X (Twitter)",
    donateGH: "GitHub",
    donateYT: "YouTube",
  },
};

// ─── Minimal icon components ────────────────────────────────────────────────

const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ShieldIcon = ({ size = 20 }) => <Icon size={size} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const KeyIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const UsersIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const AlertIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const FileIcon = ({ size = 20 }) => <Icon size={size} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />;
const CheckIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ChevronRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ChevronLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const RefreshIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);
const FireIcon = ({ size = 20 }) => <Icon size={size} d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z" />;
const LockIcon = ({ size = 16 }) => <Icon size={size} d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />;
const GlobeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// ─── Utility ────────────────────────────────────────────────────────────────

function genId() { return Math.random().toString(36).substr(2, 9); }

const STEPS = ["intro", "custodia", "patrimonio", "herdeiros", "cenarios", "plano", "documentos", "fireDrill", "faq", "donate"];

const HW_OPTIONS = ["Coldcard", "SeedSigner", "Krux", "Trezor", "Ledger", "Jade", "BitBox", "Passport", "Keystone", "DIY", "Outra/Other"];

// ─── Main App ───────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState("pt");
  const [currentStep, setCurrentStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState({
    custodyType: "", quorum: "", totalKeys: "", usesPassphrase: null,
    walletSoftware: "", hardwareWallets: [], btcRange: "", utxoCount: "",
    seedLocations: [], hasDescriptorBackup: "",
    heirs: [{ id: genId(), name: "", relation: "", techLevel: "", location: "" }],
  });

  // Hooks for sub-steps (must be at top level, not inside switch)
  const [selHeir, setSelHeir] = useState(null);
  const [showCL, setShowCL] = useState(false);
  const [drillState, setDrillState] = useState([]);
  const [drillDone, setDrillDone] = useState(false);
  const [copiedLN, setCopiedLN] = useState(false);
  const [copiedBTC, setCopiedBTC] = useState(false);

  const t = translations[lang];
  const stepKey = STEPS[currentStep];

  const toggleLang = () => setLang(l => l === "pt" ? "en" : "pt");

  const canAdvance = () => {
    if (stepKey === "intro") return true;
    if (stepKey === "custodia") {
      if (!data.custodyType) return false;
      if ((data.custodyType === "multisig" || data.custodyType === "collaborative") && (!data.quorum || !data.totalKeys)) return false;
      return true;
    }
    if (stepKey === "herdeiros") return data.heirs?.length > 0 && data.heirs.some(h => h.name);
    if (stepKey === "donate") return false;
    return true;
  };

  const next = () => { if (currentStep < STEPS.length - 1) { setCurrentStep(s => s + 1); window.scrollTo(0, 0); } };
  const prev = () => { if (currentStep > 0) { setCurrentStep(s => s - 1); window.scrollTo(0, 0); } };
  const reset = () => { setCurrentStep(0); setSaved(false); setDrillState([]); setDrillDone(false); setSelHeir(null); setShowCL(false); setData({ custodyType: "", quorum: "", totalKeys: "", usesPassphrase: null, walletSoftware: "", hardwareWallets: [], btcRange: "", utxoCount: "", seedLocations: [], hasDescriptorBackup: "", heirs: [{ id: genId(), name: "", relation: "", techLevel: "", location: "" }] }); };

  // ─── Styles ─────────────────────────────────────────────────────────
  const s = {
    root: { minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "'IBM Plex Mono','SF Mono','Fira Code',monospace", position: "relative", overflow: "hidden" },
    grid: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 },
    header: { borderBottom: "1px solid rgba(245,158,11,0.15)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 10, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(10px)", gap: "12px", flexWrap: "wrap" },
    logo: { display: "flex", alignItems: "center", gap: "10px" },
    logoBox: { width: "32px", height: "32px", border: "2px solid #f59e0b", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b" },
    logoTxt: { fontSize: "14px", fontWeight: "700", color: "#f59e0b", letterSpacing: "0.05em", textTransform: "uppercase" },
    logoSub: { fontSize: "9px", color: "#737373", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1px" },
    dots: { display: "flex", alignItems: "center", gap: "3px" },
    main: { maxWidth: "780px", margin: "0 auto", padding: "40px 20px 140px", position: "relative", zIndex: 5 },
    footer: { position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(transparent,rgba(10,10,10,0.97) 30%)", backdropFilter: "blur(10px)", zIndex: 20 },
    h2: { fontSize: "26px", fontWeight: "700", color: "#f5f5f5", marginBottom: "8px", letterSpacing: "-0.02em", fontFamily: "'IBM Plex Sans','Helvetica Neue',sans-serif" },
    sub: { fontSize: "14px", color: "#737373", marginBottom: "36px", lineHeight: "1.6" },
    card: { background: "rgba(245,158,11,0.03)", border: "1px solid rgba(245,158,11,0.1)", borderRadius: "12px", padding: "20px", marginBottom: "14px", transition: "all 0.2s ease", cursor: "default" },
    cardSel: { borderColor: "#f59e0b", background: "rgba(245,158,11,0.08)", boxShadow: "0 0 20px rgba(245,158,11,0.1)" },
    label: { fontSize: "12px", fontWeight: "600", color: "#a3a3a3", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" },
    input: { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "8px", padding: "10px 14px", color: "#e0e0e0", fontSize: "13px", fontFamily: "'IBM Plex Mono',monospace", outline: "none", boxSizing: "border-box" },
    select: { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "8px", padding: "10px 14px", color: "#e0e0e0", fontSize: "13px", fontFamily: "'IBM Plex Mono',monospace", outline: "none", appearance: "none", cursor: "pointer", boxSizing: "border-box" },
    btnP: { background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#0a0a0a", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "13px", fontWeight: "700", fontFamily: "'IBM Plex Mono',monospace", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.05em" },
    btnS: { background: "transparent", color: "#a3a3a3", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", padding: "12px 24px", fontSize: "13px", fontWeight: "600", fontFamily: "'IBM Plex Mono',monospace", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" },
    tag: (color) => ({ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", background: `rgba(${color},0.1)`, color: `rgb(${color})`, border: `1px solid rgba(${color},0.2)` }),
    chip: (sel) => ({ cursor: "pointer", padding: "7px 13px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", border: sel ? "1px solid rgba(245,158,11,0.4)" : "1px solid rgba(255,255,255,0.1)", color: sel ? "#f59e0b" : "#737373", background: sel ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)", transition: "all 0.15s ease", display: "inline-flex", alignItems: "center", gap: "4px" }),
    info: { background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "10px", padding: "14px 18px", marginBottom: "20px", fontSize: "12px", lineHeight: "1.6", color: "#a3a3a3", display: "flex", gap: "10px", alignItems: "flex-start" },
    warn: { background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "10px", padding: "14px 18px", marginBottom: "20px", fontSize: "12px", lineHeight: "1.6", color: "#fca5a5", display: "flex", gap: "10px", alignItems: "flex-start" },
    doc: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,158,11,0.1)", borderRadius: "12px", padding: "18px", marginBottom: "14px", whiteSpace: "pre-wrap", fontSize: "12px", lineHeight: "1.7", color: "#d4d4d4", maxHeight: "380px", overflowY: "auto" },
    langBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", color: "#a3a3a3", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'IBM Plex Mono',monospace", fontWeight: "600" },
  };

  const amber = "245,158,11";
  const red = "239,68,68";
  const green = "34,197,94";

  // ─── Option Card ────────────────────────────────────────────────────
  const OptionCard = ({ sel, onClick, icon, title, desc }) => (
    <div onClick={onClick} style={{ ...s.card, ...(sel ? s.cardSel : {}), cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "14px" }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: sel ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: sel ? "#f59e0b" : "#737373", flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "14px", fontWeight: "600", color: sel ? "#f5f5f5" : "#d4d4d4", marginBottom: "3px" }}>{title}</div>
        <div style={{ fontSize: "12px", color: "#737373", lineHeight: "1.5" }}>{desc}</div>
      </div>
      <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? "#f59e0b" : "rgba(245,158,11,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {sel && <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f59e0b" }} />}
      </div>
    </div>
  );

  // ─── Scenario builder ──────────────────────────────────────────────
  const buildScenarios = () => {
    const scenarios = [];
    const { custodyType, usesPassphrase, hasDescriptorBackup, heirs } = data;
    const quorum = parseInt(data.quorum) || 2;
    const totalKeys = parseInt(data.totalKeys) || 3;
    const redundancy = totalKeys - quorum;
    const hasCapable = (heirs || []).some(h => h.techLevel === "avancado" || h.techLevel === "intermediario");

    if (custodyType === "singlesig") {
      scenarios.push({ name: t.scenSinglesigDeath, result: hasCapable ? "ok" : "risk", detail: hasCapable ? t.scenSinglesigDeathOk : t.scenSinglesigDeathRisk });
      scenarios.push({ name: t.scenSeedLost, result: "fail", detail: t.scenSeedLostDetail });
      if (usesPassphrase) scenarios.push({ name: t.scenPassphraseNoHeir, result: "fail", detail: t.scenPassphraseDetail });
      scenarios.push({ name: t.scenWrench, result: "fail", detail: t.scenWrenchSinglesig });
    }
    if (custodyType === "multisig" || custodyType === "collaborative") {
      scenarios.push({ name: `${t.scenMultisigDeath.replace("{m}", quorum).replace("{n}", totalKeys)}`, result: redundancy >= 1 ? "ok" : "risk", detail: redundancy >= 1 ? t.scenMultisigDeathOk.replace("{r}", redundancy) : t.scenMultisigDeathRisk });
      scenarios.push({ name: t.scenKeysLost.replace("{x}", redundancy + 1), result: "fail", detail: t.scenKeysLostDetail.replace("{r}", redundancy) });
      const hasDescriptor = hasDescriptorBackup === t.yes;
      scenarios.push({ name: t.scenNoDescriptor, result: hasDescriptor ? "ok" : "fail", detail: hasDescriptor ? t.scenNoDescriptorOk.replace("{m}", quorum) : t.scenNoDescriptorFail.replace(/\{m\}/g, quorum).replace(/\{n\}/g, totalKeys) });
      if (usesPassphrase) scenarios.push({ name: t.scenPassphraseMultisig, result: "fail", detail: t.scenPassphraseMultisigDetail });
      if (custodyType === "collaborative") scenarios.push({ name: t.scenProviderDeath, result: redundancy >= 1 ? "ok" : "risk", detail: redundancy >= 1 ? t.scenProviderOk : t.scenProviderRisk });
      scenarios.push({ name: t.scenWrench, result: quorum > 1 ? "ok" : "risk", detail: quorum > 1 ? t.scenWrenchMultisigOk.replace("{m}", quorum) : t.scenWrenchMultisigRisk });
    }
    scenarios.push({ name: t.scenNoOneKnows, result: (heirs || []).length > 0 ? "risk" : "fail", detail: t.scenNoOneKnowsDetail });
    return scenarios;
  };

  // ─── Render helpers ─────────────────────────────────────────────────
  const resultTag = (r) => {
    if (r === "ok") return <span style={s.tag(green)}>{t.protected}</span>;
    if (r === "risk") return <span style={s.tag(amber)}>{t.risk}</span>;
    return <span style={s.tag(red)}>{t.fail}</span>;
  };

  const priorityTag = (type, label) => {
    const c = type === "red" ? red : type === "amber" ? amber : green;
    return <span style={{ ...s.tag(c), marginTop: "2px" }}>{label}</span>;
  };

  // ─── Letter generator ──────────────────────────────────────────────
  const genLetter = (heir) => {
    if (!heir) return "";
    const isLeigo = heir.techLevel === "zero" || heir.techLevel === "basico" || heir.techLevel === "";
    const quorum = parseInt(data.quorum) || 2;
    const totalKeys = parseInt(data.totalKeys) || 3;
    const walletSw = data.walletSoftware || (lang === "pt" ? "sua wallet" : "your wallet");
    let l = `${"═".repeat(50)}\n  ${t.letterTitle} – ${(heir.name || t.heir).toUpperCase()}\n${"═".repeat(50)}\n\n${heir.name || t.heir},\n\n${t.letterIntro}\n\n`;
    if (isLeigo) l += `${t.letterBtcExplain}\n\n`;
    if (data.custodyType === "singlesig") {
      l += `${t.letterCustodyType}: Singlesig\n\n`;
      l += `1. ${t.letterLocateSeed}\n${t.letterLocateSeedDesc}\n\n`;
      if (data.usesPassphrase) l += `2. ${t.letterLocatePassphrase}\n${t.letterPassphraseWarning}\n\n`;
      l += `${data.usesPassphrase ? "3" : "2"}. ${t.letterRecover}\n`;
      if (isLeigo) l += `   - ${lang === "pt" ? `Baixe "${walletSw}" no computador\n   - Selecione "Importar Wallet"\n   - Digite as palavras na ordem exata\n   - Aguarde sincronização` : `Download "${walletSw}" on a computer\n   - Select "Import Wallet"\n   - Enter the words in exact order\n   - Wait for sync`}\n\n`;
    }
    if (data.custodyType === "multisig" || data.custodyType === "collaborative") {
      l += `${t.letterCustodyType}: Multisig ${quorum}-${lang === "pt" ? "de" : "of"}-${totalKeys}${data.custodyType === "collaborative" ? ` (${t.collaborative})` : ""}\n\n`;
      l += `1. ${t.letterLocateDescriptor}\n${isLeigo ? t.letterDescriptorExplain + "\n" : ""}   ${lang === "pt" ? "Local" : "Location"}: __________________________________________\n\n`;
      l += `2. ${t.letterLocateKeys.replace("{m}", quorum).replace("{n}", totalKeys)}\n`;
      for (let i = 1; i <= totalKeys; i++) l += `   Key ${i}: __________________________________________\n`;
      l += "\n";
      if (data.usesPassphrase) l += `3. ${t.letterLocatePassphrase}\n${t.letterPassphraseWarning}\n\n`;
      l += `${data.usesPassphrase ? "4" : "3"}. ${t.letterRecover}\n\n`;
      if (data.custodyType === "collaborative") l += `${t.letterCollabNote}\n${t.letterCollabDetail}\n\n`;
    }
    l += `${t.letterTechContact}\n\n${t.letterSecurityAlerts}\n\n${"═".repeat(50)}\n  ${t.letterEnd}\n${"═".repeat(50)}`;
    return l;
  };

  const genChecklist = () => {
    const heirs = data.heirs || [];
    let c = `${"═".repeat(50)}\n  ${t.checklistTitle}\n  ${t.checklistNextReview}: __________________________________________\n${"═".repeat(50)}\n\n`;
    c += `${t.checklistSeeds}\n[ ] ${t.checklistSeedsIntact}\n`;
    if (data.usesPassphrase) c += `[ ] ${t.checklistPassphraseOk}\n`;
    if (data.custodyType !== "singlesig") c += `[ ] ${t.checklistDescriptorOk}\n`;
    c += `[ ] ${t.checklistHwOk}\n`;
    (data.hardwareWallets || []).forEach(hw => { c += `    [ ] ${hw}: firmware v[___]\n`; });
    c += `\n${t.checklistHeirs}\n`;
    heirs.forEach(h => {
      c += `[ ] ${h.name || t.heir}: ${t.checklistHeirLocation} ${h.location || "[?]"}\n`;
      c += `[ ] ${h.name || t.heir}: ${t.checklistHeirLetter}\n`;
    });
    c += `[ ] ${t.checklistHeirAware}\n[ ] ${t.checklistTechContact}\n`;
    c += `\n${t.checklistSecurity}\n[ ] ${t.checklistNoExposure}\n[ ] ${t.checklistLocsSafe}\n[ ] ${t.checklistLegal}\n`;
    if (data.custodyType === "collaborative") c += `[ ] ${t.checklistProviderOk}\n`;
    c += `\n${t.checklistFireDrill}\n[ ] ${t.checklistLastDrill}: [DATE]\n[ ] ${t.checklistDrillResult}: [ ] ${t.checklistSuccess}  [ ] ${t.checklistFailures}\n[ ] ${t.checklistFixed}: [DESCRIBE]`;
    return c;
  };

  // ─── Fire Drill Steps ──────────────────────────────────────────────
  const buildDrillSteps = () => {
    const steps = [];
    if (data.custodyType === "singlesig") {
      steps.push(lang === "pt" ? "Localizar a seed phrase no local documentado" : "Locate the seed phrase at the documented location");
      if (data.usesPassphrase) steps.push(lang === "pt" ? "Localizar a passphrase no local separado" : "Locate the passphrase at the separate location");
      steps.push(lang === "pt" ? `Abrir ${data.walletSoftware || "a wallet"} e iniciar importação` : `Open ${data.walletSoftware || "the wallet"} and start import`);
      steps.push(lang === "pt" ? "Verificar que o saldo aparece corretamente (NÃO mova fundos)" : "Verify the balance shows correctly (DO NOT move funds)");
    } else {
      steps.push(lang === "pt" ? "Localizar o wallet descriptor" : "Locate the wallet descriptor");
      steps.push(lang === "pt" ? `Localizar ${data.quorum || 2} das ${data.totalKeys || 3} seeds/signing devices` : `Locate ${data.quorum || 2} of ${data.totalKeys || 3} seeds/signing devices`);
      if (data.usesPassphrase) steps.push(lang === "pt" ? "Localizar a(s) passphrase(s)" : "Locate the passphrase(s)");
      steps.push(lang === "pt" ? `Importar descriptor no ${data.walletSoftware || "software"}` : `Import descriptor into ${data.walletSoftware || "software"}`);
      steps.push(lang === "pt" ? "Conectar signing devices e verificar saldo" : "Connect signing devices and verify balance");
    }
    steps.push(lang === "pt" ? "Confirmar que a carta-instrução está clara e completa" : "Confirm that the instruction letter is clear and complete");
    return steps;
  };

  // ─── RENDER ─────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (stepKey) {
      // ── INTRO ─────────────────────────────────────────────
      case "intro": return (
        <div>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "11px", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "14px", fontWeight: "600" }}>{t.introTag}</div>
            <h1 style={{ fontSize: "34px", fontWeight: "700", color: "#f5f5f5", lineHeight: "1.2", marginBottom: "14px", fontFamily: "'IBM Plex Sans',sans-serif" }}>
              {t.introTitle1}<br /><span style={{ color: "#f59e0b" }}>{t.introTitle2}</span>
            </h1>
            <p style={{ fontSize: "14px", color: "#737373", lineHeight: "1.7", maxWidth: "540px" }}>{t.introDesc}</p>
          </div>
          <div style={{ height: "1px", background: "rgba(245,158,11,0.1)", margin: "28px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "32px" }}>
            {[t.introFeature1, t.introFeature2, t.introFeature3, t.introFeature4].map((f, i) => (
              <div key={i} style={{ ...s.card, display: "flex", alignItems: "center", gap: "10px", padding: "14px", marginBottom: 0 }}>
                <span style={{ color: "#f59e0b" }}>{[<AlertIcon size={16} />, <FileIcon size={16} />, <ShieldIcon size={16} />, <FireIcon size={16} />][i]}</span>
                <span style={{ fontSize: "12px", color: "#d4d4d4" }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={s.warn}>
            <AlertIcon size={16} />
            <div><strong style={{ color: "#ef4444" }}>{t.securityWarning}</strong> {t.securityText}<br /><br /><strong style={{ color: "#f59e0b" }}>{t.securityTextExtra}</strong></div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={s.btnP} onClick={next}>{t.start} <ChevronRight /></button>
          </div>
        </div>
      );

      // ── CUSTODY ───────────────────────────────────────────
      case "custodia": return (
        <div>
          <h2 style={s.h2}>{t.custodyTitle}</h2>
          <p style={s.sub}>{t.custodyDesc}</p>
          <OptionCard sel={data.custodyType === "singlesig"} onClick={() => setData({ ...data, custodyType: "singlesig", quorum: "", totalKeys: "" })} icon={<KeyIcon size={18} />} title={t.singlesig} desc={t.singlesigDesc} />
          <OptionCard sel={data.custodyType === "multisig"} onClick={() => setData({ ...data, custodyType: "multisig" })} icon={<ShieldIcon size={18} />} title={t.multisig} desc={t.multisigDesc} />
          <OptionCard sel={data.custodyType === "collaborative"} onClick={() => setData({ ...data, custodyType: "collaborative" })} icon={<UsersIcon size={18} />} title={t.collaborative} desc={t.collaborativeDesc} />
          {(data.custodyType === "multisig" || data.custodyType === "collaborative") && (
            <div style={{ ...s.card, marginTop: "20px", display: "flex", gap: "14px" }}>
              <div style={{ flex: 1 }}>
                <div style={s.label}>{t.quorum}</div>
                <select style={s.select} value={data.quorum || ""} onChange={e => setData({ ...data, quorum: e.target.value })}>
                  <option value="">{t.select}</option>{[2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <div style={s.label}>{t.totalKeys}</div>
                <select style={s.select} value={data.totalKeys || ""} onChange={e => setData({ ...data, totalKeys: e.target.value })}>
                  <option value="">{t.select}</option>{[2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          )}
          <div style={{ ...s.card, marginTop: "14px" }}>
            <div style={s.label}>{t.usesPassphrase}</div>
            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              {[t.yes, t.no].map(opt => (
                <button key={opt} onClick={() => setData({ ...data, usesPassphrase: opt === t.yes })} style={{ ...s.btnS, padding: "8px 20px", ...(data.usesPassphrase === (opt === t.yes) ? { borderColor: "#f59e0b", color: "#f59e0b", background: "rgba(245,158,11,0.05)" } : {}) }}>{opt}</button>
              ))}
            </div>
          </div>
          <div style={{ ...s.card, marginTop: "14px" }}>
            <div style={s.label}>{t.walletSoftware}</div>
            <select style={s.select} value={data.walletSoftware || ""} onChange={e => setData({ ...data, walletSoftware: e.target.value })}>
              <option value="">{t.select}</option>
              {["Sparrow Wallet", "Nunchuk", "Electrum", "BlueWallet", "Casa", "Unchained", lang === "pt" ? "Outro" : "Other"].map(w => <option key={w} value={w.toLowerCase().replace(" wallet", "")}>{w}</option>)}
            </select>
          </div>
          <div style={{ ...s.card, marginTop: "14px" }}>
            <div style={s.label}>{t.hardwareWallets}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
              {HW_OPTIONS.map(hw => {
                const sel = (data.hardwareWallets || []).includes(hw);
                return <button key={hw} onClick={() => setData({ ...data, hardwareWallets: sel ? data.hardwareWallets.filter(h => h !== hw) : [...(data.hardwareWallets || []), hw] })} style={s.chip(sel)}>{hw}</button>;
              })}
            </div>
          </div>
        </div>
      );

      // ── PATRIMONIO ────────────────────────────────────────
      case "patrimonio": return (
        <div>
          <h2 style={s.h2}>{t.patrimonioTitle}</h2>
          <p style={s.sub}>{t.patrimonioDesc}</p>
          <div style={s.card}>
            <div style={s.label}>{t.btcRange}</div>
            <select style={s.select} value={data.btcRange || ""} onChange={e => setData({ ...data, btcRange: e.target.value })}>
              <option value="">{t.select}</option>
              {["< 0.1 BTC", "0.1 – 1 BTC", "1 – 5 BTC", "5 – 20 BTC", "20 – 100 BTC", "100+ BTC"].map(r => <option key={r} value={r}>{r}</option>)}
              <option value="prefer-not">{t.prefNaoInformar}</option>
            </select>
          </div>
          <div style={{ ...s.card, marginTop: "14px" }}>
            <div style={s.label}>{t.utxoCount}</div>
            <select style={s.select} value={data.utxoCount || ""} onChange={e => setData({ ...data, utxoCount: e.target.value })}>
              <option value="">{t.select}</option>
              {["1-5", "5-20", "20-50", "50+"].map(r => <option key={r} value={r}>{r}</option>)}
              <option value="dk">{t.dontKnow}</option>
            </select>
          </div>
          <div style={{ ...s.card, marginTop: "14px" }}>
            <div style={s.label}>{t.seedLocations}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
              {[t.locHome, t.locBank, t.locFamily, t.locOffice, t.locOther, t.locMetal, t.locPaper].map(loc => {
                const sel = (data.seedLocations || []).includes(loc);
                return <button key={loc} onClick={() => setData({ ...data, seedLocations: sel ? data.seedLocations.filter(l => l !== loc) : [...(data.seedLocations || []), loc] })} style={s.chip(sel)}>{sel && <CheckIcon size={11} />}{loc}</button>;
              })}
            </div>
          </div>
          <div style={{ ...s.card, marginTop: "14px" }}>
            <div style={s.label}>{t.descriptorBackup}</div>
            <div style={{ display: "flex", gap: "8px", marginTop: "6px", flexWrap: "wrap" }}>
              {[t.yes, t.no, t.dontKnowWhatIs].map(opt => (
                <button key={opt} onClick={() => setData({ ...data, hasDescriptorBackup: opt })} style={{ ...s.btnS, padding: "8px 16px", fontSize: "11px", ...(data.hasDescriptorBackup === opt ? { borderColor: "#f59e0b", color: "#f59e0b", background: "rgba(245,158,11,0.05)" } : {}) }}>{opt}</button>
              ))}
            </div>
            {data.hasDescriptorBackup === t.no && <div style={{ ...s.warn, marginTop: "10px", marginBottom: 0 }}><AlertIcon size={14} /><span>{t.descriptorWarning}</span></div>}
            {data.hasDescriptorBackup === t.dontKnowWhatIs && <div style={{ ...s.info, marginTop: "10px", marginBottom: 0 }}><ShieldIcon size={14} /><span>{t.descriptorInfo}</span></div>}
          </div>
        </div>
      );

      // ── HEIRS ─────────────────────────────────────────────
      case "herdeiros": {
        const heirs = data.heirs || [];
        const addHeir = () => setData({ ...data, heirs: [...heirs, { id: genId(), name: "", relation: "", techLevel: "", location: "" }] });
        const updateHeir = (id, field, val) => setData({ ...data, heirs: heirs.map(h => h.id === id ? { ...h, [field]: val } : h) });
        const removeHeir = (id) => setData({ ...data, heirs: heirs.filter(h => h.id !== id) });
        const techOpts = [{ v: "zero", l: t.techZero }, { v: "basico", l: t.techBasic }, { v: "intermediario", l: t.techIntermediate }, { v: "avancado", l: t.techAdvanced }];
        const relOpts = [{ v: "conjuge", l: t.relSpouse }, { v: "filho", l: t.relChild }, { v: "pai-mae", l: t.relParent }, { v: "irmao", l: t.relSibling }, { v: "amigo", l: t.relFriend }, { v: "outro", l: t.relOther }];
        return (
          <div>
            <h2 style={s.h2}>{t.heirsTitle}</h2>
            <p style={s.sub}>{t.heirsDesc}</p>
            {heirs.map((heir, idx) => (
              <div key={heir.id} style={s.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={s.tag(amber)}>{t.heir} {idx + 1}</span>
                  {heirs.length > 1 && <button onClick={() => removeHeir(heir.id)} style={{ background: "transparent", border: "none", color: "#ef4444", fontSize: "11px", cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}>{t.remove}</button>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                  <div><div style={s.label}>{t.nameLabel}</div><input style={s.input} placeholder={t.namePlaceholder} value={heir.name} onChange={e => updateHeir(heir.id, "name", e.target.value)} /></div>
                  <div><div style={s.label}>{t.relation}</div><select style={s.select} value={heir.relation} onChange={e => updateHeir(heir.id, "relation", e.target.value)}><option value="">{t.select}</option>{relOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}</select></div>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <div style={s.label}>{t.techLevel}</div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    {techOpts.map(o => <button key={o.v} onClick={() => updateHeir(heir.id, "techLevel", o.v)} style={s.chip(heir.techLevel === o.v)}>{o.l}</button>)}
                  </div>
                </div>
                <div><div style={s.label}>{t.location}</div><input style={s.input} placeholder={t.locationPlaceholder} value={heir.location || ""} onChange={e => updateHeir(heir.id, "location", e.target.value)} /></div>
              </div>
            ))}
            <button onClick={addHeir} style={{ ...s.btnS, width: "100%", justifyContent: "center", borderStyle: "dashed" }}>{t.addHeir}</button>
          </div>
        );
      }

      // ── SCENARIOS ─────────────────────────────────────────
      case "cenarios": {
        const scenarios = buildScenarios();
        const fails = scenarios.filter(sc => sc.result === "fail").length;
        return (
          <div>
            <h2 style={s.h2}>{t.cenariosTitle}</h2>
            <p style={s.sub}>{t.cenariosDesc}</p>
            {scenarios.map((sc, i) => (
              <div key={i} style={{ ...s.card, marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#e0e0e0", marginBottom: "4px" }}>{sc.name}</div>
                    <div style={{ fontSize: "12px", color: "#737373", lineHeight: "1.5" }}>{sc.detail}</div>
                  </div>
                  {resultTag(sc.result)}
                </div>
              </div>
            ))}
            {fails > 0 && <div style={s.warn}><AlertIcon size={16} /><div><strong>{fails} {t.criticalFailures}</strong> {t.criticalAction}</div></div>}
          </div>
        );
      }

      // ── PLAN ──────────────────────────────────────────────
      case "plano": {
        const actions = [];
        const heirs = data.heirs || [];
        const hasCapable = heirs.some(h => h.techLevel === "avancado" || h.techLevel === "intermediario");
        if (data.hasDescriptorBackup !== t.yes && data.custodyType !== "singlesig") actions.push({ p: t.critical, a: t.actionDescriptor, d: t.actionDescriptorDetail, c: "red" });
        if (data.usesPassphrase) actions.push({ p: t.critical, a: t.actionPassphrase, d: t.actionPassphraseDetail, c: "red" });
        if (data.custodyType === "singlesig") actions.push({ p: t.essential, a: t.actionMigrateMultisig, d: t.actionMigrateDetail, c: "amber" });
        actions.push({ p: t.essential, a: t.actionInformHeir, d: t.actionInformDetail, c: "amber" });
        if (!hasCapable && heirs.length > 0) actions.push({ p: t.important, a: t.actionExecutor, d: t.actionExecutorDetail, c: "amber" });
        heirs.forEach(h => actions.push({ p: t.action, a: t.actionLetter.replace("{name}", h.name || t.heir), d: t.actionLetterDetail.replace("{level}", h.techLevel || "?"), c: "green" }));
        actions.push({ p: t.maintenance, a: t.actionReview, d: t.actionReviewDetail, c: "green" });
        actions.push({ p: t.maintenance, a: t.actionFireDrill, d: t.actionFireDrillDetail, c: "green" });
        return (
          <div>
            <h2 style={s.h2}>{t.planoTitle}</h2>
            <p style={s.sub}>{t.planoDesc}</p>
            {actions.map((a, i) => (
              <div key={i} style={{ ...s.card, marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  {priorityTag(a.c, a.p)}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#e0e0e0", marginBottom: "4px" }}>{a.a}</div>
                    <div style={{ fontSize: "12px", color: "#737373", lineHeight: "1.5" }}>{a.d}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }

      // ── DOCUMENTS ─────────────────────────────────────────
      case "documentos": {
        const heirs = data.heirs || [];
        const activeHeir = selHeir || heirs[0]?.id || null;
        const heir = heirs.find(h => h.id === activeHeir);
        return (
          <div>
            <h2 style={s.h2}>{t.docsTitle}</h2>
            <p style={s.sub}>{t.docsDesc}</p>
            <div style={{ background: "rgba(239,68,68,0.1)", border: "2px solid rgba(239,68,68,0.4)", borderRadius: "12px", padding: "18px 20px", marginBottom: "16px", fontSize: "13px", lineHeight: "1.7", color: "#fca5a5", display: "flex", gap: "12px", alignItems: "flex-start", animation: "pulse 3s infinite" }}>
              <AlertIcon size={20} />
              <div style={{ fontWeight: "700" }}>{t.docsWarning}</div>
            </div>
            <div style={s.info}><span style={{ fontSize: "14px" }}>✏️</span><div style={{ fontWeight: "600" }}>{t.docsPenTip}</div></div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
              {heirs.map(h => (
                <button key={h.id} onClick={() => { setSelHeir(h.id); setShowCL(false); }} style={{ ...s.btnS, padding: "8px 16px", fontSize: "11px", ...(activeHeir === h.id && !showCL ? { borderColor: "#f59e0b", color: "#f59e0b", background: "rgba(245,158,11,0.05)" } : {}) }}><FileIcon size={13} />{h.name || t.heir}</button>
              ))}
              <button onClick={() => setShowCL(true)} style={{ ...s.btnS, padding: "8px 16px", fontSize: "11px", ...(showCL ? { borderColor: "#f59e0b", color: "#f59e0b", background: "rgba(245,158,11,0.05)" } : {}) }}><CheckIcon size={13} />{t.checklist}</button>
            </div>
            <div style={s.doc}>{showCL ? genChecklist() : genLetter(heir)}</div>
            <div style={s.info}><ShieldIcon size={14} /><div>{t.docsCopyTip}</div></div>
          </div>
        );
      }

      // ── FIRE DRILL ────────────────────────────────────────
      case "fireDrill": {
        const drillSteps = buildDrillSteps();
        // Initialize drill state if needed
        const currentDrillState = drillState.length === drillSteps.length ? drillState : drillSteps.map(() => ({ passed: null, notes: "" }));
        if (drillState.length !== drillSteps.length && drillState.length === 0) {
          // Will be initialized on first interaction
        }

        const initDrillIfNeeded = () => {
          if (drillState.length !== drillSteps.length) {
            setDrillState(drillSteps.map(() => ({ passed: null, notes: "" })));
          }
        };

        const passRate = currentDrillState.filter(d => d.passed === true).length;
        const totalSteps = drillSteps.length;

        return (
          <div>
            <h2 style={s.h2}>{t.fireDrillTitle}</h2>
            <p style={s.sub}>{t.fireDrillDesc}</p>

            <div style={s.info}><FireIcon size={16} /><div>{t.fireDrillIntro}</div></div>

            {!drillDone ? (
              <>
                {drillSteps.map((step, i) => (
                  <div key={i} style={{ ...s.card, marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                      <span style={s.tag(amber)}>{t.fireDrillStep} {i + 1}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "#e0e0e0", marginBottom: "8px" }}>{step}</div>
                        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                          <button onClick={() => { initDrillIfNeeded(); const ns = [...currentDrillState]; ns[i] = { ...ns[i], passed: true }; setDrillState(ns); }} style={{ ...s.chip(currentDrillState[i]?.passed === true), color: currentDrillState[i]?.passed === true ? "#22c55e" : "#737373", borderColor: currentDrillState[i]?.passed === true ? "rgba(34,197,94,0.4)" : undefined, background: currentDrillState[i]?.passed === true ? "rgba(34,197,94,0.1)" : undefined }}><CheckIcon size={12} />{t.fireDrillPass}</button>
                          <button onClick={() => { initDrillIfNeeded(); const ns = [...currentDrillState]; ns[i] = { ...ns[i], passed: false }; setDrillState(ns); }} style={{ ...s.chip(currentDrillState[i]?.passed === false), color: currentDrillState[i]?.passed === false ? "#ef4444" : "#737373", borderColor: currentDrillState[i]?.passed === false ? "rgba(239,68,68,0.4)" : undefined, background: currentDrillState[i]?.passed === false ? "rgba(239,68,68,0.1)" : undefined }}><AlertIcon size={12} />{t.fireDrillFailed}</button>
                        </div>
                        {currentDrillState[i]?.passed === false && (
                          <input style={{ ...s.input, marginTop: "4px" }} placeholder={t.fireDrillNotesPlaceholder} value={currentDrillState[i]?.notes || ""} onChange={e => { initDrillIfNeeded(); const ns = [...currentDrillState]; ns[i] = { ...ns[i], notes: e.target.value }; setDrillState(ns); }} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button style={{ ...s.btnP, width: "100%", justifyContent: "center", marginTop: "12px" }} onClick={() => setDrillDone(true)}>{t.fireDrillComplete}</button>
              </>
            ) : (
              <div style={s.card}>
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>{passRate === totalSteps ? "✓" : "⚠"}</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: passRate === totalSteps ? "#22c55e" : "#f59e0b", marginBottom: "8px", fontFamily: "'IBM Plex Sans',sans-serif" }}>
                    {t.fireDrillPassRate}: {passRate}/{totalSteps}
                  </div>
                  <div style={{ fontSize: "13px", color: "#737373", marginBottom: "16px" }}>
                    {new Date().toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US")}
                  </div>
                  {currentDrillState.filter(d => d.passed === false && d.notes).map((d, i) => (
                    <div key={i} style={{ ...s.warn, textAlign: "left", marginBottom: "8px" }}>
                      <AlertIcon size={14} />
                      <span>{d.notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      // ── FAQ ────────────────────────────────────────────
      case "faq": {
        const faqItems = t.faqItems || [];
        return (
          <div>
            <h2 style={s.h2}>{t.faqTitle}</h2>
            <p style={s.sub}>{t.faqDesc}</p>
            {faqItems.map((item, i) => (
              <details key={i} style={{ ...s.card, marginBottom: "10px", cursor: "pointer" }}>
                <summary style={{ fontSize: "14px", fontWeight: "600", color: "#f5f5f5", lineHeight: "1.5", listStyle: "none", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "#f59e0b", flexShrink: 0, fontSize: "16px", marginTop: "1px" }}>?</span>
                  <span>{item.q}</span>
                </summary>
                <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(245,158,11,0.1)", fontSize: "13px", color: "#a3a3a3", lineHeight: "1.7" }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        );
      }

      // ── DONATE ──────────────────────────────────────────
      case "donate": {
        const lnAddr = t.donatePlaceholderLN;
        const copyToClip = (text) => {
          navigator.clipboard.writeText(text).then(() => { setCopiedLN(true); setTimeout(() => setCopiedLN(false), 2000); }).catch(() => {});
        };
        return (
          <div>
            <h2 style={s.h2}>{t.donateTitle}</h2>
            <p style={s.sub}>{t.donateDesc}</p>

            <div style={s.card}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <span style={{ fontSize: "20px" }}>⚡</span>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#f59e0b" }}>{t.donateLN}</div>
              </div>
              <p style={{ fontSize: "12px", color: "#737373", marginBottom: "12px" }}>{t.donateLNDesc}</p>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ ...s.input, flex: 1, fontSize: "11px", color: "#a3a3a3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "10px 12px" }}>{lnAddr}</div>
                <button onClick={() => copyToClip(lnAddr)} style={{ ...s.btnS, padding: "10px 16px", fontSize: "11px", minWidth: "80px", justifyContent: "center", ...(copiedLN ? { borderColor: "#22c55e", color: "#22c55e" } : {}) }}>
                  {copiedLN ? <><CheckIcon size={12} />{t.donateCopied}</> : t.donateCopy}
                </button>
              </div>
            </div>

            <div style={{ ...s.info, marginTop: "20px" }}>
              <span style={{ fontSize: "16px" }}>🧡</span>
              <div>{t.donateThank}</div>
            </div>

            <div style={{ height: "1px", background: "rgba(245,158,11,0.1)", margin: "28px 0" }} />

            <div style={s.label}>{lang === "pt" ? "ACOMPANHE O PROJETO" : "FOLLOW THE PROJECT"}</div>
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
              {[
                { label: t.donateYT, url: "https://youtube.com/@herancabitcoin?si=m7-MPU4WnztjyzOo", emoji: "▶" },
                { label: t.donateX, url: "https://x.com/herancabitcoin?s=21", emoji: "𝕏" },
                { label: t.donateNostr, url: "https://njump.me/npub1mstrwvvw2046l758rtnvy0pwe22k9ngznsf0t6twll2gas0rt3jsejeju6", emoji: "🟣" },
                { label: t.donateGH, url: "https://github.com/herancabitcoin", emoji: "◼" },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ ...s.btnS, padding: "10px 16px", fontSize: "11px", textDecoration: "none", color: "#a3a3a3" }}>
                  <span>{link.emoji}</span> {link.label}
                </a>
              ))}
            </div>
          </div>
        );
      }

      default: return null;
    }
  };

  return (
    <div style={s.root}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={s.grid} />

      {/* Header */}
      <div style={s.header}>
        <div style={s.logo}>
          <div style={s.logoBox}><ShieldIcon size={16} /></div>
          <div><div style={s.logoTxt}>{t.appName}</div><div style={s.logoSub}>{t.appSub}</div></div>
        </div>
        <div style={s.dots}>
          {STEPS.map((st, i) => (
            <div key={st} style={{ width: i < currentStep ? "20px" : i === currentStep ? "20px" : "7px", height: "7px", borderRadius: "4px", background: i < currentStep ? "#f59e0b" : i === currentStep ? "linear-gradient(90deg,#f59e0b,#d97706)" : "rgba(245,158,11,0.15)", transition: "all 0.3s ease" }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button style={s.langBtn} onClick={toggleLang}>
            <GlobeIcon size={14} />
            {lang === "pt" ? "EN" : "PT"}
          </button>
          {currentStep > 0 && (
            <button onClick={reset} style={{ ...s.btnS, padding: "6px 14px", fontSize: "10px", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}><RefreshIcon size={11} />{t.restart}</button>
          )}
        </div>
      </div>

      {/* Step indicator */}
      {currentStep > 0 && (
        <div style={{ padding: "10px 24px", borderBottom: "1px solid rgba(245,158,11,0.08)", position: "relative", zIndex: 10 }}>
          <span style={{ fontSize: "10px", color: "#525252", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {t.step} {currentStep} {t.of} {STEPS.length - 1} — <span style={{ color: "#f59e0b" }}>{t.steps[stepKey]}</span>
          </span>
        </div>
      )}

      {/* Main */}
      <div style={s.main}>{renderStep()}</div>

      {/* Footer */}
      {stepKey !== "intro" && (
        <div style={s.footer}>
          <button style={s.btnS} onClick={prev}><ChevronLeft />{t.back}</button>
          {canAdvance() && (
            <button style={s.btnP} onClick={next}>{t.next} <ChevronRight /></button>
          )}
        </div>
      )}

    </div>
  );
}
