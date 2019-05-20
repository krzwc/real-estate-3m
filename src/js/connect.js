import axios from "axios";
import endpoint from "./utils/endpoint";

const connect = async () => {
  let locations = []
  try {
    await axios
      .get(endpoint)
      .then(response => {
        locations.push(...response.data);
        return locations;
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
  return locations
};

export default connect;
