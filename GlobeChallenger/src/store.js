import { createStore } from "vuex";
import axios from "axios";

const TOKEN_KEY = "authToken";

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem(TOKEN_KEY) || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          username,
          password,
        });
        const { user, token } = response.data;
        commit("setUser", user);
        commit("setToken", token);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },

    async register({ commit }, { email, username, password }) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/register",
          { email, username, password }
        );
        const { user, token } = response.data;
        commit("setUser", user);
        commit("setToken", token);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },

    async logout({ commit }) {
      try {
        await axios.post("http://localhost:3000/api/logout");
        commit("clearUser");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    async fetchUser({ commit, state }) {
      try {
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit("setUser", response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        commit("clearUser"); // Clear user information in case of error
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});

store.dispatch("fetchUser");

export default store;
