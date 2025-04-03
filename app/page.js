"use client";

import "./styles/cardStyles.css"
import "./styles/packStyles.css"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    {
      id: 6,
      title: "CyberSecurity Fellow",
      company: "CodePath",
      year: "February 2025 - Present",
      image: "/images/pokedex.png",
      description:
        "• 10-week Cybersecurity Program, currently gaining hands-on experience with ethical hacking, CTF challenges, and real-world tools like Metasploit.",
      link: "https://www.codepath.org/courses/cybersecurity"
    }
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
          <motion.div
            key={cards[currentCardIndex].id}
            className="card cursor-pointer"
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
              className="card-image"
            />
            <h3 className="card-title">{cards[currentCardIndex].title}</h3>
            <div className="card-company">{cards[currentCardIndex].company}</div>
            <div className="card-year">{cards[currentCardIndex].year}</div>
            <p className="card-description">{cards[currentCardIndex].description}</p>
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
        ) : (
          <motion.div
            key="all-cards"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 justify-center"
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
  );
};
export default PortfolioPack;
