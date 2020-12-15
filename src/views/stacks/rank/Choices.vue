<template>
  <div class="match-pair">
    <div class="first">
      <button class="link" @click.prevent="$emit('choose', 1)" data-cy="firstChoice">
        {{match[0].name}}
      </button>
    </div>
    <div class="both">
      <button class="link" @click.prevent="$emit('choose', 3)" data-cy="bothChoice">
        {{$t('rank.equal')}}
      </button>
    </div>
    <div class="second">
      <button class="link" @click.prevent="$emit('choose', 2)" data-cy="secondChoice">
        {{match[1].name}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import { Card, Stack } from '@/types'

  @Component
  export default class Choices extends Vue {
    @Prop({ type: Object, required: true }) stack!: Stack

    @Prop({ type: Array, required: true }) matches!: number[]

    get match(): [Card, Card] {
      const indexes = this.stack.pairs_order[this.matches.length]
      return [
        this.stack.cards[indexes[0]],
        this.stack.cards[indexes[1]]
      ]
    }
  }
</script>

<style lang="scss" scoped>
  .match-pair {
    border: 4px solid #fff;
    margin: 20px auto 60px;
    max-width: calc(960px / 2); /* TODO variable */
    padding: 20px;

    div {
      cursor: pointer;
    }
  }

  .first,
  .second {
    font-size: 36px;
    font-weight: 700;
  }

  .first {
    text-align: right;
  }

  .second {
    text-align: left;
  }

  .both {
    margin: 30px 0;
    text-align: center;
  }
</style>
