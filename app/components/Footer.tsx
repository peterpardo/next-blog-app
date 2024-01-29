import Link from "next/link";

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <div className="grid place-content-center border-t-2 h-40 w-full mt-5">
      <div>
        &copy; {year}{" "}
        <span className="text-green-600">
          Blog App -{" "}
          <Link href="https://peterpardo.dev" target="_blank">
            peterpardo
          </Link>
        </span>
      </div>
    </div>
  );
}
