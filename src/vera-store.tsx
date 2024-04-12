import "./vera-store.css"
import {Loading, MainLayout, StickyHeader} from "./_components";
function VeraStore() {

  return (
    <div className={"background"}>
        <StickyHeader/>
          <MainLayout>
                <Loading/>
          </MainLayout>
    </div>
  )
}

export default VeraStore
