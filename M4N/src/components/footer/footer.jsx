import './footer.css'
import m4n_logo from '../../assets/M4N logo.png'

function Footer(){
    return(
        <footer className='footer'>
    <div className='footer-content'>
        <div className='footer-left'>
            <img src={m4n_logo} alt='M4N Logo' className='footer-logo' />
            <p className='copyright'>© 2025 M4N. All rights reserved.</p>
        </div>
        <div className='footer-right'>
            <ul className='footer-links'>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#extra">Extra</a></li>
            </ul>
        </div>
    </div>
</footer>
    )
}
export default Footer