import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import './Header.css';
import Logo from "../../svg/logo.svg";
import Search from "../../svg/search.svg";
import {Input, User, Tooltip, Button, Image} from "@nextui-org/react"
import {useAccessManager} from "../../services/authorization.service";
import AuthenticationService from "../../services/authentication.service";
import {AppContext} from "../AppContext";
import {MenuIcon} from "./MenuIcon";


const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };
        window.addEventListener("scroll", updateScrollDirection);
        return () => {
            window.removeEventListener("scroll", updateScrollDirection); // clean up
        }
    }, [scrollDirection]);

    return scrollDirection;
};

export const Header = () => {
    const scrollDirection = useScrollDirection();
    const {setUser} = useContext(AppContext);
    let {user} = useAccessManager();
    const [searchString, setSearchString] = useState("");
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const onChangeSearch = (e) => setSearchString(e.target.value);
    const navigate = useNavigate();
    let searchUrl = "/search?query=" + searchString;

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(searchUrl)
        }
    }

    let logOutBtn = <Button onClick={() => {
        AuthenticationService.logout();
        setUser(null)
    }}>
        LOG OUT
    </Button>;

    return (
        <nav className={`navBar ${scrollDirection === "down" ? "hidden" : "visible"}`}>
            <div className='wrapper'>
                <div>
                    <Link to='/'>
                        <Image css={{minWidth: "129px"}} src={Logo} className="logo" alt="icon"/>
                    </Link>
                </div>
                <div className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
                    <MenuIcon/>
                </div>
                <div className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                    <ul>
                        <li>
                            AUCTIONS
                        </li>
                        <li>
                            SERVICES & SUPPORT
                        </li>
                        <li>
                            <Input type="text"
                                   bordered
                                   borderWeight='light'
                                   contentRightStyling={false}
                                   placeholder="Search Auction"
                                   onChange={onChangeSearch}
                                   onKeyDown={handleSearch}
                                   contentRight={
                                       searchString ?
                                           <Link to={searchUrl}>
                                               <img src={Search} id="search" alt="icon"
                                                    onClick={() => setIsNavExpanded(!isNavExpanded)}/>
                                           </Link>
                                           : <img src={Search} id="search" alt="icon"/>
                                   }
                            />
                        </li>
                        {user && <li>
                            <Link to="/profile" onClick={() => setIsNavExpanded(!isNavExpanded)}>
                                <Tooltip
                                    trigger="hover"
                                    placement="bottom"
                                    hideArrow
                                    content={logOutBtn}>
                                    <User
                                        name={user.firstName + " " + user.lastName}
                                        squared
                                        text={user.firstName[0]}
                                    />
                                </Tooltip>
                            </Link>
                        </li>}
                        {!user && <li>
                            <Link to="/login" onClick={() => setIsNavExpanded(!isNavExpanded)}>
                                LOG IN
                            </Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
    );
};