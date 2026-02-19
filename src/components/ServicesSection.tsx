'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Code2, Smartphone, BarChart3, ArrowRight, X, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export function ServicesSection() {
  const { t, language } = useLanguage()
  const [selectedService, setSelectedService] = useState<any | null>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const services = [
    { ...t.services.items[0], icon: Code2 },
    { ...t.services.items[1], icon: Smartphone },
    { ...t.services.items[2], icon: BarChart3 },
  ]

  const modalContent = {
    pt: {
      close: "FECHAR",
      overview: "VISÃO GERAL",
      features: "RECURSOS",
      deliverables: "ENTREGÁVEIS",
      ready: "Pronto para começar?",
      extraDetails: {
        web: {
          long: "Desenvolvemos ecossistemas digitais robustos utilizando as tecnologias mais modernas do mercado. Nosso foco é criar aplicações que não apenas funcionam perfeitamente, mas que também escalam conforme sua empresa cresce.",
          features: ["React & Next.js", "Arquitetura Escalável", "SEO Avançado", "Performance Extrema"],
          deliverables: ["Código Fonte Limpo", "Documentação Técnica", "Painel Administrativo", "Integração com APIs"]
        },
        app: {
          long: "Acreditamos que o design deve servir à função. Criamos interfaces que eliminam o ruído e focam no que realmente importa: a jornada do seu cliente e a conversão do seu negócio.",
          features: ["UI/UX Design", "Design System", "Prototipagem de Alta Fidelidade", "Brand Identity"],
          deliverables: ["Arquivos Figma", "Guia de Estilo", "Protótipo Interativo", "Assets Exportados"]
        },
        metrics: {
          long: "Não somos apenas desenvolvedores, somos parceiros estratégicos. Analisamos seus processos para identificar gargalos e oportunidades de automação e crescimento digital.",
          features: ["Análise de Dados", "Automação de Marketing", "Estratégia de Lançamento", "Growth Hacking"],
          deliverables: ["Relatório Estratégico", "Funis de Vendas", "Configuração de Analytics", "Roadmap de Crescimento"]
        }
      }
    },
    en: {
      close: "CLOSE",
      overview: "OVERVIEW",
      features: "FEATURES",
      deliverables: "DELIVERABLES",
      ready: "Ready to start?",
      extraDetails: {
        web: {
          long: "We develop robust digital ecosystems using the most modern technologies on the market. Our focus is on creating applications that not only work perfectly but also scale as your company grows.",
          features: ["React & Next.js", "Scalable Architecture", "Advanced SEO", "Extreme Performance"],
          deliverables: ["Clean Source Code", "Technical Documentation", "Admin Panel", "API Integration"]
        },
        app: {
          long: "We believe that design should serve function. We create interfaces that eliminate noise and focus on what really matters: your customer's journey and your business's conversion.",
          features: ["UI/UX Design", "Design System", "High-Fidelity Prototyping", "Brand Identity"],
          deliverables: ["Figma Files", "Style Guide", "Interactive Prototype", "Exported Assets"]
        },
        metrics: {
          long: "We are not just developers; we are strategic partners. We analyze your processes to identify bottlenecks and opportunities for automation and digital growth.",
          features: ["Data Analysis", "Marketing Automation", "Launch Strategy", "Growth Hacking"],
          deliverables: ["Strategic Report", "Sales Funnels", "Analytics Setup", "Growth Roadmap"]
        }
      }
    },
    es: {
      close: "CERRAR",
      overview: "VISIÓN GENERAL",
      features: "CARACTERÍSTICAS",
      deliverables: "ENTREGABLES",
      ready: "¿Listo para empezar?",
      extraDetails: {
        web: {
          long: "Desarrollamos ecosistemas digitales robustos utilizando las tecnologías más modernas del mercado. Nuestro enfoque es crear aplicaciones que no solo funcionen perfectamente, sino que también escalen a medida que su empresa crece.",
          features: ["React & Next.js", "Arquitectura Escalable", "SEO Avanzado", "Rendimiento Extremo"],
          deliverables: ["Código Fuente Limpio", "Documentación Técnica", "Panel de Control", "Integración con APIs"]
        },
        app: {
          long: "Creemos que el diseño debe servir a la función. Creamos interfaces que eliminan el ruido y se centran en lo que realmente importa: el viaje de su cliente y la conversión de su negocio.",
          features: ["Diseño UI/UX", "Sistema de Diseño", "Prototipado de Alta Fidelidad", "Identidad de Marca"],
          deliverables: ["Archivos Figma", "Guía de Estilo", "Prototipo Interactivo", "Recursos Exportados"]
        },
        metrics: {
          long: "No somos solo desarrolladores, somos socios estratégicos. Analizamos sus procesos para identificar cuellos de botella y oportunidades de automatización y crecimiento digital.",
          features: ["Análisis de Datos", "Automatización de Marketing", "Estrategia de Lanzamiento", "Growth Hacking"],
          deliverables: ["Informe Estratégico", "Embudos de Venta", "Configuración de Analytics", "Hoja de Ruta de Crecimiento"]
        }
      }
    }
  }

  const mc = modalContent[language as keyof typeof modalContent]

  return (
    <section id="services" className="min-h-screen py-24 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-24 border-l-4 border-[#FF0000] pl-8"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[90px] leading-none tracking-tighter cursor-default transition-all duration-500 inline-block font-[900]">
            {t.services.title.split('').map((char, i) => (
              <span key={i} className="hover:text-[#FF0000] transition-colors duration-300">{char}</span>
            ))}
            <span className="text-[#FF0000] hover:text-white transition-colors duration-300">.</span>
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-xl text-white/60 max-w-2xl font-light uppercase tracking-widest leading-relaxed"
          >
            {t.services.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedService(service)}
                className="bg-black p-12 hover:bg-[#FF0000]/5 transition-colors duration-500 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-10 group-hover:bg-[#FF0000] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl mb-6 tracking-tight font-bold uppercase">{service.title}</h3>
                <p className="text-white/50 leading-relaxed mb-10 h-24 line-clamp-4 font-light">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {service.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] tracking-widest uppercase border border-white/20 px-2 py-1 text-white/40 group-hover:border-[#FF0000]/30 group-hover:text-[#FF0000]/60 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.div
                  className="flex items-center gap-3 text-xs tracking-widest uppercase font-bold text-white/40 group-hover:text-[#FF0000] transition-colors"
                >
                  {language === 'pt' ? 'Saiba mais' : language === 'es' ? 'Saber más' : 'Learn more'} <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Modal Section */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-[#FF0000]/20 backdrop-blur-[2px]"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-black border border-white/10 overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <selectedService.icon className="w-6 h-6 text-[#FF0000]" />
                  <h4 className="text-sm md:text-xl tracking-[0.2em] font-bold uppercase">{selectedService.title}</h4>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="group flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/40 hover:text-[#FF0000] transition-colors"
                >
                  {mc.close} <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h5 className="text-[10px] tracking-[0.4em] text-[#FF0000] mb-4 font-bold uppercase">{mc.overview}</h5>
                      <p className="text-base md:text-lg text-white/80 leading-relaxed font-light italic">
                        "{mc.extraDetails[selectedService.id as keyof typeof mc.extraDetails].long}"
                      </p>
                    </div>
                    
                    <div className="pt-8">
                      <h5 className="text-[10px] tracking-[0.4em] text-[#FF0000] mb-6 font-bold uppercase">{mc.features}</h5>
                      <ul className="grid grid-cols-1 gap-4">
                        {mc.extraDetails[selectedService.id as keyof typeof mc.extraDetails].features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                            <div className="w-1.5 h-1.5 bg-[#FF0000] rotate-45" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/5 p-8 border border-white/5">
                    <h5 className="text-[10px] tracking-[0.4em] text-[#FF0000] mb-8 font-bold uppercase">{mc.deliverables}</h5>
                    <div className="space-y-6">
                      {mc.extraDetails[selectedService.id as keyof typeof mc.extraDetails].deliverables.map((item: string, i: number) => (
                        <div key={i} className="group flex flex-col gap-1">
                          <span className="text-white/40 text-[10px] tracking-widest uppercase">0{i + 1}</span>
                          <span className="text-white text-sm font-medium tracking-wider">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-3 text-[#FF0000]">
                        <Zap className="w-4 h-4 fill-[#FF0000]" />
                        <span className="text-[10px] tracking-[0.2em] font-bold uppercase">{mc.ready}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF0000]/5 to-transparent pointer-events-none" />
    </section>
  )
}
