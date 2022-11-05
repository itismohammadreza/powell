export interface ImageItem {
  preview: string;
  alt: string;
  thumbnail?: string;
  caption?: {
    title?: string;
    subtitle?: string
  };
}

export interface BreakPointItem {
  breakpoint: string;
  numVisible: number;
}
