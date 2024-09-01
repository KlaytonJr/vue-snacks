![Cover](https://github.com/KlaytonJr/vue-snacks/blob/main/src/assets/vue-snacks-cover.jpg?raw=true)

# Vue Snacks

Vue Snacks is a toast notification component for Vue.js 3, developed with TypeScript. It offers a simple and flexible way to display temporary "toast" style notifications in your application.

## Demo

Check out the [Demo application](https://vue-snacks.web.app/) to see Vue Snacks in action.

## Installation

First, install the package via npm:

```bash
npm install vue-snacks
```

## Configuration

In the `main.ts` file, import and register the `Vue Snacks` plugin in the main Vue instance:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import VSnacks from 'vue-snacks/dist';

const app = createApp(App);
app.use(VSnacks);
app.mount('#app');
```

## Usage

Inside a Vue component, you can display a notification by calling the `$snack.notify` method:

```ts
import { defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance() as any;

    const showNotification = () => {
      proxy.$snack.notify({
        position: 'top-center',
        type: 'success',
        duration: 3000,
        title: 'Success!',
        message: 'The operation was successfully completed.',
      });
    };

    return { showNotification };
  },
});
```

## Customization

Vue Snacks provides a range of options to tailor notifications to your specific needs. You can adjust the following parameters:

- **`position`**: Controls where the notification appears on the screen. Options include:
  - `'top-left'`: Top left corner
  - `'top-center'`: Top center of the screen
  - `'top-right'`: Top right corner
  - `'bottom-left'`: Bottom left corner
  - `'bottom-center'`: Bottom center of the screen
  - `'bottom-right'`: Bottom right corner

- **`type`**: Defines the visual style of the notification to convey the appropriate message:
  - `'success'`: Green background, used for success messages
  - `'error'`: Red background, used for error messages
  - `'warning'`: Orange background, used for warnings
  - `'info'`: Blue background, used for informational messages
  - `'details'`: Gray background, for detailed or neutral information

- **`duration`**: Sets the length of time (in milliseconds) the notification remains visible. For example, a value of `3000` keeps the notification displayed for 3 seconds before it fades out. If not set, the default duration is used.

- **`title`**: The main headline of the notification. This is typically a brief, attention-grabbing phrase that conveys the core message.

- **`message`**: The detailed text of the notification. This should provide additional context or information related to the title.

By fine-tuning these parameters, you can create a notification system that fits seamlessly with your application's design and user experience.

## Color Documentation

| **Type**   | **Color**  | **Description**            |
|------------|------------|----------------------------|
| `success`  | Green (#4caf50)  | Used for success messages to indicate a positive outcome. |
| `error`    | Red (#f44336)    | Used for error messages to signal a problem or failure.   |
| `warning`  | Yellow (#ff9800) | Used for warning messages to draw attention to potential issues. |
| `info`     | Blue (#2196f3)   | Used for informational messages to provide general updates or notifications. |
| `details`  | Gray (#757575)   | Used for neutral or detailed information that doesn't fall into the other categories. |

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, feel free to open an issue or submit a pull request.

## License

MIT License. See the LICENSE file for more details.
