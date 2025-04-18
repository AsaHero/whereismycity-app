import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Globe2, Search, Terminal, Wifi, Server } from "lucide-react";
import { useTranslation } from "../../../context/TranslationContext";
import { Link } from "react-router-dom";

export const Hero = () => {
  const { t, language } = useTranslation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform terminal position based on mouse movement
  const terminalX = useTransform(mouseX, [-500, 500], [15, -15]);
  const terminalY = useTransform(mouseY, [-300, 300], [10, -10]);

  // Transform shadow based on mouse position for 3D effect
  const shadowX = useTransform(mouseX, [-500, 500], [15, -15]);
  const shadowY = useTransform(mouseY, [-300, 300], [15, -15]);
  const shadowBlur = useTransform(mouseX, [-500, 0, 500], [20, 35, 20]);

  // Track mouse position for terminal interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get terminal element position and dimensions
      if (terminalRef.current) {
        const rect = terminalRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from mouse to center of terminal
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Update motion values
        mouseX.set(distanceX);
        mouseY.set(distanceY);

        // Store absolute position for glow effect
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Array of code sections to be typed sequentially
  const codeSnippets = [
    `// Request`,
    `GET /api/v1/search?q=New+York&limit=5`,
    ``,
    `// Response`,
    `{`,
    `  "query": "New York",`,
    `  "execution_time": "12ms",`,
    `  "locations": [`,
    `    {`,
    `      "id": 5128581,`,
    `      "city": "New York",`,
    `      "state": "New York",`,
    `      "country": "United States",`,
    `      "latitude": 40.7128,`,
    `      "longitude": -74.006,`,
    `      "confidence": 0.97`,
    `    },`,
    `    {`,
    `      "id": 5128638,`,
    `      "city": "New York Mills",`,
    `      "state": "New York",`,
    `      "country": "United States",`,
    `      "latitude": 43.1048,`,
    `      "longitude": -75.291,`,
    `      "confidence": 0.84`,
    `    }`,
    `  ]`,
    `}`,
  ];

  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [terminalStatus, setTerminalStatus] = useState<
    "connecting" | "processing" | "success" | "idle"
  >("idle");
  const [isTerminalHovered, setIsTerminalHovered] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (isTyping && currentTextIndex < codeSnippets.length) {
      const timer = setTimeout(
        () => {
          setDisplayedCode((prev) => [...prev, codeSnippets[currentTextIndex]]);
          setCurrentTextIndex((prev) => prev + 1);

          // If we've reached the end of the snippets, stop typing
          if (currentTextIndex === codeSnippets.length - 1) {
            setIsTyping(false);
            setTerminalStatus("success");
          }
        },
        currentTextIndex === 0
          ? 800
          : currentTextIndex < 5
            ? 200
            : currentTextIndex < 10
              ? 100
              : 80
      ); // Vary typing speed

      return () => clearTimeout(timer);
    }
  }, [isTyping, currentTextIndex]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Initial animation sequence
  useEffect(() => {
    const initSequence = async () => {
      // Focus search input
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 1500);

      // Show code block
      setTimeout(() => {
        setIsCodeVisible(true);
      }, 600);

      // Show "connecting" status
      setTimeout(() => {
        setTerminalStatus("connecting");
      }, 1200);

      // Show "processing" status
      setTimeout(() => {
        setTerminalStatus("processing");
      }, 2200);

      // Start typing animation
      setTimeout(() => {
        setIsTyping(true);
      }, 3000);
    };

    initSequence();
  }, []);

  // Terminal status indicator component
  const StatusIndicator = () => {
    return (
      <div className="flex items-center space-x-2 text-sm mb-2">
        {terminalStatus === "connecting" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <Wifi className="text-yellow-400 mr-1" size={14} />
            <span className="text-yellow-300">Connecting to API...</span>
          </motion.div>
        )}

        {terminalStatus === "processing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <Server className="text-green-400 mr-1" size={14} />
            <span className="text-green-300">Processing request...</span>
          </motion.div>
        )}

        {terminalStatus === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="h-2 w-2 bg-green-500 rounded-full mr-1"
            />
            <span className="text-green-300">200 OK | API Response</span>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <section className="pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/3 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center mb-6 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full"
            >
              <Globe2 className="text-yellow-400 mr-2" size={16} />
              <span className="text-sm text-yellow-100 font-medium">
                {t("hero.citiesCount")}
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t("hero.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                {t("hero.titleColored")}
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="relative mb-10 md:mb-0">
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="#demo"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg shadow-yellow-500/20 font-medium group"
                >
                  <span className="flex items-center">
                    {t("hero.tryDemo")}
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.5,
                        repeatDelay: 2,
                      }}
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </motion.svg>
                  </span>
                </a>
                <Link
                  to="/docs"
                  className="px-6 py-3 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-white/5 hover:border-gray-400 transition-all font-medium"
                >
                  {t("hero.viewDocs")}
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="hidden md:block relative"
          >
            {/* Interactive floating terminal */}
            <AnimatePresence>
              {isCodeVisible && (
                <motion.div
                  ref={terminalRef}
                  style={{
                    x: terminalX,
                    y: terminalY,
                    boxShadow: `${shadowX.get()}px ${shadowY.get()}px ${shadowBlur.get()}px rgba(0, 0, 0, 0.3), 0 0 40px rgba(234, 179, 8, 0.1)`,
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  onHoverStart={() => setIsTerminalHovered(true)}
                  onHoverEnd={() => setIsTerminalHovered(false)}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700 relative cursor-pointer"
                >
                  {/* Moving glow effect based on mouse position */}
                  <div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    style={{
                      background: isTerminalHovered
                        ? `radial-gradient(circle 150px at ${mousePosition.x - terminalRef.current?.getBoundingClientRect().left || 0}px ${mousePosition.y - terminalRef.current?.getBoundingClientRect().top || 0}px, rgba(234, 179, 8, 0.1), transparent)`
                        : "none",
                    }}
                  />

                  {/* Terminal header with controls */}
                  <div className="flex items-center mb-4 px-2 relative z-10">
                    <div className="flex space-x-2">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-red-500"
                        whileHover={{ scale: 1.2 }}
                      ></motion.div>
                      <motion.div
                        className="w-3 h-3 rounded-full bg-yellow-500"
                        whileHover={{ scale: 1.2 }}
                      ></motion.div>
                      <motion.div
                        className="w-3 h-3 rounded-full bg-green-500"
                        whileHover={{ scale: 1.2 }}
                      ></motion.div>
                    </div>
                    <div className="mx-auto flex items-center text-sm text-gray-400 border border-gray-700 px-3 py-1 rounded-md bg-gray-800/80">
                      <Terminal size={12} className="mr-2 text-yellow-500" />
                      api.whereismy.city/search
                    </div>
                  </div>

                  {/* Status indicator */}
                  <StatusIndicator />

                  {/* Code display area */}
                  <div className="text-sm text-gray-300 overflow-x-auto font-mono rounded-lg bg-black/40 p-4 h-[320px] relative backdrop-blur-sm">
                    {displayedCode.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {line.includes("GET") ? (
                          <span className="text-green-400">{line}</span>
                        ) : line.includes("//") ? (
                          <span className="text-gray-500">{line}</span>
                        ) : line.includes('"query"') ||
                          line.includes('"execution_time"') ||
                          line.includes('"locations"') ? (
                          <span>
                            <span className="text-purple-400">
                              {line.split(":")[0]}
                            </span>
                            <span>{line.split(":").slice(1).join(":")}</span>
                          </span>
                        ) : line.includes('"id"') ||
                          line.includes('"city"') ||
                          line.includes('"state"') ||
                          line.includes('"country"') ||
                          line.includes('"latitude"') ||
                          line.includes('"longitude"') ||
                          line.includes('"confidence"') ? (
                          <span>
                            <span className="text-blue-400">
                              {line.split(":")[0]}
                            </span>
                            <span>{line.split(":").slice(1).join(":")}</span>
                          </span>
                        ) : (
                          <span>{line}</span>
                        )}
                      </motion.div>
                    ))}

                    {/* Blinking cursor */}
                    {isTyping && showCursor && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-block w-2 h-4 bg-gray-300 ml-1"
                      ></motion.span>
                    )}

                    {/* Loading spinner that shows during "processing" state */}
                    {terminalStatus === "processing" && !isTyping && (
                      <motion.div
                        className="inline-block ml-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <svg
                          className="animate-spin h-4 w-4 text-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </motion.div>
                    )}
                  </div>

                  {/* Visual elements to enhance the terminal */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-500/30 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Animated ping effect on success */}
                  {terminalStatus === "success" && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-xl"
                      initial={{ boxShadow: "0 0 0 0 rgba(236, 201, 75, 0)" }}
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(236, 201, 75, 0)",
                          "0 0 0 10px rgba(236, 201, 75, 0.2)",
                          "0 0 0 20px rgba(236, 201, 75, 0)",
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: 0 }}
                    />
                  )}

                  {/* Floating particles inside terminal */}
                  {isTerminalHovered && (
                    <>
                      <motion.div
                        className="absolute h-1 w-1 rounded-full bg-yellow-400/50"
                        initial={{ top: "20%", left: "80%", opacity: 0 }}
                        animate={{
                          top: ["20%", "60%", "40%"],
                          left: ["80%", "30%", "60%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute h-1 w-1 rounded-full bg-blue-400/50"
                        initial={{ top: "70%", left: "20%", opacity: 0 }}
                        animate={{
                          top: ["70%", "30%", "50%"],
                          left: ["20%", "70%", "40%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3.5,
                          delay: 0.5,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute h-1 w-1 rounded-full bg-purple-400/50"
                        initial={{ top: "40%", left: "50%", opacity: 0 }}
                        animate={{
                          top: ["40%", "20%", "70%"],
                          left: ["50%", "80%", "10%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 4.5,
                          delay: 1,
                          ease: "easeInOut",
                        }}
                      />
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative floating elements behind terminal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute -z-10 top-20 right-10 w-20 h-20"
            >
              <motion.div
                className="w-full h-full rounded-md border border-yellow-500/20 backdrop-blur-sm bg-yellow-500/5"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.7, duration: 1 }}
              className="absolute -z-10 bottom-20 left-10 w-16 h-16"
            >
              <motion.div
                className="w-full h-full rounded-full border border-blue-500/20 backdrop-blur-sm bg-blue-500/5"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};
