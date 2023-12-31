import { createApp } from "vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import App from "./App.vue";
import store from "./store";

library.add(fas, fab, far);

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
