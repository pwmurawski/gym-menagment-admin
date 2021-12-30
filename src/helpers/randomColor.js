export default function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  const pastel = `hsl(${hue}, 100%, 70%)`;
  return pastel;
}
