'use client'

import { motion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="min-h-screen flex items-center py-24 relative overflow-hidden bg-black text-white">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm tracking-[0.5em] font-bold mb-8 uppercase cursor-default transition-all duration-500 inline-block">
              {t.about.title.split('').map((char, i) => (
                <span key={i} className="text-[#FF0000] hover:text-white transition-colors duration-300">{char}</span>
              ))}
            </h2>
            <div className="flex flex-col gap-6 overflow-hidden">
              <motion.p 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl leading-[1.1] tracking-tight" style={{ fontWeight: 800 }}
              >
                Engenharia técnica, <br />
                <span className="text-white/40 italic">visão estratégica.</span>
              </motion.p>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-1 bg-[#FF0000] mt-4" 
              />
            </div>
          </motion.div>

          <div className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-px bg-[#FF0000] mb-8" />
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-8">
                {t.about.subtitle}
              </p>
              <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl">
                {t.about.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 pt-8"
            >
              <div className="border-l-2 border-[#FF0000] pl-6">
                <div className="text-4xl mb-2" style={{ fontWeight: 900 }}>
                  {new Date().getFullYear() - 2018}+
                </div>
                <div className="text-xs tracking-widest text-white/40 uppercase">
                  {t.about.stats.years}
                </div>
              </div>
              <div className="border-l-2 border-[#FF0000] pl-6">
                <div className="text-4xl mb-2" style={{ fontWeight: 900 }}>
                  50+
                </div>
                <div className="text-xs tracking-widest text-white/40 uppercase">
                  {t.about.stats.projects}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background text decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute bottom-0 right-0 text-[20vw] font-black leading-none pointer-events-none select-none tracking-tighter"
        style={{ transform: 'translate(10%, 20%)' }}
      >
        ABOUT
      </motion.div>
    </section>
  )
}
