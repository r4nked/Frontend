import {
  createLocalVue,
  mount as _mount,
  shallowMount as _shallowMount,
  ThisTypedMountOptions,
  ThisTypedShallowMountOptions,
  VueClass,
  Wrapper
} from '@vue/test-utils'
import Vue from 'vue'
import i18n from '@/i18n'

export function mount<V extends Vue>(
  component: VueClass<V>,
  options?: ThisTypedMountOptions<V>
): Wrapper<V> {
  const localVue = createLocalVue()
  return _mount(component, {
    ...options,
    localVue,
    i18n
  })
}

export function shallowMount<V extends Vue>(
  component: VueClass<V>,
  options?: ThisTypedShallowMountOptions<V>
): Wrapper<V> {
  const localVue = createLocalVue()
  return _shallowMount(component, {
    ...options,
    localVue,
    i18n
  })
}
