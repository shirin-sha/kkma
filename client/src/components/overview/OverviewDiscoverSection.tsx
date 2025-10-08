import React, { useState } from 'react';
import { Star, Users, Globe, Calendar, Download, ChevronRight } from 'lucide-react';

type IconType = React.ElementType

function DiscoverCard({
    icon: Icon,
    title,
    description,
    index
}: {
    icon: IconType
    title: string
    description: string
    index: string
}): React.JSX.Element {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="discover-card"
            style={{
                backgroundColor: '#24243E',
                padding: '40px 30px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.25)',
                textAlign: 'center',
                position: 'relative',
                height: '360px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div>
                {!hovered && (
                    <div className="icon-box" style={{ marginBottom: '20px' }}>
                        <Icon size={48} color="white" />
                    </div>
                )}
                {!hovered && (
                    <div
                        className="separator"
                        style={{
                            width: '40px',
                            height: '2px',
                            backgroundColor: '#8BC34A',
                            margin: '0 auto 20px'
                        }}
                    ></div>
                )}
                <h4
                    style={{
                        fontSize: '22px',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: hovered ? '10px' : '20px'
                    }}
                >
                    {title}
                </h4>
                {hovered && (
                    <>
                        <div
                            className="separator"
                            style={{
                                width: '40px',
                                height: '2px',
                                backgroundColor: '#8BC34A',
                                margin: '0 auto 12px'
                            }}
                        ></div>
                        <p
                            style={{
                                color: '#cdd1d9',
                                fontSize: '16px',
                                lineHeight: 1.6,
                                margin: '0 auto',
                                maxWidth: '260px'
                            }}
                        >
                            {description}
                        </p>
                    </>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    style={{
                        backgroundColor: '#4A4A5A',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    aria-label={`Open ${title}`}
                >
                    <ChevronRight size={16} color="white" />
                </button>
                <span
                    style={{
                        fontSize: '54px',
                        fontWeight: '700',
                        color: '#6C6C7E',
                        opacity: '0.25'
                    }}
                >
                    {index}
                </span>
            </div>
        </div>
    )
}

export default function OverviewDiscoverSection(): React.JSX.Element {
    return (
        <section className="discover-section" style={{ 
            backgroundColor: '#1A1A2E', 
            padding: '80px 0',
            color: 'white'
        }}>
            <div className="auto-container">
                {/* Header Section */}
                <div className="sec-title centred" style={{ marginBottom: '60px' }}>
                    <h6 style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: '#8BC34A', 
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <Star fill='currentColor' size={14} />
                        <span>STAY CONNECTED WITH KKMA RESOURCES</span>
                        <Star fill='currentColor' size={14} />
                    </h6>
                    <h2 style={{ 
                        fontSize: '42px', 
                        fontWeight: '700', 
                        color: 'white', 
                        marginBottom: '20px',
                        lineHeight: '1.2'
                    }}>
                        Quick Access to Essential Resources and Updates.
                    </h2>
                    <div className="title-shape" style={{ 
                        width: '80px', 
                        height: '3px', 
                        backgroundColor: '#8BC34A',
                        margin: '0 auto'
                    }}></div>
                </div>

                {/* Cards Section */}
                <div className="row clearfix">
                    <div className="col-lg-3 col-md-6 col-sm-12 discover-block">
                        <DiscoverCard
                            icon={Users}
                            title="Membership Details"
                            description="Find out more about the benefits and requirements of becoming a KKMA member."
                            index="01"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 discover-block">
                        <DiscoverCard
                            icon={Globe}
                            title="News & Updates"
                            description="Stay informed & keep up with what's happening in our community."
                            index="02"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 discover-block">
                        <DiscoverCard
                            icon={Calendar}
                            title="Events Calendar"
                            description="Stay connected and participate in our vibrant community events."
                            index="03"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 discover-block">
                        <DiscoverCard
                            icon={Download}
                            title="Forms & Downloads"
                            description="Access important forms and documents. Download resources you need quickly and easily."
                            index="04"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}