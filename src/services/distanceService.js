export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;

  const toRadians = (value) => (value * Math.PI) / 180;

  const latDistance = toRadians(lat2 - lat1);

  const lonDistance = toRadians(lon2 - lon1);

  const a =
    Math.sin(latDistance / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(lonDistance / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};
