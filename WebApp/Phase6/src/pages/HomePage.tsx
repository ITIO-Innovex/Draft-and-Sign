import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Code, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight, 
  Play,
  Book,
  Users,
  BarChart3
} from 'lucide-react'

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Comprehensive REST API',
      description: 'Full-featured API with complete CRUD operations for all DraftnSign capabilities'
    },
    {
      icon: Zap,
      title: 'Real-time Webhooks',
      description: 'Instant notifications for document events with reliable delivery and retry logic'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'OAuth 2.0, API keys, rate limiting, and enterprise-grade authentication'
    },
    {
      icon: Globe,
      title: 'Multi-language SDKs',
      description: 'Auto-generated SDKs for Python, JavaScript, Java, C#, PHP, Ruby, and Go'
    }
  ]

  const quickActions = [
    {
      icon: Play,
      title: 'API Explorer',
      description: 'Test API endpoints interactively',
      href: '/explorer',
      color: 'bg-blue-500'
    },
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive API documentation',
      href: '/docs',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join developer discussions',
      href: '/community',
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Monitor API usage and performance',
      href: '/analytics',
      color: 'bg-orange-500'
    }
  ]

  const stats = [
    { label: 'API Endpoints', value: '50+' },
    { label: 'Webhook Events', value: '25+' },
    { label: 'SDK Languages', value: '7' },
    { label: 'Uptime', value: '99.9%' }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              DraftnSign
              <span className="text-primary-600"> Developer Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build powerful document workflows with our comprehensive API platform. 
              Complete REST API, real-time webhooks, multi-language SDKs, and enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/explorer"
                className="btn btn-primary px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Try API Explorer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/docs"
                className="btn btn-outline px-8 py-3 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-primary-300 transition-all duration-200"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to integrate
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our developer platform provides all the tools and resources you need to build 
              powerful document workflows and integrations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get started in minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jump right in with our interactive tools and comprehensive resources.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  to={action.href}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-primary-200"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, powerful integration
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get up and running with just a few lines of code using our intuitive SDKs.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">Python</span>
            </div>
            <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`import draftn_sign

# Initialize client
client = draftn_sign.Client(api_key="your_api_key")

# Create envelope
envelope = client.envelopes.create({
    "subject": "Please sign this contract",
    "documents": [{
        "name": "contract.pdf",
        "content": base64_content
    }],
    "recipients": [{
        "name": "John Doe",
        "email": "john@example.com",
        "role": "signer"
    }]
})

print(f"Envelope created: {envelope.id}")`}
            </pre>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using DraftnSign API to power their document workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-white text-primary-600 px-8 py-3 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Get Started Free
            </Link>
            <Link
              to="/docs"
              className="border-2 border-white text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}