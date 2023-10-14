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
  position: fixed;
  top: 50%;
  right: 5%;
  transform: translate(0, -50%);
  font-size: 20px;
  text-shadow: 0 0 7px #fff;
  background-color: #20202071;
  border-radius: 25px;
  box-shadow: 0px 0px 50px 0px #ffe600;
  padding: 30px;
  width: 300px;
  z-index: 1;
  border: 4px solid #ffe600;
}

#last-country-text {
  color: #ffe600;
  font-size: 1.9rem;
  text-shadow: 0 0 9px #ffe600;
}

#last-country-name {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .last-country {
    top: 90%;
    right: 50%;
    transform: translate(50%, -50%);
    width: 200px;
    height: auto;
    padding: 5px;
  }

  #last-country-text {
    font-size: 1rem;
  }

  #last-country-name {
    font-size: 0.8rem;
  }
}
</style>
