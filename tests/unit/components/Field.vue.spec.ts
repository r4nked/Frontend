import {
  ThisTypedShallowMountOptions, Wrapper
} from '@vue/test-utils'
import { expect } from 'chai'
import { mount, shallowMount } from '../mount'
import Field from '@/components/Field.vue'

function createShallowWrapper(
  attrs?: ThisTypedShallowMountOptions<Field>
): [Wrapper<Field>, Field] {
  const wrapper = shallowMount(Field, attrs)
  const vue: Field = wrapper.vm
  return [wrapper, vue]
}

function createWrapper(attrs?: ThisTypedShallowMountOptions<Field>): [Wrapper<Field>, Field] {
  const wrapper = mount(Field, attrs)
  const vue: Field = wrapper.vm
  return [wrapper, vue]
}

describe('Field.vue', () => {
  // describe('#attribute', () => {
  //   it('extracts the attribute from the name', () => {
  //     const [, vue] = createShallowWrapper({ propsData: { name: 'foo[bar]' } })
  //     expect(vue.attribute).to.eql('bar')
  //   })
  //
  //   it('extracts the attribute from an array', () => {
  //     const [, vue] = createShallowWrapper({ propsData: { name: 'foo[bar][]' } })
  //     expect(vue.attribute).to.eql('bar')
  //   })
  // })

  describe('#errorStrings', () => {
    it('returns the list of errors for the attribute', () => {
      const [, vue] = createShallowWrapper({
        propsData: {
          type: 'text',
          name: 'object[foo]',
          errors: { foo: [{ error: 'blank' }, { error: 'taken' }], bar: [{ error: 'too_few' }] }
        }
      })
      expect(vue.errorStrings).to.eql(['can’t be blank', 'already taken'])
    })

    it('returns an nothing if there are no errors', () => {
      const [, vue] = createShallowWrapper({
        propsData: {
          type: 'text',
          name: 'object[foo]'
        }
      })
      expect(vue.errorStrings).to.eql([])
    })
  })

  describe('#updateValue', () => {
    context('textarea', () => {
      it('hides the placeholder when text is entered', () => {
        const [, vue] = createWrapper({
          propsData: {
            type: 'textarea',
            name: 'object[foo]',
            placeholder: 'placeholder text'
          }
        })
        vue.updateValue('some text')
        expect(vue.$refs.placeholder.style.display).to.eql('none')
      })

      it('shows the placeholder when text is removed', () => {
        const [, vue] = createWrapper({
          propsData: {
            type: 'textarea',
            name: 'object[foo]',
            placeholder: 'placeholder text'
          }
        })
        vue.updateValue('')
        expect(vue.$refs.placeholder.style.display).to.eql('inherit')
      })

      it('does nothing if there is no placeholder', () => {
        const wrapper = mount(Field, {
          propsData: {
            type: 'textarea',
            name: 'object[foo]'
          }
        })
        const vue: Field = wrapper.vm
        vue.updateValue('new value')
      })
    })

    it('sets the input value and emits an event', () => {
      const [wrapper, vue] = createWrapper({
        propsData: {
          type: 'text',
          name: 'object[foo]'
        }
      })
      vue.updateValue('new value')
      expect(wrapper.emitted().input![0]).to.eql(['new value'])
      expect(vue.$refs.input.value).to.eql('new value')
    })

    it('converts numbers to strings for the value but emits a number', () => {
      const [wrapper, vue] = createWrapper({
        propsData: {
          type: 'text',
          name: 'object[foo]'
        }
      })
      vue.updateValue(123)
      expect(wrapper.emitted().input![0]).to.eql([123])
      expect(vue.$refs.input.value).to.eql('123')
    })
  })
})
