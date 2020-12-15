<template>
  <form @submit.prevent="create" method="post">
    <i18n tag="header" path="newStack.header.template">
      <template #nameField>
        <field :errors="errors"
               :maxlength="126"
               :placeholder="placeholder.name"
               aria-label="Stack name"
               class="inline"
               data-cy="nameField"
               name="stack[name]"
               required
               type="text"
               v-model.trim="stack.name" />

      </template>
      <template #ranked>
        <p>, ranked.</p>
      </template>
    </i18n>

    <main>
      <p>{{$t('newStack.prompt')}}</p>
      <field :error-attributes="['cards']"
             :errors="errors"
             :placeholder="placeholderCardNames"
             aria-label="Stack items"
             data-cy="cardsField"
             name="stack[card_names]"
             required
             type="textarea"
             v-model="stack.card_names" />

      <input data-cy="stackSubmit" name="commit" type="submit" :value="$t('newStack.submit')" />
    </main>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {
    cloneDeep, isNull, isString, sample, shuffle
  } from 'lodash-es'
  import { Result } from 'ts-results'
  import request from '@/utils/request'
  import { Errors, Stack } from '@/types'
  import defaultPlaceholders from '@/examples.json'
  import Field from '@/components/Field.vue'

  interface Example {
    name: string;
    cardNames: string[];
  }

  interface ScratchStack {
    name?: string;
    // eslint-disable-next-line camelcase
    card_names?: string;
  }

  @Component({
    components: { Field }
  })
  export default class Form extends Vue {
    stack: ScratchStack = {}

    errors: Errors = {}

    placeholder: Example | null = null

    get placeholderCardNames(): string {
      if (isNull(this.placeholder)) return ''
      return shuffle(this.placeholder.cardNames).join('\n')
    }

    async create(): Promise<void> {
      try {
        const result: Result<Stack, Errors> = await request({
          method: 'post',
          path: '/stacks.json',
          body: { stack: this.stack }
        })
        if (result.ok) {
          await this.$router.push({ name: 'StackRank', params: { id: result.val.id } })
        } else {
          this.errors = result.val
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error)
          alert(error.message) // TODO
        } else if (isString(error)) {
          console.error(error)
          alert(error) // TODO
        } else {
          throw error
        }
      }
    }

    created(): void {
      this.placeholder = cloneDeep(sample(defaultPlaceholders)!)
      this.placeholder.cardNames = shuffle(this.placeholder.cardNames)
    }
  }
</script>

<style lang="scss" scoped>
  header {
    align-items: baseline;
    background-color: #dadada;
    display: flex;
    flex-flow: row nowrap;
    font-size: 36px;
    font-weight: 300;
    line-height: 36px;
    padding: 10px;

    > div {
      flex: 1 1 auto;
      max-width: 600px;
    }

    > p {
      flex: 0 0 auto;
    }
  }

  main {
    background-color: #efefef;
    padding: 20px 10px;
  }

  input[type="submit"] {
    cursor: pointer;
    margin-top: 20px;
  }
</style>
