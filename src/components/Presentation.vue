<template>
  <div class="presentation">
    <div class="presentation__image">
      <img src="@/assets/img/svg/undraw_adventure_4hum_1.svg" alt="Winners" />
    </div>

    <div class="presentation__actions">
      <base-button color="orange" outlined>Play game</base-button>
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
.presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__image {
    display: inline-block;
    width: 250px;
    position: relative;

    &::after {
      display: inline-block;
      content: '';
      width: 100%;
      height: 5px;
      position: absolute;
      bottom: 4px;
      left: 0;
      background-color: $white;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
