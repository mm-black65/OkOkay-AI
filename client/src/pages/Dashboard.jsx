import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="border-b border-border bg-surface">
                <div className="container flex items-center justify-between h-16">
                    <div className="text-2xl font-bold text-primary">Dashboard</div>
                    <div className="flex items-center gap-4">
                        <span className="text-text-secondary">Hello, {user?.name}</span>
                        <button onClick={logout} className="btn btn-outline text-sm px-4 py-2">Logout</button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 py-8">
                <div className="container">
                    <h1 className="text-3xl font-bold mb-8">Your Career Hub</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link to="/roadmap" className="card hover-scale cursor-pointer block">
                            <h3 className="text-xl font-bold mb-2">Roadmaps</h3>
                            <p className="text-text-secondary">View and manage your learning paths.</p>
                        </Link>

                        <Link to="/chat" className="card hover-scale cursor-pointer block">
                            <h3 className="text-xl font-bold mb-2">Chat with AI Mentor</h3>
                            <p className="text-text-secondary">Get instant career advice.</p>
                        </Link>

                        <div className="card hover-scale cursor-pointer">
                            <h3 className="text-xl font-bold mb-2">Mock Interviews</h3>
                            <p className="text-text-secondary">Practice and improve your skills.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
