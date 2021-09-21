import axios from "axios";
import { createStore, thunk, action, persist } from "easy-peasy";

export default createStore(
  persist({
    api_uri: process.env.REACT_APP_API_URI,
    token: null,
    login: thunk(async (actions, payload, { getState }) => {
      const { api_uri } = getState();
      const { data } = await axios.post(`${api_uri}/user/login`, payload);
      actions.setToken(data.token);
      return data;
    }),
    register: thunk(async (actions, payload, { getState }) => {
      const { api_uri } = getState();
      const { data } = await axios.post(`${api_uri}/user/register`, payload);
      actions.setToken(data.token);
      return data;
    }),
    setToken: action((state, token) => {
      state.token = token;
    }),
  })
);
