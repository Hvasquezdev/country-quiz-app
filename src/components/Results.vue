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

      <div class="results__actions__btn-wrapper">
        <base-button color="negative" @click="$emit('on-back')">
          Back
        </base-button>

        <base-button
          class="back-btn"
          color="dark-blue"
          @click="$emit('on-choose-target')"
        >
          Choose new target
        </base-button>
      </div>
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

  setup(props, { emit }) {
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
    }

    &__text {
      font-size: $fs-s;

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

    &__btn-wrapper {
      display: flex;
      width: 100%;
      margin-top: 16px;

      .base-button {
        font-size: $fs-ss;
        padding: 5px 16px;

        &:last-child {
          margin-left: 16px;
        }
      }
    }

    .base-button {
      width: 100%;
    }
  }
}
</style>
