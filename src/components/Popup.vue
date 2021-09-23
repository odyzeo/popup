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
                v-if="showCloseButton"
                class="popup__close"
                @click.prevent="close"
            >
                <slot name="close">
                    <div class="popup__close-default">
                        <!--eslint-disable max-len-->
                        <img
                            src="data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHRpdGxlPjwvdGl0bGU+CjxnIGlkPSJpY29tb29uLWlnbm9yZSI+CjwvZz4KPHBhdGggZmlsbD0iIzAwMCIgZD0iTTUwNy4zMzEgNDExLjMzYy0wLjAwMi0wLjAwMi0wLjAwNC0wLjAwNC0wLjAwNi0wLjAwNWwtMTU1LjMyMi0xNTUuMzI1IDE1NS4zMjItMTU1LjMyNWMwLjAwMi0wLjAwMiAwLjAwNC0wLjAwMyAwLjAwNi0wLjAwNSAxLjY3Mi0xLjY3MyAyLjg4MS0zLjYyNyAzLjY1Ni01LjcwOCAyLjEyMy01LjY4OCAwLjkxMi0xMi4zNDEtMy42NjItMTYuOTE1bC03My4zNzMtNzMuMzczYy00LjU3NC00LjU3My0xMS4yMjUtNS43ODMtMTYuOTE0LTMuNjYtMi4wODAgMC43NzUtNC4wMzUgMS45ODQtNS43MDkgMy42NTUgMCAwLjAwMi0wLjAwMiAwLjAwMy0wLjAwNCAwLjAwNWwtMTU1LjMyNCAxNTUuMzI2LTE1NS4zMjQtMTU1LjMyNWMtMC4wMDItMC4wMDItMC4wMDMtMC4wMDMtMC4wMDUtMC4wMDUtMS42NzMtMS42NzEtMy42MjctMi44OC01LjcwNy0zLjY1NS01LjY5LTIuMTI0LTEyLjM0MS0wLjkxMy0xNi45MTUgMy42NmwtNzMuMzc0IDczLjM3NGMtNC41NzQgNC41NzQtNS43ODQgMTEuMjI2LTMuNjYxIDE2LjkxNCAwLjc3NiAyLjA4MCAxLjk4NSA0LjAzNiAzLjY1NiA1LjcwOCAwLjAwMiAwLjAwMSAwLjAwMyAwLjAwMyAwLjAwNSAwLjAwNWwxNTUuMzI1IDE1NS4zMjQtMTU1LjMyNSAxNTUuMzI2Yy0wLjAwMSAwLjAwMi0wLjAwMyAwLjAwMy0wLjAwNCAwLjAwNS0xLjY3MSAxLjY3My0yLjg4IDMuNjI3LTMuNjU3IDUuNzA3LTIuMTI0IDUuNjg4LTAuOTEzIDEyLjM0MSAzLjY2MSAxNi45MTVsNzMuMzc0IDczLjM3M2M0LjU3NSA0LjU3NCAxMS4yMjYgNS43ODQgMTYuOTE1IDMuNjYxIDIuMDgwLTAuNzc2IDQuMDM1LTEuOTg1IDUuNzA4LTMuNjU2IDAuMDAxLTAuMDAyIDAuMDAzLTAuMDAzIDAuMDA1LTAuMDA1bDE1NS4zMjQtMTU1LjMyNSAxNTUuMzI0IDE1NS4zMjVjMC4wMDIgMC4wMDEgMC4wMDQgMC4wMDMgMC4wMDYgMC4wMDQgMS42NzQgMS42NzIgMy42MjcgMi44ODEgNS43MDcgMy42NTcgNS42ODkgMi4xMjMgMTIuMzQyIDAuOTEzIDE2LjkxNC0zLjY2MWw3My4zNzMtNzMuMzc0YzQuNTc0LTQuNTc0IDUuNzg1LTExLjIyNyAzLjY2Mi0xNi45MTUtMC43NzYtMi4wODAtMS45ODUtNC4wMzQtMy42NTctNS43MDd6Ij48L3BhdGg+Cjwvc3ZnPgo="
                            class="popup__icon-close"
                        >
                        <!--eslint-enable max-len-->
                    </div>
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
    name: 'Popup',

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
        disableClose: {
            type: Boolean,
            default: false,
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
        permanent: {
            type: Boolean,
            default: false,
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
        enableEsc() {
            return this.permanent ? false : !this.disableEsc;
        },
        enableOffClick() {
            return this.permanent ? false : !this.disableOffClick;
        },
        showCloseButton() {
            return this.permanent ? false : !this.disableClose;
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

            if (this.enableOffClick) {
                /**
                 * Need to add listener to end of Call Stack.
                 * this.$nextTick can't be used because it's still in component.
                 */
                setTimeout(() => {
                    document.addEventListener('click', this.offClick);
                });
            }

            if (this.enableEsc) {
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
                    .filter((name) => name !== this.name),
            );

            if (this.type === 'fixed') {
                this.removeBodyStyles();
            }

            if (this.enableOffClick) {
                document.removeEventListener('click', this.offClick);
            }

            if (this.enableEsc) {
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
