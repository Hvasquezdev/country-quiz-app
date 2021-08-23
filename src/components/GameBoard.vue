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
        :show-results="
          (!isChoosing && selectedOption === optionLabels[key]) ||
          (answer.isCorrect && !isChoosing)
        "
        :is-selected="selectedOption === optionLabels[key]"
        @select-answer="selectAnswer(optionLabels[key], answer)"
      />
    </div>

    <base-button
      v-if="isChoosing"
      class="choose-button"
      label="Choose"
      color="positive"
      @click="handleChooseOption"
    />

    <base-button
      v-else
      label="Next"
      color="orange"
      @click="handleNextQuestion"
    />
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

  emits: ['select-option', 'on-choose', 'on-next'],

  setup(props, { emit }) {
    const isChoosing = ref<boolean>(true);
    const optionLabels = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    const selectedAnswer = ref<Answer | null>(null);
    const selectedOption = ref<null | string>(null);

    const handleChooseOption = () => {
      if (!selectedAnswer.value) return alert('Please, select a option!');

      const { value: answer } = selectedAnswer;

      isChoosing.value = false;

      emit('on-choose', answer);
    };

    const selectAnswer = (option: string, answer: Answer) => {
      if (!isChoosing.value) return;

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
      isChoosing.value = true;

      emit('on-next');
    };

    return {
      optionLabels,
      selectAnswer,
      selectedOption,
      handleChooseOption,
      isChoosing,
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
    grid-template-columns: 100%;
    row-gap: 25px;
  }

  .base-button {
    margin-top: 24px;
    margin-left: auto;
    display: block;
  }

  .choose-button {
    width: 100%;
  }
}
</style>
