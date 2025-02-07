import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const textStyle = {
  fontSize: "4rem",
  fontWeight: "bold",
  color: "#ff0088",
  display: "inline-block",
};

export default function AnimatedText() {
  // Split the text into words
  const words = ["Md.", "Farok", "Hossain"];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      style={{ textAlign: "center" }}
      className="mb-10"
    >
      {words.map((word, wordIndex) => (
        <div key={wordIndex} style={{ display: "inline-block", marginRight: "10px" }}>
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={textVariants}
              custom={wordIndex * word.length + charIndex} // Calculate custom delay index
              style={textStyle}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}