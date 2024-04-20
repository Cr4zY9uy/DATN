import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from '../views/authentication/login/login'
import { LayoutClient } from "../layouts/LayoutClient";
import Home from "../views/client/page/home";
import Blog_Page from "../views/client/page/blog";
import Shop from "../views/client/page/shop";
import Cart from "../views/client/page/cart";
import Checkout from "../views/client/page/checkout";
import CheckoutConfirm from "../views/client/page/checkout_confirm";
import Forget from "../views/authentication/forget/forget";
import Reset from "../views/authentication/reset/reset";
import Register from "../views/authentication/register/register";
import OrderSuccess from "../views/client/page/order_success";
import Category from "../views/client/page/category";
import { DetailUser } from "../views/client/page/DetailUser";
import { Wishlist } from "../views/client/page/Wishlist";
import ProductDetail from "../views/client/page/ProductDetail";
import { ChangePassword } from "../views/client/page/ChangePassword";
import { DetailBlog } from "../views/client/page/DetailBlog";
import Search from "../views/client/page/search";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  { path: 'forget-password', element: <Forget /> },
  { path: 'change-password/:token', element: <Reset /> },
  { path: 'register', element: <Register /> },
  // {
  //   path: 'admin',
  //   element: (
  //       <LayoutSuperAdmin />
  //   ),
  //   children: [
  //     { index: true, element: <Overview /> },
  //     { path: 'overview', element: <Overview /> },
  //     {
  //       path: 'users',

  //       element: <Outlet />,
  //       children: [
  //         { index: true, element: <ListUser /> },

  //         {
  //           path: ':user_id',
  //           element: <DetailUser />
  //         },
  //         { path: 'create', element: <CreateUser /> }
  //       ]
  //     },
  //     {
  //       path: 'partners',
  //       element: <Partners />,
  //       children: [
  //         { index: true, element: <ListOfPartners /> },
  //         { path: 'add-new-partner', element: <AddNewPartner /> },
  //         { path: ':partner_id', element: <PartnerDetail /> }
  //       ]
  //     },

  //     {
  //       path: 'address',
  //       element: <Outlet />,
  //       children: [
  //         {
  //           path: 'province-city',
  //           element: <Outlet />,
  //           children: [{ index: true, element: <ListOfProvinces /> }]
  //         },
  //         {
  //           path: 'district-town',
  //           element: <Outlet />,
  //           children: [
  //             { index: true, element: <ListOfDistrictTown /> },
  //             { path: 'add-new-district', element: <AddNewPartner /> },
  //             { path: ':district_id', element: <PartnerDetail /> }
  //           ]
  //         },
  //         {
  //           path: 'ward-commune',
  //           element: <Outlet />,
  //           children: [
  //             { index: true, element: <ListOfWardCommune /> },
  //             { path: 'add-new-ward', element: <AddNewPartner /> },
  //             { path: ':ward_id', element: <PartnerDetail /> }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },

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
  // {
  //   path: 'drugs',
  //   element: <Outlet />,
  //   children: [
  //     { index: true, element: <ListOfDrug /> },
  //     { path: 'create', element: <CreateDrug /> },
  //     {
  //       path: ':drug_id',
  //       element: <DetailDrug />,
  //       children: [
  //         {
  //           index: true,
  //           element: <Information />
  //         },
  //         {
  //           path: 'infor',
  //           element: <Information />
  //         },
  //         {
  //           path: 'variations',
  //           element: <Variant />
  //         },
  //         {
  //           path: 'sell-prices',
  //           element: <PriceTable />
  //         }
  //       ]
  //     },
  //     { path: 'create', element: <CreateDrug /> }
  //   ]
  // }

  {
    path: '/client',
    element: (
      <LayoutClient />
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'search', element: <Search /> },
      {
        path: 'blog',
        element: <Outlet />,
        children: [
          { index: true, element: <Blog_Page /> },
          {
            path: ':blog_id',
            element: <DetailBlog />
          }
        ]
      },
      {
        path: 'product/:product_id', element: <ProductDetail />
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
          { path: 'change-password', element: <ChangePassword /> }
        ]
      },
      {
        path: 'checkout',
        element: <Outlet />,
        children: [
          { index: true, element: <Checkout /> },
          { path: "confirm", element: <CheckoutConfirm /> },
          { path: "success", element: <OrderSuccess /> }

        ]
      }]
  }

])
