require('dotenv').config()
const {format, add, differenceInDays, differenceInWeeks, differenceInMonths} = require('date-fns')

const [year, month, day] = process.env.BIRTH.split(',')
let birth = new Date(year, Number(month) - 1 , day)

dateFor(birth)

function dateFor(birth) {
  const now = new Date()
  const daysTarget = process.env.RETIREMENT_AGE * 365.25
  const retirement = add(birth, {days: daysTarget})
  printTally(birth, now, retirement)
}

function printTally(birth, now, retirement) {
  const hoursPerDay = process.env.HOURS_PER_YEAR_WORKED / 365.25
  const daysLeft = differenceInDays(retirement, now)
  const weeksLeft = differenceInWeeks(retirement, now)
  const monthsLeft = differenceInMonths(retirement, now)
  const hoursLeft = parseInt(daysLeft * hoursPerDay)

  console.log(format(birth, 'd MMM yyyy'), '->', format(retirement, 'd MMM yyyy'), '(if you are lucky)')
  console.log(differenceInDays(now, birth), 'days')
  console.log(differenceInWeeks(now, birth), 'weeks')
  console.log(differenceInMonths(now, birth), 'months')
  console.log(hoursLeft, 'hours left')
  console.log(daysLeft, 'days left')
  console.log(weeksLeft, 'weeks left')
  console.log(monthsLeft, 'months left')
}

