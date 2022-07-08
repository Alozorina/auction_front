import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './Header.css';
import Logo from "../svg/logo.svg";
import Search from "../svg/search.svg";
import ShoppingCart from "../svg/shopping-cart.svg";
import {Input} from "@nextui-org/react"

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
    const navigate = useNavigate();
    const scrollDirection = useScrollDirection();

    return (
        <div className={`navBar ${ scrollDirection === "down" ? "hidden" : "visible"}`}>
            <div className='wrapper'>
                <div className={'navItem'}>
                    <img src={Logo} className="logo" alt="icon"/>
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
                           clearable
                           contentRightStyling={false}
                           placeholder="Search Auction"
                           contentRight={
                               <img src={Search} id="search"alt="icon"/>
                           }
                    />
                    <img src={ShoppingCart} id="cart" alt="icon"/>
                </div>
                <div className={'navItem'}>
                    LOG IN
                </div>
            </div>
        </div>
    );
};