import Popup from '../components/Popup';
import EventBus from './event';

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
        this.componentName = options.componentName || defaultComponentName;

        /**
         * Plugin API
         */
        // eslint-disable-next-line
        Vue.prototype.$popup = {
            show(name) {
                if (typeof name === 'string' && !this.currentPopup) {
                    this.currentPopup = name;
                    EventBus.$emit('toggle', name, true);
                }
            },

            hide(name) {
                EventBus.$emit('toggle', name, false);
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
