const refactorTime = value => {
  if (value.toString().length === 1) {
    return `0${value}`;
  } else {
    return value;
  }
};

export default function(time) {
  const createdAt = new Date(time);
  const convertedTime = `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}  ${refactorTime(
    createdAt.getHours()
  )}:${refactorTime(createdAt.getMinutes())}`;

  return convertedTime;
}
