<template>
  <div class="results">
    <div class="results_header">
      <img src="@/assets/img/svg/undraw_winner.svg" alt="Winners" />
    </div>

    <div class="results__score">
      <h1 class="results__score__title">Results</h1>
      <p class="results__score__text">
        You got
        <span :class="classNames" class="results__score__text__count">{{
          score
        }}</span>
        correct answers
      </p>
    </div>

    <div class="results__actions">
      <base-button outlined color="dark-blue" @click="$emit('on-try-again')"
        >Try Again</base-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { ViewsEnum } from '@/core/constants/views';
import BaseButton from './BaseButton.vue';

export default defineComponent({
  name: ViewsEnum.Results,
  components: { BaseButton },

  props: {
    score: {
      type: Number,
      required: true,
    },
  },

  emits: ['on-try-again', 'on-back', 'on-choose-target'],

  setup(props) {
    const classNames = computed(() => {
      return {
        'results__score__text__count--is-zero': Number(props.score) === 0,
      };
    });

    return {
      classNames,
    };
  },
});
</script>

<style lang="scss" scoped>
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &,
  &__score,
  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__score {
    margin: 72px 0;

    &__title {
      font-size: $fs-xl;
      font-weight: $fw-bold;
      color: $dark-blue;
    }

    &__text {
      font-size: $fs-s;
      color: $dark-blue;

      &__count {
        font-size: $fs-l;
        font-weight: $fw-bold;
        color: $positive;

        &--is-zero {
          color: $negative;
        }
      }
    }
  }

  &__actions {
    width: 100%;
    max-width: 209px;

    .base-button {
      width: 100%;
    }
  }
}
</style>
