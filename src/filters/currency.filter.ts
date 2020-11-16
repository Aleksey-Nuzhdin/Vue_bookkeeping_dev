export default function currencyFilter(value:number, currency = 'RUB'){
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency
  }).format(value)
}