import Image from 'next/image';

interface Props {
  name: string;
  imageUrl?: string | null;
  size: number;
  className?: string;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export const MentorAvatar = ({ name, imageUrl, size, className = '' }: Props) => {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        width={size}
        height={size}
        className={`shrink-0 rounded-full object-cover ${className}`}
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
