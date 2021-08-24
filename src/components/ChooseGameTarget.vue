<template>
  <div class="choose-game-target">
    <h1 class="choose-game-target__title">Choose target</h1>

    <div class="choose-game-target__actions">
      <base-button
        v-for="val in questionTargets"
        :key="val"
        color="dark-blue"
        outlined
        @click="onChooseTarget(val)"
      >
        {{ val }} questions
      </base-button>
    </div>

    <base-button
      class="back-btn"
      color="negative"
      outlined
      @click="$emit('on-back')"
    >
      BACK
    </base-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { gameConfig } from '@/core/constants/gameConfig';
import { ViewsEnum } from '@/core/constants/views';
import BaseButton from './BaseButton.vue';

export default defineComponent({
  name: ViewsEnum.ChooseGameTarget,

  components: { BaseButton },

  emits: ['on-choose', 'on-back'],

  setup(props, { emit }) {
    const onChooseTarget = (target: number) => {
      emit('on-choose', target);
    };

    const { questionTargets } = gameConfig;

    return {
      onChooseTarget,
      questionTargets,
    };
  },
});
</script>

<style lang="scss" scoped>
.choose-game-target {
  &__title {
    color: $dark-blue;
    font-size: $fs-m;
    font-weight: $fw-bold;
    margin-bottom: 32px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
  }

  &__actions {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 25px;
    margin-bottom: 24px;
    width: 100%;
  }

  .back-btn {
    display: block;
    margin-left: auto;
  }
}
</style>
