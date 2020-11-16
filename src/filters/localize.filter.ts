import store from '../store'
const ruLocalize = require('@/locales/ru.json')
const enLocalize = require('@/locales/en.json')

const lang:any = {
  'ru-RU': ruLocalize,
  'en-US': enLocalize,
}

export default function localizeFilter(words:string){
  const locale = store.getters.info.locale || 'ru-RU'
  return lang[locale][words] || `{Localize ERROR]: keyWord-${words}, not found`
}
