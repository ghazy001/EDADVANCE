import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import LoginArea from "./LoginArea"

const Login = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <LoginArea />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default Login

