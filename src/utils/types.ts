export type ProductType = {
  id: string;
  hostname: string;
  link: string;
  handle: string;
  title: string;
  image?: string;
  imageHeight?: string;
  imageWidth?: string;
  alt?: string;
  variants: {
    id: string;
    sku: string;
    title: string;
    price: string;
  }[];
};
