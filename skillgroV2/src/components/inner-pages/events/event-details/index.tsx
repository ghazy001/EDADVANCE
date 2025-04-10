import FooterOne from "../../../../layouts/footers/FooterOne"
import HeaderOne from "../../../../layouts/headers/HeaderOne"
import BreadcrumbOne from "../../../common/breadcrumb/BreadcrumbOne"
import EventDetailsArea from "./EventDetailsArea"

const EventDetails = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Resolving Conflicts Between Designers" sub_title="Events" sub_title_2="Resolving Conflicts Between Designers" style={true} />
            <EventDetailsArea />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default EventDetails

