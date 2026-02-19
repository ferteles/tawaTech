'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 250 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const [isHovering, setIsHovering] = useState(false)
  const [isActiveSection, setIsActiveSection] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible && isActiveSection) setIsVisible(true)
      
      // Check if mouse is over Hero section (Section 1)
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        const isInside = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom
        
        setIsActiveSection(isInside)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button'

      setIsHovering(!!isInteractive)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible, isActiveSection])

  // If not in active section, return null or hidden
  if (!isActiveSection) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center font-['Anonymous_Pro'] font-black text-xl mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? 90 : 0,
        }}
        className="flex items-center justify-center"
      >
        <span className={isHovering ? "text-[#FF0000]" : "text-white"}>
          &lt;/&gt;
        </span>
      </motion.div>
    </motion.div>
  )
}
