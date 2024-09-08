import LogoutButton from "@/widgets/buttons/LogoutButton.tsx";
import UserInfo from "@/widgets/user/UserInfo.tsx";
import {Suspense} from "react";
import {Spinner} from "@/ui/spinner.tsx";
import Container from "@/layouts/Container.tsx";
import logo from "@/assets/logo.svg";
import {Link} from "react-router-dom";
import HeaderNavigation from "@/features/topBar/HeaderNavigation.tsx";

const AccountTopBar = () => {
    return (
        <header className="bg-gray-100">
            <Container>
                <div className="flex items-center justify-between h-[64px]">
                    <div className="flex justify-center items-center space-x-8">
                        <Link to="/account"><img src={logo} alt="money tracker" className="max-h-6"/></Link>
                        <HeaderNavigation/>
                    </div>
                    <div className="flex items-center">
                        <Suspense fallback={<Spinner/>}>
                            <UserInfo/>
                        </Suspense>
                        <LogoutButton/>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default AccountTopBar;
