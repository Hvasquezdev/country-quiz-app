<template>
  <button :class="classNames" class="base-button" @click="emit('click')">
    <slot v-if="!Boolean(label)" /> {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    color: {
      type: String,
    },

    outlined: {
      type: Boolean,
    },

    label: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const classNames = computed(() => {
      return {
        [`base-button--is-${props.color}`]: Boolean(props.color),
        [`base-button--is-outlined`]: props.outlined,
        [`base-button--is-${props.color}-outlined`]:
          props.outlined && props.color,
      };
    });

    return { classNames, emit };
  },
});
</script>

<style lang="scss" scoped>
.base-button {
  background-color: $white;
  border-color: transparent;
  border-radius: $button-border-radius;
  border-style: solid;
  border-width: 2px;
  color: $black;
  cursor: pointer;
  font-family: $ff-popins;
  font-size: $fs-s;
  font-weight: $fw-medium;
  outline: none;
  padding: $button-padding;

  &--is-dark-blue {
    color: $white;
    background-color: $dark-blue;

    &:hover {
      background-color: darken($color: $dark-blue, $amount: 10%);
    }

    &-outlined {
      color: $dark-blue;

      &:hover {
        background-color: rgba($color: $dark-blue, $alpha: 0.1);
      }
    }
  }

  &--is-negative {
    color: $white;
    background-color: $negative;

    &:hover {
      background-color: darken($color: $negative, $amount: 10%);
    }

    &-outlined {
      color: $negative;

      &:hover {
        background-color: rgba($color: $negative, $alpha: 0.1);
      }
    }
  }

  &--is-positive {
    color: $white;
    background-color: $positive;

    &:hover {
      background-color: darken($color: $positive, $amount: 10%);
    }

    &-outlined {
      color: $positive;

      &:hover {
        background-color: rgba($color: $positive, $alpha: 0.1);
      }
    }
  }

  &--is-purple {
    color: $white;
    background-color: $purple;

    &:hover {
      background-color: darken($color: $purple, $amount: 10%);
    }

    &-outlined {
      color: $purple;

      &:hover {
        background-color: rgba($color: $purple, $alpha: 0.1);
      }
    }
  }

  &--is-yellow {
    color: $white;
    background-color: $yellow;

    &:hover {
      background-color: darken($color: $yellow, $amount: 10%);
    }

    &-outlined {
      color: $yellow;

      &:hover {
        background-color: rgba($color: $yellow, $alpha: 0.1);
      }
    }
  }

  &--is-outlined {
    border-color: currentColor;
    background-color: transparent;
  }
}
</style>
