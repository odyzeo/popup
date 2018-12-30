# @odyzeo/popup

Simple popup component plugin with global triggers
and renderless logic.

## Installation

## Usage
```
  import Plugin from './plugin';
  
  Vue.use(Plugin);
```

```
<template>
  <div>
      <button
        type="button"         
        @click.prevent="$popup.show('Popup1')"
      >Popup 1
      </button>
        
      <popup
        name="Popup1"
      >
        <template slot-scope="scope">
          <div class="placeholder">
            Some kind of content!
            <br><br>
            <button              
              type="button"
            >Accept
            </button>

            <button
              type="button"              
              @click.prevent="closeSpecificPopup($popup.currentPopup)"
            >Close
            </button>
          </div>
        </template>
      </popup>
  </div>
</template>
```

### Globally declared close method
```
<script>
import Popup from './components/Popup.vue';

export default {
  name: 'App',
  components: {
    Popup,
  },
  methods: {
    closeSpecificPopup(name = null) {
      if (name) {
        this.$popup.hide(name);
      }
    },
  },
};
</script>
```

## Methods
Methods can be invoked globally via plugin command:

#### Show specific popup
```
this.$popup.show('name');
```

#### Hide specific popup
```
this.$popup.hide('name');
```

#### Get currently opened popup name
```
this.$popup.currentPopup
```

## Development

```
npm run serve
```

or

```bash
yarn serve
```

# TODO
- proper readme
- npm package support
- drag n drop
- dynamic creation of modal
- customizable options
- prop-like trigger
