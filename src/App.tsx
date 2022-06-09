import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import { themeSelector } from "./redux/slices/themeSlice";
import Router from "./routes";
import "./theme/css/style.css";
import "bootstrap/dist/css/bootstrap.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const theme = useSelector(themeSelector);
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
