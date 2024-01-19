import Image from "next/image";

export default function BlogCard() {
  return (
    <div className="w-96 h-[400px] rounded-lg shadow-lg">
      <Image
        src="/cat_img.jpg"
        alt="cat image"
        width={500}
        height={500}
        className="rounded-t-lg"
      />
      <div className="p-4">
        {/* title */}
        <h1 className="font-bold text-lg">How to train your cat.</h1>
        <p className="text-sm text-gray-500">By Peter Pardo - Jan 19, 2023</p>
        <p className="text-sm mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          eius quo adipisci numquam ab quidem.
        </p>
      </div>
    </div>
  );
}
