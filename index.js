require('dotenv').config()
const {format, add, differenceInDays, differenceInWeeks, differenceInMonths} = require('date-fns')

const [year, month, day] = process.env.BIRTH.split(',')
let birth = new Date(year, Number(month) - 1 , day)

dateFor(birth)

function dateFor(birth) {
  let now = new Date()
  printTally(birth, now)
  console.log('***')

  let daysTarget = 70 * 365.25
  let retirement = add(birth, {days: daysTarget})
  printLeft(now, retirement)
}

function printTally(birth, now) {
  console.log(format(birth, 'd MMM yyyy'))
  console.log(differenceInDays(now, birth), 'days')
  console.log(differenceInWeeks(now, birth), 'weeks')
  console.log(differenceInMonths(now, birth), 'months')
}

function printLeft(now, retirement) {
  let hoursPerDay = 2000 / 365.25
  let daysDiff = differenceInDays(retirement, now)
  let weeksDiff = differenceInWeeks(retirement, now)
  let monthsDiff = differenceInMonths(retirement, now)

  console.log('retirement: ', format(retirement, 'd MMM yyyy'))
  console.log(`\
${parseInt(daysDiff * hoursPerDay)} hours left \n\
${daysDiff} days left \n\
${weeksDiff} weeks left \n\
${monthsDiff} months left`)

}
