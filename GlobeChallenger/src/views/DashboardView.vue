<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.dashboard {
  position: relative;
  z-index: 1;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dashboard-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashboard-header h1 {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 9px #a3ffb286;
  margin: 0;
}
</style>
