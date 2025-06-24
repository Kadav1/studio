import type { Quiz } from "@/types";

const quizzes: Record<string, Quiz> = {
  "motion-primitives-quiz": {
    id: "motion-primitives-quiz",
    title: "Motion Primitives Quiz",
    questions: [
      {
        id: "q1",
        text: "What is the primary library used for animations in this portfolio template?",
        options: [
          { id: "o1", text: "GSAP" },
          { id: "o2", text: "Framer Motion" },
          { id: "o3", text: "React Spring" },
          { id: "o4", text: "CSS Transitions" },
        ],
        correctOptionId: "o2",
      },
      {
        id: "q2",
        text: "In Framer Motion, what prop is used to define the initial state of an animation?",
        options: [
          { id: "o1", text: "start" },
          { id: "o2", text: "begin" },
          { id: "o3", text: "initial" },
          { id: "o4", text: "from" },
        ],
        correctOptionId: "o3",
      },
      {
        id: "q3",
        text: "What does the `viewport={{ once: true }}` prop do on a motion component?",
        options: [
          { id: "o1", text: "The animation runs only once when the component mounts." },
          { id: "o2", text: "The component is always visible in the viewport." },
          { id: "o3", text: "The animation triggers every time it enters the viewport." },
          { id: "o4", text: "The animation triggers only the first time it enters the viewport." },
        ],
        correctOptionId: "o4",
      },
       {
        id: "q4",
        text: "Which component is used to orchestrate animations on components entering or leaving the DOM?",
        options: [
          { id: "o1", text: "motion.div" },
          { id: "o2", text: "AnimatePresence" },
          { id: "o3", text: "useAnimation" },
          { id: "o4", text: "motion.ul" },
        ],
        correctOptionId: "o2",
      },
    ],
  },
};

export function getQuizById(id: string): Quiz | undefined {
  return quizzes[id];
}
