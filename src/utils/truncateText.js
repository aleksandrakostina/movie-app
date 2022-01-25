export default function truncateText(text, length) {
  const arrText = text.split('');

  if (length >= text.length) {
    return text;
  }

  if (arrText[length] === ' ') {
    return `${text.slice(0, length)} ...`;
  }

  let newLength = length - 1;
  while (arrText[newLength] !== ' ') {
    newLength -= 1;
  }

  return `${text.slice(0, newLength)} ...`;
}
