import { DateUtils } from '@/utils/date/dateUtils'
import type { App } from 'vue'
import type { Options } from '@vitejs/plugin-vue'

export default {
  install: (app: App, options: Options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$date = DateUtils
    app.provide('dateUtils', options)
  }
}
