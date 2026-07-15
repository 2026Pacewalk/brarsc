export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
  shortDesc: string;
  tags: string[];
  reviewList: Review[];
  relatedIds: number[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "PROJECTILE MOTION: Formulae Sheets (Class 11th) - Advance level",
    price: 50,
    oldPrice: 100,
    rating: 0,
    reviews: 0,
    badge: "-50%",
    image: "/images/prod-1.jpg",
    category: "Physics Study Material",
    inStock: true,
    shortDesc: "Complete Projectile Motion formulae sheet with all derivations, diagrams, and shortcut tricks for Class 11th Physics.",
    description: "These creative formula sheets covers all type of Projectile Motion formulae for Class 11th Physics (Advance Level). You will love learning these concepts from this colourful eye-catching Formula Sheet.\n\nTopics Covered:\n1. Horizontal Projectile Motion\n2. Oblique Projectile Motion\n3. Maximum Height Formula\n4. Time of Flight\n5. Range of Projectile\n6. Velocity at any point\n7. Trajectory Equation\n8. Important Derivations\n\n(Digital PDF File, 3 Pages)\nComplete Chapter Formulae on three pages (very useful for Class 11th students preparing for JEE and board exams)",
    tags: ["physics", "class 11", "projectile motion", "formulae", "jee", "cbse", "notes"],
    reviewList: [],
    relatedIds: [3, 4, 6],
  },
  {
    id: 2,
    name: "Chemical Reactions & Equations: SYNOPSIS (Class 10th)",
    price: 30,
    oldPrice: 50,
    rating: 5,
    reviews: 4,
    badge: "-40%",
    image: "/images/prod-2.jpg",
    category: "Chemistry Study Material",
    inStock: true,
    shortDesc: "Complete chapter equations on two pages covering all types of chemical reactions & equations for Class 10th Chemistry.",
    description: "These creative formula sheets covers all type of chemical reactions & equations of chapter: Chemical reactions & equations (Class 10: Chemistry). You will love learning basic concepts from this colourful eye-catching Formula Sheet.\n\nComplete Chapter Equations on two pages (very useful for Class 10th students)\n\n(Digital PDF File, 2 Pages)\n\nTopics Covered:\n1. Chemical Equations\n2. Combination Reactions\n3. Decomposition Reactions\n4. Displacement Reactions\n5. Double Displacement Reactions\n6. Redox Reactions\n7. Rancidity\n8. Corrosion Reactions\n9. Colours of Compounds\n10. Balanced Chemical Equations with Colour Changes\n\nThis is a Digital product (PDF File). Once the payment is confirmed, it will be instantly delivered to your email ID. You can take printout or read it on your phone or computer. (NOTE: Copyright protected)",
    tags: ["chemistry", "class 10", "chemical reactions", "equations", "cbse", "short notes", "cheat sheet"],
    reviewList: [
      { id: 1, name: "Rahul Sharma", rating: 5, date: "2024-03-15", comment: "Amazing quality! The colorful diagrams made it so easy to understand chemical reactions. Highly recommended for Class 10 students." },
      { id: 2, name: "Priya Patel", rating: 5, date: "2024-02-28", comment: "Best study material I have purchased. The colour coding for different types of reactions is brilliant. Helped me score 95 in Chemistry!" },
      { id: 3, name: "Amit Kumar", rating: 5, date: "2024-02-10", comment: "Worth every penny. My daughter loves studying from these notes. The visual appeal makes learning fun." },
      { id: 4, name: "Sneha Gupta", rating: 5, date: "2024-01-22", comment: "JP Brar sir's notes are always top notch. These synopsis sheets are perfect for last minute revision before exams." },
    ],
    relatedIds: [7, 3, 8],
  },
  {
    id: 3,
    name: "Motion: Formulae Sheet (Class 9th)",
    price: 20,
    oldPrice: 40,
    rating: 0,
    reviews: 0,
    badge: "-50%",
    image: "/images/prod-3.jpg",
    category: "Physics Study Material",
    inStock: true,
    shortDesc: "Complete Motion chapter formulae with distance-time graphs, speed-velocity concepts for Class 9th Physics.",
    description: "These creative formula sheets covers all formulae of chapter: Motion (Class 9: Physics). You will love learning basic concepts from this colourful eye-catching Formula Sheet.\n\nTopics Covered:\n1. Distance and Displacement\n2. Speed and Velocity\n3. Acceleration\n4. Equations of Motion\n5. Distance-Time Graphs\n6. Velocity-Time Graphs\n7. Uniform and Non-Uniform Motion\n8. Circular Motion\n\n(Digital PDF File, 2 Pages)",
    tags: ["physics", "class 9", "motion", "formulae", "cbse", "notes"],
    reviewList: [],
    relatedIds: [1, 6, 4],
  },
  {
    id: 4,
    name: "Electric Charges & Fields: Formulae Sheets (Class 12th)",
    price: 25,
    oldPrice: 50,
    rating: 0,
    reviews: 0,
    badge: "-50%",
    image: "/images/prod-4.jpg",
    category: "Physics Study Material",
    inStock: true,
    shortDesc: "Complete Electric Charges & Fields formulae with Coulomb's law, Gauss's law, and electric field diagrams for Class 12th.",
    description: "These creative formula sheets covers all formulae of chapter: Electric Charges and Fields (Class 12: Physics). You will love learning these concepts from this colourful eye-catching Formula Sheet.\n\nTopics Covered:\n1. Coulomb's Law\n2. Electric Field\n3. Electric Field Lines\n4. Electric Dipole\n5. Gauss's Law\n6. Electric Flux\n7. Applications of Gauss's Law\n8. Important Derivations\n\n(Digital PDF File, 3 Pages)",
    tags: ["physics", "class 12", "electric charges", "fields", "jee", "cbse", "notes"],
    reviewList: [],
    relatedIds: [6, 1, 5],
  },
  {
    id: 5,
    name: "Handbook of PHYSICS Formulae & Tips for Class 12th Board Exam Preparation",
    price: 100,
    oldPrice: 200,
    rating: 0,
    reviews: 0,
    badge: "-50%",
    image: "/images/prod-5.jpg",
    category: "Physics Study Material",
    inStock: false,
    shortDesc: "Comprehensive Physics handbook with all formulae, tips, and tricks for Class 12th Board Exam preparation.",
    description: "J.P. Brar's Handbook of Physics Formulae & Tips for Class 12th Board Exam Preparation (Medical & Non-Medical). This comprehensive handbook covers all chapters of Class 12th Physics with important formulae, tips, and tricks.\n\nHighly useful for last minute revision before board exams. Covers both medical and non-medical streams.\n\n(Physical Book)",
    tags: ["physics", "class 12", "handbook", "board exam", "formulae", "tips"],
    reviewList: [],
    relatedIds: [4, 6, 7],
  },
  {
    id: 6,
    name: "Current Electricity: Formula Sheet (Class 10)",
    price: 20,
    oldPrice: 40,
    rating: 0,
    reviews: 0,
    badge: "-33%",
    image: "/images/prod-6.jpg",
    category: "Physics Study Material",
    inStock: true,
    shortDesc: "Complete Current Electricity formulae sheet with Ohm's law, circuits, and resistance concepts for Class 10th.",
    description: "This hand drawn cheat sheet covers all the basic formulae of electricity in very beautiful colours and pictures. Perfect for quick revision before exams.\n\nTopics Covered:\n1. Ohm's Law\n2. Resistance and Resistivity\n3. Series and Parallel Circuits\n4. Electric Power and Energy\n5. Heating Effect of Electric Current\n6. Electric Circuit Diagrams\n\n(Digital PDF File, 2 Pages)",
    tags: ["physics", "class 10", "electricity", "formulae", "cbse", "notes"],
    reviewList: [],
    relatedIds: [3, 4, 1],
  },
  {
    id: 7,
    name: "Trends: Modern Periodic Table",
    price: 20,
    oldPrice: 30,
    rating: 0,
    reviews: 0,
    badge: "-33%",
    image: "/images/prod-7.jpg",
    category: "Chemistry Study Material",
    inStock: true,
    shortDesc: "Learn Periodic Table trends with this colourful and easy-to-remember chart. Covers all important trends.",
    description: "Trends learning made easy! This colourful periodic table trends chart makes learning fun and easy. Covers all important trends you need to know for your exams.\n\nTopics Covered:\n1. Atomic Radius Trends\n2. Ionic Radius Trends\n3. Ionization Energy Trends\n4. Electron Affinity Trends\n5. Electronegativity Trends\n6. Metallic Character Trends\n7. Reactivity Trends\n8. Special Cases and Exceptions\n\n(Digital PDF File, 1 Page)",
    tags: ["chemistry", "periodic table", "trends", "class 10", "class 11", "cbse", "notes"],
    reviewList: [],
    relatedIds: [2, 5, 8],
  },
  {
    id: 8,
    name: "Coffee Mug (Ionic Bonding: A Love Story)",
    price: 299,
    oldPrice: 400,
    rating: 0,
    reviews: 0,
    badge: "-25%",
    image: "/images/prod-8.jpg",
    category: "Science Inspired Mugs",
    inStock: true,
    shortDesc: "Science Inspired Mugs - Ceramic mug with beautiful Ionic Bonding design. Perfect gift for science lovers!",
    description: "Science Inspired Mugs - Ceramic Coffee Mug with beautiful Ionic Bonding: A Love Story design.\n\nFeatures:\n- High quality ceramic material\n- Microwave and dishwasher safe\n- 350ml capacity\n- Vibrant, long-lasting print\n- Perfect gift for science students and teachers\n\nDesigned by JP Brar. Show your love for science with this beautiful mug!",
    tags: ["mugs", "science inspired", "gifts", "ceramic", "coffee mug"],
    reviewList: [],
    relatedIds: [2, 7, 5],
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
}

