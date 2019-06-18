<template>
    <div
        id="app"
        class="app"
    >
        <div
            class="container"
        >
            <h1>Popups</h1>
            <button
                type="button"
                class="placeholder__button"
                @click.prevent="$popup.show('Popup1')"
            >
                Popup 1
            </button>

            <button
                type="button"
                class="placeholder__button"
                @click.prevent="$popup.show('Popup2')"
            >
                Popup 2
            </button>

            <popup
                name="Popup1"
                type="absolute"
                @close="onClose"
                @show="onShow"
            >
                <template #default="{ ok }">
                    <div class="placeholder">
                        Some kind of content!
                        <br><br>
                        <button
                            class="placeholder__button placeholder__button--primary"
                            type="button"
                            @click.prevent="ok"
                        >
                            Accept
                        </button>

                        <button
                            type="button"
                            class="placeholder__button"
                            @click.prevent="closeSpecificPopup($popup.currentPopup)"
                        >
                            Close
                        </button>
                    </div>
                </template>
            </popup>

            <popup
                name="Popup2"
                @close="onClose"
                @show="onShow"
            >
                <template #default="{ close }">
                    <div class="placeholder">
                        I am the second popup on this instance,
                        pretty cool ey?
                        <br><br>
                        <button
                            type="button"
                            class="placeholder__button"
                            @click.prevent="close"
                        >
                            Close
                        </button>
                    </div>
                </template>
            </popup>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    methods: {
        closeSpecificPopup(name = null) {
            if (name) {
                this.$popup.hide(name);
            }
        },
        onClose(popup) {
            // eslint-disable-next-line no-console
            console.log(`Closed popup ${popup}`);
        },
        onShow(popup) {
            // eslint-disable-next-line no-console
            console.log(`Opened popup ${popup}`);
        },
    },
};
</script>

<style lang="less">
@import '../src/less/app.less';
</style>
