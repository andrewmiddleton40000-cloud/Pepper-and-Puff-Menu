import { useEffect, useState } from 'react';

function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-NG', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

export default function TimeZoneClock({
  timeZone = 'Africa/Lagos',
}: {
  timeZone?: string;
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-3 right-3 z-50 rounded bg-gray-900/80 px-3 py-1.5 text-xs font-medium text-white shadow">
      {formatTime(now, timeZone)}
    </div>
  );
}
