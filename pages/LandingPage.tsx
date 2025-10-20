
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';

interface LandingPageProps {
  onNavigateToAuth: () => void;
}

const FeatureCard: React.FC<{ icon: string; title: string; children: React.ReactNode, delay: number }> = ({ icon, title, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, amount: 0.5 }}
        className="bg-primary/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10"
    >
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-start to-accent-end rounded-xl mb-4">
            <Icon name={icon} className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{children}</p>
    </motion.div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToAuth }) => {
    return (
        <div className="bg-[#121212] text-white min-h-screen overflow-x-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center text-center p-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        className="text-5xl md:text-7xl font-extrabold"
                    >
                        Welcome to <span className="bg-gradient-to-r from-accent-start to-accent-end text-transparent bg-clip-text">Nexus</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
                        className="mt-4 max-w-2xl text-lg text-gray-300"
                    >
                        The next-generation social hub where your ideas connect, your creativity sparks, and your community thrives.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                        <button onClick={onNavigateToAuth} className="bg-gradient-to-r from-accent-start to-accent-end text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transform hover:scale-105 transition-transform">
                            Get Started
                        </button>
                        <button onClick={onNavigateToAuth} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all">
                            Login
                        </button>
                    </motion.div>
                </section>
                
                {/* Features Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Features That Inspire</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard icon="Sparkles" title="AI-Powered Content" delay={0.1}>
                                Generate engaging posts, edit your images with a simple prompt, or chat with your helpful AI assistant.
                            </FeatureCard>
                            <FeatureCard icon="Signal" title="Real-Time Voice Chat" delay={0.2}>
                                Experience seamless, low-latency voice conversations with our live AI, including real-time transcription.
                            </FeatureCard>
                            <FeatureCard icon="Film" title="Immersive Reels" delay={0.3}>
                                Get lost in a full-screen, vertical video feed. Discover trending content and share your moments.
                            </FeatureCard>
                             <FeatureCard icon="GlobeAlt" title="Explore & Discover" delay={0.4}>
                                Find new creators and content in our visually rich explore feed, or generate your own AI images.
                            </FeatureCard>
                             <FeatureCard icon="ChatBubbleOvalLeftEllipsis" title="Seamless Messaging" delay={0.5}>
                                Stay connected with friends through a clean, modern, and real-time messaging interface.
                            </FeatureCard>
                             <FeatureCard icon="ClipboardDocumentList" title="Interactive Polls" delay={0.6}>
                                Engage your audience and gather opinions directly within your posts with easy-to-create polls.
                            </FeatureCard>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
