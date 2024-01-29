import Link from "next/link";

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <div className="grid place-content-center min-h-20 border-t-2 w-full mt-auto md:min-h-40">
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
