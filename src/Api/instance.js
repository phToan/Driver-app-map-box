import axios from 'axios';
export const BASE_URL = 'http://localhost:3306';
const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK';

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
});

export const instanceGeocode = axios.create({
    baseURL: `https://rsapi.goong.io/Geocode?api_key=uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK&latlng=`,
    timeout: 10000,
});

export const instanceCoord = axios.create({
    baseURL: `https://rsapi.goong.io/geocode?api_key=${API_KEY}&address=`,
    timeout: 10000,
});

export const instanceDirection = axios.create({
    baseURL: `https://rsapi.goong.io/Direction?api_key=${API_KEY}&vehicle=bike&`,
    timeout: 10000,
});

export const instanceAutoComplete = axios.create({
    baseURL: `https://rsapi.goong.io/Place/AutoComplete?api_key=${API_KEY}&input=`,
    timeout: 10000,
});
