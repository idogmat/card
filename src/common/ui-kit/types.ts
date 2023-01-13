export type SXType = {
  sx?: {
    [key: string]: string;
  };
};

export interface ElementPosition {
  left: string;
  right: string;
  top: string;
  bottom: string;
}

export type StyledComponent<D> = SXType & D;
