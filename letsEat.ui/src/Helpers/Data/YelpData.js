import axios from 'axios';

const yelpQuery = (location, term) => new Promise((resolve, reject) => {
  axios
    .get('/.netlify/functions/get-yelp', {
      params: {
        location: `${location}`,
        term: `${term}`,
        limit: 50,
      },
    }).then((response) => {
      resolve(Object.values(response.data.results.jsonBody.businesses));
    })
    .catch((error) => reject(error));
});
// eslint-disable-next-line
export default { yelpQuery };
