import HeaderTopThree from "./menu/HeaderTopThree"
import { useState } from "react"
import NavMenuOne from "./menu/NavMenu"
import MobileSidebar from "./menu/MobileSidebar"
import UseSticky from "../../hooks/UseSticky"
import { Link } from "react-router-dom"
import InjectableSvg from "../../hooks/InjectableSvg"
import TotalCart from "../../components/common/TotalCart"

const HeaderEight = () => {

  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <header>
        <div id="header-fixed-height"></div>
        <HeaderTopThree />
        <div className="tg-header__logo-area">
          <div className="container">
            <div className="logo text-center">
              <Link to="/"><img src="/assets/img/logo/logo.svg" alt="Logo" /></Link>
            </div>
          </div>
        </div>
        <div id="sticky-header" className={`tg-header__area tg-header__style-eight ${sticky ? "sticky-menu" : ""}`}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav">
                    <div className="logo d-none">
                      <Link to="/"><img src="/assets/img/logo/logo.svg" alt="Logo" /></Link>
                    </div>
                    <div className="tg-header__contact">
                      <div className="icon">
                        <i className="skillgro-phone-call"></i>
                      </div>
                      <div className="content">
                        <span>Call to Question</span>
                        <Link to="tel:0123456789">+123 599 8989</Link>
                      </div>
                    </div>
                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                      <NavMenuOne />
                    </div>
                    <div className="tgmenu__action tgmenu__action-five tgmenu__action-eight">
                      <ul className="list-wrap">
                        <li className="header-user">
                          <Link to="/instructor-dashboard"><InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" /></Link>
                        </li>
                        <li className="mini-cart-icon">
                          <Link to="/cart" className="cart-count">
                            <InjectableSvg src="/assets/img/icons/cart.svg" className="injectable" alt="img" />
                            <TotalCart />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mobile-login-btn">
                      <Link to="/login"><InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" /></Link>
                    </div>
                    <div onClick={() => setIsActive(true)} className="mobile-nav-toggler"><i className="tg-flaticon-menu-1"></i></div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
    </>
  )
}

export default HeaderEight
