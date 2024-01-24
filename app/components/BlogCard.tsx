import Image from "next/image";

type BlogCard = {
  title: string;
  description: string;
  author: string;
};

export default function BlogCard({ title, description, author }: BlogCard) {
  return (
    <div className="max-w-96 max-h-[400px] mx-auto rounded-lg shadow-lg">
      <Image
        src="/cat_img.jpg"
        alt="cat image"
        width={500}
        height={500}
        className="rounded-t-lg"
      />
      <div className="p-4">
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="text-sm text-gray-500">By Peter Pardo - Jan 19, 2023</p>
        <p className="text-sm mt-2">{description}</p>
      </div>
    </div>
  );
}
