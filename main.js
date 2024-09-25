import './style.css'
import batoiLogo from './public/logoBatoi.png'

document.querySelector('#app').innerHTML = `
  <div>
    <a>
      <img src="${batoiLogo}" class="logo" alt="Vite logo" />
    </a>
    <h1>Abre la consola para ver los resultados</h1>
  </div>
`