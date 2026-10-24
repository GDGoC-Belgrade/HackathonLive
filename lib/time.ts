// "2m ago", "1h ago", "3d ago"
export function timeAgo(date: Date): string {
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// "in 15 mins", "in 3h 20m", "in 2 days", "now"
export function timeUntil(date: Date): string {
  const minutes = Math.ceil((date.getTime() - Date.now()) / 60_000);
  if (minutes <= 0) return 'now';
  if (minutes < 60) return `in ${minutes} mins`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    const rest = minutes % 60;
    return rest === 0 ? `in ${hours}h` : `in ${hours}h ${rest}m`;
  }
  const days = Math.floor(hours / 24);
  return `in ${days} ${days === 1 ? 'day' : 'days'}`;
}

export function formatTime(time: string): string{
    return new Date(time).toLocaleTimeString('en-US',{
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Europe/Belgrade'
    })
  };
