// export const isInViewport = (element: HTMLElement) => {
//   const cords = element.getBoundingClientRect();
//   return (
//     cords.bottom <=
//     (window.innerHeight || document.documentElement.clientHeight)
//   );
// };

export const viewportOffset = (element: HTMLElement) => {
  if (!element) return;
  const cords = element.getBoundingClientRect();
  return window.innerHeight - cords.bottom;
};
