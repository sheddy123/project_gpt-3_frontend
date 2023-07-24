import ReactDOM from "react-dom/client";
import "./styles/main.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.tsx";
import { AuthProvider } from "./utils/Helpers/authprovider.tsx";
import { ContextProvider } from "./utils/Helpers/ContextProvider.tsx";
import RoutePages from "./routes/RoutesPages.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ContextProvider>
        <AuthProvider>
          <RoutePages />
        </AuthProvider>
      </ContextProvider>
    </BrowserRouter>
  </Provider>
  //</React.StrictMode>,
);
