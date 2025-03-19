"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Function to play the sound
const playSwipeSound = () => {
  const audio = new Audio("/sounds/packrip.mp3");
  audio.play();
};

const PortfolioPack = () => {
  // State Management
  const [isPackOpened, setIsPackOpened] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [allCardsRevealed, setAllCardsRevealed] = useState(false);

  

  // Card Data
  const cards = [
    {
      id: 1,
      title: "Robotics Instructor",
      company: "STEMkidz",
      year: "Summer 2024",
      image: "/images/stemkidz.jpg",
      description:
        "Instructed a robotics camp, introducing students to hardware assembly and C++ programming fundamentals",
    },
    {
      id: 2,
      title: "Analyst Intern",
      company: "Mobalytics",
      year: "Summer 2023",
      image: "/images/stemkidz.jpg",
      description:
        "Researched gaming industry trends, selected a genre, and analyzed player psychology and engagement patterns",
    },
    {
      id: 3,
      title: "Hackathon Winner",
      company: "Global Tech Fest",
      year: "2019",
      image: "/images/stemkidz.jpg",
      description: "First place in international coding competition",
    },
    {
      id: 4,
      title: "Project",
      company: "Global Tech Fest",
      year: "2019",
      image: "/images/stemkidz.jpg",
      description: "First place in international coding competition",
    },
    {
      id: 5,
      title: "Project",
      company: "Various Projects",
      year: "2017-Present",
      image: "/images/stemkidz.jpg",
      description: "Active contributor to multiple open source projects",
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
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setAllCardsRevealed(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <AnimatePresence>
        {!isPackOpened ? (
          // PACK CUT OPENING ANIMATION
          <motion.div key="pack" className="relative w-64 h-96">
            {/* Background */}
            <div className="absolute inset-0 bg-gray-100 rounded-lg" />

            {/* Bottom part of the pack */}
            <div className="absolute inset-x-0 top-20 bottom-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-b-lg shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20" />
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
              className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-t-lg cursor-grab overflow-hidden"
            >
              {/* Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20" />

              {/* Swipe Line */}
              <div className="absolute top-12 left-0 w-full px-4">
                <div className="relative h-1 bg-white/20 rounded">
                  <motion.div className="absolute top-0 left-0 h-full bg-white/60 rounded" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-900" />
            </motion.div>
          </motion.div>
        ) : !allCardsRevealed ? (
          // SWIPE ONE CARD AT A TIME
          <motion.div
          key={cards[currentCardIndex].id}
          className="relative w-80 h-[30rem] bg-white rounded-lg shadow-xl p-4 flex flex-col justify-start items-center cursor-pointer"
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
          <motion.div className="absolute bottom-4 text-sm text-gray-400">
            Swipe to Reveal Next
          </motion.div>
        </motion.div>
        
        ) : (
          // SHOW ALL CARDS AFTER SWIPE
          <motion.div
            key="all-cards"
            className="grid grid-cols-3 gap-x-12 gap-y-12 justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Row (3 Cards - Now Closer) */}
            {cards.slice(0, 3).map((card) => (
              <motion.div
                key={card.id}
                className="w-64 h-96 bg-white rounded-lg shadow-xl p-6 flex flex-col"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: card.id * 0.1 }}
              >
                <div className="flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {card.title}
                </h3>
                <div className="text-gray-600 text-center mb-2">
                  {card.company}
                </div>
                <div className="text-sm text-gray-500 text-center mb-4">
                  {card.year}
                </div>
                <p className="text-gray-700 text-center">{card.description}</p>
              </motion.div>
            ))}

            {/* Bottom Row (2 Cards - Closer to Top Row) */}
            <div className="col-span-3 flex justify-center gap-16 mt-2">
              {cards.slice(3, 5).map((card) => (
                <motion.div
                  key={card.id}
                  className="w-64 h-96 bg-white rounded-lg shadow-xl p-6 flex flex-col"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: card.id * 0.1 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">
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
