import api from '../utils/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token không tồn tại.');
  }
  return token;
};

export const getUserList = async () => {
  const token = getToken(); 

  try {
    const response = await api.get('/users/all', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteUserById = async (userId) => {
  const token = getToken(); 

  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xoá người dùng:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getUserById = async (userId) => {
  const token = getToken(); 

  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi laasi thông tin người dùng:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createUser = async (userData) => {
  const token = getToken();

  console.log("User data being sent:", userData);

  try {
    const response = await api.post('/users/create', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    throw error;
  }
};



export const updateUser = async (userId, updatedData) => {
  const token = getToken(); 

  try {
    const response = await api.put(`/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật người dùng:', error);
    throw error;
  }
};
