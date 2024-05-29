import { faStarHalf, faStar } from "@fortawesome/free-solid-svg-icons";

function replaceMongoIdFromArray(array) {
  return array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);
}

function replaceMongoIdFromObj(obj) {
  const { _id, ...rest } = { id: obj._id.toString(), ...obj };
  return rest;
}

function renderRatingStars(rating) {
  // Enforce valid rating range (0 to 5)
  rating = Math.max(0, Math.min(5, rating));

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Calculate the remaining decimal part for half star
  const decimalPart = rating - fullStars;

  // Create an empty array to store JSX elements for stars
  const stars = [];

  // Render full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(faStar);
  }

  // Render half star if needed
  if (decimalPart >= 0.5) {
    stars.push(faStarHalf);
  }

  return stars;
}

async function getRandomImageUrl(url) {
  const response = await fetch(url, { cache: "no-store" });
  const imageUrl = response.url;
  return imageUrl;
}

function setCookie(cookieName, cookieValue) {
  // Set expiration details (optional)
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // Expires in 24 hours
  // Construct the cookie string
  document.cookie = `${cookieName}=${cookieValue}; expires=${expires.toUTCString()}; path=/`;
}

export {
  replaceMongoIdFromArray,
  replaceMongoIdFromObj,
  renderRatingStars,
  getRandomImageUrl,
  setCookie,
};
