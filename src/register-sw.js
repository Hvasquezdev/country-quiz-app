if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js', {
    ready() {
      console.log('Service worker ready');
    },

    registered() {
      console.log('Service worker registered');
    },

    cached() {
      console.log('Service worker cached');
    },

    updatefound() {},

    updated(registration) {
      console.log('Service worker updated');
    },

    offline() {},

    error(error) {},
  });
}
