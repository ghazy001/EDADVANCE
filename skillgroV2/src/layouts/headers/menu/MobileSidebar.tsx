import { Link } from "react-router-dom"
import MobileMenu from "./MobileMenu"
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"

interface MobileSidebarProps {
   isActive: boolean;
   setIsActive: (isActive: boolean) => void;
}

const MobileSidebar = ({ isActive, setIsActive }: MobileSidebarProps) => {
   const { user, logout } = useContext(AuthContext)

   const handleLogout = async () => {
      await logout()
      setIsActive(false)
   }

   return (
       <div className={isActive ? "mobile-menu-visible" : ""}>
          <div className="tgmobile__menu">
             <nav className="tgmobile__menu-box">
                <div onClick={() => setIsActive(false)} className="close-btn"><i className="tg-flaticon-close-1"></i></div>
                <div className="nav-logo">
                   <Link to="/"><img src="/assets/img/logo/logo.svg" alt="Logo" /></Link>
                </div>
                <div className="tgmobile__search">
                   <form onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="Search here..." />
                      <button><i className="fas fa-search"></i></button>
                   </form>
                </div>
                <div className="tgmobile__menu-outer">
                   <MobileMenu />
                </div>
                <div className="social-links">
                   <ul className="list-wrap">
                      <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                      <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                      <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                      <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
                      <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                   </ul>
                </div>
                {/* Add Login/Logout button with same styling */}
                <div className="mobile-login-btn" style={{ marginTop: '20px', textAlign: 'center' }}>
                   {user ? (
                       <button
                           onClick={handleLogout}
                           style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              padding: '12px 30px',
                              borderRadius: '5px',
                              backgroundColor: 'var(--tg-theme-primary)',
                              width: '100%'
                           }}
                       >
                          Log Out
                       </button>
                   ) : (
                       <Link
                           to="/login"
                           style={{
                              display: 'inline-block',
                              padding: '12px 30px',
                              borderRadius: '5px',
                              backgroundColor: 'var(--tg-theme-primary)',
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: '600',
                              width: '100%',
                              textAlign: 'center'
                           }}
                           onClick={() => setIsActive(false)}
                       >
                          Log In
                       </Link>
                   )}
                </div>
             </nav>
          </div>
          <div className="tgmobile__menu-backdrop"></div>
       </div>
   )
}

export default MobileSidebar