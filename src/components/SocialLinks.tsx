import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const socials = [
  { name: "GitHub", href: "https://github.com/albinr", icon: FaGithub },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/albin-ryberg",
    icon: FaLinkedinIn,
  },
  { name: "Email", href: "mailto:albin@rybergs.net", icon: Mail },
];

export default function SocialLinks() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-4">
      {socials.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="p-2 rounded-full bg-foreground shadow-md hover:shadow-xl transition hover:scale-110"
        >
          <Icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
}
