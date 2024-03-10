import axios from "axios";
import { eachDayOfInterval } from 'date-fns';


axios.defaults.withCredentials = true;

export const createItem = async (type, parentId, data) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/${type}/new/${parentId}`, data);
};

export const updateItem = async (type, id, data) => {
    return axios.patch(`${import.meta.env.VITE_API_URL}/${type}/update/${id}`, data);
};

export const getItemsWithFilter = async (type, filterObj) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/${type}/getall`, filterObj);
};

export const getItem = async (type, id) => {
    return axios.get(`${import.meta.env.VITE_API_URL}/${type}/${id}`);
};

export const deleteItem = async (type, id) => {
    return axios.delete(`${import.meta.env.VITE_API_URL}/${type}/delete/${id}`, null);
};

export const CreateDateFromMinMax = async (minDate, maxDate, tripId, data) => {
    try {
        const interval = { start: minDate, end: maxDate };
        const allDates = eachDayOfInterval(interval);
        for (const e of allDates) {
            await createItem('day', tripId, {...data, day:e})
        }
    } catch (err) {
        console.log(err.massege);
    }
}

export const findFlights = async (data) => {
    try {
        return axios.post(`http://localhost:8001/trip-planner/getFlight/find`, data);
    } catch (err) {
        console.log(err.massege);
    }
}