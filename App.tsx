import React, { useState, useEffect, useCallback } from 'react';
import { AppStage } from './types';
import FloatingHearts from './components/FloatingHearts';
import { generateRomanticPoem } from './services/geminiService';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [noButtonPosition, setNoButtonPosition] = useState<{ top: string; left: string } | null>(null);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [generatedPoem, setGeneratedPoem] = useState<string>("");
  const [loadingPoem, setLoadingPoem] = useState(false);
  
  // Confetti effect state
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNextStage = () => {
    if (stage === AppStage.INTRO) setStage(AppStage.VALENTINE_QUESTION);
    else if (stage === AppStage.VALENTINE_QUESTION) setStage(AppStage.DATE_QUESTION);
    else if (stage === AppStage.DATE_QUESTION) {
      setStage(AppStage.SUCCESS);
      setShowConfetti(true);
      fetchPoem();
    }
  };

  const fetchPoem = async () => {
    setLoadingPoem(true);
    const poem = await generateRomanticPoem();
    setGeneratedPoem(poem);
    setLoadingPoem(false);
  };

  // The logic to make the "No" button run away quickly
  const moveNoButton = useCallback(() => {
    // Determine new position, keeping it somewhat away from edges
    const x = Math.random() * 80 + 10; 
    const y = Math.random() * 80 + 10;
    setNoButtonPosition({ top: `${y}%`, left: `${x}%` });
    setNoHoverCount(prev => prev + 1);
    
    // Make the Yes button grow drastically every time they try to click No
    setYesButtonScale(prev => Math.min(prev + 0.3, 4)); 
  }, []);

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Mikaela, really?",
      "Think again!",
      "Don't do this!",
      "Look at the other button!",
      "I'm gonna cry...",
      "You're breaking my heart!",
      "Please don't!",
      "Give me a chance!",
      "Wrong button!",
      "Nope, not this one!",
    ];
    return phrases[Math.min(noHoverCount, phrases.length - 1)];
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <FloatingHearts />
      
      <main className="relative z-10 max-w-lg w-full p-6 text-center">
        
        {stage === AppStage.INTRO && (
          <div className="bg-white/60 backdrop-blur-md p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(244,63,94,0.3)] animate-[fadeIn_1s_ease-in] border border-white/50">
            <h1 className="text-5xl md:text-6xl font-handwriting text-rose-600 mb-8 leading-tight drop-shadow-sm">
              Hey Mikaela...
            </h1>
            <p className="text-2xl text-rose-900 mb-10 font-medium leading-relaxed italic opacity-90">
              "Life seems more meaningful ever since I met you."
            </p>
            <button
              onClick={handleNextStage}
              className="group relative px-10 py-4 bg-gradient-to-r from-rose-400 to-rose-600 text-white text-xl font-bold rounded-full shadow-[0_10px_20px_rgba(225,29,72,0.4)] hover:shadow-[0_15px_30px_rgba(225,29,72,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="relative z-10">Continue ❤️</span>
              <div className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-rose-500 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}

        {stage === AppStage.VALENTINE_QUESTION && (
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(244,63,94,0.3)] transition-all duration-500 border border-white/50">
             <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZ2JiZDR0a3lvMDF4OGJyeXp4Z3B4c2g5bWJ4Z3B4c2g5bWJ4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KztT2c4u8mYYUiMKdJ/giphy.gif" 
                  alt="Cute bear asking" 
                  className="mx-auto h-48 object-contain rounded-xl shadow-md"
                />
             </div>
            <h2 className="text-4xl font-bold text-rose-600 mb-10 font-handwriting">
              Mikaela, will you be my Valentine?
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 h-40 relative">
              <button
                onClick={handleNextStage}
                style={{ transform: `scale(${yesButtonScale})` }}
                className="px-10 py-4 bg-gradient-to-r from-green-400 to-emerald-600 text-white text-xl font-bold rounded-full shadow-[0_10px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.6)] transition-all duration-200 z-20 hover:brightness-110 animate-pulse-fast whitespace-nowrap"
              >
                Yes! 😍
              </button>
              
              <button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton} 
                style={
                  noButtonPosition
                    ? { position: 'fixed', top: noButtonPosition.top, left: noButtonPosition.left, transition: 'all 0.1s ease-out' }
                    : { position: 'static' }
                }
                className="px-8 py-3 bg-gray-300 text-gray-500 text-lg font-bold rounded-full hover:bg-gray-400 transition-colors z-10 whitespace-nowrap opacity-80"
              >
                {getNoButtonText()}
              </button>
            </div>
          </div>
        )}

        {stage === AppStage.DATE_QUESTION && (
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(244,63,94,0.3)] animate-[fadeIn_0.5s_ease-in] border border-white/50">
             <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5a3I2eWR4MXB4c2g5bWJ4Z3B4c2g5bWJ4Z3B4c2g5bWJ4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26FLdmIp6wJr91JAI/giphy.gif"
                  alt="Happy excitement" 
                  className="mx-auto h-48 object-contain rounded-xl shadow-md"
                />
             </div>
            <h2 className="text-3xl font-bold text-rose-600 mb-6 font-handwriting">
              Yay! One more question...
            </h2>
            <p className="text-xl text-rose-900 mb-8 font-medium">
              Mikaela, since you're my Valentine now, would you like to go out on a date with me?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleNextStage}
                className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xl font-bold rounded-full shadow-[0_10px_20px_rgba(244,63,94,0.4)] hover:shadow-[0_20px_40px_rgba(244,63,94,0.6)] transition transform hover:scale-105 hover:-translate-y-1"
              >
                Yes, I'd love to! 🌹
              </button>
            </div>
          </div>
        )}

        {stage === AppStage.SUCCESS && (
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(244,63,94,0.4)] animate-[bounceIn_0.8s_cubic-bezier(0.68,-0.55,0.27,1.55)] border border-rose-100">
             <div className="mb-6">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3Z5a3I2eWR4MXB4c2g5bWJ4Z3B4c2g5bWJ4Z3B4c2g5bWJ4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/T86i6yDyOYz7J6AkGm/giphy.gif"
                  alt="Celebration" 
                  className="mx-auto h-56 object-contain rounded-xl shadow-lg"
                />
             </div>
            <h1 className="text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600 mb-4 pb-2">
              It's a date, Mikaela! 🥂
            </h1>
            <p className="text-rose-800 text-lg mb-6 font-medium">
              I can't wait. It's going to be amazing.
            </p>
            
            <div className="mt-8 pt-6 border-t-2 border-rose-100/50">
              <h3 className="text-lg font-semibold text-rose-400 mb-4 uppercase tracking-widest text-xs">A special message for you</h3>
              {loadingPoem ? (
                <div className="flex justify-center items-center gap-2 text-rose-500 py-4">
                   <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce delay-100"></div>
                   <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce delay-200"></div>
                   <span className="text-sm font-medium">Writing something sweet...</span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-100 italic text-rose-800 shadow-inner relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 opacity-70"></div>
                  <p className="text-lg leading-relaxed">"{generatedPoem}"</p>
                </div>
              )}
              {!loadingPoem && !generatedPoem && (
                <button 
                  onClick={fetchPoem}
                  className="mt-4 text-sm text-rose-400 hover:text-rose-600 underline font-medium"
                >
                  Regenerate message
                </button>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Basic CSS Animations defined inline for simplicity within the React component logic if needed, though Tailwind config handles most. */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex justify-center overflow-hidden">
             {/* Simple CSS Confetti using multiple elements */}
             {[...Array(50)].map((_, i) => (
               <div 
                  key={i}
                  className="absolute top-[-10px] w-4 h-4 rounded-full animate-confetti opacity-0 shadow-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    backgroundColor: ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#fb7185'][Math.floor(Math.random() * 5)],
                    animationDuration: `${Math.random() * 2 + 2}s`,
                    animationDelay: `${Math.random() * 1.5}s`
                  }}
               />
             ))}
             <style>{`
               @keyframes confetti {
                 0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 1; }
                 20% { transform: translateY(20vh) rotate(100deg) scale(1); opacity: 1; }
                 100% { transform: translateY(100vh) rotate(720deg) scale(0.5); opacity: 0; }
               }
               .animate-confetti {
                 animation-name: confetti;
                 animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                 animation-fill-mode: forwards;
               }
               @keyframes fadeIn {
                 from { opacity: 0; transform: translateY(20px); }
                 to { opacity: 1; transform: translateY(0); }
               }
             `}</style>
        </div>
      )}
    </div>
  );
};

export default App;