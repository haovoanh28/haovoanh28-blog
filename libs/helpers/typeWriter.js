export default function(text, element) {
  let i = 0;
  const typeWriter = () => {
    if (i < text.length && element) {
      element.innerHTML += text.charAt(i);
      i++;
    }

    setTimeout(typeWriter, 50);
  };

  typeWriter();
}
