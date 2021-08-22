<template>
  <div class="choose-game-target">
    <h1 class="choose-game-target__title">Choose target</h1>

    <div class="choose-game-target__actions">
      <base-button color="dark-blue" outlined>10 questions</base-button>
      <base-button color="dark-blue" outlined>20 questions</base-button>
      <base-button color="dark-blue" outlined>40 questions</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from './BaseButton.vue';

export default defineComponent({
  components: { BaseButton },
});
</script>

<style lang="scss" scoped>
.choose-game-target {
  &,
  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__title {
    color: $dark-blue;
    font-size: $fs-m;
    font-weight: $fw-bold;
    margin-bottom: 48px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
  }

  &__actions {
    .base-button {
      width: 100%;
    }

    .base-button:not(:last-child) {
      margin-bottom: 32px;
    }
  }
}
</style>
