/*
 * Randomly selects a background color and text color combination (class names)
 */
export function switchTheme(){
  const themes = [
    'black bg-washed-yellow',
    'black bg-washed-green',
    'black bg-washed-blue',
    'black bg-washed-red',
    'mid-gray bg-washed-red',
    'mid-gray bg-washed-yellow',
    'gray bg-light-gray',
    'near-black bg-light-green',
    'mid-gray bg-washed-red',
    'mid-gray bg-washed-red',
    'dark-pink bg-washed-green',
    'dark-pink bg-washed-blue',
    'dark-green bg-light-green',
    'navy bg-lightest-blue',
    'navy bg-lightest-blue',
    'navy bg-washed-blue',
    'navy bg-washed-blue',
    'navy bg-washed-blue',
    'navy bg-washed-blue',
    'washed-red bg-dark-blue',
    'near-black bg-yellow',
    'near-black bg-white',
    'yellow bg-mid-gray',
    'yellow bg-dark-blue',
    'white bg-dark-blue',
    'purple bg-moon-gray',
    'yellow bg-black',
    'yellow bg-black',
    'yellow bg-black',
    'yellow bg-navy',
    'pink bg-dark-black',
    'light-pink bg-black',
    'light-pink bg-mid-gray',
    'light-pink bg-dark-blue',
    'light-green bg-near-black',
    'light-green bg-navy',
    'light-green bg-dark-green',
    'dark-pink bg-yellow',
    'dark-pink bg-light-green',
  ]

  return themes[Math.floor(Math.random()*themes.length)];
}
