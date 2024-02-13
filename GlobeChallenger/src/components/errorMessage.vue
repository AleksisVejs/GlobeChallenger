<template>
    <div v-if="message" class="error-message">
        {{ message }}
    </div>
</template>
  
<script>
export default {
    props: {
        message: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.error-message {
    position: fixed;
    font-size: 20px;
    text-shadow: 0 0 7px #fff;
    background-color: #ff000048;
    border-radius: 25px;
    box-shadow: 0px 0px 50px 0px #ff0000;
    padding: 20px;
    width: 500px;
    z-index: 1;
    border: 4px solid #ff0000;
    bottom: 5%;
}
</style>