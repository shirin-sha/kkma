import { Star } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react'

type Funfact = { number: number; suffix: string; label: string }

export default function Funfacts({ items }: { items: Funfact[] }): React.JSX.Element {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section className="funfact-section" ref={sectionRef}>
      <div className="auto-container">
        <div className="funfact-content">
          <div className="row clearfix">
            {/* Left Title Section */}
            <div className="col-lg-4 col-md-12 col-sm-12 title-column">
              <div className="sec-title">
                <h6>
                  <Star fill='currentColor' size={14} />
                  <span>Collective Impacts</span>
                </h6>
                <h2>Key Milestones</h2>
                <div className="title-shape"></div>
              </div>
            </div>

            {/* Right Funfacts */}
            <div className="col-lg-8 col-md-12 col-sm-12 inner-column">
              <div className="funfact-inner centred">
                <div className="row clearfix">
                  {items.map((item, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-12 funfact-block"
                      key={index}
                    >
                      <div className="funfact-block-one">
                        <div className="inner-box">
                          <div className="count-outer count-box">
                            <span className="count-text">
                              <CountUpAnimation 
                                end={item.number} 
                                duration={2000} 
                                isVisible={isVisible}
                                delay={index * 200}
                              />
                            </span>
                            <span>{item.suffix}</span>
                          </div>
                          <h6>{item.label}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

// CountUp Animation Component
function CountUpAnimation({ 
  end, 
  duration = 2000, 
  isVisible = false, 
  delay = 0 
}: { 
  end: number; 
  duration?: number; 
  isVisible?: boolean; 
  delay?: number 
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true)
        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime
          const progress = Math.min((currentTime - startTime) / duration, 1)
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const currentCount = Math.floor(easeOutQuart * end)
          
          setCount(currentCount)
          
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate)
          }
        }

        animationFrame = requestAnimationFrame(animate)
        
        return () => {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame)
          }
        }
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, hasAnimated, end, duration, delay])

  return <>{count}</>
} 