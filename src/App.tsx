import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Confetti } from "./components/Confetti";
import { AnimatedText } from "./components/AnimatedText";
import { ScrollReveal } from "./components/ScrollReveal";
import { FireworksEffect } from "./components/FireworksEffect";
import { ScrollBehavior } from "./components/ScrollBehavior";
import translations from "./translations.json";

import superGif from "./assets/super.gif";
import babyGif from "./assets/baby.gif";
import dancingGif from "./assets/dancin.gif";

function App() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Replace [Name] with the friend's name (You can change this)
  const friendName = "Макс";

  // Control initial confetti duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to show fireworks at the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // If we're near the bottom of the page
      if (documentHeight - (scrollPosition + windowHeight) < 200) {
        setShowFireworks(true);
      } else {
        setShowFireworks(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="overflow-x-hidden w-full" style={{ scrollSnapType: "y mandatory" }}>
      <ScrollBehavior threshold={50} />
      {/* Intro Section */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ scrollSnapAlign: "start" }}
      >
        {/* Initial Confetti Animation */}
        {showConfetti && <Confetti duration={5000} particleCount={20} />}

        <div className="absolute w-32 h-32 rounded-full bg-birthday-yellow opacity-20 top-20 left-10 animate-float z-50" />
        <div
          className="absolute w-20 h-20 rounded-full bg-birthday-pink opacity-20 top-40 right-20"
          style={{
            animation: "float 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-40 h-40 rounded-full bg-birthday-turquoise opacity-20 bottom-20 left-20"
          style={{
            animation: "float 8s ease-in-out infinite",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="text-center p-8"
        >
          <h1 className="text-6xl md:text-8xl mb-6 font-bold text-white font-party">
            {translations.happyBirthday} <br />
            <span className="text-birthday-yellow drop-shadow-lg">{friendName}!</span>
          </h1>
          <p className="text-2xl text-white mt-8 max-w-2xl mx-auto">{translations.scrollDown}</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="mt-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white mx-auto"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 1 - Heartfelt Message */}
      <section
        className="min-h-screen  flex items-center justify-center bg-birthday-purple py-20 px-6"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="max-w-3xl w-full">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl mb-12 text-birthday-yellow font-bold font-party text-center">
              {translations.specialMessage}
            </h2>
          </ScrollReveal>

          <AnimatedText
            text={translations.birthdayMessage}
            className="text-xl md:text-2xl text-white leading-relaxed"
            type="word"
            delay={0.1}
          />
        </div>
      </section>

      {/* Section 2 - Memories with Parallax */}
      <section
        className="min-h-screen  flex items-center justify-center bg-birthday-turquoise py-20 px-6"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="max-w-4xl w-full">
          <ScrollReveal direction="left">
            <h2 className="text-4xl md:text-6xl mb-12 text-birthday-purple font-bold font-party text-center">
              {translations.cherishedMemories}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.2} direction="up">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <img src={superGif} alt="" className="w-full h-auto" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="up">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <img src={babyGif} alt="" className="w-full h-auto" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6} direction="up">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <img src={dancingGif} alt="" className="w-full h-auto" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final Section - Fireworks */}
      <section
        className="min-h-screen flex items-center justify-center bg-birthday-pink relative py-20 px-6"
        style={{ scrollSnapAlign: "start" }}
      >
        {showFireworks && <FireworksEffect />}

        <motion.div style={{ opacity }} className="max-w-3xl w-full text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl mb-10 text-white font-bold font-party">{translations.letsCelebrate}</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-3xl md:text-4xl text-white mb-12">{translations.wishingYou}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <p className="text-4xl md:text-6xl text-birthday-yellow font-bold">{translations.hugs}</p>
          </ScrollReveal>
        </motion.div>
      </section>
    </main>
  );
}

export default App;
