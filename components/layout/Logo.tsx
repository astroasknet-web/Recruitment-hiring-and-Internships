import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "",
  width = 112,
  height = 56,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="YugtyJobs"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/yugtyjobs-logo.svg"
        alt="YugtyJobs — Agentic AI"
        width={width}
        height={height}
        priority
        className="h-auto w-auto select-none"
        style={{ maxHeight: height }}
      />
    </Link>
  );
}
