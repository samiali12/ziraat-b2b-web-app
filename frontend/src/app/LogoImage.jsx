import Logo from '../assets/img/website-logo.png'

const LogoImage = ({ title }) => {
    return (
        <div className="block items-center">
            <a href="#" class="flex items-center p-3">
                <img src={Logo} alt="Logo" class="h-auto w-40 mr-2" />
            </a>
        </div>
    )
}

export default LogoImage;