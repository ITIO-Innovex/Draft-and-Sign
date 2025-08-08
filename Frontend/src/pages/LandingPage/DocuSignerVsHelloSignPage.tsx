import React from 'react';
import { Check, X, ArrowRight, Shield, Zap, DollarSign, Users, FileText, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocuSignerVsHelloSignPage = () => {
  const features = [
    { 
      category: "Core Features",
      items: [
        { name: "Electronic Signatures", docusigner: true, hellosign: true },
        { name: "Document Uploads", docusigner: "Unlimited", hellosign: "Limited by plan" },
        { name: "Mobile Signing", docusigner: true, hellosign: true },
        { name: "Audit Trails", docusigner: true, hellosign: true },
        { name: "Templates", docusigner: true, hellosign: true },
        { name: "Multiple Signers", docusigner: true, hellosign: true },
        { name: "Signing Order", docusigner: true, hellosign: true },
        { name: "Bulk Send", docusigner: true, hellosign: "Business plans only" },
      ]
    },
    {
      category: "PDF Tools",
      items: [
        { name: "30+ Free PDF Tools", docusigner: true, hellosign: false },
        { name: "PDF to Word Conversion", docusigner: true, hellosign: false },
        { name: "PDF Editing", docusigner: true, hellosign: false },
        { name: "PDF Compression", docusigner: true, hellosign: false },
        { name: "Merge PDFs", docusigner: true, hellosign: false },
        { name: "Split PDFs", docusigner: true, hellosign: false },
        { name: "OCR Technology", docusigner: true, hellosign: false },
        { name: "Batch Processing", docusigner: true, hellosign: false },
      ]
    },
    {
      category: "Legal & Compliance",
      items: [
        { name: "ESIGN Act Compliance", docusigner: true, hellosign: true },
        { name: "UETA Compliance", docusigner: true, hellosign: true },
        { name: "eIDAS Compliance (EU)", docusigner: true, hellosign: true },
        { name: "Legal Templates Library", docusigner: "45+ templates", hellosign: "None" },
        { name: "Custom Legal Templates", docusigner: true, hellosign: false },
        { name: "Court-Admissible Evidence", docusigner: true, hellosign: true },
        { name: "Global Compliance", docusigner: "40+ countries", hellosign: "Limited countries" },
        { name: "Compliance Documentation", docusigner: true, hellosign: "Premium plans only" },
      ]
    },
    {
      category: "Advanced Features",
      items: [
        { name: "AI-Powered Document Generation", docusigner: true, hellosign: false },
        { name: "API Access", docusigner: "Free tier available", hellosign: "Paid plans only" },
        { name: "White Labeling", docusigner: "Business plans", hellosign: "Enterprise only" },
        { name: "Advanced Authentication", docusigner: true, hellosign: "Limited options" },
        { name: "Document Analytics", docusigner: true, hellosign: "Basic analytics" },
        { name: "Workflow Automation", docusigner: true, hellosign: "Limited automation" },
        { name: "Team Collaboration", docusigner: true, hellosign: true },
        { name: "Custom Branding", docusigner: true, hellosign: "Premium plans only" },
      ]
    },
    {
      category: "Security",
      items: [
        { name: "256-bit SSL Encryption", docusigner: true, hellosign: true },
        { name: "SOC 2 Type II Certified", docusigner: true, hellosign: true },
        { name: "GDPR Compliance", docusigner: true, hellosign: true },
        { name: "HIPAA Compliance", docusigner: true, hellosign: "Business plans only" },
        { name: "Multi-Factor Authentication", docusigner: true, hellosign: true },
        { name: "Data Backup & Recovery", docusigner: true, hellosign: true },
        { name: "Tamper-Evident Seals", docusigner: true, hellosign: true },
        { name: "Detailed Security Logs", docusigner: true, hellosign: "Limited" },
      ]
    }
  ];

  const pricingPlans = [
    {
      name: "Free Plan",
      docusigner: {
        price: "$0",
        period: "forever",
        features: [
          "10 envelopes per month",
          "Full access to PDF tools",
          "Up to 10 legal templates per month",
          "Basic API access (10 calls/month)",
          "Email support",
          "Mobile app access"
        ]
      },
      hellosign: {
        price: "No free plan",
        period: "",
        features: [
          "No permanent free plan",
          "Limited trial only",
          "No PDF tools",
          "No legal templates",
          "No API access",
          "Limited support"
        ]
      }
    },
    {
      name: "Personal/Starter",
      docusigner: {
        price: "$10",
        period: "per month",
        features: [
          "50 envelopes per month",
          "Unlimited PDF tools usage",
          "20 legal templates per month",
          "100 API calls per month",
          "Priority support",
          "Custom branding"
        ]
      },
      hellosign: {
        price: "$20",
        period: "per month",
        features: [
          "Unlimited documents",
          "No PDF tools",
          "No legal templates",
          "No API access",
          "Basic support",
          "Limited features"
        ]
      }
    },
    {
      name: "Business/Professional",
      docusigner: {
        price: "$30",
        period: "per month",
        features: [
          "150 envelopes per month",
          "Unlimited PDF tools usage",
          "Unlimited legal templates",
          "1,000 API calls per month",
          "Priority support",
          "Advanced team features"
        ]
      },
      hellosign: {
        price: "$40",
        period: "per month",
        features: [
          "Unlimited documents",
          "No PDF tools",
          "No legal templates",
          "Limited API access",
          "Phone support",
          "Basic team features"
        ]
      }
    },
    {
      name: "Enterprise",
      docusigner: {
        price: "Custom",
        period: "pricing",
        features: [
          "Unlimited envelopes",
          "Unlimited PDF tools usage",
          "Unlimited legal templates",
          "Unlimited API access",
          "Dedicated support",
          "Advanced security features"
        ]
      },
      hellosign: {
        price: "Custom",
        period: "pricing",
        features: [
          "Unlimited documents",
          "No PDF tools",
          "No legal templates",
          "API access included",
          "Dedicated support",
          "Advanced security features"
        ]
      }
    }
  ];

  const testimonials = [
    {
      quote: "We switched from HelloSign to DocuSigner and immediately gained access to dozens of PDF tools we were paying for separately. The cost savings are significant, and having everything in one platform has streamlined our workflow.",
      author: "Thomas Wilson",
      position: "Operations Manager",
      company: "Nexus Solutions"
    },
    {
      quote: "DocuSigner's legal templates are a game-changer. With HelloSign, we had to create all our templates from scratch or pay lawyers to draft them. DocuSigner's template library has saved us thousands in legal fees.",
      author: "Jennifer Martinez",
      position: "Legal Administrator",
      company: "Vertex Consulting"
    },
    {
      quote: "The free plan from DocuSigner gives us everything HelloSign charged for, plus PDF tools we were paying another vendor to use. For a small business like ours, this makes a huge difference to our bottom line.",
      author: "David Chang",
      position: "Founder",
      company: "Innovate Design Studio"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-max">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">DocuSigner vs HelloSign: The Complete Comparison</h1>
            <p className="text-xl text-primary-100 max-w-3xl">
              Discover why DocuSigner offers superior value with more features and lower prices than HelloSign.
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Complete Document Solution</h2>
                    <p className="text-gray-600">Beyond just e-signatures</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  While HelloSign focuses primarily on e-signatures, DocuSigner provides a comprehensive document platform with e-signatures, 30+ PDF tools, legal templates, and AI-powered features—all in one integrated solution.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">End-to-end document lifecycle management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Eliminate multiple software subscriptions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Reduce legal costs with template library</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Better Value Proposition</h2>
                    <p className="text-gray-600">More features at lower prices</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  DocuSigner delivers exceptional value compared to HelloSign with lower prices across all plan tiers. Our free forever plan includes features that HelloSign only offers in their paid plans, and our paid plans cost 40-60% less than comparable HelloSign plans.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Free forever plan with 10 envelopes/month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">40-60% cost savings compared to HelloSign</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Transparent pricing with no hidden fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Comparison</h2>
          
          {features.map((category, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">{category.category}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 w-1/2">Feature</th>
                      <th className="text-center p-3 w-1/4">
                        <div className="flex flex-col items-center">
                          <span className="text-primary-600 font-bold">DocuSigner</span>
                          <span className="text-xs text-gray-500">Our Platform</span>
                        </div>
                      </th>
                      <th className="text-center p-3 w-1/4">
                        <div className="flex flex-col items-center">
                          <span className="text-gray-600 font-bold">HelloSign</span>
                          <span className="text-xs text-gray-500">Competitor</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((feature, featureIndex) => (
                      <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 font-medium text-gray-900">{feature.name}</td>
                        <td className="p-3 text-center">
                          {typeof feature.docusigner === 'boolean' ? (
                            feature.docusigner ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-green-600 font-medium">{feature.docusigner}</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {typeof feature.hellosign === 'boolean' ? (
                            feature.hellosign ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-600">{feature.hellosign}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing Comparison</h2>
          <p className="text-gray-600 mb-6">See how much you can save by choosing DocuSigner over HelloSign</p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4">Plan</th>
                  <th className="p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-primary-600 font-bold">DocuSigner</span>
                      <span className="text-xs text-gray-500">Price</span>
                    </div>
                  </th>
                  <th className="p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-gray-600 font-bold">HelloSign</span>
                      <span className="text-xs text-gray-500">Price</span>
                    </div>
                  </th>
                  <th className="p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-green-600 font-bold">Your Savings</span>
                      <span className="text-xs text-gray-500">with DocuSigner</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingPlans.map((plan, index) => {
                  // Calculate savings
                  let savings = "100%";
                  if (plan.hellosign.price !== "No free plan" && plan.hellosign.price !== "Custom" && plan.docusigner.price !== "Custom") {
                    const docusignerPrice = parseInt(plan.docusigner.price.replace('$', ''));
                    const hellosignPrice = parseInt(plan.hellosign.price.replace('$', ''));
                    if (!isNaN(docusignerPrice) && !isNaN(hellosignPrice) && hellosignPrice > 0) {
                      const savingsPercent = Math.round(((hellosignPrice - docusignerPrice) / hellosignPrice) * 100);
                      savings = `${savingsPercent}%`;
                    }
                  } else if (plan.hellosign.price === "No free plan") {
                    savings = "100%";
                  } else if (plan.hellosign.price === "Custom" || plan.docusigner.price === "Custom") {
                    savings = "Varies";
                  }
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 font-semibold text-gray-900">{plan.name}</td>
                      <td className="p-4">
                        <div className="flex flex-col items-center">
                          <span className="text-xl font-bold text-primary-600">{plan.docusigner.price}</span>
                          {plan.docusigner.period && <span className="text-sm text-gray-500">{plan.docusigner.period}</span>}
                          <ul className="mt-2 text-xs text-left space-y-1">
                            {plan.docusigner.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col items-center">
                          <span className="text-xl font-bold text-gray-600">{plan.hellosign.price}</span>
                          {plan.hellosign.period && <span className="text-sm text-gray-500">{plan.hellosign.period}</span>}
                          <ul className="mt-2 text-xs text-left space-y-1">
                            {plan.hellosign.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-1">
                                {feature.startsWith("No ") || feature.includes("Limited") ? (
                                  <X className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                )}
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col items-center">
                          <span className="text-xl font-bold text-green-600">{savings}</span>
                          <span className="text-sm text-gray-500">savings</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">Annual Savings Potential</h4>
                <p className="text-sm text-green-700 mt-1">
                  Organizations typically save 40-60% on their document management costs by switching from HelloSign to DocuSigner. For a team of 10 users, this can translate to $2,400-$3,600 in annual savings, plus additional savings from the included PDF tools and legal templates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Advantages */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Advantages of DocuSigner over HelloSign</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrated PDF Tools</h3>
              <p className="text-gray-700">
                DocuSigner includes 30+ PDF tools that HelloSign doesn't offer, eliminating the need for separate PDF software subscriptions and saving you hundreds of dollars annually.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Forever Plan</h3>
              <p className="text-gray-700">
                Unlike HelloSign, DocuSigner offers a genuinely useful free plan with 10 envelopes per month, full access to PDF tools, and legal templates—perfect for individuals and small businesses.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Template Library</h3>
              <p className="text-gray-700">
                DocuSigner provides 45+ professionally drafted legal templates that HelloSign doesn't offer, saving you thousands in potential legal fees and consultation costs.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Features</h3>
              <p className="text-gray-700">
                DocuSigner's advanced AI capabilities for document generation, field detection, and content analysis are not available in HelloSign, making document preparation faster and more accurate.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">More Affordable Team Features</h3>
              <p className="text-gray-700">
                DocuSigner offers team collaboration features at lower price points than HelloSign, making advanced workflow capabilities accessible to small and medium-sized businesses.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Simpler Implementation</h3>
              <p className="text-gray-700">
                DocuSigner's intuitive interface and streamlined onboarding process gets teams up and running in minutes, compared to HelloSign's more complex implementation process.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Customers Say After Switching</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Migration Guide */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Easy Migration from HelloSign</h2>
          <p className="text-gray-600 mb-6">
            Switching from HelloSign to DocuSigner is simple with our migration tools and dedicated support.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Import Your Templates</h3>
              <p className="text-gray-700 text-sm">
                Our template converter automatically imports and adapts your existing HelloSign templates to work with DocuSigner.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transfer Your Contacts</h3>
              <p className="text-gray-700 text-sm">
                Easily import your contact lists and recipient information to maintain continuity in your document workflows.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dedicated Migration Support</h3>
              <p className="text-gray-700 text-sm">
                Our migration specialists provide personalized assistance to ensure a smooth transition with minimal disruption.
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Schedule Migration Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Is DocuSigner as legally binding as HelloSign?</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  Yes, absolutely. DocuSigner's electronic signatures are equally legally binding and compliant with all major e-signature laws including ESIGN Act, UETA, and eIDAS. Our signatures provide the same level of legal validity and court admissibility as HelloSign, with comprehensive audit trails and certificate of completion documentation.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900">How difficult is it to switch from HelloSign to DocuSigner?</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  Switching is remarkably easy. DocuSigner provides migration tools to import your templates, contacts, and workflows. Most customers complete their migration in less than a day, and our dedicated migration specialists are available to assist with the transition. We also provide comprehensive training resources to help your team get up to speed quickly.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Is DocuSigner as secure as HelloSign?</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  DocuSigner implements the same enterprise-grade security measures as HelloSign, including 256-bit SSL encryption, SOC 2 Type II certification, GDPR compliance, and tamper-evident seals. We also offer advanced security features like multi-factor authentication, detailed access controls, and comprehensive audit logs. Your documents and data are equally secure with DocuSigner.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Does DocuSigner offer the same API capabilities as HelloSign?</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  DocuSigner offers more comprehensive API capabilities than HelloSign, with more generous access at lower price points. Our API allows for the same document preparation, sending, signing, and status tracking functionalities. The key difference is that DocuSigner includes API access in our free tier (10 calls/month) and offers more affordable API call packages in our paid plans.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900">How much can I save by switching from HelloSign to DocuSigner?</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  Most organizations save 40-60% on their document management costs by switching to DocuSigner. For example, a business with 10 users on HelloSign's Business plan paying approximately $400/month could switch to DocuSigner's equivalent plan for around $200/month—a savings of $2,400 annually. Additionally, the included PDF tools and legal templates eliminate the need for separate subscriptions to those services, potentially saving thousands more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Save Money and Get More Features?</h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Join thousands of businesses that have switched from HelloSign to DocuSigner for better features at lower prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg">
              Start Free Forever <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors text-lg">
              Schedule Demo
            </Link>
          </div>
          <p className="mt-6 text-primary-100">No credit card required. Free plan includes 10 envelopes/month and all PDF tools.</p>
        </div>
      </div>
    </div>
  );
};

export default DocuSignerVsHelloSignPage;