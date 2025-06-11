import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import API_ENDPOINT from "../config/api";
const BASE_URL = 'http://localhost:8000';

const API_ENDPOINT = {
    LOGIN: `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/register`,
    USER: `${BASE_URL}/api/auth/user`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    TASK_BASE: `${BASE_URL}/api/tasks`,
    PROF_INFO: `${BASE_URL}/professors`,
    MY_PROF_IDS: `${BASE_URL}/my-prof-list/professor_ids`,
    MY_PROF_INFO: `${BASE_URL}/my-prof-list`,
};


export const fetchProfData = async () => {
    try {
        const response = await axios.get(`${API_ENDPOINT.PROF_INFO}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
};


const initialState = {
    value: 0,
    prof: []
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, () => {
                console.log("incrementAsync.pending");
            })
            .addCase(
                incrementAsync.fulfilled,
                (state, action) => {
                    state.prof = action.payload;
                }
            );
    },
});

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async () => {
        const result = fetchProfData();
        console.log("incrementAsync result:", result);
        return result
    }
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;