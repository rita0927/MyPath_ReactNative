import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ngrok_api = process.env.NGROK_API
const instance = axios.create({
  baseURL: ngrok_api
  // baseURL: 'http://localhost:3000'
})

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;