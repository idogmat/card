export const validMail = new RegExp(
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/,
  "i"
);

export const acceptableImgFormats = new RegExp(
  // /[^\\s]+/(jpg | jpeg | png | gif | JPG | JPEG | PNG | GIF)$ /,
  /[^\\s]+[/](gif|jpe?g|tiff?|png|webp|bmp)/
);
