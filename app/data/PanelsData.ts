interface PanelData {
  name: string;
  description: string;
  image: string;
  // Aggiungi altri campi se necessario
}

export const panelsData: Record<string, PanelData> = {
  statue: {
    name: "Minerva Statue",
    description:
      "Minerva watches over Pavia with wisdom, arts, and a bit of intimidation. Just one thing's worth to know: if you're a student DON'T LOOK IN HER EYES! Legend says you wont ever graduate! Seriously.",
    image: "/images/minerva.jpg",
  },
  pavia: {
    name: "Welcome to Pavia",
    description:
      "My portfolio is a part of me, and I am a part of Pavia. This is my city, so take a tour, explore the map, and discover a little about me along the way. I keep on working on this map and I'll keep updated my portfolio, so you'll find something new every time you'll came along.",
    image: "/images/pavia_city.webp",
  },
  university: {
    name: "University Nave",
    description:
      "The 'Nave' - literally 'The Ship'- Here's where I shed countless tears as an engineering student. At least one thing’s for sure: this ship won’t sink because of an iceberg!",
    image: "/images/uni_nave.jpg",
  },
  bridge: {
    name: "Ponte Coperto -Old Bridge-",
    description:
      "Pavia’s most iconic landmark, rebuilt in 1951 after WWII gave the old one a rough time. It’s the perfect spot to catch a spring sunset… or finally make your move with a girl! London bridge who?",
    image: "/images/ponte_coperto.jpeg",
  },
  post_office: {
    name: "Pavia Central Post Office",
    description:
      "Built in 1932, this post office is all about bold symmetry, big windows, and enough travertine to make ancient Romans jealous. Not much to say it is what it is...a post office...as boring as it sounds.",
    image: "/images/poste.jpg",
  },
};
