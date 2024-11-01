import './style.css'
import batoiLogo from '/logoBatoi.png'
import Controller from './src/controller/controller.class'

document.querySelector('#app').innerHTML = `
<div>
    <a href="https://vitejs.dev" target=' blank'>
        <img src="${batoiLogo}" class="logo" alt="Batoi logo" />
    </a>
    <h1>BatoiBooks</h1>
    <nav>
        <ul>
            <li><a href='#list'>Ver Libros</a></li>
            <li><a href='#form'>AñadirLibro</a></li>
            <li><a href='#Aderca de...'></a></li>
        </ul>
    </nav>
    <div id='messages'></div>
    <div id='list'></div>
    <div id='form'>
        <form id="bookForm">
            <legend><h3 class="action" >AñadirLibro</h3></legend>
            <div class='id'>
                <label for="id">ID:</label>
                <input type="text" id="book-id" disabled>
            </div>
            <div>
                <label for="id-module">Módulo:</label>
                <select id="id-module">
                    <option>- Selecciona un módulo -</option>
                </select>
            </div>

            <div>
                <label for="publisher">Editorial:</label>
                <input type="text" id="publisher" required>
            </div>

            <div>
                <label for="price">Precio:</label>
                <input type="number" id="price">
            </div>

            <div>
                <label for="pages">Páginas:</label>
                <input type="number" id="pages">
            </div>

            <div>
                <label>Estado:</label>
                <!-- Aquí poned un radiobutton para cada estado -->
                <input type="radio" name="status" value="new">Nuevo
                <input type="radio" name="status" value="good">Bueno
                <input type="radio" name="status" value="used">Usado
                <input type="radio" name="status" value="bad">Malo
                <input type="radio" name="status" value="digital">Digital
            </div>

            <div>
                <label for="comments">Comentarios:</label>
                <textarea id="comments"></textarea>
            </div>

            <button class="anadir" type="submit">Añadir</button>
            <button type="reset">Reset</button>
        </form>
    </div>
    <div id='about'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis augue ut elit vulputate, ut ultrices
            ex pulvinar. Aenean et nibh sed orci efficitur faucibus.</p>
    </div>
    <footer>Joel Garcia -BatoiBooks</footer>
</div>
`

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
})