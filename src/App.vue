<template>
    <div
        id="app"
        class="app"
    >
        <div class="container">
            <h1>Popup</h1>

            <div>

                <label>
                    <input
                        v-model="disableEsc"
                        type="checkbox"
                    > disable-esc
                </label>

                <br><br>

                <label>
                    <input
                        v-model="disableOffClick"
                        type="checkbox"
                    > disable-off-click
                </label>

                <br><br>

                <label>
                    <input
                        v-model="inline"
                        type="checkbox"
                    > inline
                </label>

                <br><br>

                <label>
                    Popup type: <br>
                    <select v-model="type">
                        <option
                            value="fixed"
                            selected
                        >
                            Fixed
                        </option>
                        <option value="absolute">
                            Absolute
                        </option>
                    </select>
                </label>

                <br><br>

                <label>
                    Menu options: <br>
                    <select v-model="menu">
                        <option
                            value="null"
                            selected
                        >No menu
                        </option>
                        <option value="top">Top</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="bottom">bottom</option>
                    </select>
                </label>

                <br><br>

                <label>
                    Transitions: <br>
                    <select v-model="transition">
                        <option
                            value="null"
                            selected
                        >No transition
                        </option>
                        <option value="slide-top">Slide top</option>
                        <option value="slide-left">Slide left</option>
                        <option value="slide-right">Slide right</option>
                        <option value="slide-bottom">Slide bottom</option>
                        <option value="fade">Fade</option>
                    </select>
                </label>

                <br><br>

                <button
                    class="placeholder__button"
                    @click.prevent="toggle = !toggle"
                >
                    Toggle basic popup with v-model: {{ toggle ? 'open' : 'closed' }}
                </button>

                <br><br>

                Current popup: {{ currentPopups }}

                <br><br>
            </div>

            <button
                type="button"
                class="placeholder__button"
                @click.prevent="$popup.show('adjustable')"
            >
                Popup with adjustable controls
            </button>

            <hr>

            <button
                type="button"
                class="placeholder__button"
                @click.prevent="$popup.show('basic')"
            >
                Basic
            </button>

            <popup
                :disable-off-click="disableOffClick"
                :disable-esc="disableEsc"
                :type="type"
                :transition="transition"
                :menu="menu"
                :inline="inline"
                name="adjustable"
            >
                <template #default="{ ok }">
                    <div class="placeholder">
                        Some kind of content!
                        <br><br>
                        <button
                            class="placeholder__button placeholder__button--primary"
                            type="button"
                            @click.prevent="$popup.show('basic')"
                        >
                            one more basic popup please
                        </button>
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
                            @click.prevent="$popup.hide('adjustable')"
                        >
                            Close
                        </button>
                    </div>
                </template>
            </popup>

            <popup
                v-model="toggle"
                name="basic"
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
                            Close this
                        </button>
                        <button
                            type="button"
                            class="placeholder__button"
                            @click.prevent="$popup.hide('adjustable')"
                        >
                            Close adjustable
                        </button>
                        <button
                            type="button"
                            class="placeholder__button"
                            @click.prevent="$popup.hide(null)"
                        >
                            Hide all
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
    data() {
        return {
            toggle: false,
            menu: null,
            transition: null,
            type: 'fixed',
            disableEsc: false,
            disableOffClick: false,
            dynamic: false,
            inline: false,
        };
    },
    computed: {
        currentPopups() {
            return [...this.$popup.currentPopups];
        },
    },
};
</script>

<style lang="less">
    @import '../src/less/app.less';
</style>
