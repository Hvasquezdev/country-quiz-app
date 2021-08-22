<template>
  <div class="app">
    <div class="game-wrapper">
      <h1 class="game-wrapper__title">Country quiz</h1>

      <div class="game-wrapper__card">
        <h2>Lorem ipsum dolor sit amet.</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',

  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-image: url('@/assets/img/png/background.png');
  background-size: cover;
  background-position: center;
  font-family: $ff-popins;
  display: flex;
  align-items: center;
  justify-content: center;

  .game-wrapper {
    width: 100%;
    max-width: 468px;

    &__title {
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 54px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 10px;
      text-transform: uppercase;
      color: #fff;
    }

    &__card {
      padding: 32px;
      border-radius: $border-radius;
      background-color: $white;
    }
  }
}
</style>
