<template>
    <div
        :class="[
            classType,
            `popup--${type}`,
            transition && `popup-transition-${transition}`,
            menu && `popup-menu popup-menu--${menu}`,
        ]"
        class="popup"
    >
        <div
            ref="inner"
            class="popup__inner"
        >
            <div
                class="popup__close"
                @click.prevent="close"
            >
                <slot name="close">
                    <span class="icon-cancel"></span>
                </slot>
            </div>

            <slot
                :close="close"
                :ok="ok"
            ></slot>
        </div>
    </div>
</template>

<script>
import EventBus from '../plugin/event';

export default {
    name: 'OdyzeoPopup',

    props: {
        value: {
            type: Boolean,
            default: false,
        },
        name: {
            required: true,
            type: String,
        },
        type: {
            type: String,
            default: 'fixed',
        },
        disableOffClick: {
            type: Boolean,
            default: false,
        },
        disableEsc: {
            type: Boolean,
            default: false,
        },
        menu: {
            type: String,
            default: null,
        },
        transition: {
            type: String,
            default: 'fade',
        },
        inline: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isOpen: false,
            scrollTop: null,
            originalParent: null,
        };
    },

    computed: {
        classType() {
            return this.isOpen ? 'popup--open' : '';
        },
    },

    watch: {
        value(n) {
            this.toggle(n);
        },
        inline(n) {
            if (n) {
                this.appendToParent();
            } else {
                this.appendToBody();
            }
        },
    },
    /**
     * Sets global listeners
     */
    beforeMount() {
        EventBus.$on('toggle', this.handleToggleEvent);
    },

    mounted() {
        this.originalParent = this.$el.parentNode;

        if (!this.inline) {
            this.appendToBody();
        }

        if (this.value) {
            this.toggle(true);
        }
    },

    beforeDestroy() {
        EventBus.$off('toggle', this.handleToggleEvent);

        if (this.isOpen) {
            this.close();
        }
        this.removePopupFromDOM();
    },

    methods: {
        appendToParent() {
            this.originalParent.appendChild(this.$el);
        },
        appendToBody() {
            document.body.appendChild(this.$el);
        },
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
                this.show();
                return;
            }

            this.close();
        },
        escClose(ev) {
            if (ev.keyCode === 27) {
                ev.preventDefault();
                this.close();
            }
        },
        show() {
            this.isOpen = true;
            this.scrollTop = window.pageYOffset || document.body.scrollTop;

            if (this.type === 'fixed') {
                this.addBodyStyles();
            }

            if (!this.disableOffClick) {
                /**
                 * Need to add listener to end of Call Stack.
                 * this.$nextTick can't be used because it's still in component.
                 */
                setTimeout(() => {
                    document.addEventListener('click', this.offClick);
                });
            }

            if (!this.disableEsc) {
                window.addEventListener('keydown', this.escClose);
            }

            this.$popup.currentPopups = new Set(
                [...this.$popup.currentPopups, this.name],
            );

            this.$emit('show', this.name);
            this.$emit('input', true);
        },
        ok() {
            this.closePopup();
        },
        close() {
            this.closePopup();
            this.$emit('close', this.name);
        },
        closePopup() {
            this.isOpen = false;
            this.$popup.currentPopups = new Set(
                [...this.$popup.currentPopups]
                    .filter(name => name !== this.name),
            );

            if (this.type === 'fixed') {
                this.removeBodyStyles();
            }

            if (!this.disableOffClick) {
                document.removeEventListener('click', this.offClick);
            }

            if (!this.disableEsc) {
                window.removeEventListener('keydown', this.escClose);
            }

            this.$emit('input', false);
        },
        removePopupFromDOM() {
            if (document.body.contains(this.$el)) {
                if (this.inline) {
                    this.originalParent.removeChild(this.$el);
                } else {
                    document.body.removeChild(this.$el);
                }
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
        offClick(ev) {
            if (!this.$refs.inner.contains(ev.target)) {
                this.close();
            }
        },
    },
};
</script>

<style lang="less">
@import '../less/popup.less';
</style>
