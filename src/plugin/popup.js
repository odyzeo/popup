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

        this.installed = true;
        this.componentName = options.componentName || defaultComponentName;

        /**
         * Set global reactive property
         */
        this.currentPopup = new Vue({
            data: {
                getCurrentPopup: null,
            },
        });

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
         * Create getters/setters for reactive properties
         */
        Object.defineProperties(Vue.prototype.$popup, {
            currentPopup: {
                get: () => this.currentPopup.getCurrentPopup,

                set: (value) => {
                    this.currentPopup.getCurrentPopup = value;

                    return this.currentPopup.getCurrentPopup;
                },
            },
        });

        /**
         * Sets custom component name (if provided)
         */
        Vue.component(this.componentName, Popup);
    },
};

export default Plugin;
