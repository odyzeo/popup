<template>
  <div
    class="popup"
    :class="[classType, `popup--${type}`]"
    @click.prevent="close"
    @transitionend="handleClose($event)"
  >
    <div
      class="popup__inner"
      @click.stop
    >
      <div
        class="popup__close"
        @click.prevent="close"
      >
        <slot name="close">
          <span class="icon-cancel"></span>
        </slot>
      </div>

      <slot :close="close"></slot>
    </div>
  </div>
</template>

<script>
import popup from '../plugin/popup';

export default {
  name: 'OdyzeoPopup',

  props: {
    name: {
      required: true,
      type: String,
    },
    type: {
      type: String,
      default: 'fixed',
    },
  },

  data() {
    return {
      isOpen: false,
      scrollTop: null,
    };
  },

  computed: {
    classType() {
      return this.isOpen ? 'popup--open' : '';
    },
  },

  /**
   * Sets global listeners
   */
  beforeMount() {
    popup.event.$on('toggle', this.handleToggleEvent);
  },

  mounted() {
    document.body.appendChild(this.$el);
  },

  beforeDestroy() {
    popup.event.$off('toggle', this.handleToggleEvent);

    this.close();
    this.removePopupFromDOM();
  },

  methods: {
    handleToggleEvent(name, state) {
      if (this.name === name) {
        const nextState = typeof state === 'undefined'
          ? !this.isOpen
          : state;

        this.toggle(nextState);
      }
    },
    toggle(state) {
      if (state) {
        this.open();

        return;
      }

      this.close();
    },
    handleClose(ev) {
      setTimeout(() => {
        const isHidden = ev.propertyName === 'visibility'
          && window.getComputedStyle(this.$el).visibility === 'hidden';

        if (isHidden) {
          this.close();
        }
      });
    },
    escClose(ev) {
      if (ev.keyCode === 27) {
        ev.preventDefault();
        this.close();
      }
    },
    open() {
      this.isOpen = true;
      this.scrollTop = window.pageYOffset || document.body.scrollTop;

      if (this.type === 'fixed') {
        this.addBodyStyles();
      }

      window.addEventListener('keydown', this.escClose);
    },
    close() {
      this.isOpen = false;
      this.$popup.currentPopup = null;

      if (this.type === 'fixed') {
        this.removeBodyStyles();
      }

      window.removeEventListener('keydown', this.escClose);
    },
    removePopupFromDOM() {
      if (document.body.contains(this.$el)) {
        document.body.removeChild(this.$el);
      }
    },
    addBodyStyles() {
      document.body.style.width = `${document.body.clientWidth}px`;
      document.body.classList.add('open-popup');
      document.body.style.top = `-${this.scrollTop}px`;
    },
    removeBodyStyles() {
      document.body.style.top = null;
      document.body.style.width = null;
      document.body.classList.remove('open-popup');
      window.scrollTo(0, this.scrollTop);
    },
  },
};
</script>

<style lang="less">
  @import '../less/popup.less';
</style>
