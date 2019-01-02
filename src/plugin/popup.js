import Popup from '../components/Popup.vue';

const Plugin = {
  install(Vue, options = {}) {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (this.installed) {
      return;
    }

    const defaultComponentName = 'Popup';

    this.currentPopup = null;
    this.installed = true;
    this.event = new Vue();
    this.componentName = options.componentName || defaultComponentName;

    /**
     * Plugin API
     */
    Vue.prototype.$popup = {
      show(name) {
        if (typeof name === 'string' && !this.currentPopup) {
          this.currentPopup = name;
          Plugin.event.$emit('toggle', name, true);
        }
      },

      hide(name) {
        Plugin.event.$emit('toggle', name, false);

        this.currentPopup = null;
      },
    };
    /**
     * Sets custom component name (if provided)
     */
    Vue.component(this.componentName, Popup);
  },
};

export default Plugin;
