declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.png" {
  const value: string;
  export default value;
}
