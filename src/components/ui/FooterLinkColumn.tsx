import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
}

export function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4 capitalize">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
