# @odyzeo/popup

Simple popup component plugin with global triggers
and renderless logic.

<a href="https://popup-afk4koh96.now.sh" target="_blank">Demo</a>

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
    Example
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
| `inline`            | boolean | `false`       | Append popup inside its original parent                                                                                       |
| `transition`        | string  | `fade`        | Change or remove opening and closing transitions. <br> Available transitions: <br><br> `fade` <br> `slide-top` <br> `slide-right` <br> `slide-bottom` <br> `slide-left` <br> `null` - no transition <br><br> You can even use your own transition name with styles. It will be transpiled to `popup-transition--${transition}` |
| `menu`              | string  | `null`        | Will adjust popup inner container to behave as menu wrapper based on direction. <br> Directions: <br><br> `top` <br> `right` <br> `bottom` <br> `left`|
| `v-model`           | boolean | `false`       | `v-model` property is always automatically synced with <popup> visible state and you can show/hide using v-model |

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

### Import styles
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

#### Hide specific popup - when no param provided hide all current popups
```
this.$popup.hide('name');
```

#### Get currently opened popups names - returns Set
```
this.$popup.currentPopups
```

#### Check if popup is open
```
this.$popup.currentPopups.has('name')
```

## Development

```bash
npm run serve
```

## Publishing
```bash
# Assuming all tested, committed and works like a charm!
npm version {patch|minor|major} # See semantic version
npm run build-lib
npm run publish
git push
git push --tags # Add release on GitHub
```

## Deploy demo with <a href="https://zeit.co" target="_blank">now</a>
```bash
now
```

## TODO
- drag and drop
- tests
