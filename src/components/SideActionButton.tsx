import Link from 'next/link';
import { SideActionIcon, SideActionStyle } from '@/types';

interface SideActionButtonProps {
  icon: SideActionIcon;
  label: string;
  href: string;
  style?: SideActionStyle;
}

const iconMap: Record<SideActionIcon, string> = {
  map: '🗺️',
  steering: '🎮',
  wrench: '🔧',
  phone: '📞',
  whatsapp: '💬',
  percent: '📊',
  custom: '⚙️'
};

export default function SideActionButton({ 
  icon, 
  label, 
  href, 
  style = 'solid' 
}: SideActionButtonProps) {
  const iconEmoji = iconMap[icon] || '⚙️';
  
  const baseClasses = 'inline-flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all hover:scale-105';
  
  const styleClasses = style === 'outline' 
    ? 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
    : 'bg-white text-blue-600 hover:bg-blue-50';

  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${styleClasses}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="text-lg">{iconEmoji}</span>
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${styleClasses}`}>
      <span className="text-lg">{iconEmoji}</span>
      <span>{label}</span>
    </Link>
  );
}
