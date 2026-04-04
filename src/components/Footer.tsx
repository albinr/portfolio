import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="text-center text-sm text-muted mt-10 py-6">
      <p>© {new Date().getFullYear()} Albin Ryberg — All rights reserved.</p>

      <div className="mt-4 flex justify-center gap-4">
        <a
          href="https://github.com/albinr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub
            size={18}
            className="hover:text-foreground transition-colors"
          />
        </a>
        <a
          href="https://linkedin.com/in/albinryberg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn
            size={18}
            className="hover:text-foreground transition-colors"
          />
        </a>
        <a href="mailto:albin@rybergs.net">
          <Mail size={18} className="hover:text-foreground transition-colors" />
        </a>
      </div>
    </footer>
  );
}
