import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/blogs`;

const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newObj, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (id, updateObj, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updateObj, config);
  return response.data;
};

const remove = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, remove };
