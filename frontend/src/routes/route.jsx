import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "../components/AuthProvider";
import { ProtectRoute } from "../components/ProtectRoute";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { LayoutClient } from "../layouts/LayoutClient";
import { ModalProvider } from "../store/modal/provider";
import { BannerList } from "../views/admin/page/banner/banner-list/Banner";
import CreateBanner from "../views/admin/page/banner/create-banner/CreateBanner";
import UpdateBanner from "../views/admin/page/banner/update-banner/UpdateBanner";
import { CategoryList } from "../views/admin/page/category/category-list/Category";
import CreateCategory from "../views/admin/page/category/create-category/CreateCategory";
import UpdateCategory from "../views/admin/page/category/update-category/UpdateCategory";
import { Overview } from "../views/admin/page/OverviewAdmin";
import CreateProduct from "../views/admin/page/product/create-product/CreateProduct";
import { DetailProduct } from "../views/admin/page/product/detail-product/DetailProduct";
import { ProductList } from "../views/admin/page/product/product-list/ProductList";
import Forget from "../views/authentication/forget/forget";
import Login from '../views/authentication/login/login';
import Register from "../views/authentication/register/register";
import Reset from "../views/authentication/reset/reset";
import Cart from "../views/client/page/cart";
import Category from "../views/client/page/category";
import { ChangePassword } from "../views/client/page/ChangePassword";
import Checkout from "../views/client/page/checkout";
import CheckoutConfirm from "../views/client/page/checkout_confirm";
import { DetailUser } from "../views/client/page/DetailUser";
import Home from "../views/client/page/home";
import OrderSuccess from "../views/client/page/order_success";
import ProductDetail from "../views/client/page/ProductDetail";
import Search from "../views/client/page/search";
import Shop from "../views/client/page/shop";
import { Wishlist } from "../views/client/page/Wishlist";
import { OrderDetail } from "../views/client/page/Orders/OrderDetail";
import { OrderList } from "../views/client/page/Orders/OrderList";
import { LastViewProductProvider } from "../store/productLastView";
import { CartProvider } from "../store/cart";
import { OrderProvider } from "../store/order/provider";
import { LogProvider } from "../store/typeLog/provider";

export const router = createBrowserRouter([
  {
    path: '/',
    element:
      (<ProtectRoute>
        <LogProvider>
          <Login />
        </LogProvider>
      </ProtectRoute>)
  },
  {
    path: 'forget-password', element:
      (<ProtectRoute>
        <LogProvider>
          <Forget />
        </LogProvider>
      </ProtectRoute>)
  },
  {
    path: 'change-password/:token', element:
      (<ProtectRoute>
        <LogProvider>
          <Reset />
        </LogProvider>
      </ProtectRoute>)
  },
  {
    path: 'register', element:
      (<ProtectRoute>
        <LogProvider>
          <Register />
        </LogProvider>
      </ProtectRoute>)
  },
  {
    path: 'admin',
    element: (
      <ProtectRoute>
        <AuthProvider>
          <ModalProvider>
            <LogProvider>
              <LayoutAdmin />
            </LogProvider>
          </ModalProvider>
        </AuthProvider>
      </ProtectRoute>),
    children: [
      { index: true, element: <Overview /> },
      { path: 'overview', element: <Overview /> },
      {
        path: 'category',
        element: <Outlet />,
        children: [
          { index: true, element: <CategoryList /> },
          { path: 'create', element: <CreateCategory /> },
          { path: ':category_id', element: <UpdateCategory /> }
        ]
      },
      {
        path: 'banner',
        element: <Outlet />,
        children: [
          { index: true, element: <BannerList /> },
          { path: 'create', element: <CreateBanner /> },
          { path: ':banner_id', element: <UpdateBanner /> }
        ]
      },
      {
        path: 'product',
        element: <Outlet />,
        children: [
          { index: true, element: <ProductList /> },
          { path: 'create', element: <CreateProduct /> },
          {
            path: ':product_id',
            element: <DetailProduct />
          }
        ]
      },

      // {
      //   path: 'users',

      //   element: <Outlet />,
      //   children: [
      //     { index: true, element: <ListUser /> },

      //     {
      //       path: ':user_id',
      //       element: <DetailUser />
      //     },
      //     { path: 'create', element: <CreateUser /> }
      //   ]
      // },
      // {
      //   path: 'partners',
      //   element: <Partners />,
      //   children: [
      //     { index: true, element: <ListOfPartners /> },
      //     { path: 'add-new-partner', element: <AddNewPartner /> },
      //     { path: ':partner_id', element: <PartnerDetail /> }
      //   ]
      // },

      // {
      //   path: 'address',
      //   element: <Outlet />,
      //   children: [
      //     {
      //       path: 'province-city',
      //       element: <Outlet />,
      //       children: [{ index: true, element: <ListOfProvinces /> }]
      //     },
      //     {
      //       path: 'district-town',
      //       element: <Outlet />,
      //       children: [
      //         { index: true, element: <ListOfDistrictTown /> },
      //         { path: 'add-new-district', element: <AddNewPartner /> },
      //         { path: ':district_id', element: <PartnerDetail /> }
      //       ]
      //     },
      //     {
      //       path: 'ward-commune',
      //       element: <Outlet />,
      //       children: [
      //         { index: true, element: <ListOfWardCommune /> },
      //         { path: 'add-new-ward', element: <AddNewPartner /> },
      //         { path: ':ward_id', element: <PartnerDetail /> }
      //       ]
      //     }
      //   ]
      // }
    ]
  },

  // {
  //   path: 'users',
  //   element: <Outlet />,
  //   children: [
  //     { index: true, element: <ListUserAdmin /> },

  //     {
  //       path: ':user_id',
  //       element: <DetailUserAdmin />
  //     },
  //     { path: 'create', element: <CreateUserAdmin /> }
  //   ]
  // },

  {
    path: '/client',
    element: (
      <ProtectRoute>
        <AuthProvider>
          <ModalProvider>
            <CartProvider>
              <LogProvider>
                <LayoutClient />
              </LogProvider>
            </CartProvider>
          </ModalProvider>
        </AuthProvider>
      </ProtectRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'search', element: <Search /> },
      {
        path: 'product/:id', element:
          <LastViewProductProvider>
            <ProductDetail />
          </LastViewProductProvider>
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'category/:category_id',
        element: <Category />
      },
      {
        path: 'user',
        element: <Outlet />,
        children: [
          { index: true, element: <DetailUser /> },
          { path: 'wishlist', element: <Wishlist /> },
          { path: 'change-password', element: <ChangePassword /> },
          {
            path: 'orders',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <OrderList />
              },
              { path: ':order_id', element: <OrderDetail /> }
            ]
          }
        ]
      },
      {
        path: 'checkout',
        element: <Outlet />,
        children: [
          {
            index: true, element:
              <OrderProvider>
                <Checkout />
              </OrderProvider>
          },
          {
            path: "confirm", element:
              <OrderProvider>
                <CheckoutConfirm />
              </OrderProvider>
          },
          { path: "success", element: <OrderSuccess /> }

        ]
      }
    ]
  }

])
