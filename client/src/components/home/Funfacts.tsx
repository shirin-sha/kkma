import { Star } from 'lucide-react';
import React from 'react'

type Funfact = { number: number; suffix: string; label: string }

export default function Funfacts({ items }: { items: Funfact[] }): React.JSX.Element {
    return (
        <section className="funfact-section">
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
                            <span
                              className="count-text"
                              data-speed="1500"
                              data-stop={item.number}
                            >
                              {item.number}
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