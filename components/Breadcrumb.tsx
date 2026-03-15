import Link from "next/link";
import { ChevronRight, Chrome as Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-white pt-16">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-stone-500">
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-brand-blue transition-colors"
            >
              <Home size={12} />
              Startseite
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-stone-300" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-blue transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-stone-800 truncate max-w-[200px]">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
