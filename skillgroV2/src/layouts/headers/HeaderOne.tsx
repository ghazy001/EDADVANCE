import HeaderTopOne from "./menu/HeaderTopOne"
import NavMenu from "./menu/NavMenu"
import React, { useState, useContext } from "react"
import MobileSidebar from "./menu/MobileSidebar"
import UseSticky from "../../hooks/UseSticky"
import { Link } from "react-router-dom"
import InjectableSvg from "../../hooks/InjectableSvg"
import CustomSelect from "../../ui/CustomSelect"
import TotalWishlist from "../../components/common/TotalWishlist"
import TotalCart from "../../components/common/TotalCart"
import { AuthContext } from "../../context/AuthContext"

const HeaderOne = () => {
   const { user, logout } = useContext(AuthContext);
   const [selectedOption, setSelectedOption] = React.useState(null);
   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState<boolean>(false);

   const handleSelectChange = (option: React.SetStateAction<null>) => {
      setSelectedOption(option);
   };

   const handleLogout = async () => {
      await logout();
      window.location.href = '/';
   };

   return (
       <>
          <header>
             <HeaderTopOne style={false} />
             <div id="header-fixed-height"></div>
             <div id="sticky-header" className={`tg-header__area ${sticky ? "sticky-menu" : ""}`}>
                <div className="container custom-container">
                   <div className="row">
                      <div className="col-12">
                         <div className="tgmenu__wrap">
                            <nav className="tgmenu__nav">
                               <div className="logo">
                                  <Link to="/"><img src="/assets/img/logo/logo.svg" alt="Logo" /></Link>
                               </div>
                               <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                  <NavMenu />
                               </div>
                               <div className="tgmenu__search d-none d-md-block">
                                  <CustomSelect value={selectedOption} onChange={handleSelectChange} />
                               </div>
                               <div className="tgmenu__action">
                                  <ul className="list-wrap">
                                     <li className="wishlist-icon">
                                        <Link to="/wishlist" className="cart-count">
                                           <InjectableSvg src="/assets/img/icons/heart.svg" className="injectable" alt="img" />
                                           <TotalWishlist />
                                        </Link>
                                     </li>
                                     <li className="mini-cart-icon">
                                        <Link to="/cart" className="cart-count">
                                           <InjectableSvg src="/assets/img/icons/cart.svg" className="injectable" alt="img" />
                                           <TotalCart />
                                        </Link>
                                     </li>
                                     {user ? (
                                         <>
                                            <li className="header-btn">
                                               <Link to={user.role === 'instructor' ? '/instructor-dashboard' : '/student-dashboard'}  >
                                                  Dashboard
                                               </Link>
                                            </li>
                                            <li className="header-btn login-btn" onClick={handleLogout}>
                                               <button className="btn" >Logout</button>
                                            </li>
                                         </>
                                     ) : (
                                         <li className="header-btn login-btn">
                                            <Link to="/login">Login</Link>
                                         </li>
                                     )}
                                  </ul>
                               </div>
                               <div className="mobile-login-btn">
                                  <Link to={user ? (user.role === 'instructor' ? '/instructor-dashboard' : '/student-dashboard') : '/login'}>
                                     <InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" />
                                  </Link>
                               </div>
                               <div onClick={() => setIsActive(true)} className="mobile-nav-toggler">
                                  <i className="tg-flaticon-menu-1"></i>
                               </div>
                            </nav>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </header>
          <MobileSidebar isActive={isActive} setIsActive={setIsActive} user={user} logout={logout} />
       </>
   )
}

export default HeaderOne