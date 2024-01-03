import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/users`;

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default { getUsers };
