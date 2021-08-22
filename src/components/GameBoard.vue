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
      v-if="question && question.image"
      :src="question.image"
      :alt="question.label"
      class="game-board__question-image"
      width="84"
      height="54"
      load="lazy"
    />

    <h2 class="game-board__title">
      {{ question.label }}
    </h2>

    <div v-if="question.answers.length" class="game-board__answers">
      <base-game-button
        v-for="(answer, key) in question.answers"
        :key="key"
        :option="optionLabels[key]"
        :answer="answer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Question } from '@/core/domain/models/Question';
import BaseGameButton from '@/components/BaseGameButton.vue';

export default defineComponent({
  components: {
    BaseGameButton,
  },

  props: {
    question: {
      type: Object as () => Question,
      default: {} as Question,
    },
  },

  setup() {
    const optionLabels = ref(['A', 'B', 'C', 'D']);

    return {
      optionLabels,
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
}
</style>
