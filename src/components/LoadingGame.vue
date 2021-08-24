<template>
  <div class="loading-game"><game-spinner /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameSpinner from './GameSpinner.vue';

export default defineComponent({
  components: { GameSpinner },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.loading-game {
  color: $white;
}
</style>
