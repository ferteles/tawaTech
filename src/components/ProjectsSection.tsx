'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Plus, ExternalLink, X, Github } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface Project {
  id: number
  title: string
  category: string
  year: string
  description: string
  image: string
  tags: string[]
  links: { labelKey: string; url: string }[]
}

export function ProjectsSection() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const projects: Project[] = [
    {
      id: 1,
      title: 'NexPay Ecosystem',
      category: 'Fintech',
      year: '2024',
      description: 'Infraestrutura de pagamentos escalável focada em microtransações e segurança bancária. Desenvolvemos o core bancário e a interface do dashboard administrativo.',
      image: 'https://images.unsplash.com/photo-1551288049-bbbda5366fd9?auto=format&fit=crop&q=80&w=2000',
      tags: ['Next.js', 'PostgreSQL', 'Redis'],
      links: [
        { labelKey: 'project', url: '#' },
        { labelKey: 'case', url: '#' }
      ]
    },
    {
      id: 2,
      title: 'Alpha Banking',
      category: 'Fintech',
      year: '2023',
      description: 'Solução white-label para bancos digitais, permitindo a criação rápida de contas e cartões com conformidade total às normas do BACEN.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000',
      tags: ['React Native', 'Node.js', 'AWS'],
      links: [
        { labelKey: 'project', url: '#' },
        { labelKey: 'github', url: '#' }
      ]
    },
    {
      id: 3,
      title: 'Flux SaaS Engine',
      category: 'SaaS',
      year: '2024',
      description: 'Plataforma de automação de workflow para times de design e engenharia, integrando ferramentas de gestão e deploy contínuo.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
      tags: ['React', 'Go', 'Kubernetes'],
      links: [
        { labelKey: 'demo', url: '#' },
        { labelKey: 'case', url: '#' }
      ]
    },
    {
      id: 4,
      title: 'Omni CRM',
      category: 'SaaS',
      year: '2023',
      description: 'Sistema de gerenciamento de clientes focado em retenção via análise preditiva de comportamento baseada em IA.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000',
      tags: ['Python', 'React', 'TensorFlow'],
      links: [
        { labelKey: 'project', url: '#' }
      ]
    },
    {
      id: 5,
      title: 'Retail Flow',
      category: 'Varejo',
      year: '2024',
      description: 'Ecossistema completo de e-commerce com gestão de estoque em tempo real sincronizada entre lojas físicas e virtuais.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000',
      tags: ['Next.js', 'Shopify', 'Node.js'],
      links: [
        { labelKey: 'store', url: '#' },
        { labelKey: 'case', url: '#' }
      ]
    },
    {
      id: 6,
      title: 'Market Pulse',
      category: 'Varejo',
      year: '2023',
      description: 'Dashboard de BI para grandes varejistas, consolidando dados de vendas de múltiplos canais em uma interface intuitiva e performante.',
      image: 'https://images.unsplash.com/photo-1551288049-bbda5366fd9?auto=format&fit=crop&q=80&w=2000',
      tags: ['D3.js', 'React', 'BigQuery'],
      links: [
        { labelKey: 'project', url: '#' },
        { labelKey: 'demo', url: '#' }
      ]
    }
  ]

  return (
    <section id="work" className="min-h-screen py-24 bg-black text-white selection:bg-[#FF0000]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20 border-l-4 border-[#FF0000] pl-8"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[90px] leading-none tracking-tighter uppercase cursor-default transition-all duration-500 inline-block font-[900]">
            {t.projects.title.split('').map((char, i) => (
              <span key={i} className="hover:text-[#FF0000] transition-colors duration-300">{char}</span>
            ))}
            <br />
            {t.projects.subtitle.split('').map((char, i) => (
              <span key={i} className={`hover:text-white transition-colors duration-300 ${char === '.' ? 'text-white' : 'text-[#FF0000]'}`}>{char}</span>
            ))}
            <span className="text-[#FF0000] hover:text-white transition-colors duration-300">.</span>
          </h2>
        </motion.div>

        {/* Project List */}
        <div className="border-t border-white/10">
          {projects.map((project) => (
            <div key={project.id} className="border-b border-white/10">
              <button
                onClick={() => setSelectedProject(project)}
                className="w-full group relative hover:border-[#FF0000] transition-colors duration-300"
              >
                <div className="grid grid-cols-12 items-center py-8 gap-4">
                  {/* Number */}
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-sm text-white/40 group-hover:text-[#FF0000] transition-colors duration-300 font-mono">
                      0{project.id}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="col-span-10 md:col-span-4 text-left">
                    <h3 className="text-xl md:text-3xl tracking-tighter uppercase group-hover:translate-x-2 transition-transform duration-300" style={{ fontWeight: 700 }}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Category */}
                  <div className="hidden md:block col-span-3 text-left">
                    <span className="text-xs tracking-[0.3em] uppercase text-white/40">
                      {project.category}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="hidden lg:flex col-span-3 gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 border border-white/20 text-white/40 group-hover:border-[#FF0000]/30 group-hover:text-[#FF0000] transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Icon */}
                  <div className="col-span-12 md:col-span-1 flex justify-end">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-[#FF0000] group-hover:border-[#FF0000] transition-colors duration-300">
                      <Plus className="w-5 h-5 group-hover:text-white" />
                    </div>
                  </div>
                </div>

                {/* Hover effect background */}
                <motion.div
                  className="absolute inset-0 bg-[#FF0000] pointer-events-none opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Modal Overlay and Content */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Backdrop with 20% opacity pure red as requested */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 z-[100] bg-[#FF0000]/20 backdrop-blur-sm cursor-pointer"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 pointer-events-none"
              >
                <div className="bg-black border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto relative shadow-2xl shadow-black/50">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 w-12 h-12 border border-white/10 bg-black flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300 z-20"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="grid md:grid-cols-2">
                    {/* Project Image */}
                    <div className="aspect-video md:aspect-auto md:h-full bg-neutral-900 overflow-hidden">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>

                    {/* Project Details */}
                    <div className="p-8 md:p-12 flex flex-col gap-10">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-[10px] font-mono text-[#FF0000] tracking-widest border border-[#FF0000]/30 px-2 py-0.5">
                            {selectedProject.year}
                          </span>
                          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                            {selectedProject.category}
                          </span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-[900] tracking-tighter uppercase mb-6">
                          {selectedProject.title}
                        </h3>
                        <p className="text-lg text-white/60 leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4 font-bold">
                          Stack & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-4 py-1.5 bg-white/5 border border-white/10 text-white/70 hover:border-[#FF0000]/50 hover:text-white transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                        {selectedProject.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            className="group/link flex items-center gap-3 px-6 py-4 border border-white/10 hover:border-[#FF0000] bg-white/5 hover:bg-[#FF0000]/5 transition-all duration-300"
                          >
                            <span className="text-xs font-bold uppercase tracking-widest group-hover/link:text-white">
                              {t.projects.links[link.labelKey as keyof typeof t.projects.links]}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/link:text-[#FF0000] transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <button className="group relative px-12 py-5 border border-white/30 overflow-hidden transition-all duration-500 hover:border-[#FF0000]">
            <span className="relative z-10 text-xs tracking-[0.4em] uppercase transition-colors duration-500 group-hover:text-white">
              {t.projects.viewAll}
            </span>
            <motion.div
              className="absolute inset-0 bg-[#FF0000]"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
