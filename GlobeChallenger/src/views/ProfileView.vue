<template>
  <div v-if="user" class="profile">
    <div class="profile-main-div">
      <div class="profile-header">
        <div class="left-section">
          <h1>{{ user ? user.username : "" }}</h1>
        </div>
        <div class="user-info" v-if="user">
          <p>Email: {{ user.email }}</p>
          <p>Joined: {{ user.createdAt }}</p>
        </div>
        <div class="profile-button">
          <button @click="showScore = true">View Score</button>
        </div>
        <div class="profile-button">
          <button @click="editProfile = true">Edit Profile</button>
        </div>
        <button class="delete-button" @click="confirmDelete">
          Delete Profile
        </button>
      </div>
    </div>
    <ProfileEdit v-if="editProfile" :user="user" @close="editProfile = false" />
    <ViewScore
      v-if="showScore && userScores"
      :scores="userScores"
      @close="showScore = false"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProfileEdit from "@/components/ProfileEdit";
import ViewScore from "@/components/ViewScore";

export default {
  name: "UserInfo",
  components: {
    ProfileEdit,
    ViewScore,
  },
  data() {
    return {
      editProfile: false,
      showScore: false,
    };
  },
  computed: {
    ...mapState(["user", "userScores"]),
  },
  methods: {
    ...mapActions(["deleteUser", "fetchUserScores"]),
    confirmDelete() {
      if (confirm("Are you sure you want to delete your profile?")) {
        this.deleteUser();
      }
    },
  },
  mounted() {
    if (this.user) {
      this.fetchUserScores(this.user.id);
    }
  },
};
</script>

<style scoped>
.profile {
  position: relative;
  color: #f1f1f1;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  z-index: 1;
}

.profile-main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 100px 0px #a3ffb3;
  padding: 60px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.left-section {
  display: flex;
  align-items: center;
}

.left-section h1 {
  color: #ffffff;
  font-size: 2rem;
  text-shadow: 0 0 12px #ffffff;
}

.profile-button button {
  width: 200px;
  height: 40px;
}

.user-info {
  margin-top: 30px;
  margin-bottom: 30px;
}

.user-info p {
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
  font-size: 1rem;
}

.profile-icon {
  color: #a3ffb3;
  filter: drop-shadow(0 0 5px #a3ffb3);
  margin-right: 10px;
}

.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 0.2s ease-out forwards;
}

.delete-button {
  width: 200px;
  height: 40px;
}

.delete-button:hover {
  background-color: #ff0000;
  color: #ffffff;
  border: 1px solid #ff0000;
  box-shadow: 0 0 10px #ff0000;
  cursor: pointer;
  transition: 0.3s;
}

@keyframes slide-in {
  from {
    transform: translateY(-5%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5%);
  }
}

@media (max-width: 768px) {
  .profile-main-div {
    padding: 30px 50px 40px 50px;
    flex-direction: column;
    align-items: center;
  }

  .profile-button {
    margin: 0;
  }

  .user-info {
    margin: 0;
  }
}
</style>
