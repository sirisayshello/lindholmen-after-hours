"use client";
import { useEffect, useState } from "react";

export const Timer = ({ endTime }: { endTime: number | undefined }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return clearInterval(interval);
  }, [endTime]);

  const timeLeft = (endTime ?? now.getTime()) - now.getTime();
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Add leading zeros if necessary
  const formattecHours = ("0" + hours).slice(-2);
  const formattedMinutes = ("0" + minutes).slice(-2);
  const formattedSeconds = ("0" + seconds).slice(-2);

  return (
    <div>
      <span>
        {formattecHours}:{formattedMinutes}:{formattedSeconds}
      </span>
    </div>
  );
};
