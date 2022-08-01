export class ImageItem {
  preview: string;
  thumbnail?: string;
  alt: string;
  caption?: {
    title?: string;
    subtitle?: string
  };
}

export class BreakPointItem {
  breakpoint: string;
  numVisible: number;
}
