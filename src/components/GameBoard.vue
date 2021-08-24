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

    <span class="game-board__question-count">
      Question <b>{{ questionCount + 1 }}</b> of
      <b>{{ questionCountTarget + 1 }}</b>
    </span>

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
        :show-results="
          (!needConfirm && selectedOption === optionLabels[key]) ||
          (answer.isCorrect && !needConfirm)
        "
        :is-selected="selectedOption === optionLabels[key]"
        @select-answer="selectAnswer(optionLabels[key], answer)"
      />
    </div>

    <base-button
      v-if="needConfirm"
      :disabled="!selectedOption"
      class="confirm-button"
      label="Confirm"
      color="positive"
      @click="handleConfirmOption"
    />

    <base-button
      v-else
      label="Next"
      color="orange"
      class="is-next"
      @click="handleNextQuestion"
    />
  </div>
</template>

<script lang="ts">
import { Answer } from '@/core/domain/models/Answer';
import { defineComponent, ref } from 'vue';
import { Question } from '@/core/domain/models/Question';
import BaseButton from '@/components/BaseButton.vue';
import BaseGameButton from '@/components/BaseGameButton.vue';
import { ViewsEnum } from '@/core/constants/views';

export default defineComponent({
  name: ViewsEnum.GameBoard,

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

    questionCount: {
      type: Number,
      default: 0,
    },

    questionCountTarget: {
      type: Number,
      default: 0,
    },
  },

  emits: ['select-option', 'on-confirm', 'on-next'],

  setup(props, { emit }) {
    const needConfirm = ref<boolean>(true);
    const optionLabels = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    const selectedAnswer = ref<Answer | null>(null);
    const selectedOption = ref<null | string>(null);

    const handleConfirmOption = () => {
      if (!selectedAnswer.value) return alert('Please, select a option!');

      const { value: answer } = selectedAnswer;

      needConfirm.value = false;

      emit('on-confirm', answer);
    };

    const selectAnswer = (option: string, answer: Answer) => {
      if (!needConfirm.value) return;

      if (option === selectedOption.value) {
        selectedOption.value = null;
        selectedAnswer.value = null;
      } else {
        selectedOption.value = option;
        selectedAnswer.value = answer;
      }

      emit('select-option', selectedAnswer.value);
    };

    const handleNextQuestion = () => {
      // Reset all local variables
      selectedAnswer.value = null;
      selectedOption.value = null;
      needConfirm.value = true;

      emit('on-next');
    };

    return {
      optionLabels,
      selectAnswer,
      selectedOption,
      handleConfirmOption,
      needConfirm,
      handleNextQuestion,
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

  &__question-count {
    font-size: $fs-s;
    color: $dark-blue;
    position: absolute;
    top: 0;
    left: 0;

    b {
      color: $dark-blue-secondary;
    }
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
    color: $dark-blue-secondary;
    margin-bottom: 32px;
  }

  &__answers {
    display: grid;
    grid-template-columns: 100%;
    row-gap: 25px;
  }

  .base-button {
    margin-top: 24px;
    margin-left: auto;
    display: block;
  }
}
</style>
