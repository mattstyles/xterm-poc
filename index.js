
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import chalk from 'chalk'
import Stats from 'stats.js'
import { random } from 'lodash/fp'

import 'xterm/lib/xterm.css'
// import 'xterm/lib/addons/fit/fit.css'
import 'normalize.css'

const el = document.createElement('div')
document.body.appendChild(el)

const stats = new Stats()
stats.showPanel(0)
stats.dom.style.right = '0px'
stats.dom.style.left = 'auto'
document.body.appendChild(stats.dom)

Terminal.applyAddon(fit)

const term = new Terminal({
  rendererType: 'canvas',
  experimentalCharAtlas: 'dynamic',
  fontFamily: 'DejaVu Sans Mono',
  fontSize: 18
})
term.open(el)
window.term = term

const fitViewport = term => {
  term.element.style.height = '100vh'
  term.fit()
}

fitViewport(term)
term.focus()

// term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
// term.write(chalk.green('Hello World'))
// term.write(chalk.red('Red text'))
// term.write('\n Next line')

term.writeln('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
term.writeln('Next line')
term.writeln('\nThe year was 1986.')
term.writeln('He was a teenager like any other')
term.writeln('Dreaming of his heroes and in love with a girl')
term.writeln('But on a thunderous night along a ragged coast')
term.writeln('A mysterious red car came to him')
term.writeln('Its power lighting his eyes blood-red')
term.writeln('In a flash all was lost in the hellfire of twisted metal')
term.writeln('When our hero emerged from the burning wreckage')
term.writeln('He and the car had become one, their souls spliced forever')
term.writeln('Leaving him to wander the night alone\n')
// term.writeln('Invisible to everyone but her')

var ln = 'Invisible to everyone but her\r\n'.split('')
const printLn = (term) => () => {
  term.write(ln.shift())
  setTimeout(printLn(term), 1000 / random(5, 60))
}

setTimeout(printLn(term), 500)

term.prompt = () => {
  // term.write('\r\n$ ')
}

term.prompt()

const rows = 24
const cols = 48
window.fps = 60
window.isRunning = true

const createRow = () => {
  const arr = []
  for (let x = 0; x < cols; x++) {
    arr.push(Math.random() < 0.3 ? '#' : ' ')
  }
  return arr.join('')
}

const writeScreen = (term) => () => {
  stats.begin()

  term.clear()
  for (let y = 0; y < rows; y++) {
    term.writeln(createRow())
  }

  if (window.isRunning) {
    setTimeout(writeScreen(term), 1000 / window.fps)
  }

  // window.requestAnimationFrame(writeScreen(term))
  // console.log('done')

  stats.end()
}

// setTimeout(writeScreen(term), 3000)
// window.requestAnimationFrame(writeScreen(term))
