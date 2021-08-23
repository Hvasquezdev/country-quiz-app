<template>
  <div class="app">
    <div class="game-wrapper">
      <h1 class="game-wrapper__title">Country quiz</h1>

      <div class="game-wrapper__card">
        <game-board
          :question="question"
          :is-loading="loadingData || creatingQuestion"
          @on-next="handleNextQuestion"
          @on-choose="handleChooseOption"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Answer } from './core/domain/models/Answer';
import { countriesDataManager } from '@/features/countriesDataManager';
import { defineComponent, onMounted, watch, ref } from 'vue';
import { Question } from './core/domain/models/Question';
import { questionManager } from '@/features/questionManager';
import GameBoard from '@/components/GameBoard.vue';

export default defineComponent({
  name: 'App',

  components: {
    GameBoard,
  },

  setup() {
    const score = ref<number>(0);

    const { loadingData, countriesData, getCountriesData } =
      countriesDataManager();

    const { creatingQuestion, question, initQuestionGeneration } =
      questionManager();

    const handleNextQuestion = () => {
      initQuestionGeneration(countriesData.value);
    };

    const handleChooseOption = (payload: Answer) => {
      if (payload.isCorrect) score.value += 1;
      console.log('ANSWER IS:', payload.isCorrect, 'TOTAL SCORE:', score.value);
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
      question,
      loadingData,
      handleNextQuestion,
      handleChooseOption,
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
