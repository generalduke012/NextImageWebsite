import React, { useState } from 'react';
import { generateAICaption } from '../services/geminiService';
import { Wand2, Sparkles, Copy, Loader2 } from 'lucide-react';

export const AICaptionTool = () => {
  const [context, setContext] = useState('');
  const [tone, setTone] = useState<'professional' | 'fun' | 'cinematic' | 'romantic'>('cinematic');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!context) return;
    setLoading(true);
    try {
      const result = await generateAICaption({ imageContext: context, tone });
      setCaption(result);
    } catch (e) {
      setCaption("Error generating caption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-tools" className="py-24 bg-gunmetal border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-black border border-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Gradient Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-purple-500 to-orange-500"></div>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-lg">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Creative Assistant</h2>
              <p className="text-gray-400 text-sm">Powered by Google Gemini</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Image Context</label>
                <textarea 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all resize-none h-32 text-sm"
                  placeholder="e.g. Bride smiling at sunset, wearing red lehenga..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Caption Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Cinematic', 'Romantic', 'Fun', 'Professional'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t.toLowerCase() as any)}
                      className={`py-2 px-4 rounded text-sm transition-all border ${
                        tone === t.toLowerCase() 
                        ? 'bg-teal-500/10 border-teal-500 text-teal-400' 
                        : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading || !context}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
                {loading ? 'Dreaming...' : 'Generate Magic Caption'}
              </button>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 flex flex-col">
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-4">Generated Output</label>
              <div className="flex-1 flex items-center justify-center">
                {caption ? (
                  <p className="text-white font-medium text-lg italic leading-relaxed animate-fade-in">"{caption}"</p>
                ) : (
                  <div className="text-center text-gray-600">
                    <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">AI result will appear here</p>
                  </div>
                )}
              </div>
              {caption && (
                <button 
                  onClick={() => navigator.clipboard.writeText(caption)}
                  className="mt-4 text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors self-end"
                >
                  <Copy className="w-3 h-3" /> Copy to clipboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};