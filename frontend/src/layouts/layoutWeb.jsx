import { Outlet } from "react-router-dom";
import { Footer, Header, Main } from "../components";

const LayoutWeb = () => {
  return (    
        <>
          <Header />
          <Main>
            <Outlet />
          </Main>
          <Footer />
        </>
  );
};
export { LayoutWeb };
