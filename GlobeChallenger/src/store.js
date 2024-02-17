import { createStore } from "vuex";
import axios from "axios";

const TOKEN_KEY = "authToken";

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem(TOKEN_KEY) || null,
    errorMsg: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    },
    setErrorMsg(state, errorMsg) {
      state.errorMsg = errorMsg;
    },
    clearErrorMsg(state) {
      state.errorMsg = null;
    },
  },
  actions: {
    async login({ commit }, { username, password, rememberMe }) {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          username,
          password,
        });
        const { user, token } = response.data;
        commit("setUser", user);
        commit("setToken", token);
        commit("setErrorMsg", "");

        if (rememberMe) {
          localStorage.setItem(TOKEN_KEY, token);
        } else {
          sessionStorage.setItem(TOKEN_KEY, token);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data === "string" &&
          error.response.data === "Invalid username or password."
        ) {
          commit(
            "setErrorMsg",
            "Invalid username or password. Please try again."
          );
        } else {
          commit("setErrorMsg", "Login failed. Please try again later.");
        }
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
        commit("setErrorMsg", "");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data === "string" &&
          error.response.data.includes(
            "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email"
          )
        ) {
          commit(
            "setErrorMsg",
            "This email is already registered. Please use a different email."
          );
        } else if (
          error.response &&
          error.response.data &&
          typeof error.response.data === "string" &&
          error.response.data.includes(
            "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username"
          )
        ) {
          commit(
            "setErrorMsg",
            "This username is already taken. Please use a different username."
          );
        } else {
          commit("setErrorMsg", "Registration failed. Please try again later.");
        }
      }
    },

    async logout({ commit }) {
      try {
        await axios.post("http://localhost:3000/api/logout");
        commit("clearUser");
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    },

    async fetchUser({ commit, state }) {
      let token = state.token;
      if (!token) {
        token =
          localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
      }
      if (!token) {
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        commit("setUser", response.data);
        commit("setToken", token);
      } catch (error) {
        commit("clearUser");
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    errorMsg: (state) => state.errorMsg,
  },
});

store.dispatch("fetchUser");

export default store;
