<template>
  <div class="presentation">
    <div class="presentation__title-text">WELCOME TO</div>

    <div class="presentation__image">
      <img src="@/assets/img/svg/undraw_adventure_4hum_1.svg" alt="Winners" />
    </div>

    <div class="presentation__title-text presentation__title-text--is-right">
      COUNTRY QUIZ
    </div>

    <div class="presentation__actions">
      <base-button color="positive" @click="$emit('on-play')">PLAY</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ViewsEnum } from '@/core/constants/views';
import { defineComponent } from 'vue';
import BaseButton from './BaseButton.vue';

export default defineComponent({
  name: ViewsEnum.Presentation,
  components: { BaseButton },
});
</script>

<style lang="scss" scoped>
.presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__title-text {
    font-size: $fs-m;
    font-weight: $fw-bold;
    width: 100%;
    padding-left: 36px;

    &--is-right {
      text-align: right;
      padding-right: 36px;
      padding-left: 0;
    }
  }

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

  &__actions {
    margin: 36px 0 0;
    width: 100%;

    .base-button {
      width: 100%;
    }
  }
}
</style>
