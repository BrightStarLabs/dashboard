import { Link } from 'react-router-dom';
import { ArrowRightIcon, BeakerIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <CpuChipIcon className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">EM43</span>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Emergent Models
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover, develop, and deploy emergent AI models that adapt and evolve. 
            Join the playground where artificial intelligence meets emergent behavior.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Start Experimenting
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#learn-more"
              className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-white rounded-lg font-semibold transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="learn-more" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Emergent Models?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Emergent models represent the next frontier in AI, where complex behaviors 
            arise from simple rules and interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <BeakerIcon className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Experimental Playground</h3>
            <p className="text-gray-300 leading-relaxed">
              Test your models in a safe environment. Upload, validate, and iterate 
              on your emergent AI systems with real-time feedback.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <ChartBarIcon className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Performance Analytics</h3>
            <p className="text-gray-300 leading-relaxed">
              Track model performance with comprehensive analytics. Compare fitness 
              scores and identify the most promising emergent behaviors.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <CpuChipIcon className="h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Adaptive Systems</h3>
            <p className="text-gray-300 leading-relaxed">
              Build models that learn and adapt over time. Harness the power of 
              emergence to create truly intelligent systems.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore Emergent Intelligence?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join researchers and developers pushing the boundaries of AI.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Get Started Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 EM43 Playground. Advancing emergent AI research.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 