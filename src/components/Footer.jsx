import './Footer.css';

const FOOTER_LINKS = [
  { label: 'GitHub',  href: 'https://github.com/AngelVEC' },
  { label: 'Email',   href: 'mailto:Gunawanekki@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copy">© 2025 Ekki Gunawan — Built with care</p>
      <ul className="footer-links">
        {FOOTER_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="footer-link" target="_blank" rel="noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
