
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen'
import chalk from 'chalk'
import Stats from 'stats.js'
import { random } from 'lodash/fp'
import ansi from 'ansi-styles'

import 'xterm/lib/xterm.css'
import 'xterm/lib/addons/fullscreen/fullscreen.css'
import 'normalize.css'

const el = document.createElement('div')
document.body.appendChild(el)

const stats = new Stats()
stats.showPanel(0)
stats.dom.style.right = '0px'
stats.dom.style.left = 'auto'
document.body.appendChild(stats.dom)

Terminal.applyAddon(fit)
Terminal.applyAddon(fullscreen)

const term = new Terminal({
  rendererType: 'canvas',
  experimentalCharAtlas: 'dynamic',
  fontFamily: 'DejaVu Sans Mono',
  fontSize: 18,
  theme: {
    background: '#10181a'
  }
})
term.open(el)
window.term = term

// @deprecated not needed as fullscreen does this job
// const fitViewport = term => {
//   // term.element.style.height = '100vh'
//   term.fit()
// }

// fitViewport(term)
term.focus()

// term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
// term.write(chalk.green('Hello World'))
// term.write(chalk.red('Red text'))
// term.write('\n Next line')

// This is false, which is why it does not work by default
console.log(chalk.supportsColor)
chalk.enabled = true

// Needs level setting as well
// @TODO may not need new instance, can use global
const ctx = new chalk.constructor({
  enabled: true,
  level: 4
})

term.writeln('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
term.writeln('Next line')
term.writeln(chalk.red('chalk red'))
term.writeln(ctx.red('chalk red: new context'))
term.writeln(`${ansi.green.open}Green${ansi.green.close}`)
term.writeln(`${ansi.blue.open}${ansi.bgColor.bgYellow.open}Green${ansi.bgColor.bgYellow.close}${ansi.blue.close}`)

// Utf8 is delayed, possibly overridden by subsequent calls.
var buf = new Uint8Array(16)
term.writeUtf8(buf.map((_, i) => 'hello world'.charCodeAt(i) || 0))
term.write('\r\n')

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

var ln = 'Invisible to everyone, but her\r\n'.split('')
const printLn = (term) => () => {
  term.write(ln.shift())
  setTimeout(printLn(term), 1000 / random(5, 60))
}

setTimeout(printLn(term), 500)

term.prompt = () => {
  term.write(`\r\n ${ctx.yellow('>')} `)
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

// setTimeout(() => term.toggleFullScreen(), 1000)

// setTimeout(writeScreen(term), 3000)
// window.requestAnimationFrame(writeScreen(term))
