import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import './Header.css';
import Logo from "../svg/logo.svg";
import Search from "../svg/search.svg";
import ShoppingCart from "../svg/shopping-cart.svg";
import {Input, User, Tooltip, Button} from "@nextui-org/react"
import {useAccessManager} from "../services/authorization.service";
import AuthenticationService from "../services/authentication.service";
import {AppContext} from "./AppContext";

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
        window.addEventListener("scroll", updateScrollDirection); // add event listener
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
        <div className={`navBar ${scrollDirection === "down" ? "hidden" : "visible"}`}>
            <div className='wrapper'>
                <div className={'navItem'}>
                    <Link to='/'>
                        <img src={Logo} className="logo" alt="icon"/>
                    </Link>
                </div>
                <div className={'navItem'}>
                </div>
                <div className={'navItem'}>
                    AUCTIONS
                </div>
                <div className={'navItem'}>
                    SERVICES & SUPPORT
                </div>
                <div className={'navItem'}>
                    <Input css={{position: "relative"}}
                           width='300px'
                           type="text"
                           bordered
                           borderWeight='light'
                           contentRightStyling={false}
                           placeholder="Search Auction"
                           onChange={onChangeSearch}
                           onKeyDown={handleSearch}
                           contentRight={
                               searchString ?
                                   <Link to={searchUrl}> <img src={Search} id="search"
                                                              alt="icon"/></Link>
                                   : <img src={Search} id="search" alt="icon"/>
                           }
                    />
                    <img src={ShoppingCart} id="cart" alt="icon"/>
                </div>

                {user && <div className={'navItem'}>
                    <Link to="/profile">
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
                    </div>}

                {!user && <div className={'navItem'}>
                    <Link to="/login">
                        LOG IN
                    </Link>
                </div>}
            </div>
        </div>
    );
};