import VeraStore from "./vera-store.tsx";
import {Provider} from "react-redux";
import configureStore from "./_store";

const App=()=>{
    return(
            <Provider store={configureStore}>
                <VeraStore/>
            </Provider>
    )
}

export default App;