import { DateUtils } from '@/utils/date/dateUtils'

export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$date = DateUtils
    app.provide('dateUtils', options)
  }
}
