"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const playSound = (file) => {
  const audio = new Audio(file);
  audio.play().catch((error) => {
    console.log("Audio playback blocked. User interaction required.");
  });
};

const playSwipeSound = () => playSound("/sounds/packrip.mp3");
const playCardSwipeSound = () => playSound("/sounds/swipe.mp3");

const PortfolioPack = () => {
  // State Management
  const [isPackOpened, setIsPackOpened] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [allCardsRevealed, setAllCardsRevealed] = useState(false);

  useEffect(() => {
    const preloadSounds = () => {
      const sounds = ["/sounds/packrip.mp3", "/sounds/swipe.mp3"];
      sounds.forEach((src) => {
        const audio = new Audio(src);
        audio.load(); // Preload audio to prevent lag
      });
    };

    preloadSounds();
  }, []);

  // Card Data
  const cards = [
    {
      id: 1,
      title: "Tech Lead",
      company: "iCode Memorial",
      year: "May 2025 - Present",
      image: "/images/icode.jpg",
      description:
        "• Teach fundamental programming concepts such as conditionals and block coding through hands-on learning in an interactive project setting",
      link: "https://icodeschool.com/memorial/",
    },
    {
      id: 2,
      title: "Robotics Instructor",
      company: "STEMkidz",
      year: "Summer 2024",
      image: "/images/stemkidz.jpg",
      description:
        "• Instructed a robotics camp, introducing students to hardware assembly and C++ programming fundamentals.",
      link: "https://www.linkedin.com/posts/leonhnguyen_were-excited-to-announce-a-successful-end-activity-7237558077992943616-SAna?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEEW1lUBFcReHVGW0mCaKTqIKJHHfVeh-bo",
    },
    {
      id: 3,
      title: "Analyst Intern",
      company: "Mobalytics",
      year: "Summer 2023",
      image: "/images/mobalytics.gg.png",
      description:
        "• Researched gaming industry trends, selected a genre, and analyzed player psychology and engagement patterns.",
      link: "https://mobalytics.gg/",
    },
    {
      id: 4,
      title: "Therable",
      company: "3rd Place Winner @ HackTX 2024",
      year: "Fall 2024",
      image: "/images/therable.jpeg",
      description:
        "• Developed the landing page and dashboard using Next.js, JavaScript, React, and TailwindCSS, integrated Clerk for secure user access.",
      link: "https://devpost.com/software/therable",
    },
    {
      id: 5,
      title: "IRL Pokédex",
      company: "Next.js/Vercel Blob/GET/POST/GPT",
      year: "Winter 2024",
      image: "/images/pokedex.png",
      description:
        "• Developed a Pokémon-themed web application with Next.js and React, utilizing Vercel Blob to handle images and GPT to generate Pokémon-like descriptions of user-uploaded images.",
      link: "https://youtu.be/zHO1zwewZow",
    },
  ];

  // Handle Pack Opening Animation
  const handlePackOpen = () => {
    playSwipeSound(); // Play sound when swiping
    setIsPackOpened(true);
  };

  // Handle Swiping Between Cards
  const handleCardSwipe = (_, info) => {
    if (Math.abs(info.offset.x) > 100) {
      if (currentCardIndex < cards.length - 1) {
        playCardSwipeSound(); // Play sound on swipe
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setAllCardsRevealed(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#ceddf3] p-8 flex flex-col items-center">
      <AnimatePresence>
        {!isPackOpened ? (
          // PACK CUT OPENING ANIMATION
          <motion.div key="pack" className="relative w-64 h-96">
            {/* Background */}
            <div className="absolute inset-0 bg-gray-100 rounded-lg" />
            {/* Bottom part of the pack */}
            <div className="absolute inset-x-0 top-20 bottom-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-b-lg shadow-xl overflow-hidden flex flex-col items-center justify-end p-4">
              {/* Image inside the pack at the bottom */}
              <img
                src="/images/resume_image.jpg"
                alt="Resume Pack"
                className="w-32 h-32 object-cover rounded-lg shadow-md mb-2"
              />

              {/* Name's Resume Text Below the Image */}
              <div className="text-white text-center font-bold text-lg">
                Leon Nguyen's Portfolio
              </div>
            </div>

            {/* Top part of the pack (Swipe Cut Effect) */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 100) {
                  handlePackOpen();
                }
              }}
              className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-t-lg cursor-grab overflow-hidden flex items-center justify-center"
            >
              {/* Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20" />

              {/* Swipe to Open Text */}
              <div className="text-white font-bold text-lg">
                Swipe Me to Open
              </div>

              {/* Swipe Line */}
              <div className="absolute top-12 left-0 w-full px-4">
                <div className="relative h-1 bg-[#f4eff1]/20 rounded">
                  <motion.div className="absolute top-0 left-0 h-full bg-[#f4eff1]/60 rounded" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-900" />
            </motion.div>
          </motion.div>
        ) : !allCardsRevealed ? (
          // SWIPE ONE CARD AT A TIME
          <motion.div
            key={cards[currentCardIndex].id}
            className="relative w-80 h-[30rem] bg-[#f4eff1] rounded-lg shadow-xl p-4 flex flex-col justify-start items-center cursor-pointer"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleCardSwipe}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={cards[currentCardIndex].image}
              alt={cards[currentCardIndex].title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-center mb-2">
              {cards[currentCardIndex].title}
            </h3>
            <div className="text-gray-600 text-center mb-2">
              {cards[currentCardIndex].company}
            </div>
            <div className="text-sm text-gray-500 text-center mb-4">
              {cards[currentCardIndex].year}
            </div>
            <p className="text-gray-700 text-center">
              {cards[currentCardIndex].description}
            </p>
            <motion.div className="absolute bottom-6 flex flex-col items-center">
              {/* Clickable Link Above */}
              <a
                href={cards[currentCardIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 mb-1"
              >
                Link
              </a>

              {/* Swipe Text Below */}
              <div className="text-sm text-gray-400">Swipe to Reveal Next</div>
            </motion.div>
          </motion.div>
        ) : (
          // SHOW ALL CARDS AFTER SWIPE
          <motion.div
            key="all-cards"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Row (3 Cards - Now Closer) */}
            {cards.slice(0, 3).map((card) => (
              <motion.div
                key={card.id}
                className="relative w-80 h-[30rem] bg-[#f4eff1] rounded-lg shadow-xl p-4 flex flex-col justify-start items-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: card.id * 0.1 }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-bold text-center mb-1">
                  {card.title}
                </h3>
                <div className="text-gray-600 text-center mb-2">
                  {card.company}
                </div>
                <div className="text-sm text-gray-500 text-center mb-4">
                  {card.year}
                </div>
                <p className="text-gray-700 text-center">{card.description}</p>
                <div className="absolute bottom-6 flex flex-col items-center">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 mb-1"
                  >
                    Link
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Bottom Row (2 Cards - Closer to Top Row) */}
            <div className="col-span-3 flex justify-center gap-16 mt-2">
              {cards.slice(3, 5).map((card) => (
                <motion.div
                  key={card.id}
                  className="relative w-80 h-[30rem] bg-[#f4eff1] rounded-lg shadow-xl p-4 flex flex-col justify-start items-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: card.id * 0.1 }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-center mb-1">
                    {card.title}
                  </h3>
                  <div className="text-gray-600 text-center mb-2">
                    {card.company}
                  </div>
                  <div className="text-sm text-gray-500 text-center mb-4">
                    {card.year}
                  </div>
                  <p className="text-gray-700 text-center">
                    {card.description}
                  </p>
                  <div className="absolute bottom-6 flex flex-col items-center">
                    {/* Clickable Link Above */}
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 mb-1"
                    >
                      Link
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPack;
