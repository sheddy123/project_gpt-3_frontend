import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.tsx";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</React.StrictMode>,
);
