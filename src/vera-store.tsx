import "./vera-store.css"
import {MainLayout, StickyHeader} from "./_components";
import {HomePage, NewFilmPage} from "./pages";
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./_routes/AppRoutes.tsx";
function VeraStore() {

  return (
      <BrowserRouter>
    <div className={"background"}>
        <StickyHeader/>
          <MainLayout>
              <AppRoutes/>
          </MainLayout>
    </div>
      </BrowserRouter>
  )
}

export default VeraStore
