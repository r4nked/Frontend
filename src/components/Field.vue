<template>
  <div :class="['field-error-group', {inline: inline}]"
       :data-cy-name="attribute"
       data-cy="fieldGroup">
    <textarea :aria-label="label"
              :maxlength="maxlength"
              :name="name"
              :required="required"
              :type="type"
              :value="value"
              @input="updateValue($event.target.value)"
              ref="input"
              v-bind="$attrs"
              v-if="type === 'textarea'" />
    <p aria-hidden="true"
       class="placeholder textarea-placeholder"
       ref="placeholder"
       v-if="type === 'textarea'">{{placeholder}}</p>

    <input :aria-label="label"
           :maxlength="maxlength"
           :name="name"
           :placeholder="placeholder"
           :required="required"
           :type="type"
           :value="value"
           @input="updateValue($event.target.value)"
           ref="input"
           v-bind="$attrs"
           v-if="type !== 'textarea'" />

    <p :key="index"
       class="field-error"
       data-cy="fieldErrors"
       v-for="(error, index) in errorStrings">
      {{error}}
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Prop } from 'vue-property-decorator'

  import { isNumber, isUndefined, omit } from 'lodash-es'
  import Component from 'vue-class-component'
  import { Error, Errors } from '@/types'

  @Component({
    inheritAttrs: false
  })
  export default class Field extends Vue {
    readonly $refs!: {
      placeholder: HTMLParagraphElement;
      input: HTMLTextAreaElement | HTMLInputElement;
    }

    @Prop({}) value!: string | number | null

    @Prop({
      default(): Errors {
        return {}
      }
    }) errors!: Errors

    @Prop({ type: String, required: true }) type!: string

    @Prop({ type: String, required: false }) placeholder!: string | null

    @Prop({ type: String, required: false }) label!: string | null

    @Prop({ type: String, required: true }) name!: string

    @Prop({ type: Boolean }) required!: boolean

    @Prop({ type: Number }) maxlength!: number

    @Prop({ type: Boolean, default: false }) inline!: boolean

    @Prop({ type: Array, default: () => [] }) errorAttributes!: string[]

    get errorStrings(): string[] {
      return this.fieldErrors.map(e => <string> this.$t(`validationError.${e.error}`, omit(e, 'error')))
    }

    private get attribute(): string {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [match, object, first, rest] = this.name.match(
        /^(\w+)(?:\[(\w+)]((?:\[\w+])*))?$/
      )!
      return first + rest
    }

    private get fieldErrors(): Error[] {
      return [this.attribute, ...this.errorAttributes]
        .reduce((errors, attr) => [...errors, ...(this.errors[attr] || [])], new Array<Error>())
    }

    updateValue(value?: string | number) {
      if (isUndefined(value)) return

      const stringValue = isNumber(value) ? value.toString() : value

      if (this.type === 'textarea' && !isUndefined(this.$refs.placeholder)) {
        if (stringValue && stringValue.length > 0) this.$refs.placeholder.style.display = 'none'
        else this.$refs.placeholder.style.display = 'inherit'
      }

      if (!isUndefined(this.$refs.input)) this.$refs.input.value = stringValue
      this.$emit('input', value)
    }
  }
</script>

<style lang="scss" scoped>
  .field-error-group {
    position: relative;

    &.inline {
      display: inline-block;
    }

    .field-error {
      color: rgb(191, 22, 22);
      font-size: 12px;
    }
  }

  .placeholder {
    color: rgb(169, 169, 169);
    font-size: 16px;
    left: 1px;
    padding: 5px;
    pointer-events: none;
    position: absolute;
    top: 3px;

    &.textarea-placeholder {
      white-space: pre;
    }
  }

  input,
  textarea {
    box-sizing: border-box;
    display: block;
    width: 100%;
  }

  textarea {
    height: calc(16px * 20);
    max-width: 480px;
    width: 100%;
  }
</style>
