<template>
  <div class="app">
    <div v-if="!loadingData && countriesData" class="game-wrapper">
      <h1
        v-if="currentView !== ViewsEnum.Presentation"
        class="game-wrapper__title"
      >
        Country quiz
      </h1>

      <div
        :class="gameWrapperClassNames"
        class="animate__animated game-wrapper__card"
      >
        <img
          v-if="currentView === ViewsEnum.GameBoard"
          src="@/assets/img/svg/undraw_adventure_4hum_1.svg"
          alt="World sphere"
          class="game-wrapper__card__top-image"
          width="162"
          height="116"
          loading="lazy"
        />
        <presentation
          v-if="currentView === ViewsEnum.Presentation"
          @on-play="currentView = ViewsEnum.ChooseGameTarget"
        />

        <choose-game-target
          v-if="currentView === ViewsEnum.ChooseGameTarget"
          @on-back="currentView = ViewsEnum.Presentation"
          @on-choose="handleChooseTarget"
        />

        <results
          v-if="currentView === ViewsEnum.Results"
          :score="score"
          @on-try-again="handleTryAgain"
        />

        <game-board
          v-if="currentView === ViewsEnum.GameBoard"
          :question="question"
          :question-count="questionsCount"
          :question-count-target="target"
          :is-loading="loadingData || creatingQuestion"
          :lifes-count="lifesCount"
          @on-next="handleNextQuestion"
          @on-confirm="handleConfirmAnswer"
        />
      </div>
    </div>

    <div v-else-if="!loadingData && hasError" class="game-wrapper">
      <div class="game-wrapper__card">
        <h2 class="game-wrapper__card__error-title">
          Error while fetching game data
        </h2>

        <base-button
          class="game-wrapper__card__try-again-btn"
          outlined
          color="dark-blue"
          @click="getCountriesData"
          >Try Again</base-button
        >
      </div>
    </div>

    <loading-game v-else />
  </div>
</template>

<script lang="ts">
import { Answer } from './core/domain/models/Answer';
import { countriesDataManager } from '@/features/countriesDataManager';
import { defineComponent, onMounted, watch, ref, computed } from 'vue';
import { delay } from './core/utils';
import { gameConfig } from '@/core/constants/gameConfig';
import { questionManager } from '@/features/questionManager';
import { ViewsEnum, viewTypes } from './core/constants/views';
import ChooseGameTarget from './components/ChooseGameTarget.vue';
import GameBoard from '@/components/GameBoard.vue';
import LoadingGame from './components/LoadingGame.vue';
import Presentation from './components/Presentation.vue';
import Results from './components/Results.vue';
import BaseButton from './components/BaseButton.vue';

export default defineComponent({
  name: 'App',

  components: {
    GameBoard,
    Presentation,
    ChooseGameTarget,
    Results,
    LoadingGame,
    BaseButton,
  },

  setup() {
    const score = ref<number>(0);
    const target = ref<number>(0);
    const questionsCount = ref<number>(0);
    const currentView = ref<viewTypes>(ViewsEnum.Presentation);
    const shouldShake = ref<boolean>(false);
    const lifesCount = ref<number>(gameConfig.lifes);

    const { loadingData, countriesData, getCountriesData, hasError } =
      countriesDataManager();

    const { creatingQuestion, question, initQuestionGeneration } =
      questionManager();

    const handleNextQuestion = () => {
      if (questionsCount.value === target.value || lifesCount.value === 0) {
        currentView.value = ViewsEnum.Results;
        return;
      }

      initQuestionGeneration(countriesData.value);
      questionsCount.value += 1;
    };

    const handleConfirmAnswer = (payload: Answer) => {
      if (payload.isCorrect) score.value += 1;
      else {
        handleGameWrapperShake();
        lifesCount.value -= 1;
      }
    };

    const handleChooseTarget = (val: number) => {
      target.value = val - 1;
      currentView.value = ViewsEnum.GameBoard;
    };

    const resetState = () => {
      lifesCount.value = gameConfig.lifes;
      questionsCount.value = 0;
      score.value = 0;
      target.value = 0;
    };

    const handleTryAgain = () => {
      resetState();
      currentView.value = ViewsEnum.ChooseGameTarget;
    };

    const gameWrapperClassNames = computed(() => {
      return {
        animate__shakeX: shouldShake.value,
      };
    });

    const handleGameWrapperShake = async () => {
      shouldShake.value = true;
      window.navigator?.vibrate(200);
      await delay(500);
      shouldShake.value = false;
    };

    onMounted(() => {
      getCountriesData();
    });

    watch(loadingData, (val) => {
      if (!val && countriesData.value) {
        initQuestionGeneration(countriesData.value);
      }
    });

    return {
      creatingQuestion,
      currentView,
      gameWrapperClassNames,
      handleChooseTarget,
      handleConfirmAnswer,
      handleNextQuestion,
      handleTryAgain,
      lifesCount,
      loadingData,
      question,
      questionsCount,
      countriesData,
      resetState,
      score,
      target,
      ViewsEnum,
      getCountriesData,
      hasError,
    };
  },
});
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-image: url('@/assets/img/png/background.png');
  background-size: cover;
  background-position: center;
  font-family: $ff-popins;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 360px;
  padding: 32px;

  .game-wrapper {
    width: 100%;
    max-width: 468px;

    &__title {
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 54px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 10px;
      text-transform: uppercase;
      color: #fff;
    }

    &__card {
      padding: 32px;
      border-radius: $border-radius;
      background-color: $white;
      animation-duration: 600ms;
      position: relative;

      &__error-title {
        font-family: $ff-popins;
        font-size: $fs-m;
        font-weight: $fw-bold;
        line-height: 36px;
        text-align: center;
        color: $dark-blue-secondary;
        margin-bottom: 32px;
      }

      &__try-again-btn {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      &__top-image {
        position: absolute;
        right: -32px;
        top: -80px;

        @media screen and (max-width: 640px) {
          display: none;
        }
      }
    }
  }
}
</style>
