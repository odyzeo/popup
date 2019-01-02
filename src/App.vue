<template>
  <div
    id="app"
    class="app">
    <div
      class="container"
    >
      <h1>Popups</h1>
      <button
        type="button"
        class="placeholder__button"
        @click.prevent="$popup.show('Popup1')"
      >Popup 1
      </button>

      <button
        type="button"
        class="placeholder__button"
        @click.prevent="$popup.show('Popup2')"
      >Popup 2
      </button>

      <popup
        name="Popup1"
      >
        <template slot-scope="scope">
          <div class="placeholder">
            Some kind of content!
            <br><br>
            <button
              class="placeholder__button placeholder__button--primary"
              type="button"
            >Accept
            </button>

            <button
              type="button"
              class="placeholder__button"
              @click.prevent="closeSpecificPopup($popup.currentPopup)"
            >Close
            </button>
          </div>
        </template>
      </popup>

      <popup
        name="Popup2"
      >
        <template slot-scope="scope">
          <div class="placeholder">
            I am the second popup on this instance,
            pretty cool ey?
            <br><br>
            <button
              type="button"
              class="placeholder__button"
              @click.prevent="scope.close"
            >Close
            </button>
          </div>
        </template>
      </popup>

      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
      <br><br><br><br><br><br> <h2>Jozef</h2>
    </div>
  </div>
</template>

<script>
import Popup from './components/Popup.vue';

export default {
  name: 'App',
  components: {
    Popup,
  },
  methods: {
    closeSpecificPopup(name = null) {
      if (name) {
        this.$popup.hide(name);
      }
    },
  },
};
</script>

<style lang="less">
  @import '../src/less/app.less';
</style>
