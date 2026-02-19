'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export function SkillsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

  const skills = [
    { name: 'React / Next.js', level: 95, description: t.skills.items.react },
    { name: 'TypeScript', level: 90, description: t.skills.items.typescript },
    { name: 'Node.js', level: 85, description: t.skills.items.node },
    { name: 'UI/UX Engineering', level: 80, description: t.skills.items.uiux },
    { name: 'APIs & Integrações', level: 88, description: t.skills.items.apis },
  ]

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen flex items-center py-24 relative bg-white text-black">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 border-l-4 border-[#FF0000] pl-8"
        >
          <h2
            className="text-5xl md:text-7xl lg:text-[90px] leading-none tracking-tighter cursor-default transition-all duration-500 inline-block font-[900]"
          >
            {t.skills.title.split('').map((char, i) => (
              <span key={i} className="hover:text-[#FF0000] transition-colors duration-300">{char}</span>
            ))}
            <span className="text-[#FF0000] hover:text-black transition-colors duration-300">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-24 gap-y-12 max-w-6xl">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-xl tracking-wide" style={{ fontWeight: 600 }}>
                  {skill.name}
                </h3>
                <span className="text-sm text-black/40">
                  {skill.level}%
                </span>
              </div>
              <div className="relative h-px bg-black/10 overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: skill.level / 100 }}
                  transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="h-full bg-[#FF0000] origin-left"
                />
              </div>
              <p className="text-sm text-black/60 mt-2">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
