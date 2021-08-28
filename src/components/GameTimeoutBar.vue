<template>
  <div class="game-timeout-bar">
    <div class="game-timeout-bar__body">
      <div :style="fillBarWidth" class="game-timeout-bar__body__fill"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  computed,
  watch,
} from 'vue';

export default defineComponent({
  props: {
    duration: { type: Number, required: true, default: () => 20000 },

    stop: { type: Boolean },
  },

  emits: ['on-timeout'],

  setup(props, { emit }) {
    const currentMs = ref<number>(0);
    const duration = props.duration;
    const intervalId = ref();
    const intervalTime = 100;
    const percentage = ref<number>(100);

    const handleDecrease = () => {
      if (currentMs.value === duration) {
        clearInterval(intervalId.value);
        percentage.value = 0;
        emit('on-timeout');
      }

      percentage.value -= (intervalTime * 100) / duration;
      currentMs.value += intervalTime;
    };

    const initInterval = () => {
      intervalId.value = setInterval(handleDecrease, intervalTime);
    };

    const fillBarWidth = computed(() => {
      return `width: ${percentage.value}%`;
    });

    onMounted(initInterval);

    watch(props, (newVal, oldVal) => {
      if (newVal.stop) clearInterval(intervalId.value);
    });

    onUnmounted(() => {
      clearInterval(intervalId.value);
    });

    return { fillBarWidth };
  },
});
</script>

<style lang="scss" scoped>
.game-timeout-bar {
  $border-radius: 12px;

  display: flex;
  position: relative;
  width: 100%;
  height: 12px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: $border-radius;

  &__body {
    width: 100%;
    height: 100%;
    border-radius: $border-radius;

    &__fill {
      height: 100%;
      background-color: $purple;
      border-radius: $border-radius;
      transition: 0.35s;
    }
  }
}
</style>
