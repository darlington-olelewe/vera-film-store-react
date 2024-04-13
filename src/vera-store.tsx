import "./vera-store.css"
import {MainLayout, StickyHeader} from "./_components";
import {HomePage} from "./pages";
function VeraStore() {

  return (
    <div className={"background"}>
        <StickyHeader/>
          <MainLayout>
                <HomePage/>
          </MainLayout>
    </div>
  )
}

export default VeraStore
