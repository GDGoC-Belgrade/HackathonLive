// "2m ago", "1h ago", "3d ago"
export function timeAgo(date: Date): string {
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// "in 15 mins", "now"
export function timeUntil(date: Date): string {
  const minutes = Math.ceil((date.getTime() - Date.now()) / 60_000);
  return minutes > 0 ? `in ${minutes} mins` : 'now';
}

export function formatTime(time: string): string{
    return new Date(time).toLocaleTimeString('en-US',{
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Europe/Belgrade'
    })
  };
