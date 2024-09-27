import './style.css'
import batoiLogo from './public/logoBatoi.png'
import './src/functions.js'
import { booksOfTypeNotes } from './src/functions.js'



document.querySelector('#app').innerHTML = `
  <div>
    <a>
      <img src="${batoiLogo}" class="logo" alt="Vite logo" />
    </a>
    <h1>Abre la consola para ver los resultados</h1>
  </div>
`