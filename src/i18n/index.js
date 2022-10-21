import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './lang/zh'
import en from './lang/en'
import Cookie from 'js-cookie'

export const messages = {
  zh, en
}
const i18n = new VueI18n({

  locale: Cookie.get('lang') || 'zh',
  messages
})
export default i18n
