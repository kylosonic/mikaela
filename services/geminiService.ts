// Replaced Gemini service with static content as requested

export const generateRomanticPoem = async (): Promise<string> => {
  // Simulate a brief "thinking" delay for effect to keep the UX feeling magical
  await new Promise(resolve => setTimeout(resolve, 2000));

  const poems = [
    "Roses are red, violets are blue, Mikaela, I'm so happy I'm going out with you! 💖",
    "Mikaela, you make every day brighter just by being in it. ✨",
    "Every moment with you is a treasure. Can't wait for our date!",
    "You bring so much joy to my life. Here's to new memories together! 🥂",
    "Life is a beautiful journey, and I'm so glad to share a part of it with you.",
    "My heart does a little dance every time I think of you, Mikaela."
  ];

  return poems[Math.floor(Math.random() * poems.length)];
};