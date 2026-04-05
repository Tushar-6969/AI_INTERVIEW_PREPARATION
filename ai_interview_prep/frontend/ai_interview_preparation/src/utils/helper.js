export const validateEmail = (Email) => {
  // ✅ FIXED: Proper regex without extra escaping
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(Email);
};

export const getInitials = (name = "") => {
  if (!name || typeof name !== 'string') return "UN";
  
  const words = name.trim().split(" ");
  
  if (words.length === 0) return "UN";
  
  // Get first letter of first word + first letter of last word
  const firstInitial = words[0][0]?.toUpperCase() || "U";
  const lastInitial = words[words.length - 1][0]?.toUpperCase() || "N";
  
  return firstInitial + lastInitial;
};
