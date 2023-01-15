export const lockPadding = () => {
  const paddingValue = window.innerWidth - document.body.offsetWidth;

  document.body.style.paddingRight = `${paddingValue}px`;
};

export const unlockPadding = () => {
  document.body.style.paddingRight = `0px`;
};
