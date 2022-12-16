import axios from 'axios';

export const fetchUsers = async () => {
  try {
    return await axios.get('http://localhost:3000/user');
  } catch (e) {
    return [];
  }
};

// module.exports = *
