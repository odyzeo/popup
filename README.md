# @odyzeo/popup

Simple popup component plugin with global triggers
and renderless logic.

## Installation

## Usage
```
import Popup from '@odyzeo/popup';

Vue.use(Popup);
```

In your template:
```
<button
    type="button"
    @click.prevent="$popup.show('example')"
>
    Popup 1
</button>
```

Anywhere else in your project:
```
<popup name="example">
    <template #default="{ close, ok }">
        <div class="placeholder">
            Some kind of content!
            <br><br>
            <button
                type="button"
                @click.prevent="ok"
            >
                Accept
            </button>
            <button
                type="button"
                @click.prevent="close"
            >
                Close
            </button>
        </div>
    </template>
</popup>
```

### Props
| Property name       | Type    | Default value | Description                                                                                                                   |
| ------------------- | ------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `name`              | string  |               | Set global selector for your popup                                                                                            |
| `type`              | string  | `fixed`       | Change behaviour inside document: <br><br> `fixed` - prevents document scrolling, <br> `absolute` - enable document scrolling |
| `disable-esc`       | boolean | `false`       | Disable closing popup on 'Esc' key                                                                                            |
| `disable-off-click` | boolean | `false`       | Disable closing popup on click outside the popup                                                                              | 

### Scope props
| Event name | Description                                 |
| ---------- | ------------------------------------------- |
| `close`    | Closes popup with emitting event 'close'    |
| `ok`       | Closes popup without emitting event 'close' |

### Events
| Event   | Arguments                          | Description                        |
| ------- | ---------------------------------- | ---------------------------------- |
| `close` | `popupName` - Name of closed popup | Event emitted when popup is closed |
| `show`  | `popupName` - Name of opened popup | Event emitted when popup is opened |

### Globally declared close method
```
<script>
import '@odyzeo/popup/dist/popup.css';

export default {
    name: 'App',
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

```bash
npm run serve
```

or

```bash
yarn serve
```

# TODO
- drag
- dynamic creation of modal
- customizable options
- prop-like trigger
- add tests
