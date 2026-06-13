export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    nav: {
      home: 'INÍCIO',
      about: 'SOBRE',
      skills: 'SKILLS',
      services: 'SERVIÇOS',
      work: 'PROJETOS',
      contact: 'CONTATO',
    },
    hero: {
      title: ['S', 'T', 'U', 'D', 'I', 'O'],
      subtitle: [
        'Engenharia de software',
        'Sistemas rápidos e escaláveis',
      
      ],
      ctaWork: 'Ver Projetos',
      ctaContact: 'Entrar em Contato',
    },
    about: {
      title: 'SOBRE',
      headingMain: 'Elegância,',
      headingAccent: 'visão estratégica.',
      subtitle: 'Engenharia e produto, integrados. Soluções técnicas para problemas específicos.',
      description: 'Foco em sistemas que combinam estabilidade técnica e usabilidade. A complexidade fica no código, não na experiência de quem usa. Software construído para escalar.',
      stats: {
        years: 'Anos de mercado',
        projects: 'Projetos entregues'
      }
    },
    skills: {
      title: 'SKILLS',
      items: {
        react: 'Base para interfaces e sistemas escaláveis',
        typescript: 'Tipagem segura e código manutenível',
        node: 'Infraestrutura de back-end escalável',
        uiux: 'Foco em usabilidade e design systems',
        apis: 'Conectividade e fluxo de dados'
      }
    },
    services: {
      title: 'SERVIÇOS',
      subtitle: 'Soluções que unem engenharia de software e design minimalista.',
      items: [
        {
          id: 'web',
          title: 'Desenvolvimento Web',
          description: 'Engenharia de sistemas e interfaces. Soluções escaláveis com foco em velocidade de carregamento e estabilidade técnica.',
          tags: ['React', 'Next.js', 'Infraestrutura']
        },
        {
          id: 'app',
          title: 'Soluções Mobile',
          description: 'Aplicativos focados em usabilidade e performance. Experiências móveis nativas e híbridas, dentro dos requisitos técnicos.',
          tags: ['iOS', 'Android', 'Cross-platform']
        },
        {
          id: 'metrics',
          title: 'Análise de Dados',
          description: 'Arquitetura de dados e métricas de uso. Monitoramento de comportamento para diagnósticos técnicos precisos.',
          tags: ['Analytics', 'GTM', 'BI']
        }
      ]
    },
    projects: {
      title: 'SELECTED',
      subtitle: 'PROJECTS',
      about: 'Sobre o Projeto',
      category: 'Categoria',
      year: 'Ano',
      viewAll: 'Ver Todos os Projetos',
      links: {
        project: 'Ver projeto',
        case: 'Caso de estudo',
        demo: 'Demo ao vivo',
        store: 'Loja ao vivo',
        github: 'GitHub'
      },
      items: [
        { category: 'Fintech', description: 'Infraestrutura de pagamentos escalável, focada em microtransações e segurança bancária. Inclui o core bancário e a interface do dashboard administrativo.' },
        { category: 'Fintech', description: 'Solução white-label para bancos digitais, permitindo a criação rápida de contas e cartões com conformidade total às normas do BACEN.' },
        { category: 'SaaS', description: 'Plataforma de automação de workflow para times de design e engenharia, integrando ferramentas de gestão e deploy contínuo.' },
        { category: 'SaaS', description: 'Sistema de gerenciamento de clientes focado em retenção via análise preditiva de comportamento baseada em IA.' },
        { category: 'Varejo', description: 'Plataforma de e-commerce com gestão de estoque em tempo real, sincronizada entre lojas físicas e virtuais.' },
        { category: 'Varejo', description: 'Dashboard de BI para grandes varejistas, consolidando dados de vendas de múltiplos canais em uma interface intuitiva e performante.' }
      ]
    },
    contact: {
      title: 'VAMOS',
      highlight: 'CONVERSAR',
      subtitle: 'Para novos projetos, consultoria técnica ou parcerias.',
      footer: '© 2026 - Tawa Tinga Tecnologia e Cultura LTDA CNPJ: 13.059.129/0001-17 .',
      tag: 'Feito sem template'
    },
    servicesModal: {
      close: 'FECHAR',
      overview: 'VISÃO GERAL',
      features: 'RECURSOS',
      deliverables: 'ENTREGÁVEIS',
      ready: 'Começar um projeto',
      learnMore: 'Saiba mais',
      details: {
        web: {
          long: 'Sistemas construídos com tecnologias atuais e arquitetura sólida. Aplicações estáveis, que escalam junto com o negócio.',
          features: ['React & Next.js', 'Arquitetura Escalável', 'SEO Avançado', 'Otimização de Performance'],
          deliverables: ['Código Fonte Limpo', 'Documentação', 'Painel Administrativo', 'Integração com APIs']
        },
        app: {
          long: 'Design a serviço da função. Interfaces que eliminam ruído e priorizam o que importa: a jornada do cliente e a conversão do negócio.',
          features: ['UI/UX Design', 'Design System', 'Prototipagem de Alta Fidelidade', 'Brand Identity'],
          deliverables: ['Arquivos Figma', 'Guia de Estilo', 'Protótipo Interativo', 'Assets Exportados']
        },
        metrics: {
          long: 'Mais do que desenvolvimento: análise de processos para identificar gargalos e oportunidades de automação e crescimento.',
          features: ['Análise de Dados', 'Automação de Marketing', 'Estratégia de Lançamento', 'Estratégia de Crescimento'],
          deliverables: ['Relatório Estratégico', 'Funis de Vendas', 'Configuração de Analytics', 'Roadmap de Crescimento']
        }
      }
    }
  },
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      skills: 'SKILLS',
      services: 'SERVICES',
      work: 'WORK',
      contact: 'CONTACT',
    },
    hero: {
      title: ['S', 'T', 'U', 'D', 'I', 'O'],
      subtitle: [
        'Software engineering',
        'Fast, scalable systems',
      ],
      ctaWork: 'View Work',
      ctaContact: 'Get in Touch',
    },
    about: {
      title: 'ABOUT',
      headingMain: 'Elegance,',
      headingAccent: 'strategic vision.',
      subtitle: 'Engineering and product, integrated. Technical solutions for specific problems.',
      description: 'Focus on systems that combine technical stability and usability. Complexity stays in the code, not in the experience of the people using it. Software built to scale.',
      stats: {
        years: 'Years in market',
        projects: 'Projects delivered'
      }
    },
    skills: {
      title: 'SKILLS',
      items: {
        react: 'Foundation for scalable interfaces and systems',
        typescript: 'Type safety and maintainable code',
        node: 'Scalable back-end infrastructure',
        uiux: 'Focus on usability and design systems',
        apis: 'Connectivity and data flow'
      }
    },
    services: {
      title: 'SERVICES',
      subtitle: 'Solutions that combine software engineering and minimalist design.',
      items: [
        {
          id: 'web',
          title: 'Web Development',
          description: 'Engineering systems and interfaces. Scalable solutions focused on load speed and technical stability.',
          tags: ['React', 'Next.js', 'Infrastructure']
        },
        {
          id: 'app',
          title: 'Mobile Solutions',
          description: 'Apps focused on usability and performance. Native and hybrid mobile experiences, within technical requirements.',
          tags: ['iOS', 'Android', 'Cross-platform']
        },
        {
          id: 'metrics',
          title: 'Data Analytics',
          description: 'Data architecture and usage metrics. Behavior monitoring for precise technical diagnostics.',
          tags: ['Analytics', 'GTM', 'BI']
        }
      ]
    },
    projects: {
      title: 'SELECTED',
      subtitle: 'PROJECTS',
      about: 'About Project',
      category: 'Category',
      year: 'Year',
      viewAll: 'View All Projects',
      links: {
        project: 'View project',
        case: 'Case study',
        demo: 'Live demo',
        store: 'Live store',
        github: 'GitHub'
      },
      items: [
        { category: 'Fintech', description: 'Scalable payment infrastructure focused on microtransactions and banking-grade security. Includes the banking core and the admin dashboard interface.' },
        { category: 'Fintech', description: 'White-label solution for digital banks, enabling fast creation of accounts and cards in full compliance with Brazilian Central Bank (BACEN) regulations.' },
        { category: 'SaaS', description: 'Workflow automation platform for design and engineering teams, integrating management tools and continuous deployment.' },
        { category: 'SaaS', description: 'Customer management system focused on retention through AI-based predictive behavior analysis.' },
        { category: 'Retail', description: 'E-commerce platform with real-time inventory management, synced between physical and online stores.' },
        { category: 'Retail', description: 'BI dashboard for large retailers, consolidating multi-channel sales data into an intuitive, fast interface.' }
      ]
    },
    contact: {
      title: 'LET\'S',
      highlight: 'TALK',
      subtitle: 'For new projects, technical consulting, or partnerships.',
      footer: '© 2026 - Tawa Tinga Tecnologia e Cultura LTDA CNPJ: 13.059.129/0001-17 .',
      tag: 'Made without template'
    },
    servicesModal: {
      close: 'CLOSE',
      overview: 'OVERVIEW',
      features: 'FEATURES',
      deliverables: 'DELIVERABLES',
      ready: 'Start a project',
      learnMore: 'Learn more',
      details: {
        web: {
          long: 'Systems built with current technologies and solid architecture. Stable applications that scale along with the business.',
          features: ['React & Next.js', 'Scalable Architecture', 'Advanced SEO', 'Performance Optimization'],
          deliverables: ['Clean Source Code', 'Technical Documentation', 'Admin Panel', 'API Integration']
        },
        app: {
          long: 'Design in service of function. Interfaces that cut the noise and focus on what matters: the customer journey and business conversion.',
          features: ['UI/UX Design', 'Design System', 'High-Fidelity Prototyping', 'Brand Identity'],
          deliverables: ['Figma Files', 'Style Guide', 'Interactive Prototype', 'Exported Assets']
        },
        metrics: {
          long: 'More than development: process analysis to identify bottlenecks and opportunities for automation and growth.',
          features: ['Data Analysis', 'Marketing Automation', 'Launch Strategy', 'Growth Strategy'],
          deliverables: ['Strategic Report', 'Sales Funnels', 'Analytics Setup', 'Growth Roadmap']
        }
      }
    }
  },
  es: {
    nav: {
      home: 'INICIO',
      about: 'SOBRE',
      skills: 'HABILIDADES',
      services: 'SERVICIOS',
      work: 'PROYECTOS',
      contact: 'CONTACTO',
    },
    hero: {
      title: ['S', 'T', 'U', 'D', 'I', 'O'],
      subtitle: [
        'Ingeniería de software',
        'Sistemas rápidos y escalables',
      ],
      ctaWork: 'Ver Proyectos',
      ctaContact: 'Contactar',
    },
    about: {
      title: 'SOBRE',
      headingMain: 'Elegancia,',
      headingAccent: 'visión estratégica.',
      subtitle: 'Ingeniería y producto, integrados. Soluciones técnicas para problemas específicos.',
      description: 'Foco en sistemas que combinan estabilidad técnica y usabilidad. La complejidad queda en el código, no en la experiencia de quien lo usa. Software construido para escalar.',
      stats: {
        years: 'Años en mercado',
        projects: 'Proyectos entregados'
      }
    },
    skills: {
      title: 'SKILLS',
      items: {
        react: 'Base para interfaces y sistemas escalables',
        typescript: 'Tipado seguro y código mantenible',
        node: 'Infraestructura back-end escalable',
        uiux: 'Enfoque en usabilidad y sistemas de diseño',
        apis: 'Conectividad y flujo de datos'
      }
    },
    services: {
      title: 'SERVICIOS',
      subtitle: 'Soluciones que unen ingeniería de software y diseño minimalista.',
      items: [
        {
          id: 'web',
          title: 'Desarrollo Web',
          description: 'Ingeniería de sistemas e interfaces. Soluciones escalables enfocadas en velocidad de carga y estabilidad técnica.',
          tags: ['React', 'Next.js', 'Infraestructura']
        },
        {
          id: 'app',
          title: 'Soluciones Móviles',
          description: 'Aplicaciones enfocadas en usabilidad y rendimiento. Experiencias móviles nativas e híbridas, dentro de los requisitos técnicos.',
          tags: ['iOS', 'Android', 'Cross-platform']
        },
        {
          id: 'metrics',
          title: 'Análisis de Datos',
          description: 'Arquitectura de datos y métricas de uso. Monitoreo de comportamiento para diagnósticos técnicos precisos.',
          tags: ['Analytics', 'GTM', 'BI']
        }
      ]
    },
    projects: {
      title: 'SELECTED',
      subtitle: 'PROJECTS',
      about: 'Sobre el Proyecto',
      category: 'Categoría',
      year: 'Año',
      viewAll: 'Ver Todos los Proyectos',
      links: {
        project: 'Ver proyecto',
        case: 'Caso de estudio',
        demo: 'Demo en vivo',
        store: 'Tienda en vivo',
        github: 'GitHub'
      },
      items: [
        { category: 'Fintech', description: 'Infraestructura de pagos escalable, enfocada en microtransacciones y seguridad bancaria. Incluye el core bancario y la interfaz del panel administrativo.' },
        { category: 'Fintech', description: 'Solución white-label para bancos digitales, que permite la creación rápida de cuentas y tarjetas con conformidad total a las normas del Banco Central de Brasil (BACEN).' },
        { category: 'SaaS', description: 'Plataforma de automatización de flujos de trabajo para equipos de diseño e ingeniería, integrando herramientas de gestión y despliegue continuo.' },
        { category: 'SaaS', description: 'Sistema de gestión de clientes enfocado en la retención mediante análisis predictivo de comportamiento basado en IA.' },
        { category: 'Retail', description: 'Plataforma de e-commerce con gestión de inventario en tiempo real, sincronizada entre tiendas físicas y online.' },
        { category: 'Retail', description: 'Panel de BI para grandes minoristas, que consolida datos de ventas de múltiples canales en una interfaz intuitiva y rápida.' }
      ]
    },
    contact: {
      title: 'VAMOS A',
      highlight: 'HABLAR',
      subtitle: 'Para nuevos proyectos, consultoría técnica o alianzas.',
      footer: '© 2026 - Tawa Tinga Tecnologia e Cultura LTDA CNPJ: 13.059.129/0001-17 .',
      tag: 'Hecho sin plantilla'
    },
    servicesModal: {
      close: 'CERRAR',
      overview: 'VISIÓN GENERAL',
      features: 'CARACTERÍSTICAS',
      deliverables: 'ENTREGABLES',
      ready: 'Iniciar un proyecto',
      learnMore: 'Saber más',
      details: {
        web: {
          long: 'Sistemas construidos con tecnologías actuales y arquitectura sólida. Aplicaciones estables que escalan junto con el negocio.',
          features: ['React & Next.js', 'Arquitectura Escalable', 'SEO Avanzado', 'Optimización de Rendimiento'],
          deliverables: ['Código Fuente Limpio', 'Documentación Técnica', 'Panel de Control', 'Integración con APIs']
        },
        app: {
          long: 'Diseño al servicio de la función. Interfaces que eliminan el ruido y priorizan lo que importa: el recorrido del cliente y la conversión del negocio.',
          features: ['Diseño UI/UX', 'Sistema de Diseño', 'Prototipado de Alta Fidelidad', 'Identidad de Marca'],
          deliverables: ['Archivos Figma', 'Guía de Estilo', 'Prototipo Interactivo', 'Recursos Exportados']
        },
        metrics: {
          long: 'Más que desarrollo: análisis de procesos para identificar cuellos de botella y oportunidades de automatización y crecimiento.',
          features: ['Análisis de Datos', 'Automatización de Marketing', 'Estrategia de Lanzamiento', 'Estrategia de Crecimiento'],
          deliverables: ['Informe Estratégico', 'Embudos de Venta', 'Configuración de Analytics', 'Hoja de Ruta de Crecimiento']
        }
      }
    }
  }
};
