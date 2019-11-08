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
        this.currentPopups = new Vue({
            data: {
                getCurrentPopups: new Set(),
            },
        });

        /**
         * Plugin API
         */
        // eslint-disable-next-line
        Vue.prototype.$popup = {
            show(name) {
                if (typeof name === 'string') {
                    this.currentPopups.add(name);
                    EventBus.$emit('toggle', name, true);
                }
            },

            /**
             * Close all popups when no params
             * else just requested.
             */
            hide(name = null) {
                if (name == null) {
                    this.currentPopups.forEach((current) => {
                        EventBus.$emit('toggle', current, false);
                    });
                    this.currentPopups = new Set();
                } else {
                    EventBus.$emit('toggle', name, false);
                    this.currentPopups = new Set(
                        [...this.currentPopups]
                            .filter(current => current !== name),
                    );
                }
            },
        };

        /**
         * Create getters/setters for reactive properties
         */
        Object.defineProperties(Vue.prototype.$popup, {
            currentPopups: {
                get: () => this.currentPopups.getCurrentPopups,

                set: (popups) => {
                    this.currentPopups.getCurrentPopups = popups;

                    return this.currentPopups.getCurrentPopups;
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
