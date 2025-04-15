import { useEffect, useRef } from "react";
import HeaderOne from "../../layouts/headers/HeaderOne.tsx";
import FooterOne from "../../layouts/footers/FooterOne.tsx";

const JitsiMeet = () => {
    const jitsiContainer = useRef(null);

    useEffect(() => {
        const domain = "meet.jit.si";
        const options = {
            roomName: "PickAnAppropriateMeetingNameHere",
            width: "100%",
            height: "700px",
            parentNode: jitsiContainer.current,
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);

        return () => api.dispose();
    }, []);

    return (
        <>
            <HeaderOne />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-10">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Meeting Room</h2>
                    <p className="text-gray-600 mb-6">Invite your friends and start your video call instantly.</p>
                    <div ref={jitsiContainer} className="w-[700px] h-[700px] bg-gray-100 rounded-lg shadow-lg overflow-hidden border-4 border-blue-300" />
                </div>
            </div>
            <FooterOne />
        </>
    );
};

export default JitsiMeet;
