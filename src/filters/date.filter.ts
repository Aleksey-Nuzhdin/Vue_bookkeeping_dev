import store from '../store'

export default function dateFilter(value:number, format:string = 'date'){ 
  type dateFormat = {
    year: string,
    month: string,
    day: string,
    hour?: string,
    minute?: string,
    second?: string,
  }

  let options: dateFormat = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }

  if(format.includes('time')){
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }
  const locale = store.getters.info.locale || 'ru-RU'
  return new Intl.DateTimeFormat(locale, options).format(value)
}