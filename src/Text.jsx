import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const textStyle = {
  fontSize: "6rem",
  fontWeight: "bold",
  color: "#ff0088",
  display: "inline-block",
};
const textStyleGreen = {
  fontSize: "6rem",
  fontWeight: "bold",
  color: "#4ff0b7",
  display: "inline-block",
};

export default function AnimatedText() {
  // Split the text into words
  const words = ["Md.", "Farok", "Hossain"];
  const professions = ["Junior", "Web", "Developer"];

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        style={{ textAlign: "center" }}
        className="mb-10"
      >
        {words.map((word, wordIndex) => (
          <div
            key={wordIndex}
            style={{ display: "inline-block", marginRight: "20px" }}
          >
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
      <motion.div
        initial="hidden"
        animate="visible"
        style={{ textAlign: "center" }}
        className="mb-10"
      >
        {professions.map((profession, propIndex) => (
          <div
            key={propIndex}
            style={{ display: "inline-block", marginRight: "20px" }}
          >
            {profession.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={textVariants}
                custom={propIndex * profession.length + charIndex} // Calculate custom delay index
                style={textStyleGreen}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
