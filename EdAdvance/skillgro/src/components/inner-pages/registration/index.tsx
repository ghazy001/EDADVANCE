import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import RegistrationArea from "./RegistrationArea"

const Registration = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <RegistrationArea />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default Registration

