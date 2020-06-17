import Vue from "vue";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";

Vue.config.productionTip = false;

const routes = {
  "/": App,
  "/home": HelloWorld
};

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || { template: "" };
    }
  },
  render(h) {
    return h(this.ViewComponent);
  }
}).$mount("#app");
