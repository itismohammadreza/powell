export class ImageItem {
  preview: string;
  alt: string;
  thumbnail?: string;
  caption?: {
    title?: string;
    subtitle?: string
  };
}

export class BreakPointItem {
  breakpoint: string;
  numVisible: number;
}
