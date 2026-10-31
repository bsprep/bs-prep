export interface RecommendedResource {
  id: string
  title: string
  type: "Channel" | "Website" | "Book" | "Course" | "Sheet" | "Link" | "Notes" | "Video"
  subject: string
  category: "Foundation" | "Diploma" | "Advanced Books & AI"
  url: string
  description: string
}

export const RECOMMENDED_RESOURCES: RecommendedResource[] = [
  // Foundation & Core subjects
  {
    id: "10",
    title: "StatQuest with Josh Starmer",
    type: "Channel",
    subject: "Statistics",
    category: "Foundation",
    url: "https://www.youtube.com/@statquest",
    description: "The best intuitive visual explanations for probability, distributions, and hypothesis testing (Stats 1 & 2)."
  },
  {
    id: "11",
    title: "3Blue1Brown",
    type: "Channel",
    subject: "Mathematics",
    category: "Foundation",
    url: "https://www.youtube.com/@3blue1brown",
    description: "Visualizing calculus, linear algebra, limits, and matrix transformations. Essential for Math 1 & 2."
  },
  {
    id: "12",
    title: "Neso Academy",
    type: "Channel",
    subject: "CT / DBMS",
    category: "Foundation",
    url: "https://www.youtube.com/@nesoacademy",
    description: "Great structured lectures for Digital Logic (Computational Thinking) and DBMS relational models."
  },
  {
    id: "13",
    title: "Corey Schafer",
    type: "Channel",
    subject: "Python",
    category: "Foundation",
    url: "https://www.youtube.com/@coreyms",
    description: "In-depth OOP, file operations, error handling, and decorators for Python & OPPE practice."
  },

  // Diploma & Applied
  {
    id: "14",
    title: "Kaggle Datasets & Competitions",
    type: "Website",
    subject: "Data Science & ML",
    category: "Diploma",
    url: "https://www.kaggle.com/datasets",
    description: "Hands-on datasets and Jupyter notebooks for ML Foundations, ML Practice, and BDM."
  },
  {
    id: "21",
    title: "Operating Systems: Three Easy Pieces (OSTEP)",
    type: "Book",
    subject: "Operating Systems",
    category: "Diploma",
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    description: "The gold-standard free textbook on virtualization, concurrency, and persistence."
  },
  {
    id: "24",
    title: "Fast.ai - Practical Deep Learning for Coders",
    type: "Course",
    subject: "AI / ML",
    category: "Diploma",
    url: "https://course.fast.ai/",
    description: "Top-down, code-first course for getting hands-on with neural networks and PyTorch."
  },
  {
    id: "25",
    title: "Stanford CS231n: Deep Learning for Computer Vision",
    type: "Course",
    subject: "Computer Vision",
    category: "Diploma",
    url: "http://cs231n.stanford.edu/",
    description: "Convolutional neural networks, object detection, and visual recognition course notes."
  },
  {
    id: "26",
    title: "Stanford CS224n: NLP with Deep Learning",
    type: "Course",
    subject: "NLP",
    category: "Diploma",
    url: "https://web.stanford.edu/class/cs224n/",
    description: "Word embeddings, attention models, and transformer architectures."
  },

  // Advanced & Textbooks
  {
    id: "22",
    title: "Deep Learning (Ian Goodfellow, Yoshua Bengio)",
    type: "Book",
    subject: "Deep Learning",
    category: "Advanced Books & AI",
    url: "https://www.deeplearningbook.org/",
    description: "The comprehensive textbook on deep learning theory and applied mathematics."
  },
  {
    id: "23",
    title: "Reinforcement Learning: An Introduction (Sutton & Barto)",
    type: "Book",
    subject: "Reinforcement Learning",
    category: "Advanced Books & AI",
    url: "http://incompleteideas.net/book/the-book-2nd.html",
    description: "The definitive textbook for RL, MDPs, dynamic programming, and Q-learning."
  }
]

