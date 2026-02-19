'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export function HeroSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden cursor-none"
    >
      {/* Animated background geometric elements */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: [0.05, 0.08, 0.05],
          rotate: [0, 90, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute top-20 right-20 w-96 h-96 border border-white pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: [0.03, 0.06, 0.03],
          rotate: [0, -90, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
          delay: 1
        }}
        className="absolute bottom-40 left-40 w-64 h-64 border border-[#FF0000] pointer-events-none"
      />

      {/* Floating dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{ 
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut'
          }}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}

      <motion.div 
        className="container mx-auto px-6 md:px-12 relative flex flex-col items-center"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-6xl w-full flex flex-col items-center text-center">
          {/* Logo Brand replaced letters with SVG - Decreased size and centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 flex justify-center w-full relative group"
          >
            {/* Cosmic Nebula Bloom */}
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1.1, 1.4, 1],
                opacity: [0.1, 0.25, 0.15, 0.25, 0.1],
                rotate: [0, 45, 90, 45, 0]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-radial-gradient from-[#FF0000]/40 via-transparent to-transparent blur-[120px] rounded-full pointer-events-none z-0"
              style={{ margin: '-40%' }}
            />

            {/* Stardust Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, Math.random() * 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 400],
                  y: [0, (Math.random() - 0.5) * 300],
                }}
                transition={{ 
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full pointer-events-none z-0"
                style={{
                  boxShadow: '0 0 10px #FF0000, 0 0 20px #FF0000'
                }}
              />
            ))}

            {/* Floating Red Matter */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`matter-${i}`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  rotate: [0, 360],
                  x: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 500],
                  y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
                }}
                transition={{ 
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute left-1/2 top-1/2 w-[2px] h-[30px] bg-[#FF0000] pointer-events-none z-0"
                style={{
                  filter: 'blur(1px)'
                }}
              />
            ))}

            {/* Ripple Echoes */}
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ 
                  opacity: [0, 0.15, 0],
                  scale: [1, 1.5 + i * 0.2],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeOut"
                }}
                className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center opacity-0"
              >
                <svg width="100%" height="auto" viewBox="0 0 398 191" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-20">
                  <path d="M396.338 1.06738C396.367 1.73885 396.394 2.71676 396.417 3.92969C396.462 6.35433 396.49 9.70652 396.49 13.3994V26.6338L383.509 40.0518L370.535 53.4619H293.49V26.4619H369.766L369.912 26.3223L383.374 13.3604C387.076 9.79647 390.469 6.5524 392.953 4.19727C394.195 3.01955 395.21 2.06535 395.922 1.4043C396.073 1.26328 396.212 1.13654 396.335 1.02344C396.335 1.03794 396.337 1.05256 396.338 1.06738Z" stroke="#FF0000" strokeWidth="1"/>
                  <path d="M208.49 27.4621V53.4494L146.238 53.7042L83.4883 53.9621L82.9922 53.964L82.9902 54.4601L82.7334 122.21L82.4775 189.462H56.4902V53.4621H1.18652L13.5312 40.8117L26.5576 27.4621H208.49Z" stroke="#FF0000" strokeWidth="1"/>
                </svg>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full max-w-[280px] md:max-w-[420px] lg:max-w-[500px] relative z-10"
            >
              <svg width="100%" height="auto" viewBox="0 0 398 191" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <path d="M396.338 1.06738C396.367 1.73885 396.394 2.71676 396.417 3.92969C396.462 6.35433 396.49 9.70652 396.49 13.3994V26.6338L383.509 40.0518L370.535 53.4619H293.49V26.4619H369.766L369.912 26.3223L383.374 13.3604C387.076 9.79647 390.469 6.5524 392.953 4.19727C394.195 3.01955 395.21 2.06535 395.922 1.4043C396.073 1.26328 396.212 1.13654 396.335 1.02344C396.335 1.03794 396.337 1.05256 396.338 1.06738Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M208.49 27.4621V53.4494L146.238 53.7042L83.4883 53.9621L82.9922 53.964L82.9902 54.4601L82.7334 122.21L82.4775 189.462H56.4902V53.4621H1.18652L13.5312 40.8117L26.5576 27.4621H208.49Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M211.122 28.9413C211.832 29.9173 212.836 31.3019 214.059 32.9931C216.506 36.3753 219.831 40.983 223.444 45.9999L236.49 64.1142V126.458C236.49 143.646 236.433 159.27 236.34 170.598C236.293 176.261 236.237 180.849 236.176 184.02C236.145 185.606 236.113 186.835 236.08 187.666C236.071 187.895 236.061 188.092 236.052 188.257C235.887 188.184 235.688 188.099 235.46 187.994C234.743 187.666 233.738 187.19 232.515 186.601C230.071 185.423 226.769 183.796 223.2 182.008L210.49 175.639V101.288C210.49 80.7571 210.53 62.14 210.595 48.6845C210.628 41.9566 210.667 36.52 210.71 32.7802C210.731 30.9099 210.754 29.4656 210.777 28.497C210.777 28.4879 210.777 28.4787 210.777 28.4697C210.883 28.6143 210.998 28.7713 211.122 28.9413Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M291.29 28.5306C291.306 29.5218 291.322 30.9864 291.337 32.8743C291.367 36.6501 291.394 42.1145 291.417 48.8607C291.462 62.3528 291.49 80.9703 291.49 101.455V175.639L278.78 182.008C275.211 183.797 271.909 185.422 269.465 186.6C268.242 187.189 267.237 187.666 266.52 187.994C266.292 188.099 266.093 188.185 265.927 188.257C265.918 188.092 265.909 187.895 265.9 187.666C265.867 186.836 265.835 185.607 265.804 184.022C265.743 180.852 265.687 176.265 265.64 170.604C265.547 159.281 265.49 143.661 265.49 126.479V64.1566L278.646 45.8206C282.29 40.7428 285.63 36.1209 288.076 32.7659C289.299 31.0886 290.298 29.729 290.999 28.7874C291.101 28.6504 291.198 28.5233 291.287 28.4046C291.288 28.4457 291.289 28.4877 291.29 28.5306Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M132.254 70.2951C132.272 71.099 132.291 72.2597 132.308 73.7413C132.344 76.812 132.376 81.254 132.403 86.7365C132.457 97.701 132.49 112.825 132.49 129.462V189.462H105.49V107.21L119.098 88.297C122.866 83.0616 126.325 78.3025 128.861 74.8527C130.129 73.1277 131.166 71.7311 131.895 70.7667C132.025 70.5955 132.144 70.4379 132.254 70.2951Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M158.49 69.4621V106.462H134.49V69.4621H158.49Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M342.292 70.3708C342.307 71.1712 342.323 72.3105 342.337 73.7546C342.367 76.8228 342.394 81.2625 342.417 86.7428C342.462 97.7035 342.49 112.825 342.49 129.462V189.462H316.49V106.448L329.647 87.9372C333.291 82.8115 336.631 78.1494 339.077 74.7682C340.3 73.0775 341.299 71.7074 342 70.7604C342.103 70.6206 342.202 70.4915 342.292 70.3708Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M368.49 69.4621V106.462H344.49V69.4621H368.49Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M371.291 71.0462C372.032 72.0566 373.075 73.4891 374.344 75.2376C376.88 78.7346 380.317 83.4956 384.041 88.6761L397.49 107.386V189.462H370.49V129.295C370.49 112.613 370.542 97.4995 370.625 86.5882C370.666 81.1323 370.715 76.7279 370.769 73.7044C370.794 72.3157 370.821 71.2207 370.848 70.4496C370.98 70.6281 371.129 70.8264 371.291 71.0462Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M161.885 72.5553C162.633 73.5506 163.656 74.9296 164.879 76.5924C167.324 79.9175 170.569 84.3738 174.023 89.1588L186.49 106.43V189.462H160.49V129.762C160.49 111 160.578 96.0419 160.74 85.8502C160.821 80.7536 160.92 76.8529 161.035 74.2652C161.085 73.1323 161.14 72.2583 161.195 71.648C161.387 71.899 161.619 72.2022 161.885 72.5553Z" fill="#FF0000" stroke="#FF0000"/>
                <path d="M251.459 151.462H263.49V189.511L251.251 189.242L238.982 188.972L238.716 171.488C238.64 166.551 238.627 161.919 238.667 158.436C238.687 156.693 238.72 155.241 238.764 154.183C238.787 153.653 238.812 153.227 238.84 152.914C238.853 152.758 238.867 152.635 238.881 152.544L238.902 152.425C238.905 152.418 238.976 152.279 239.471 152.12C239.933 151.972 240.638 151.845 241.653 151.745C243.677 151.546 246.819 151.462 251.459 151.462Z" fill="#FF0000" stroke="#FF0000"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Title - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16 max-w-3xl mx-auto"
          >
            {t.hero.subtitle.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.15 }}
                className={`text-xl md:text-3xl leading-tight ${
                  i === 2 ? 'text-white/60' : 'text-white/90'
                }`}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          {/* CTA - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            <motion.button 
              onClick={() => scrollToSection('work')}
              className="group relative px-8 py-4 border border-white/30 overflow-hidden transition-all duration-500 hover:border-[#FF0000]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="relative z-10 text-xs tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white"
              >
                {t.hero.ctaWork}
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-[#FF0000]"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.button>

            <motion.button 
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 bg-[#FF0000] overflow-hidden transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-xs tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white">
                {t.hero.ctaContact}
              </span>
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
