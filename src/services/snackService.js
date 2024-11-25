import api from '../utils/api';


const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token không tồn tại.');
  }
  return token;
};

export const getSnackList = async () => {
  const token = getToken();
  
  try {
    const response = await api.get('/snacks', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("API response: ", response);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đồ ăn kèm:', error.response ? error.response.data : error.message);
    throw error;
  }
};

//tạo mới
export const createSnack = async (snackData) => {
  const token = getToken();

  try {
    const response = await api.post('/snacks', snackData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm mới:', error);
    throw error;
  }
};

// cập nhập,sửa sp
export const updateSnack = async (snackId, updatedData) => {
  const token = getToken(); 

  try {
    const response = await api.put(`/snacks/${snackId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });
    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    throw error;
  }
};


export const getSnackById = async (snackId) => {
  const token = getToken(); 

  try {
    const response = await api.get(`/snacks/${snackId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi laasi thông tin snack:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteSnackById = async (snackId) => {
  const token = getToken(); 

  try {
    const response = await api.delete(`/snacks/${snackId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xoá sản phẩm:', error.response ? error.response.data : error.message);
    throw error;
  }
};