<template>
  <div class="last-country">
    <h1 id="last-country-text">Previous country:</h1>
    <p id="last-country-name">{{ countryName }}</p>
  </div>
</template>

<script>
export default {
  name: "LastCountry",
  props: {
    countryName: String,
  },
};
</script>
<style>
.last-country {
  position: absolute;
  top: 40%;
  left: 75%;
  font-size: 20px;
  text-shadow: 0 0 7px #fff;
  background-color: #20202071;
  border-radius: 10px;
  box-shadow: 0px 0px 50px 0px #ffe600;
  padding: 15px;
  width: 300px;
  z-index: 1;
  border: 4px solid #ffe600;
}

#last-country-text {
  color: #ffe600;
  font-size: 2rem;
  text-shadow: 0 0 9px #ffe600;
}

#last-country-name {
  font-size: 1.5rem;
}
</style>
