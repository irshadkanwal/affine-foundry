import React from "react";
import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
const client = new QueryClient();

const ReactQueryProvider = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
const customRender = (ui, options) =>
  render(ui, { wrapper: ReactQueryProvider, ...options });

export * from "@testing-library/react";

export { customRender as render };
