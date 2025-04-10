import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import MotionAnimation from "../hooks/MotionAnimation";
import ScrollToTop from "../components/common/ScrollToTop";

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {

    useEffect(() => {
        AOS.init();
    }, []);

    MotionAnimation();

    return (
        <>
            {children}
            <ScrollToTop />
            <ToastContainer position="top-center" />
        </>
    );
}

export default Wrapper;
