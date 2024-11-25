import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

const callAPI = async (api) => {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

const getProvinces = async () => {
  try {
    const data = await callAPI(`${host}?depth=1`);
    return data; 
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
    throw error;
  }
};

const getDistrictsByProvinceCode = async (provinceCode) => {
  try {
    const data = await callAPI(`${host}p/${provinceCode}?depth=2`);
    return data.districts; 
  } catch (error) {
    console.error('Lỗi khi lấy danh sách huyện/quận:', error);
    throw error;
  }
};

const getWardsByDistrictCode = async (districtCode) => {
  try {
    const data = await callAPI(`${host}d/${districtCode}?depth=2`);
    return data.wards; 
  } catch (error) {
    console.error('Lỗi khi lấy danh sách xã/phường:', error);
    throw error;
  }
};

export {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
};
