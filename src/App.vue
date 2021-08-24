<template>
  <div class="app">
    <div class="game-wrapper">
      <h1
        v-if="currentView !== ViewsEnum.Presentation"
        class="game-wrapper__title"
      >
        Country quiz
      </h1>

      <div class="game-wrapper__card">
        <presentation
          v-if="currentView === ViewsEnum.Presentation"
          @on-play="currentView = ViewsEnum.ChooseGameTarget"
        />

        <choose-game-target
          v-if="currentView === ViewsEnum.ChooseGameTarget"
          @on-back="currentView = ViewsEnum.Presentation"
          @on-choose="handleChooseTarget"
        />

        <game-board
          v-if="currentView === ViewsEnum.GameBoard"
          :question="question"
          :question-count="questionsCount"
          :question-count-target="target"
          :is-loading="loadingData || creatingQuestion"
          @on-next="handleNextQuestion"
          @on-confirm="handleConfirmAnswer"
        />

        <results
          v-if="currentView === ViewsEnum.Results"
          :score="score"
          @on-try-again="handleTryAgain"
          @on-choose-target="
            () => {
              resetState();
              currentView = ViewsEnum.ChooseGameTarget;
            }
          "
          @on-back="
            () => {
              resetState();
              currentView = ViewsEnum.Presentation;
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Answer } from './core/domain/models/Answer';
import { countriesDataManager } from '@/features/countriesDataManager';
import { defineComponent, onMounted, watch, ref } from 'vue';
import { questionManager } from '@/features/questionManager';
import { ViewsEnum, viewTypes } from './core/constants/views';
import ChooseGameTarget from './components/ChooseGameTarget.vue';
import GameBoard from '@/components/GameBoard.vue';
import Presentation from './components/Presentation.vue';
import Results from './components/Results.vue';

export default defineComponent({
  name: 'App',

  components: {
    GameBoard,
    Presentation,
    ChooseGameTarget,
    Results,
  },

  setup() {
    const score = ref<number>(0);
    const target = ref<number>(0);
    const questionsCount = ref<number>(0);
    const currentView = ref<viewTypes>(ViewsEnum.Presentation);

    const { loadingData, countriesData, getCountriesData } =
      countriesDataManager();

    const { creatingQuestion, question, initQuestionGeneration } =
      questionManager();

    const handleNextQuestion = () => {
      if (questionsCount.value === target.value) {
        currentView.value = ViewsEnum.Results;
        return;
      }

      initQuestionGeneration(countriesData.value);
      questionsCount.value += 1;
    };

    const handleConfirmAnswer = (payload: Answer) => {
      if (payload.isCorrect) score.value += 1;
    };

    const handleChooseTarget = (val: number) => {
      target.value = val - 1;
      currentView.value = ViewsEnum.GameBoard;
    };

    const resetState = () => {
      score.value = 0;
      questionsCount.value = 0;
      target.value = 0;
    };

    const handleTryAgain = () => {
      score.value = 0;
      questionsCount.value = 0;
      currentView.value = ViewsEnum.ChooseGameTarget;
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
      handleChooseTarget,
      handleConfirmAnswer,
      handleNextQuestion,
      handleTryAgain,
      loadingData,
      question,
      resetState,
      score,
      ViewsEnum,
      questionsCount,
      target,
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
    }
  }
}
</style>
