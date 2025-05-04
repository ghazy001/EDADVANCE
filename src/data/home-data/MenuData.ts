interface MenuItem {
    id: number;
    title: string;
    link: string;
    menu_class?: string;
    home_sub_menu?: {
        menu_details: {
            link: string;
            title: string;
            badge?: string;
            badge_class?: string;
        }[];
    }[];
    sub_menus?: {
        link: string;
        title: string;
        dropdown?: boolean;
        mega_menus?: {
            link: string;
            title: string;
        }[];
    }[];
};

const menu_data: MenuItem[] = [

    {
        id: 1,
        title: "Home",
        link: "#",
        menu_class: "mega-menu",
        home_sub_menu: [
            {
                menu_details: [
                    { link: "/", title: "Main Home" },
                    { link: "/home-two", title: "Online Course", badge_class: "tg-badge", badge: "Hot" },
                    { link: "/home-three", title: "University", badge_class: "tg-badge-two", badge: "New" },
                    { link: "/home-four", title: "Yoga Instructor", badge_class: "tg-badge-two", badge: "New" },
                    { link: "/home-five", title: "Kindergarten", badge_class: "tg-badge", badge: "Hot" },]
            },
            {
                menu_details: [
                    { link: "/home-six", title: "Language Academy", badge_class: "tg-badge-two", badge: "New" },
                    { link: "/home-seven", title: "Business Coach", badge_class: "tg-badge-two", badge: "New" },
                    { link: "/home-eight", title: "Kitchen Coach", badge_class: "tg-badge", badge: "Hot" },]
            },
        ],
    },
    {
        id: 2,
        title: "Courses",
        link: "#",
        sub_menus: [
            { link: "/courses", title: "All Courses" },
            { link: "/course-details", title: "Course Details" },
            { link: "/lesson", title: "Course Lesson" },
        ],
    },
    {
        id: 3,
        title: "Pages",
        link: "#",
        sub_menus: [
            { link: "/about-us", title: "About Us", },
            {
                link: "#",
                title: "Our Instructors",
                dropdown: true,
                mega_menus: [
                    { link: "/instructors", title: "Our Instructors", },
                    { link: "/instructor-details", title: "Instructor Details", },
                ]
            },
            {
                link: "#",
                title: "Our Events",
                dropdown: true,
                mega_menus: [
                    { link: "/events", title: "Our Events", },
                    { link: "/events-details", title: "Event Details", },
                ]
            },
            {
                link: "#",
                title: "Shop",
                dropdown: true,
                mega_menus: [
                    { link: "/shop", title: "Shop" },
                    { link: "/shop-details", title: "Shop Details" },
                    { link: "/wishlist", title: "Wishlist" },
                    { link: "/cart", title: "Cart Page" },
                    { link: "/check-out", title: "Checkout" },
                ]
            },
            {
                link: "#",
                title: "Blog",
                dropdown: true,
                mega_menus: [
                    { link: "/blog", title: "Blog Right Sidebar" },
                    { link: "/blog-2", title: "Blog Left Sidebar" },
                    { link: "/blog-3", title: "Blog Full Width" },
                    { link: "/blog-details", title: "Blog Details" },
                ]
            },
            { link: "/login", title: "Student Login" },
            { link: "/registration", title: "Student Registration" },
            { link: "/404", title: "404 Page" },
            { link: "/contact", title: "Contact" },
        ],
    },
    {
        id: 4,
        title: "Dashboard",
        link: "#",
        sub_menus: [
            {
                link: "#",
                title: "Instructor Dashboard",
                dropdown: true,
                mega_menus: [
                    { link: "/instructor-dashboard", title: "Dashboard" },
                    { link: "/instructor-profile", title: "Profile" },
                    { link: "/instructor-enrolled-courses", title: "Enrolled Courses" },
                    { link: "/instructor-wishlist", title: "Wishlist" },
                    { link: "/instructor-review", title: "Reviews" },
                    { link: "/instructor-attempts", title: "My Quiz Attempts" },
                    { link: "/instructor-history", title: "Order History" },
                    { link: "/instructor-courses", title: "My Course" },
                    { link: "/instructor-announcement", title: "Announcements" },
                    { link: "/instructor-quiz", title: "Quiz Attempts" },
                    { link: "/instructor-assignment", title: "Assignments" },
                    { link: "/instructor-setting", title: "Settings" },
                ]
            },
            {
                link: "#",
                title: "Student Dashboard",
                dropdown: true,
                mega_menus: [
                    { link: "/student-dashboard", title: "Dashboard" },
                    { link: "/student-profile", title: "Profile" },
                    { link: "/student-enrolled-courses", title: "Enrolled Courses" },
                    { link: "/student-wishlist", title: "Wishlist" },
                    { link: "/student-review", title: "Reviews" },
                    { link: "/student-attempts", title: "My Quiz Attempts" },
                    { link: "/student-history", title: "Order History" },
                    { link: "/student-setting", title: "Settings" },
                ]
            },
        ],
    },
];
export default menu_data;
