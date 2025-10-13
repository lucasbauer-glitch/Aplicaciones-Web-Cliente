
export function initFooter() {
    const footer = document.querySelector('.footer-container');
    if (!footer) return;
    footer.innerHTML = `
        <div class="footer-section">
            <h4>Contacto</h4>
            <p>Email: info@pokemaniastore.com</p>
            <p>Tel: +54 9 11 1234-5678</p>
            <p>Dirección: Av. Pokémon 123, Buenos Aires</p>
        </div>
        <div class="footer-section">
            <h4>Enlaces</h4>
            <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a href="allProduct.html">Productos</a></li>
            <li><a href="aboutUs.html">Sobre Nosotros</a></li>
            <li><a href="contactPage.html">Contacto</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h4>Políticas</h4>
            <ul>
            <li><a href="comingSoon.html">Términos y Condiciones</a></li>
            <li><a href="comingSoon.html">Política de Privacidad</a></li>
            <li><a href="comingSoon.html">Envíos y Devoluciones</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h4>Seguinos</h4>
            <div class="social-icons">
            <a href="comingSoon.html" aria-label="Instagram"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24"></a>
            <a href="comingSoon.html" aria-label="Facebook"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24"></a>
            <a href="comingSoon.html" aria-label="TikTok"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046127.png" alt="TikTok" width="24"></a>
            </div>
        </div>
        <div class="footer-section">
            <h4>Métodos de Pago</h4>
            <div class="payment-icons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard" width="40">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width="40">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width="60">
            </div>
        </div>
        </div>
    `;
}