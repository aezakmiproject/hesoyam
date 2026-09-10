import { defineComponent, h } from 'vue'
import Radio from './Radio.vue'

export function useRadio(options: {
  value: string
  disabled?: boolean
}) {
  const component = defineComponent({
    name: 'RadioHeadless',
    setup(_, { attrs }) {
      return () => h(Radio, {
        value: options.value,
        disabled: options.disabled,
        ...attrs,
      })
    },
  })

  return { component }
}
