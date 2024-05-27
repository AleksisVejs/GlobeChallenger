import { createStore } from "vuex";
import axios from "axios";

const TOKEN_KEY = "authToken";

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem(TOKEN_KEY) || null,
    errorMsg: null,
    userScores: {},
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
    setUserScores(state, scores) {
      state.userScores = scores;
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

    async fetchUserScores({ commit, state }, userId) {
      const token = state.token;
      if (!token) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/api/scores/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          commit("setUserScores", response.data.scores);
        } else {
          console.error(
            "Failed to fetch user scores. Server returned status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Failed to fetch user scores:", error.message);
      }
    },

    async updateScore({ state }, { gameId, difficultyId, region, score }) {
      if (!state.user) {
        return;
      }
      try {
        console.log("Updating score:", gameId, difficultyId, region, score);
        const response = await axios.post(
          "http://localhost:3000/api/score",
          {
            userId: state.user.id,
            gameId,
            difficultyId,
            region,
            score,
          },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Score updated successfully");
        } else {
          console.error(
            "Failed to update score. Server returned status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Failed to update score:", error.message);
      }
    },

    async updateUser({ state }, userData) {
      try {
        const filteredData = Object.fromEntries(
          Object.entries(userData).filter(([, value]) => value !== "")
        );

        console.log("Filtered data:", filteredData);

        const response = await axios.put(
          "http://localhost:3000/api/user",
          filteredData,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        if (response.status != 200) {
          {
            console.error(
              "Failed to update user. Server returned status:",
              response.status
            );
          }
        }
      } catch (error) {
        console.error("Failed to update user:", error.message);
      }
    },

    async deleteUser({ state }) {
      try {
        const response = await axios.delete("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        if (response.status === 200) {
          window.location.href = "/";
        } else {
          console.error(
            "Failed to delete user. Server returned status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Failed to delete user:", error.message);
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
