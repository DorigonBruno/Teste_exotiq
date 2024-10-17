import React from "react";

interface TimeAgoProps {
  date: Date;
}

const timeAgo = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} segundo${seconds !== 1 ? "s" : ""} atrás`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? "s" : ""} atrás`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hora${hours !== 1 ? "s" : ""} atrás`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} dia${days !== 1 ? "s" : ""} atrás`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} mês${months !== 1 ? "es" : ""} atrás`;
  }

  const years = Math.floor(months / 12);
  return `${years} ano${years !== 1 ? "s" : ""} atrás`;
};

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  return <span>{timeAgo(date)}</span>;
};

export default TimeAgo;
