export const encouragementQuotes = [
  "每一天都是一個新的開始，充滿無限可能。",
  "相信自己，你遠比你想像的更強大。",
  "即使步伐緩慢，也絕不停止前進。",
  "困難是化了妝的祝福，勇敢面對它。",
  "你的堅持，終將美好。",
  "微笑是最好的通行證，讓它伴你左右。",
  "小小的改變，也能帶來巨大的不同。",
  "每一次努力，都是在為未來積蓄力量。",
  "別忘了抬頭看看星空，夢想依舊閃耀。",
  "你是獨一無二的，請綻放你的光芒。",
  "保持好奇，世界才會對你展露更多驚喜。",
  "失敗是成功之母，從中學習，然後再試一次。",
  "用感恩的心，迎接每一個美好的瞬間。",
  "分享你的快樂，快樂會加倍。",
  "給自己一點時間，你會找到答案。"
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * encouragementQuotes.length);
  return encouragementQuotes[randomIndex];
};

