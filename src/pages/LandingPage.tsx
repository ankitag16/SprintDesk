import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Users, BarChart3, ArrowRight, Layers } from 'lucide-react';

const features = [
  { icon: CheckCircle, title: 'Task Management', desc: 'Create, assign and track tasks across your entire team with priorities and due dates.' },
  { icon: Layers, title: 'Project Tracking', desc: 'Organize work into projects with progress bars, team members, and status tracking.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Role-based access for Admins and Members. Invite people and assign tasks instantly.' },
  { icon: BarChart3, title: 'Dashboard Analytics', desc: 'Get a bird\'s-eye view of completed, in-progress, and overdue work at a glance.' },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-100 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center shadow-orange-glow">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">SprintDesk</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-secondary text-sm py-2">Sign In</Link>
            <Link to="/signup" className="btn-primary text-sm py-2">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-orange-100">
          <Zap size={12} fill="currentColor" />
          Team productivity, supercharged
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
          Manage your team's
          <br />
          <span className="text-orange-500">tasks & projects</span>
          <br />
          effortlessly
        </h1>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          SprintDesk helps teams stay organized, track progress, and hit deadlines.
          Role-based access, real-time updates, and a clean interface that just works.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/signup" className="btn-primary px-8 py-3.5 text-base shadow-orange-glow">
            Start for free <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn-secondary px-8 py-3.5 text-base">
            Sign in to your account
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t border-gray-200/60">
          {[
            { label: 'Tasks completed', value: '50K+' },
            { label: 'Active teams', value: '1,200+' },
            { label: 'Projects tracked', value: '8,500+' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-display font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Everything your team needs</h2>
            <p className="text-gray-500 text-lg">A complete toolkit for project and task management.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card card-hover p-6">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="card p-12 bg-gradient-to-br from-orange-50 to-cream-100 border-orange-100">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Ready to get organized?
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            Join your team on SprintDesk and start shipping faster.
          </p>
          <Link to="/signup" className="btn-primary px-10 py-3.5 text-base mx-auto inline-flex shadow-orange-glow">
            Create free account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap size={12} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-gray-900">SprintDesk</span>
          </div>
          <p className="text-sm text-gray-400">© 2025 SprintDesk. Built for productive teams.</p>
        </div>
      </footer>
    </div>
  );
};
