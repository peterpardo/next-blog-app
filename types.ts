export type PostData = {
  id?: number | string;
  title: string;
  description: string;
  content: string;
  publish: boolean;
  image: File | null | string;
};
