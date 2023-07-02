import ReactDOM from "react-dom/client";
import "./styles/main.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.tsx";
import { AuthProvider } from "./utils/Helpers/authprovider.tsx";
import RoutePages from "./routes/RoutesPages.tsx";
import { BrowserRouter } from "react-router-dom";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <RoutePages />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
  //</React.StrictMode>,
);
