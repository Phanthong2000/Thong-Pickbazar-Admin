import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import { themeSelector } from "./redux/slices/themeSlice";
import Router from "./routes";
import "./theme/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/js/src/collapse.js";
import 'rsuite/dist/rsuite.min.css';
import "react-datepicker/dist/react-datepicker.css";
import Redux from "./utils/Redux";
import { settingSelector } from "./redux/slices/settingSlice";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const setting = useSelector(settingSelector);
  return (
    <QueryClientProvider client={queryClient}>
      <Redux />
      {
        setting && <Router />
      }
    </QueryClientProvider>
  );
}

export default App;