export const categories = [
  "All Categories",
  "Physics Study Material",
  "Chemistry Study Material",
  "Biology Study Material",
  "Science Inspired Mugs",
  "Science Toys & Activity Kits",
  "Stickers | Magnets | Pins",
  "Apparel",
  "Posters | Prints",
];

export interface TopCategory {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export const topCategories: TopCategory[] = [
  { id: 1, name: "Physics Study Material", image: "/images/cat-physics-exact.jpg", slug: "physics" },
  { id: 2, name: "Chemistry Study Material", image: "/images/cat-chemistry-exact.jpg", slug: "chemistry" },
  { id: 3, name: "Biology Study Material", image: "/images/cat-biology-exact.jpg", slug: "biology" },
];

export interface ProductCategory {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export const productCategories: ProductCategory[] = [
  { id: 1, name: "Science Inspired Mugs", image: "/images/cat-science-mugs-exact.jpg", slug: "mugs" },
  { id: 2, name: "Inspirational Coffee Mugs", image: "/images/cat-coffee-mugs-exact.jpg", slug: "coffee-mugs" },
  { id: 3, name: "Science Toys & Activity Kits", image: "/images/cat-toys-exact.jpg", slug: "toys" },
  { id: 4, name: "Stickers | Magnets | Pins", image: "/images/cat-stickers-exact.jpg", slug: "stickers" },
  { id: 5, name: "Keychains | Car Hangings", image: "/images/cat-keychains-exact.jpg", slug: "keychains" },
  { id: 6, name: "Plushies | Pillow Covers", image: "/images/cat-plushies-exact.jpg", slug: "plushies" },
  { id: 7, name: "Apparel", image: "/images/cat-apparel-exact.jpg", slug: "apparel" },
  { id: 8, name: "Posters | Prints", image: "/images/cat-posters-exact.jpg", slug: "posters" },
  { id: 9, name: "Acrylic Blocks", image: "/images/cat-acrylic-exact.jpg", slug: "acrylic" },
];

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  readTime?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Hello world!",
    category: "Uncategorized",
    date: "January 25, 2021",
    author: "brarscribblesuser",
    excerpt: "Welcome to Brar Scribbles blog! Stay tuned for exciting science content, study tips, and creative learning resources.",
    image: "/images/author-exact.jpg",
  },
];

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/images/prod-1.jpg", alt: "Projectile Motion Formulae Sheets" },
  { id: 2, src: "/images/prod-2.jpg", alt: "Chemical Reactions Synopsis" },
  { id: 3, src: "/images/prod-3.jpg", alt: "Motion Formulae Sheet" },
  { id: 4, src: "/images/prod-4.jpg", alt: "Electric Charges & Fields" },
  { id: 5, src: "/images/prod-5.jpg", alt: "Physics Handbook" },
  { id: 6, src: "/images/prod-6.jpg", alt: "Current Electricity Formula Sheet" },
  { id: 7, src: "/images/prod-7.jpg", alt: "Modern Periodic Table" },
  { id: 8, src: "/images/prod-8.jpg", alt: "Ionic Bonding Coffee Mug" },
];
