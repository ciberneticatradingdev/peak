import { createSignal } from 'solid-js'
import { x, xcommunity } from '../utils/utils'

export default function About() {
  const [activeSection, setActiveSection] = createSignal('overview')

  const sections = {
    overview: {
      title: 'Overview',
      content: (
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-6 rounded-lg border border-blue-500/30">
            <h3 class="text-2xl font-bold text-white mb-4">Welcome to memestockmarket.fun</h3>
            <p class="text-gray-300 text-lg leading-relaxed">
              The world's first decentralized meme stock market where internet culture meets financial innovation. 
              Trade, invest, and profit from the most viral memes on the internet.
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-blue-800/50 p-6 rounded-lg border border-blue-700">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 class="text-xl font-semibold text-white">Trade Memes</h4>
              </div>
              <p class="text-gray-400">
                Buy and sell shares of viral memes. Watch your portfolio grow as memes gain popularity across social media platforms.
              </p>
            </div>
            
            <div class="bg-blue-800/50 p-6 rounded-lg border border-blue-700">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 class="text-xl font-semibold text-white">Community Driven</h4>
              </div>
              <p class="text-gray-400">
                Join a vibrant community of meme enthusiasts, traders, and creators. Share insights and discover the next big meme.
              </p>
            </div>
          </div>
        </div>
      )
    },
    features: {
      title: 'Features',
      content: (
        <div class="space-y-6">
          <div class="grid gap-6">
            <div class="bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-6 rounded-lg border border-blue-500/30">
              <h4 class="text-xl font-bold text-white mb-3 flex items-center">
                <span class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">📈</span>
                Real-time Meme Trading
              </h4>
              <p class="text-gray-300">Track meme performance across social platforms with live price updates and market sentiment analysis.</p>
            </div>
            
            <div class="bg-gradient-to-r from-blue-900/30 to-blue-700/30 p-6 rounded-lg border border-blue-500/30">
              <h4 class="text-xl font-bold text-white mb-3 flex items-center">
                <span class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">🎯</span>
                Smart Portfolio Management
              </h4>
              <p class="text-gray-300">Advanced analytics and AI-powered recommendations to optimize your meme investment strategy.</p>
            </div>
            
            <div class="bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-6 rounded-lg border border-blue-500/30">
              <h4 class="text-xl font-bold text-white mb-3 flex items-center">
                <span class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">🚀</span>
                Meme Launchpad
              </h4>
              <p class="text-gray-300">Launch your own memes and watch them compete in the marketplace. Creators earn royalties from trading activity.</p>
            </div>
            
            <div class="bg-gradient-to-r from-blue-900/30 to-blue-700/30 p-6 rounded-lg border border-blue-500/30">
              <h4 class="text-xl font-bold text-white mb-3 flex items-center">
                <span class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">🏆</span>
                Leaderboards & Rewards
              </h4>
              <p class="text-gray-300">Compete with other traders, climb the leaderboards, and earn exclusive rewards and NFT badges.</p>
            </div>
          </div>
        </div>
      )
    },
    howItWorks: {
      title: 'How It Works',
      content: (
        <div class="space-y-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-white mb-4">Start Trading Memes in 3 Simple Steps</h3>
            <p class="text-gray-400">Join thousands of traders in the world's most entertaining financial market</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-white">1</span>
              </div>
              <h4 class="text-xl font-semibold text-white mb-3">Create Account</h4>
              <p class="text-gray-400">Sign up with your email and get started with virtual currency to begin trading immediately.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-white">2</span>
              </div>
              <h4 class="text-xl font-semibold text-white mb-3">Discover Memes</h4>
              <p class="text-gray-400">Browse trending memes, analyze their social media performance, and identify investment opportunities.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-white">3</span>
              </div>
              <h4 class="text-xl font-semibold text-white mb-3">Trade & Profit</h4>
              <p class="text-gray-400">Buy low, sell high, and watch your portfolio grow as memes go viral across the internet.</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-blue-900/20 to-blue-800/20 p-6 rounded-lg border border-blue-500/30 mt-8">
            <div class="flex items-start">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-white mb-2">Pro Tip</h4>
                <p class="text-gray-300">Follow social media trends, monitor engagement metrics, and use our sentiment analysis tools to make informed trading decisions.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    community: {
      title: 'Community',
      content: (
        <div class="space-y-6">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-white mb-4">Join Our Growing Community</h3>
            <p class="text-gray-400">Connect with meme traders, creators, and enthusiasts from around the world</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div class="bg-blue-500/10 p-6 rounded-lg border border-blue-500/30">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <img src="/social/x2.png" alt="X.com" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-white">X.com</h4>
                  <p class="text-gray-400">Latest updates & news</p>
                </div>
              </div>
              <p class="text-gray-300 mb-4">Follow us for market updates, new meme launches, and community highlights.</p>
              <a href={x} target="_blank" rel="noopener noreferrer" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-block">
                Follow us on X.com
              </a>
            </div>
            
            <div class="bg-blue-500/10 p-6 rounded-lg border border-blue-500/30">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <img src="/social/community.png" alt="X Community" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-white">X Community</h4>
                  <p class="text-gray-400">Join our community</p>
                </div>
              </div>
              <p class="text-gray-300 mb-4">Connect with fellow traders and get exclusive insights from our community.</p>
              <a href={xcommunity} target="_blank" rel="noopener noreferrer" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-block">
                Join X Community
              </a>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-blue-900/20 to-blue-800/20 p-6 rounded-lg border border-blue-500/30">
            <h4 class="text-xl font-bold text-white mb-4">Community Stats</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">50K+</div>
                <div class="text-gray-400 text-sm">Active Traders</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">1M+</div>
                <div class="text-gray-400 text-sm">Memes Traded</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">$10M+</div>
                <div class="text-gray-400 text-sm">Volume Traded</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">24/7</div>
                <div class="text-gray-400 text-sm">Market Open</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div class="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
            About <span class="text-green-400">memestockmarket.fun</span>
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Where internet culture meets financial innovation. The future of meme trading is here.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(sections).map(([key, section]) => (
            <button
              onClick={() => setActiveSection(key)}
              class={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeSection() === key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div class="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          {sections[activeSection()].content}
        </div>

        {/* Call to Action */}
        <div class="text-center mt-12">
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl">
            <h3 class="text-2xl font-bold text-white mb-4">Ready to Start Trading?</h3>
            <p class="text-gray-200 mb-6">Join thousands of traders and start your meme investment journey today!</p>
            <div class="flex justify-center">
              <a href={x} target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <img src="/social/x2.png" alt="X.com" class="w-5 h-5" />
                Follow us on X.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}