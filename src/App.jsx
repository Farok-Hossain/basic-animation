import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

import { useState } from "react";
import { useEffect, useRef } from "react";
import PathDrawing from "./PathDrawing";
import Text from "./Text";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const gridSquareVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const svgIconVariants = {
  hidden: { opacity: 0, pathLength: 0, fill: "rgba(252, 211, 77, 0)" },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(252, 211, 77, 1)",
  },
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const initialOrder = ["#ff0088", "#dd00ee", "#9911ff", "#0d63f8"];

/**
 * ==============   Utils   ================
 */
function shuffle([...array]) {
  return array.sort(() => Math.random() - 0.6);
}

/**
 * ==============   Styles   ================
 */

const spring = {
  type: "spring",
  stiffness: 300,
};

const container = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  width: 300,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const item2 = {
  width: 100,
  height: 100,
  borderRadius: "10px",
};

const ball = {
  width: 110,
  height: 110,
  borderRadius: "50%",
  backgroundColor: "#dd00ee",
};

const box = {
  width: 100,
  height: 100,
  borderRadius: 5,
  backgroundColor: "#9911ff",
};

const hideContainer = {
  display: "flex",
  flexDirection: "column",
  width: 100,
  height: 160,
  position: "relative",
};

const hideBox = {
  width: 100,
  height: 100,
  borderRadius: "10px",
  backgroundColor: "#0cdcf7",
};

const hideButton = {
  backgroundColor: "#0cdcf7",
  borderRadius: "10px",
  padding: "10px 20px",
  color: "#0f1115",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
};

const App = () => {
  const [order, setOrder] = useState(initialOrder);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress: completionProgress } = useScroll();

  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "0%"]
  );

  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"]
  );

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  useEffect(() => {
    const timeout = setTimeout(() => setOrder(shuffle(order)), 1000);
    return () => clearTimeout(timeout);
  }, [order]);

  return (
    <div>
      <div className="flex flex-col gap-10 overflow-x-hidden">
        <motion.section
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 p-10 gap-10"
        >
          <motion.div
            variants={{ gridSquareVariants }}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.div
              className="w-20 h-20 bg-stone-100 rounded-lg"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
            <motion.div
              className="w-20 h-20 bg-stone-100 rounded-full"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            />
          </motion.div>
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.div
              className="w-1/3 h-1/3 shadow-md bg-rose-400"
              animate={{
                scale: [1, 2, 2, 1],
                rotate: [0, 90, 90, 0],
                borderRadius: ["10%", "10%", "50%", "10%"],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.div>
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#d1d5db",
                color: "black",
              }}
              transition={{ bounceDamping: 10, bounceStiffness: 600 }}
              className="bg-emerald-600 w-1/2 py-4  rounded-lg text-2xl text-gray-100 font-light tracking-wide"
            >
              Subscribe
            </motion.button>
          </motion.div>
          <motion.div
            variants={{ gridSquareVariants }}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.div
              className="w-1/3 h-1/3 bg-orange-500 rounded-3xl cursor-grab"
              drag
              dragConstraints={{
                top: -125,
                right: 125,
                bottom: 125,
                left: -125,
              }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            />
          </motion.div>
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.div className="w-40 aspect-square bg-gray-50/20 rounded-xl">
              <motion.div
                className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
                style={{ scaleY: completionProgress }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-1/2 stroke-amber-500 stroke-[0.5]"
            >
              <motion.path
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                variants={svgIconVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  default: {
                    duration: 2,
                    ease: "easeInOut",
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1,
                  },
                  fill: {
                    duration: 2,
                    ease: "easeIn",
                    delay: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1,
                  },
                }}
              />
            </motion.svg>
          </motion.div>
        </motion.section>
        <section className="flex flex-col gap-10 mb-10" ref={containerRef}>
          <motion.h1
            className="text-5xl tracking-wide text-slate-100 text-center"
            animate={mainControls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.3 }}
          >
            Just Keep Scrolling
          </motion.h1>
          <motion.p
            style={{ translateX: paragraphOneValue }}
            className="text-white font-thin text-4xl w-1/2 mx-auto"
          >
            This is a basic framer motion animation on how to get up and running
            with Framer Motion with some TailwindCSS
          </motion.p>
          <motion.p
            style={{ translateX: paragraphTwoValue }}
            className="text-slate-100 font-thin text-4xl w-1/2 mx-auto"
          >
            Have some fun playing with Framer Motion. It is a ver powerful
            library, when used properly. Add some life to your websites.
          </motion.p>
        </section>
      </div>

      <section className="flex gap-10 p-4">
        <div className="w-[50vw] h-[40vh] overflow-hidden flex rounded-[5px] justify-center items-center bg-[#BB08F7]">
          <motion.div
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            className="w-[150px] h-[150px] grid grid-cols-2 gap-4 rounded-[50px] p-4 bg-[#e731c9] overflow-hidden"
          >
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="bg-white rounded-full"
                variants={item}
              />
            ))}
          </motion.div>
        </div>
        <div className="w-[50vw] h-[40vh] overflow-hidden flex rounded-[5px] justify-center items-center bg-[#FF0088]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-[10vw] h-[20vh] bg-[#793057] rounded-[5px]"
          ></motion.div>
        </div>
      </section>

      <div className="flex justify-center items-center gap-16 my-10">
        {/* recorder animation  */}
        <div>
          <ul style={container}>
            {order.map((backgroundColor) => (
              <motion.li
                key={backgroundColor}
                layout
                transition={spring}
                style={{ ...item2, backgroundColor }}
              />
            ))}
          </ul>
        </div>
        <motion.div
          className="flex"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            scale: { type: "spring", visualDuration: 2, bounce: 2 },
          }}
          style={ball}
        ></motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          style={box}
        ></motion.div>

        {/* hide button  */}
        <div style={hideContainer}>
          <AnimatePresence initial={false}>
            {isVisible ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={hideBox}
                key="box"
              />
            ) : null}
          </AnimatePresence>
          <motion.button
            style={hideButton}
            onClick={() => setIsVisible(!isVisible)}
            whileTap={{ y: 1 }}
          >
            {isVisible ? "Hide" : "Show"}
          </motion.button>
        </div>
      </div>
      <Text />
      <PathDrawing />
    </div>
  );
};

export default App;
