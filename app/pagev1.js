"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Briefcase, Code, GraduationCap, Trophy } from 'lucide-react';

const PortfolioPack = () => {
  // ===== STATE MANAGEMENT =====
  const [isOpened, setIsOpened] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  // ===== CUSTOMIZATION VARIABLES =====
  // Easily adjust these values to customize the appearance
  const THEME = {
    // Pack colors
    packGradientFrom: 'from-purple-600',
    packGradientTo: 'to-purple-800',
    packEdgeColor: 'bg-purple-900',
    
    // Background colors
    backgroundColor: 'bg-gray-100', // Matches the page background
    
    // Animation settings
    slideDistance: 200, // How far the top slides (in pixels)
    openingDuration: 0.6, // Animation duration in seconds
    
    // Holographic effect colors
    holoFrom: 'from-blue-400/20',
    holoVia: 'via-purple-500/20',
    holoTo: 'to-pink-500/20',
    
    // Swipe line colors
    swipeLineBase: 'bg-white/20',
    swipeLineProgress: 'bg-white/60',
    swipeLineGlow: 'bg-white/30'
  };

  // ===== PORTFOLIO DATA =====
  const cards = [
    {
      id: 1,
      title: "Senior Developer",
      company: "Tech Corp",
      year: "2020-Present",
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      description: "Led development of enterprise applications using React and Node.js"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Web Solutions Inc",
      year: "2018-2020",
      icon: <Code className="w-8 h-8 text-blue-500" />,
      description: "Developed and maintained multiple client websites and applications"
    },
    {
      id: 3,
      title: "Computer Science Degree",
      company: "Tech University",
      year: "2014-2018",
      icon: <GraduationCap className="w-8 h-8 text-green-500" />,
      description: "Bachelor's degree with focus on software engineering"
    },
    {
      id: 4,
      title: "Hackathon Winner",
      company: "Global Tech Fest",
      year: "2019",
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      description: "First place in international coding competition"
    },
    {
      id: 5,
      title: "Open Source Contributor",
      company: "Various Projects",
      year: "2017-Present",
      icon: <Star className="w-8 h-8 text-red-500" />,
      description: "Active contributor to multiple open source projects"
    }
  ];

  // ===== EVENT HANDLERS =====
  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      setIsOpened(true);
    }
    setIsDragging(false);
    setDragProgress(0);
  };

  const handleDrag = (event, info) => {
    setIsDragging(true);
    setDragProgress(Math.min(Math.abs(info.offset.x) / 100, 1));
  };

  return (
    <div className={`min-h-screen ${THEME.backgroundColor} p-8 flex flex-col items-center`}>
      <AnimatePresence>
        {!isOpened ? (
          <div className="relative w-64 h-96">
            {/* Background layer - matches page background */}
            <div className={`absolute inset-0 ${THEME.backgroundColor} rounded-lg`} />

            {/* Bottom part of the pack */}
            <div className={`absolute inset-x-0 top-20 bottom-0 bg-gradient-to-br ${THEME.packGradientFrom} ${THEME.packGradientTo} rounded-b-lg shadow-xl overflow-hidden`}>
              {/* Holographic effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${THEME.holoFrom} ${THEME.holoVia} ${THEME.holoTo}`}
                   style={{ backgroundSize: '200% 200%' }} />
            </div>

            {/* Top part of the pack with drag functionality */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              style={{ x: dragProgress * -THEME.slideDistance }}
              className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-br ${THEME.packGradientFrom} ${THEME.packGradientTo} rounded-t-lg cursor-grab overflow-hidden`}
            >
              {/* Holographic effect for top part */}
              <div className={`absolute inset-0 bg-gradient-to-r ${THEME.holoFrom} ${THEME.holoVia} ${THEME.holoTo}`}
                   style={{ backgroundSize: '200% 200%' }}>
                {/* Text at the top */}
                <div className="absolute top-4 left-0 w-full text-center text-white text-sm font-bold">
                  Trace the line to open
                </div>
                
                {/* Highlighted swipe line */}
                <div className="absolute top-12 left-0 w-full px-4">
                  <div className={`relative h-1 ${THEME.swipeLineBase} rounded`}>
                    <motion.div 
                      className={`absolute top-0 left-0 h-full ${THEME.swipeLineProgress} rounded`}
                      style={{ width: `${dragProgress * 100}%` }}
                    />
                  </div>
                  {/* Glowing effect */}
                  <div className={`absolute top-0 left-4 right-4 h-1 ${THEME.swipeLineGlow} blur-sm`} />
                </div>

                {/* Jagged edge effect */}
                <div className={`absolute bottom-0 left-0 w-full h-2 ${THEME.packEdgeColor}`} />
              </div>
            </motion.div>

            {/* Progress indicator */}
            {isDragging && (
              <div className="absolute bottom-4 left-0 w-full text-center text-white">
                {Math.round(dragProgress * 100)}%
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-64 h-96 bg-white rounded-lg shadow-xl p-6 flex flex-col"
              >
                <div className="flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{card.title}</h3>
                <div className="text-gray-600 text-center mb-2">{card.company}</div>
                <div className="text-sm text-gray-500 text-center mb-4">{card.year}</div>
                <p className="text-gray-700 text-center flex-grow">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPack;