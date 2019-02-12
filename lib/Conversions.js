export const msToTimeString = duration => {
  const seconds = Math.floor(duration / 1000) % 60;
  const minutes = Math.floor(duration / (1000 * 60)) % 60;
  const hours = Math.floor(duration / (1000 * 60 * 60)) % 24;
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  const D = days > 0 ? days + " days " : "";
  const H = hours > 0 ? hours + " hr " : "";
  const M = minutes > 0 ? minutes + " min " : "";
  const S = seconds > 0 ? seconds + " sec" : "";

  return D + H + M + S;
};

export const mToDistanceString = distance => {
  if (distance > 1000) {
    return Number.parseFloat(distance).toPrecision(2) + " km";
  } else {
    return Number.parseFloat(distance).toPrecision(2) + " m";
  }
};
