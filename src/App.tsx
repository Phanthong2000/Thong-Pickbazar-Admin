import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import { themeSelector } from "./redux/slices/themeSlice";
import Router from "./routes";
import "./theme/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import Redux from "./utils/Redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Redux />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
