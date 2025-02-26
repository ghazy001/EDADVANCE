interface MenuItem {
    id: number;
    title: string;
    link: string;
  
   
};

const menu_data: MenuItem[] = [

    {
        id: 1,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        title: "Courses",
        link: "/cours",
    },
    {
        id: 3,
        title: "Modules",
        link: "/module",
      
    },
    {
        id: 4,
        title: "Chapters",
        link: "#",
         
        
    },
];
export default menu_data;
