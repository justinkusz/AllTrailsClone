export const gain = locations => {
  let total = 0;

  for (i = 0; i < locations.length - 1; i++) {
    const elevation1 = locations[i].coords.altitude;
    const elevation2 = locations[i + 1].coords.altitude;

    const d = elevation2 - elevation1;

    total += d > 0 ? d : 0;
  }

  return total;
};

export const generateStats = locations => {
  const distance = haversine(locations);
  const elevation = gain(locations);
  const time =
    locations[locations.length - 1].timestamp - locations[0].timestamp;

  const date = new Date(Date.now()).toDateString();
  const startTime = new Date(locations[0].timestamp).toLocaleTimeString();
  const endTime = new Date(
    locations[locations.length - 1].timestamp
  ).toLocaleTimeString();

  const stats = {
    date: date,
    startTime: startTime,
    endTime: endTime,
    distance: distance,
    elevation: elevation,
    time: time
  };

  return stats;
};

export const haversine = locations => {
  let distance = 0;
  const R = 6371;

  for (i = 0; i < locations.length - 1; i++) {
    const lat2 = locations[i + 1].coords.latitude;
    const lon2 = locations[i + 1].coords.longitude;

    const lat1 = locations[i].coords.latitude;
    const lon1 = locations[i].coords.longitude;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    distance += d;
  }

  return distance;
};

export const toRad = degrees => {
  return (degrees * Math.PI) / 180;
};
