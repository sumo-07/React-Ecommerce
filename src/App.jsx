import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./Pages/Home";
import { Products } from "./Pages/Products";
import { ProductDetails } from "./Pages/ProductDetails";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Checkout } from "./Pages/Checkout";
import { Cart } from "./Pages/Cart";
import { ErrorPage } from "./Pages/ErrorPage";
import "./App.css"
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ]
  }
])

const queryClient = new QueryClient();

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
}

export default App;