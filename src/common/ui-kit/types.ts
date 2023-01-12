export type SXType = {
  sx?: {
    [key: string]: string;
  };
};

export type StyledComponent<D> = SXType & D;
