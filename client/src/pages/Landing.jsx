import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="border-b border-border bg-surface">
                <div className="container flex items-center justify-between h-16">
                    <div className="text-2xl font-bold text-primary">AI Mentor</div>
                    <div className="flex gap-4">
                        <Link to="/login" className="btn btn-outline">Login</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="py-20 text-center animate-fade-in">
                    <div className="container">
                        <h1 className="text-4xl font-bold mb-6">
                            Master Your Career with <span className="text-primary">AI Guidance</span>
                        </h1>
                        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                            Personalized roadmaps, interview prep, and mentor-like support to help you land your dream job.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/register" className="btn btn-primary text-xl px-8 py-3">Start Your Journey</Link>
                            <Link to="#" className="btn btn-outline text-xl px-8 py-3">Learn More</Link>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20 bg-surface">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card">
                                <h3 className="text-2xl font-bold mb-4">Users First</h3>
                                <p className="text-text-secondary">Tailored guidance based on your skills and goals.</p>
                            </div>
                            <div className="card">
                                <h3 className="text-2xl font-bold mb-4">Smart Roadmaps</h3>
                                <p className="text-text-secondary">Dynamic learning paths that adapt to you.</p>
                            </div>
                            <div className="card">
                                <h3 className="text-2xl font-bold mb-4">Interview Prep</h3>
                                <p className="text-text-secondary">Mock interviews with instant feedback.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-border text-center text-text-secondary">
                <div className="container">
                    &copy; 2024 AI Mentor. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Landing;
