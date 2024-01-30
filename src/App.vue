<template>
  <div id="app">
    <form @submit.prevent="showNotification" class="notification-form">
      <div class="form-column">
        <label for="type">Type:</label>
        <select v-model="notification.type" id="type">
          <option value="success">Success</option>
          <option value="error">Error</option>
          <option value="warning">Warn</option>
          <option value="info">Info</option>
        </select>

        <label for="position">Position:</label>
        <select v-model="notification.position" id="position">
          <option value="top-left">Top Left</option>
          <option value="top-center">Top Center</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-center">Bottom Center</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
        
        <label for="duration">Duration:</label>
        <input v-model="notification.duration" type="number" id="duration" />
      </div>

      <div class="form-column">
        <label for="title">Title:</label>
        <input v-model="notification.title" type="text" id="title" />

        <label for="message">Message:</label>
        <input v-model="notification.message" type="text" id="message" />
        
        <label for="icon">Icon:</label>
        <input v-model="notification.icon" type="text" id="icon" />

        <button type="submit">Show Notification</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notification: {
        type: "success",
        position: "bottom-center",
        duration: 5000,
        title: "Sucesso!",
        message: "Esta é uma mensagem de sucesso.",
        icon: "",
      },
    };
  },
  methods: {
    showNotification() {
      this.$snack.notify({
        position: this.notification.position,
        type: this.notification.type,
        duration: this.notification.duration,
        title: this.notification.title,
        message: this.notification.message,
        icon: this.notification.icon,
      });
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

.notification-form {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 20px;
  margin: auto;
  padding: 20px 40px 20px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-column {
  display: flex;
  flex-direction: column;
}

label {
  display: block;
  margin-bottom: 8px;
}

select,
input {
  width: 90%;
  padding: 8px;
  margin-bottom: 16px;
}

select {
    width: 100%;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
