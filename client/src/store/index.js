import axios from "axios";
import { createStore, thunk, action, persist } from "easy-peasy";

export default createStore(
  persist({
    api_uri: process.env.REACT_APP_API_URI,
    token: null,
    user: {},
    audios: [],
    login: thunk(async (actions, payload, { getState }) => {
      const { api_uri } = getState();
      const { data } = await axios.post(`${api_uri}/user/login`, payload);
      actions.setToken(data.token);
      actions.setUser(data);
      return data;
    }),
    register: thunk(async (actions, payload, { getState }) => {
      const { api_uri } = getState();
      const { data } = await axios.post(`${api_uri}/user/register`, payload);
      actions.setToken(data.token);
      actions.setUser(data);
      return data;
    }),
    getAudioTracks: thunk(async (actions, payload, { getState }) => {
      const { token, api_uri } = getState();
      const { data } = await axios.get(`${api_uri}/audio`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      actions.setAudioTracks(data);
      return data;
    }),
    getTrack: thunk(async (actions, filename, { getState }) => {
      const { token, api_uri } = getState();
      const { data } = await axios.get(`${api_uri}/audio/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    }),
    setToken: action((state, token) => {
      state.token = token;
    }),
    setUser: action((state, user) => {
      state.user = user;
    }),
    setAudioTracks: action((state, payload) => {
      state.audios = payload;
    }),
  })
);
