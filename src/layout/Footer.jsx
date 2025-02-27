import "../css/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2025 LocalEvents. Todos los derechos reservados.</p>
            <p>
                <a href="/about">Sobre nosotros</a> | 
                <a href="/privacy">Política de privacidad</a> | 
                <a href="/terms">Términos de servicio</a>
            </p>
        </footer>
    );
};

export default Footer;