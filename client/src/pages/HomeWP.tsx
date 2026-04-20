import React, { useEffect, useMemo, useState } from 'react';
import Banner from '../components/home/Banner';
import Activities from '../components/home/Activities';
import About from '../components/home/About';
import Explore from '../components/home/Explore';
import ExploreBanner from '../components/home/ExploreBanner';
import Services from '../components/home/Services';
import Schedules from '../components/home/Schedules';
import Solutions from '../components/home/Solutions';
import Testimonials from '../components/home/Testimonials';
import Team from '../components/home/Team';
import News from '../components/home/News';
import Funfacts from '../components/home/Funfacts';
import { funfacts, teamMembers } from '../components/home/homeData';

export default function HomeWP(): React.JSX.Element {
    const [members, setMembers] = useState(teamMembers)
    const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])

    useEffect(() => {
        async function loadTeam() {
            try {
                const res = await fetch(`${baseUrl}/api/team`)
                const data = await res.json()
                if (!res.ok || !data?.ok || !Array.isArray(data?.items)) return

                const mapped = data.items.map((item: any) => ({
                    img: item.photoPath ? `${baseUrl}${item.photoPath}` : '/images/home/KKMA-K-SIDDIK-Chief-patron.jpg',
                    name: item.name,
                    role: item.role,
                    email: item.email || 'info@kkma.net',
                    phone: item.phone || '',
                    social: {
                        facebook: item.social?.facebook || '',
                        instagram: item.social?.instagram || '',
                        linkedin: item.social?.linkedin || '',
                    },
                }))
                if (mapped.length > 0) setMembers(mapped)
            } catch {
                // Keep static fallback data if API fails.
            }
        }
        loadTeam()
    }, [baseUrl])

    return (
        <div className="boxed_wrapper">
            <Banner />
            <Activities />
            <About />
            <Explore />
            <ExploreBanner />
            <Services />
            <Schedules />
            <Solutions />
            <Testimonials />
            <Team members={members} />
            <News />
            <Funfacts items={funfacts} />
        </div>
    );
} 