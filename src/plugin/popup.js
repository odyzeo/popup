import Popup from '../components/Popup';
import EventBus from './event';

const Plugin = {
    install(Vue, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (Vue.prototype.$popup) {
            return;
        }

        const defaultComponentName = 'Popup';
        this.componentName = options.componentName || defaultComponentName;

        /**
         * Set global reactive property
         */
        let currentPopups = new Set();
        Vue.prototype.$popup = Vue.observable({ currentPopups: [] });

        /**
         * Plugin API
         */
        Object.defineProperties(Vue.prototype.$popup, {
            show: {
                value: (name) => {
                    if (typeof name === 'string') {
                        Vue.prototype.$popup.currentPopups = [...currentPopups.add(name)];

                        EventBus.$emit('toggle', name, true);
                    }
                },
            },
            hide: {
                value: (name = null) => {
                    if (name == null) {
                        Vue.prototype.$popup.currentPopups.forEach((current) => {
                            EventBus.$emit('toggle', current, false);
                        });
                        currentPopups = new Set();

                        Vue.prototype.$popup.currentPopups = [...currentPopups];
                    } else {
                        currentPopups.delete(name);
                        EventBus.$emit('toggle', name, false);
                        Vue.prototype.$popup.currentPopups = [...currentPopups];
                    }
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
