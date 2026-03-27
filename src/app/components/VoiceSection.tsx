import { MessageCircle, Zap, Heart } from 'lucide-react';

export function VoiceSection() {
  return (
    <section id="voice" className="min-h-screen py-24 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 heading-2">Voice & Tone</h2>
          <p className="text-lg text-gray-600 body-text">
            Our voice represents who we are as a brand. It remains consistent, while our tone adapts to context.
          </p>
        </div>

        {/* Voice Principles */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="brand-card text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Clear</h3>
            <p className="text-gray-600">
              We use simple, straightforward language that everyone can understand. No jargon, no complexity.
            </p>
          </div>
          <div className="brand-card text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-purple-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Confident</h3>
            <p className="text-gray-600">
              We're knowledgeable and authoritative, but never arrogant. We inspire trust through expertise.
            </p>
          </div>
          <div className="brand-card text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-pink-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Human</h3>
            <p className="text-gray-600">
              We're warm and approachable. We write like we're talking to a friend, not a customer.
            </p>
          </div>
        </div>

        {/* Tone Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Tone in Different Contexts</h3>
          <div className="space-y-6">
            <div className="brand-card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Success Messages</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-2">
                    <p className="text-green-900">Great! Your account has been created. Let's get started.</p>
                  </div>
                  <p className="text-sm text-gray-600">Tone: Encouraging and enthusiastic</p>
                </div>
              </div>
            </div>

            <div className="brand-card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Error Messages</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-2">
                    <p className="text-red-900">Something went wrong. Please try again, or contact support if the issue persists.</p>
                  </div>
                  <p className="text-sm text-gray-600">Tone: Helpful and reassuring, never blaming</p>
                </div>
              </div>
            </div>

            <div className="brand-card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Informational</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
                    <p className="text-blue-900">Your subscription will renew on March 25, 2026. You can manage your plan anytime in settings.</p>
                  </div>
                  <p className="text-sm text-gray-600">Tone: Clear and factual, with helpful guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Writing Guidelines */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Writing Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                We do this
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span>Use active voice and present tense</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span>Address the user directly with "you"</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span>Keep sentences short and scannable</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span>Use contractions (we're, you'll, it's)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <span>Lead with the benefit, not the feature</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                We avoid this
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-red-600 flex-shrink-0">✗</span>
                  <span>Passive voice and past tense</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 flex-shrink-0">✗</span>
                  <span>Formal language or corporate speak</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 flex-shrink-0">✗</span>
                  <span>Long, complex sentences</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 flex-shrink-0">✗</span>
                  <span>Technical jargon without explanation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 flex-shrink-0">✗</span>
                  <span>All caps or excessive punctuation!!!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
