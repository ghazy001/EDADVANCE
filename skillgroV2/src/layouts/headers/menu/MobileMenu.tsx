import { useState } from "react";
import menu_data from "../../../data/home-data/MenuData";
import { Link } from "react-router-dom";

interface MenuItem {
   id: number;
   title: string;
   link: string;
   menu_class?: string;
   home_sub_menu?: {
      menu_details: {
         title: string;
         link: string;
         badge_class?: string;
         badge?: string;
      }[];
   }[];
   sub_menus?: {
      title: string;
      link: string;
      dropdown?: boolean;
      mega_menus?: {
         title: string;
         link: string;
      }[];
   }[];
}

const MobileMenu = () => {
   
   const [navTitle, setNavTitle] = useState<string | null>(null);
   const [subNavTitle, setSubNavTitle] = useState<string | null>(null);

   // openMobileMenu
   const openMobileMenu = (menu: string) => {
      setNavTitle(navTitle === menu ? null : menu);
   };

   // openMobileSubMenu
   const openMobileSubMenu = (sub_m: string) => {
      setSubNavTitle(subNavTitle === sub_m ? null : sub_m);
   };

   return (
      <ul className="navigation">
         {menu_data.map((menu: MenuItem) => (
            <li key={menu.id} className="menu-item-has-children">
               <Link to={menu.link}>{menu.title}</Link>
               <ul
                  className={`sub-menu ${menu.menu_class}`}
                  style={{ display: navTitle === menu.title ? "block" : "none" }}
               >
                  {menu.home_sub_menu ? (
                     <>
                        {menu.home_sub_menu.map((h_menu_details, i) => (
                           <li key={i}>
                              <ul className="list-wrap mega-sub-menu">
                                 {h_menu_details.menu_details.map((h_menu, index) => (
                                    <li key={index}>
                                       <Link to={h_menu.link}>
                                          {h_menu.title}{" "}
                                          {h_menu.badge && (
                                             <span className={h_menu.badge_class}>{h_menu.badge}</span>
                                          )}
                                       </Link>
                                    </li>
                                 ))}
                              </ul>
                           </li>
                        ))}

                        <li>
                           <div className="mega-menu-img">
                              <Link to="/courses">
                                 <img
                                    src="/assets/img/others/mega_menu_img.jpg"
                                    alt="img"
                                 />
                              </Link>
                           </div>
                        </li>
                     </>
                  ) : (
                     menu.sub_menus?.map((sub_m, index) => (
                        <li
                           key={index}
                           className={`${sub_m.dropdown ? "menu-item-has-children" : ""
                              }`}
                        >
                           <Link to={sub_m.link}>{sub_m.title}</Link>
                           {sub_m.mega_menus && (
                              <ul
                                 className="sub-menu"
                                 style={{
                                    display: subNavTitle === sub_m.title ? "block" : "none",
                                 }}
                              >
                                 {sub_m.mega_menus.map((mega_m, i) => (
                                    <li key={i}>
                                       <Link to={mega_m.link}>{mega_m.title}</Link>
                                    </li>
                                 ))}
                              </ul>
                           )}
                           {sub_m.mega_menus && (
                              <div
                                 className={`dropdown-btn ${subNavTitle === sub_m.title ? "open" : ""
                                    }`}
                                 onClick={() => openMobileSubMenu(sub_m.title)}
                              >
                                 <span className="plus-line"></span>
                              </div>
                           )}
                        </li>
                     ))
                  )}
               </ul>
               <div
                  className={`dropdown-btn ${navTitle === menu.title ? "open" : ""}`}
                  onClick={() => openMobileMenu(menu.title)}
               >
                  <span className="plus-line"></span>
               </div>
            </li>
         ))}
      </ul>
   );
};

export default MobileMenu;
