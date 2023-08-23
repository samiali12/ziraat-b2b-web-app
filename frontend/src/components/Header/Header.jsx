import BannerSection from "./Banner";
import NavigationBar from "./NavigationBar"
import SecondaryNavigation from "./SecondaryNavigation";

const Header = () => {
    return (
        <div>
            <NavigationBar /> 
            <BannerSection />
            <SecondaryNavigation /> 

        </div>

    )
}

export default Header;