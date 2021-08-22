<template>
  <div class="game-board">
    <img
      src="@/assets/img/svg/undraw_adventure_4hum_1.svg"
      alt="World sphere"
      class="game-board__top-image"
      width="162"
      height="116"
      load="lazy"
    />

    <img
      v-if="question && question.image && !isLoading"
      :src="question.image"
      :alt="question.label"
      class="game-board__question-image"
      width="84"
      height="54"
      load="lazy"
    />

    <h2 v-if="!isLoading && question" class="game-board__title">
      {{ question.label }}
    </h2>

    <div
      v-if="question && question.answers.length && !isLoading"
      class="game-board__answers"
    >
      <base-game-button
        v-for="(answer, key) in question.answers"
        :key="key"
        :option="optionLabels[key]"
        :answer="answer"
        :is-selected="selectedOption === optionLabels[key]"
        @select-answer="selectAnswer(optionLabels[key], answer)"
      />
    </div>

    <base-button label="Next" color="yellow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Question } from '@/core/domain/models/Question';
import { Answer } from '@/core/domain/models/Answer';
import BaseGameButton from '@/components/BaseGameButton.vue';
import BaseButton from '@/components/BaseButton.vue';

export default defineComponent({
  components: {
    BaseGameButton,
    BaseButton,
  },

  props: {
    question: {
      type: Object as () => Question,
      default: {} as Question,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['select-option'],

  setup(props, { emit }) {
    const optionLabels = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    const selectedOption = ref('');
    const selectedAnswer = ref(null as Answer | null);

    const selectAnswer = (option: string, answer: Answer) => {
      if (option === selectedOption.value) {
        selectedOption.value = '';
        selectedAnswer.value = null;
      } else {
        selectedOption.value = option;
        selectedAnswer.value = answer;
      }

      emit('select-option', selectedAnswer.value);
    };

    return {
      optionLabels,
      selectAnswer,
      selectedOption,
    };
  },
});
</script>

<style lang="scss">
.game-board {
  position: relative;
  padding-top: 36px;

  &__top-image {
    position: absolute;
    right: -32px;
    top: -110px;
  }

  &__question-image {
    width: 84px;
    height: 54px;
    box-shadow: 0px 4px 24px 0px #0000001a;
    margin-bottom: 24px;
  }

  &__title {
    font-family: $ff-popins;
    font-size: $fs-m;
    font-weight: $fw-bold;
    line-height: 36px;
    text-align: left;
    color: $dark-blue;
    margin-bottom: 32px;
  }

  &__answers {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 25px;
  }

  .base-button {
    margin-top: 24px;
    margin-left: auto;
    display: block;
  }
}
</style>
