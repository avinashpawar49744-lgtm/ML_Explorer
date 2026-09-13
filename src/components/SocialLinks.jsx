import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

const links = [
  { label: 'Instagram', value: '@er.avii_pawar_', href: 'https://instagram.com/er.avii_pawar_', icon: Instagram },
  { label: 'LinkedIn', value: 'pawaravinashh', href: 'https://linkedin.com/in/pawaravinashh', icon: Linkedin },
  { label: 'GitHub', value: 'Avinashpawar497444-lgtm', href: 'https://github.com/Avinashpawar497444-lgtm', icon: Github },
  { label: 'Gmail', value: 'avinas hpawar49744@gmail.com', href: 'mailto:avinashpawar49744@gmail.com', icon: Mail },
];

export default function SocialLinks() {
  return <div className="social-links">{links.map(({ label, value, href, icon: Icon }) => <a key={label} href={href} target={label === 'Gmail' ? undefined : '_blank'} rel="noreferrer" className="social-link"><Icon size={18} /><span><strong>{label}</strong><small>{value}</small></span></a>)}</div>;
}
