<template>
  <div class="flag-game">
    <div class="flag-game-header">
      <h1>Flag Game</h1>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.flag-game {
  position: relative;
  z-index: 1;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flag-game-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flag-game-header h1 {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 9px #a3ffb286;
  margin: 0;
}
</style>
