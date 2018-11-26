import axios from 'axios';
import { apiUrl } from 'utils/constants';
import { notification } from 'antd';


export const api = axios.create({
  baseURL: apiUrl.development,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const externalApi = baseURL => axios.create({ baseURL });


export const openNotification = (type, key, message) => {
  notification[type]({
    key,
    duration: 2,
    message,
  });
};
