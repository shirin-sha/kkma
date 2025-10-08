import React from 'react';
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
            <Team members={teamMembers} />
            <News />
            <Funfacts items={funfacts} />
        </div>
    );
} 