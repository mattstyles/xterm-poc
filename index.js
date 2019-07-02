
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import chalk from 'chalk'
import Stats from 'stats.js'

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
  experimentalCharAtlas: 'static'
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

setTimeout(writeScreen(term), 1000)
// window.requestAnimationFrame(writeScreen(term))
