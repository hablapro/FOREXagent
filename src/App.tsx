import { Mic } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { VoiceWaveform } from './components/VoiceWaveform';

declare global {
  interface Window {
    vapiSDK: {
      run: (config: {
        apiKey: string;
        assistant: string;
        config?: Record<string, unknown>;
      }) => any;
    };
  }
}

function App() {
  const [isListening, setIsListening] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
    script.defer = true;
    script.async = true;
 const buttonConfig = {
      position: 'bottom-right',
      offset: '90px',
      width: '100px',
      height: '50px',
      idle: {
        color: '#4CAF50',
        type: 'pill',
        title: 'Have a trading question?',
        subtitle: 'Talk with our Forex expert',
        icon: 'https://unpkg.com/lucide-static@0.321.0/icons/phone.svg',
      },
      loading: {
        color: '#4CAF50',
        type: 'pill',
        title: 'Connecting...',
        subtitle: 'Please wait',
        icon: 'https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg',
      },
      active: {
        color: 'rgb(255, 0, 0)',
        type: 'pill',
        title: 'Call is in progress...',
        subtitle: 'End the call.',
        icon: 'https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg',
      },
    };
    script.onload = () => {
      const instance = window.vapiSDK.run({
        apiKey: import.meta.env.VITE_VAPI_API_KEY,
        assistant: import.meta.env.VITE_VAPI_ASSISTANT_ID,
        config: {
          name: 'Forex.com',
          model: 'gpt-4',
          systemPrompt:
            "You are Forex.com's AI assistant, a knowledgeable and professional trading expert. Your role is to help traders with questions about forex trading, market analysis, trading strategies, and account management. You provide clear, helpful advice while emphasizing responsible trading and risk management. You're familiar with Forex.com's services including their trading platform, account types, and available currency pairs.",
          tts: {
            voice: 'nova',
          },
          buttonConfig
        },
      });

      setVapiInstance(instance);
 // Mueve el botón al contenedor correcto
      setTimeout(() => {
        const vapiBtn = document.getElementById('vapi-support-btn');
        const container = document.getElementById('phone-container');

        if (vapiBtn && container && !container.contains(vapiBtn)) {
          container.appendChild(vapiBtn);
          vapiBtn.style.position = 'relative';
          vapiBtn.style.bottom = 'auto';
          vapiBtn.style.right = 'auto';
        }
      }, 1000); // espera a que el botón sea generado
      const interval = setInterval(() => {
        const generatedBtn = document.querySelector('[data-testid="vapi-call-button"]') as HTMLElement;
        const targetContainer = document.getElementById('vapi-support-btn');

        if (generatedBtn && targetContainer && !targetContainer.contains(generatedBtn)) {
          targetContainer.appendChild(generatedBtn);
          generatedBtn.style.position = 'relative';
          generatedBtn.style.bottom = 'auto';
          generatedBtn.style.right = 'auto';
          generatedBtn.style.marginTop = '1rem';
          clearInterval(interval);
        }
      }, 200);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      if (vapiInstance) {
        vapiInstance.destroy();
      }
    };
  }, []);

  const toggleListening = async () => {
    if (!vapiInstance) return;

    if (!isListening) {
      try {
        await vapiInstance.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting voice assistant:', error);
      }
    } else {
      await vapiInstance.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div id="phone-container" className="central-module rounded-3xl p-8 md:p-12 mb-8">
          <div className="flex items-left gap-6 mb-10">
            <img
              src="/img/forex-logo.png"
              alt="Forex.com Logo"
              className="w-[200px] md:w-[250px] h-full mx-auto relative"
            />
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Take your forex trading to new heights
            </h2>
            <p className="text-xl text-white/80">
            Take your forex trading to new heights
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 mb-10 ">
            <VoiceWaveform isActive={isListening} />
          </div>

          <div className="flex flex-col justify-center mx-auto items-center gap-6 mb-6">
            <p className="text-lg text-white/90">
              {isListening
                ? "I'm listening... Ask me about forex trading!"
                : "Click to start your forex trading consultation"}
            </p>
          </div>
        </div>

        <footer className="text-center text-sm text-[#1A237E]/70 max-w-3xl mx-auto">
          <p>
            1. Microphone permission is required. 2. Conversations are recorded to improve our AI assistant. 3. By
            using this tool, you agree to our{' '}
            <a href="#" className="text-[#1A237E] hover:text-[#1A237E]/80 underline transition-colors">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#1A237E] hover:text-[#1A237E]/80 underline transition-colors">
              Privacy Policy
            </a>
            . 4. For optimal audio quality, we recommend using Chrome browser. 5. Service not available in
            EEA/UK/Switzerland.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
