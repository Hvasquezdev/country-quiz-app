<template>
  <button class="base-game-button" :class="statusClass" @click="onClick">
    <div class="base-game-button__content">
      <div class="base-game-button__content__option">{{ option }}</div>
      <div v-if="answer" class="base-game-button__content__label">
        {{ answer.label }}
      </div>
      <div class="base-game-button__content__icon-state">
        <!-- Check icon -->
        <svg
          v-if="showResults && answer"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
        >
          <!-- Check icon -->
          <path
            v-if="answer.isCorrect"
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z"
          />

          <!-- Error icon -->
          <path
            v-else
            d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8z"
          />
        </svg>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Answer } from '@/core/domain/models/Answer';

export default defineComponent({
  name: 'BaseGameButton',

  props: {
    option: {
      type: String,
      default: '',
    },
    answer: {
      type: Object as () => Answer,
      default: null as Answer | null,
    },
    showResults: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String as () => 'selected' | 'success' | 'error' | 'normal',
      default: 'normal',
    },
  },

  emits: ['select-answer'],

  setup(props, { emit }) {
    const onClick = () => {
      if (props.showResults === false) {
        emit('select-answer', props.answer);
      }
    };

    const statusClass = computed(() => `is-${props.status}`);

    return { onClick, statusClass };
  },
});
</script>

<style lang="scss">
.base-game-button {
  width: 100%;
  border-radius: $button-border-radius;
  background-color: transparent;
  padding: 0px 19px;
  font-family: $ff-popins;
  color: $purple;
  border: 2px solid $purple-light;
  min-height: 56px;
  cursor: pointer;
  transition: all 0.25s;

  &:hover:not(.is-success):not(.is-error),
  &.is-selected {
    background-color: $orange;
    color: $white;
    border-color: $orange;
  }

  &:active:not(.is-selected):not(.is-success):not(.is-error) {
    filter: brightness(0.95);
    transform: scale(0.98);
  }

  &.is-success {
    color: $white;
    border-color: $positive;
    background-color: $positive;
  }

  &.is-error {
    color: $white;
    border-color: $negative;
    background-color: $negative;
  }

  &__content {
    color: currentColor;
    display: grid;
    grid-template-columns: 18px 1fr 24px;
    align-items: center;
    column-gap: 20px;

    &__option {
      font-size: 24px;
      font-weight: $fw-medium;
      text-align: left;
    }

    &__label {
      padding-left: 26px;
      font-size: 18px;
      font-weight: $fw-medium;
      text-align: left;
    }

    &__icon-state {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
