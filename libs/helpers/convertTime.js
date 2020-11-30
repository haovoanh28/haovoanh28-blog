export default function(time) {
  const createdAt = new Date(time);
  const convertedTime = `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`;

  return convertedTime;
}
