import { Link } from "react-router-dom";
import menu_data from "../../../data/home-data/MenuData";
import { useEffect, useState } from "react";

const NavMenu = () => {
   const [navClick, setNavClick] = useState<boolean>(false);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [navClick]);

   return (
      <ul className="navigation">
         {menu_data.map((menu) => (
            <li key={menu.id} className="menu-item-has-children">
               <Link onClick={() => setNavClick(!navClick)} to={menu.link}>{menu.title}</Link>
               <ul className={`sub-menu ${menu.menu_class}`}>
                  {menu.home_sub_menu ? (
                     <>
                        {menu.home_sub_menu.map((h_menu_details, i) => (
                           <li key={i}>
                              <ul className="list-wrap mega-sub-menu">
                                 {h_menu_details.menu_details.map((h_menu, index) => (
                                    <li key={index}>
                                       <Link onClick={() => setNavClick(!navClick)} to={h_menu.link}>
                                          {h_menu.title} <span className={h_menu.badge_class}>{h_menu.badge}</span>
                                       </Link>
                                    </li>
                                 ))}
                              </ul>
                           </li>
                        ))}

                        <li>
                           <div className="mega-menu-img">
                              <Link onClick={() => setNavClick(!navClick)} to="/courses">
                                 <img src="/assets/img/others/mega_menu_img.jpg" alt="img" />
                              </Link>
                           </div>
                        </li>
                     </>
                  ) : (
                     menu.sub_menus?.map((sub_m, index) => (
                        <li key={index} className="menu-item-has-children">
                           <Link onClick={() => setNavClick(!navClick)} to={sub_m.link}>{sub_m.title}</Link>
                           {sub_m.mega_menus && (
                              <ul className="sub-menu">
                                 {sub_m.mega_menus?.map((mega_m, i) => (
                                    <li key={i}>
                                       <Link onClick={() => setNavClick(!navClick)} to={mega_m.link}>{mega_m.title}</Link>
                                    </li>
                                 ))}
                              </ul>
                           )}
                        </li>
                     ))
                  )}
               </ul>
            </li>
         ))}
      </ul>
   );
};

export default NavMenu;
