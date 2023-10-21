import Logo from '../assets/img/website-logo.png'
import { Link } from 'react-router-dom';

const LogoImage = ({ title }) => {
    return (
        <div className="block items-center">
            <Link to="/" className="flex items-center p-3">
                <img src={Logo} alt="Logo" class="h-auto w-40 mr-2" />
            </Link>
        </div>
    )
}

export default LogoImage;