import Image from 'next/image';

interface Props {
  name: string;
  imageUrl?: string | null;
  size: number;
  className?: string;
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || '?';

// Only absolute http(s) URLs or app-relative paths are rendered, anything else falls back to initials
const isUsableImageUrl = (url: string) => {
  if (url.startsWith('/')) return true;
  try {
    const { protocol } = new URL(url);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
};

export const MentorAvatar = ({ name, imageUrl, size, className = '' }: Props) => {
  const trimmedUrl = imageUrl?.trim();

  if (trimmedUrl && isUsableImageUrl(trimmedUrl)) {
    return (
      <Image
        src={trimmedUrl}
        alt={name}
        width={size}
        height={size}
        unoptimized
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-full bg-gray-100 object-cover ${className}`}
      />
    );
  }

  // Fallback when a mentor has no photo
  return (
    <div
      role="img"
      aria-label={name}
      style={{ width: size, height: size, fontSize: size / 2.5 }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand-green/10 font-semibold text-brand-green ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};