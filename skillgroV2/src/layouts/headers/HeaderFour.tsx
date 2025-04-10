import { useState } from "react"
import NavMenuOne from "./menu/NavMenu"
import MobileSidebar from "./menu/MobileSidebar"
import UseSticky from "../../hooks/UseSticky"
import { Link } from "react-router-dom"
import InjectableSvg from "../../hooks/InjectableSvg"
import TotalCart from "../../components/common/TotalCart"
import BtnArrow from "../../svg/BtnArrow"
import HeaderSearch from "./menu/HeaderSearch"
import HeaderOffCanvas from "./menu/HeaderOffCanvas"

const HeaderFour = () => {

   const [isSearch, setIsSearch] = useState<boolean>(false);
   const [offcanvas, setOffcamvas] = useState<boolean>(false);
   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState<boolean>(false);

   return (
      <header className="transparent-header">
         <div id="header-fixed-height"></div>
         <div id="sticky-header" className={`tg-header__area tg-header__style-four ${sticky ? "sticky-menu" : ""}`}>
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="tgmenu__wrap">
                        <nav className="tgmenu__nav">
                           <div className="logo">
                              <Link to="/"><img src="/assets/img/logo/logo.svg" alt="Logo" /></Link>
                           </div>
                           <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                              <NavMenuOne />
                           </div>
                           <div className="tgmenu__action tgmenu__action-four">
                              <ul className="list-wrap">
                                 <li className="header-search">
                                    <a onClick={() => setIsSearch(true)} style={{ cursor: "pointer" }} className="search-open-btn">
                                       <i className="flaticon-search"></i>
                                    </a>
                                 </li>
                                 <li className="mini-cart-icon">
                                    <Link to="/cart" className="cart-count">
                                       <InjectableSvg src="assets/img/icons/cart.svg" className="injectable" alt="img" />
                                       <TotalCart />
                                    </Link>
                                 </li>
                                 <li className="header-btn">
                                    <Link to="/login" className="btn arrow-btn">Try For Free <BtnArrow /></Link>
                                 </li>
                                 <li className="offCanvas-menu">
                                    <a onClick={() => setOffcamvas(true)} style={{ cursor: "pointer" }} className="menu-tigger">
                                       <InjectableSvg src="/assets/img/icons/offCanvas_icon.svg" alt="" className="injectable" />
                                    </a>
                                 </li>
                              </ul>
                           </div>
                           <div className="mobile-login-btn mobile-login-btn-two">
                              <Link to="/login"><InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" /></Link>
                           </div>
                           <div onClick={() => setIsActive(true)} className="mobile-nav-toggler"><i className="tg-flaticon-menu-1"></i></div>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <HeaderSearch isSearch={isSearch} setIsSearch={setIsSearch} />
         <HeaderOffCanvas offcanvas={offcanvas} setOffcamvas={setOffcamvas} />
         <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
      </header>
   )
}

export default HeaderFour
