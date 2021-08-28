<template>
  <div class="game-board">
    <img
      v-if="question && question.image && !isLoading"
      :src="question.image"
      :alt="question.label"
      class="game-board__question-image"
      width="84"
      height="54"
      loading="lazy"
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
      :key="questionCount"
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
        class="animate__animated animate__slideInLeft option-button"
        :style="`animation-delay: ${key}00ms`"
        @select-answer="selectAnswer(optionLabels[key], answer)"
      />

      <game-timeout-bar
        @on-timeout="handleTimeout"
        :key="questionCount"
        :duration="gameConfig.roundDuration"
        :stop="stopInterval"
      />
    </div>

    <div class="game-board__actions">
      <span class="game-board-lifes-count">
        <b>{{ lifesCount }}</b>
        <svg
          class="animate__animated"
          :class="heartIconClassNames"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="24"
          height="24"
          viewBox="0 0 391.837 391.837"
          style="enable-background: new 0 0 391.837 391.837"
          xml:space="preserve"
        >
          <g>
            <path
              style="fill: #ff2442"
              d="M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58
		c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0
		c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"
            />
          </g>
        </svg>
      </span>

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
  </div>
</template>

<script lang="ts">
import { Answer } from '@/core/domain/models/Answer';
import { computed, defineComponent, ref } from 'vue';
import { delay } from '@/core/utils';
import { gameConfig } from '@/core/constants/gameConfig';
import { Question } from '@/core/domain/models/Question';
import { questionsCount } from '@/core/constants/questionsCount';
import { ViewsEnum } from '@/core/constants/views';
import BaseButton from '@/components/BaseButton.vue';
import BaseGameButton from '@/components/BaseGameButton.vue';
import GameTimeoutBar from './GameTimeoutBar.vue';

export default defineComponent({
  name: ViewsEnum.GameBoard,

  components: {
    BaseGameButton,
    BaseButton,
    GameTimeoutBar,
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

    lifesCount: {
      type: Number,
      default: gameConfig.lifes,
    },
  },

  emits: ['select-option', 'on-confirm', 'on-next'],

  setup(props, { emit }) {
    const needConfirm = ref<boolean>(true);
    const optionLabels = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    const selectedAnswer = ref<Answer | null>(null);
    const selectedOption = ref<null | string>(null);
    const heartFadeOut = ref<boolean>(false);
    const stopInterval = ref<boolean>(false);

    const handleConfirmOption = () => {
      if (!selectedAnswer.value) return alert('Please, select a option!');

      const { value: answer } = selectedAnswer;

      needConfirm.value = false;

      stopInterval.value = true;

      emit('on-confirm', answer);

      if (!answer.isCorrect) handleHeartFadeOut();
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
      stopInterval.value = false;

      emit('on-next');
    };

    const handleHeartFadeOut = async () => {
      heartFadeOut.value = true;
      await delay(1000);
      heartFadeOut.value = false;
    };

    const handleRandomAnswerSelect = () => {
      const randomIndex = Math.floor(Math.random() * questionsCount);
      selectedOption.value = optionLabels.value[randomIndex];
      selectedAnswer.value = props.question.answers[randomIndex];
    };

    const handleTimeout = () => {
      if (!selectedOption.value) handleRandomAnswerSelect();
      handleConfirmOption();
    };

    const heartIconClassNames = computed(() => {
      return { animate__fadeOutDown: heartFadeOut.value };
    });

    return {
      gameConfig,
      handleConfirmOption,
      handleNextQuestion,
      handleTimeout,
      heartIconClassNames,
      needConfirm,
      optionLabels,
      selectAnswer,
      selectedOption,
      stopInterval,
    };
  },
});
</script>

<style lang="scss">
.game-board {
  position: relative;
  padding-top: 36px;
  overflow: hidden;

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

    .option-button {
      transition: transform 0.3s !important;
      animation-duration: 300ms;
    }
  }

  &__actions {
    width: 100%;
    display: flex;
    align-items: center;

    .game-board-lifes-count {
      display: flex;
      align-items: center;
      margin-top: 24px;

      b {
        font-size: $fs-m;
        color: rgba(0, 0, 0, 0.3);
        margin-right: 12px;
      }

      svg {
        filter: drop-shadow(0 0 1px #ff304c);
      }
    }
  }

  .base-button {
    margin-top: 24px;
    margin-left: auto;
    display: block;
  }
}
</style>
