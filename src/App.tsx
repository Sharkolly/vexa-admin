import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
// const AddToCart = lazy(() => import("./pages/AddToCart"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const NotFound = lazy(() => import("./pages/404"));
const VendorDashboard = lazy(() => import("./pages/Dashboard"));
const Layout = lazy(() => import("../components/ui/Layout"));
const ProductForm = lazy(() => import("./pages/AddProductPage"));
const Edit = lazy(() => import("./pages/Edit"));
const Order = lazy(() => import("./pages/Order"));
const Settings = lazy(() => import("./pages/Settings"));
const Products = lazy(() => import("./pages/Products"));
const LayoutNoFooter = lazy(() => import("../components/ui/LayoutNoFooter"));
const ForgotPassword = lazy(() => import("./pages/auth/forgot-password"));
const ProtectedRoute = lazy(() => import("../components/ProtectedRoute"));
const RedirectRoute = lazy(() => import("../components/RedirectRoute"));
import Loader from "../components/Loader";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/login"
          element={
            <RedirectRoute>
              <SignIn />
            </RedirectRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectRoute>
              <SignUp />
            </RedirectRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectRoute>
              <ForgotPassword />
            </RedirectRoute>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <VendorDashboard/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-form"
            element={
              <ProtectedRoute>
                <ProductForm />
               </ProtectedRoute>
            }
          />
          <Route
            path="/my-product"
            element={
              <ProtectedRoute>
                <Products />
               </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
               </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
               </ProtectedRoute>
            }
          />
          <Route
            path="/edit-product"
            element={
              <ProtectedRoute>
                <Edit />
               </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={              
                <VendorDashboard />              
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/" element={<LayoutNoFooter />}></Route>
      </Route>,
    ),
  );

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
