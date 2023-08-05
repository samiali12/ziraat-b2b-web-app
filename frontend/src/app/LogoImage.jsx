import Logo from '../assets/img/ziraat-logo.png'

const LogoImage = ({title}) => {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-20 w-auto"
                    src={Logo}
                    alt="Ziraat B2b"
                />
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
                   {title}
                </h2>
            </div>
    )
}

export default LogoImage;