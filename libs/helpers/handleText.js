export default function handleText(text, base) {
  if (text.split(" ").length > base) {
    return (
      text
        .split(" ")
        .slice(0, base)
        .join(" ") + " ..."
    );
  }

  return text;
}
