import Popup from './components/Popup.vue';

const Plugin = {
  install(Vue, options = {}) {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (this.installed) {
      return;
    }

    this.currentPopup = null;
    this.installed = true;
    this.event = new Vue();
    const defaultComponentName = 'Popup';
    this.componentName = options.componentName || defaultComponentName;

    /**
     * Plugin API
     */
    Vue.prototype.$popup = {
      show(modal) {
        if (typeof modal === 'string') {
          this.currentPopup = modal;
          Plugin.event.$emit('toggle', modal, true);
        }
      },

      hide(name) {
        Plugin.event.$emit('toggle', name, false);
      },
    };
    /**
     * Sets custom component name (if provided)
     */
    Vue.component(this.componentName, Popup);
  },
};

export default Plugin;
