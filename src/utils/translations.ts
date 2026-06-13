export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    nav: {
      home: 'INÍCIO',
      about: 'SOBRE',
      skills: 'HABILIDADES',
      services: 'SERVIÇOS',
      work: 'PROJETOS',
      contact: 'CONTATO',
    },
    hero: {
      title: ['S', 'T', 'U', 'D', 'I', 'O'],
      subtitle: [
        'Engenharia de software',
        'Sistemas rápidos e escaláveis',
        'Arquitetura técnica, função clara'
      ],
      ctaWork: 'Ver Projetos',
      ctaContact: 'Entrar em Contato',
    },
    about: {
      title: 'SOBRE',
      subtitle: 'Engenharia e produto, integrados. Soluções técnicas para problemas específicos.',
      description: 'O foco está em sistemas que combinam estabilidade técnica e usabilidade. A complexidade fica no código, não na experiência de quem usa. Software construído para escalar.',
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
      subtitle: 'Soluções técnicas que unem engenharia de software e design minimalista.',
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
      footer: '© 2026 Studio. Engenharia de Software.',
      tag: 'Feito sem template'
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
        'Technical architecture, clear function'
      ],
      ctaWork: 'View Work',
      ctaContact: 'Get in Touch',
    },
    about: {
      title: 'ABOUT',
      subtitle: 'Engineering and product, integrated. Technical solutions for specific problems.',
      description: 'The focus is on systems that combine technical stability and usability. Complexity stays in the code, not in the experience of the people using it. Software built to scale.',
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
      subtitle: 'Technical solutions that combine software engineering and minimalist design.',
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
      footer: '© 2026 Studio. Software Engineering.',
      tag: 'Made without template'
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
        'Arquitectura técnica, función clara'
      ],
      ctaWork: 'Ver Proyectos',
      ctaContact: 'Contactar',
    },
    about: {
      title: 'SOBRE',
      subtitle: 'Ingeniería y producto, integrados. Soluciones técnicas para problemas específicos.',
      description: 'El foco está en sistemas que combinan estabilidad técnica y usabilidad. La complejidad queda en el código, no en la experiencia de quien lo usa. Software construido para escalar.',
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
      subtitle: 'Soluciones técnicas que unen ingeniería de software y diseño minimalista.',
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
      footer: '© 2026 Studio. Ingeniería de Software.',
      tag: 'Hecho sin plantilla'
    }
  }
};
