"use client";

import "./styles/cardStyles.css";
import "./styles/packStyles.css";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/navbar";
import Footer1 from "./components/footer";

const playSwipeSound = () => {
  const audio = new Audio("/sounds/packrip.mp3");
  audio.play().catch((e) => {
    console.log("Swipe sound blocked:", e.message);
  });
};

const playCardSwipeSound = () => {
  const audio = new Audio("/sounds/swipe.mp3");
  audio.play().catch((e) => {
    console.log("Card sound blocked:", e.message);
  });
};

const PortfolioPack = () => {
  // State Management
  const [isPackOpened, setIsPackOpened] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [allCardsRevealed, setAllCardsRevealed] = useState(false);

  useEffect(() => {
    const preloadAudio = (src) => {
      const audio = new Audio(src);
      audio.load(); // Preloads the sound file
    };

    // Preload both sound files
    preloadAudio("/sounds/packrip.mp3");
    preloadAudio("/sounds/swipe.mp3");
  }, []);

  // Card Data
  const cards = [
    {
      id: 1,
      title: "Tech Lead",
      company: "iCode Memorial",
      year: "March 2025 - Present",
      image: "/images/iCode.jpeg",
      description:
        "• Teaching students core computer science concepts like algorithms, loops, and variables through Minecraft modding and Scratch.",
      link: "https://icodeschool.com/memorial/",
    },
    {
      id: 2,
      title: "Robotics Instructor",
      company: "STEMkidz",
      year: "Summer 2024",
      image: "/images/stemkidz.jpg",
      description:
        "• Led a robotics camp, introduced students to hardware assembly and C++ programming fundamentals.",
      link: "https://www.linkedin.com/posts/leonhnguyen_were-excited-to-announce-a-successful-end-activity-7237558077992943616-SAna?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEEW1lUBFcReHVGW0mCaKTqIKJHHfVeh-bo",
    },
    {
      id: 3,
      title: "Analyst Intern",
      company: "Mobalytics",
      year: "Summer 2023",
      image: "/images/mobalytics.gg.png",
      description:
        "• Researched gaming industry trends, identified a target genre, and analyzed player psychology and engagement. Presented findings to the CEO.",
      link: "https://mobalytics.gg/",
    },
    {
      id: 4,
      title: "Therable",
      company: "3rd Place Winner @ HackTX 2024",
      year: "Fall 2024",
      image: "/images/therable.jpeg",
      description:
        "• Built the landing page and dashboard using Next.js, JavaScript, React, and TailwindCSS, integrated Clerk for secure user access.",
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
    {
      id: 6,
      title: "CyberSecurity Fellow",
      company: "CodePath",
      year: "February 2025 - Present",
      image: "/images/codePath.jpg",
      description:
        "• 10-week Cybersecurity Program, currently gaining hands-on experience with ethical hacking, CTF challenges, and real-world tools like Metasploit.",
      link: "https://www.codepath.org/courses/cybersecurity",
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
    <div className="min-h-screen flex flex-col justify-between bg-[#ceddf3] pt-24">
      <Navbar />
      <div className="flex-grow flex flex-col items-center">
        <AnimatePresence>
          {!isPackOpened ? (
            <motion.div key="pack" className="pack-container">
              <div className="pack-background" />
              <div className="pack-bottom">
                <img
                  src="/images/resume_image.jpg"
                  alt="Resume Pack"
                  className="pack-image"
                />
                <div className="pack-name">Leon Nguyen's Portfolio</div>
              </div>
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 100) {
                    handlePackOpen();
                  }
                }}
                className="pack-top"
              >
                <div className="pack-top-glow" />
                <div className="pack-text">Swipe Me to Open</div>
                <div className="pack-swipe-line">
                  <div className="pack-swipe-bar">
                    <motion.div className="pack-swipe-bar-fill" />
                  </div>
                </div>
                <div className="pack-border-bottom" />
              </motion.div>
            </motion.div>
                    ) : !allCardsRevealed ? (
                      <div className="h-[36rem] flex items-center justify-center relative">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={cards[currentCardIndex].id}
                            className="card cursor-pointer absolute"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={handleCardSwipe}
                            initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0.9, rotate: 2, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              duration: 0.4,
                            }}
                          >
                            <img
                              src={cards[currentCardIndex].image}
                              alt={cards[currentCardIndex].title}
                              className="card-image"
                            />
                            <h3 className="card-title">
                              {cards[currentCardIndex].title}
                            </h3>
                            <div className="card-company">
                              {cards[currentCardIndex].company}
                            </div>
                            <div className="card-year">{cards[currentCardIndex].year}</div>
                            <p className="card-description">
                              {cards[currentCardIndex].description}
                            </p>
                            <motion.div className="card-link-container">
                              <a
                                href={cards[currentCardIndex].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-link"
                              >
                                Link
                              </a>
                              <div className="card-swipe-text">Swipe to Reveal Next</div>
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
          
          ) : (
            <motion.div
              key="all-cards"
              className="flex flex-col items-center justify-center gap-6 w-full px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className="card"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: card.id * 0.1 }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                  <h3 className="card-title">{card.title}</h3>
                  <div className="card-company">{card.company}</div>
                  <div className="card-year">{card.year}</div>
                  <p className="card-description">{card.description}</p>
                  <div className="card-link-container">
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Link
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer1 />
    </div>
  );
};
export default PortfolioPack;
