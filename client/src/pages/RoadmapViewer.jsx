import { useState, useEffect } from 'react';
import axios from 'axios';

const RoadmapViewer = () => {
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating API fetch
        setTimeout(() => {
            setRoadmap({
                careerName: 'Full Stack Developer',
                phases: [
                    {
                        title: 'Phase 1: Foundations',
                        duration: '4 weeks',
                        resources: [
                            { title: 'HTML & CSS Basics', type: 'article', url: '#' },
                            { title: 'JavaScript Essentials', type: 'course', url: '#' }
                        ]
                    },
                    {
                        title: 'Phase 2: Frontend Frameworks',
                        duration: '6 weeks',
                        resources: [
                            { title: 'React.js Complete Guide', type: 'course', url: '#' },
                            { title: 'Tailwind CSS', type: 'video', url: '#' }
                        ]
                    },
                    {
                        title: 'Phase 3: Backend Development',
                        duration: '5 weeks',
                        resources: [
                            { title: 'Node.js & Express', type: 'article', url: '#' },
                            { title: 'MongoDB & Database Design', type: 'project', url: '#' }
                        ]
                    }
                ]
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div className="p-8 text-center">Loading roadmap...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-b border-border bg-surface p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-primary">Career Roadmap: {roadmap.careerName}</h1>
                <button onClick={() => window.history.back()} className="text-text-secondary hover:text-text">Exit</button>
            </header>

            <main className="flex-1 p-8 container">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {roadmap.phases.map((phase, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                            {/* Icon / Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <span className="font-bold">{index + 1}</span>
                            </div>

                            {/* Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-4 rounded border border-border shadow-xl">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900 dark:text-slate-100">{phase.title}</div>
                                    <time className="font-caveat font-medium text-primary">{phase.duration}</time>
                                </div>
                                <div className="text-slate-500 dark:text-slate-400 text-sm">
                                    <ul className="list-disc pl-4 mt-2 space-y-1">
                                        {phase.resources.map((res, i) => (
                                            <li key={i}>
                                                <a href={res.url} className="hover:text-primary hover:underline">{res.title}</a>
                                                <span className="text-xs ml-2 opacity-70">({res.type})</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default RoadmapViewer;
