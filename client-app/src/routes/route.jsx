import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from '../views/authentication/login/login'
import { LayoutClient } from "../layouts/LayoutClient";
import Home from "../views/client/page/home";
import Blog_Page from "../views/client/page/blog";
import Shop from "../views/client/page/shop";
import Cart from "../views/client/page/cart";
import Checkout from "../views/client/page/checkout";
import Checkout_confirm from "../views/client/page/checkout_confirm";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Outlet />
    ),
    children: [
      { index: true, element: <Login /> },
      {
        path: 'login',
        element: <Outlet />,
        // children: [
        //   {
        //     index: true,
        //     element: <Login />
        //   },
        //   { path: 'noti-sent-email', element: <NotiSentEmail /> },
        //   { path: 'forget-password', element: <ForgetPassword /> },
        //   { path: 'change-password/:token', element: <ChangePassword /> }
        // ]
      },
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
      {
        path: 'client',
        element: (
          <LayoutClient />
        ),
        children: [
          { index: true, element: <Home /> },
          { path: 'home', element: <Home /> },
          {
            path: 'blog',
            element: <Outlet />,
            children: [
              { index: true, element: <Blog_Page /> },
              // {
              //   path: ':blog_id',
              //   element: <UpdateBranch />
              // }
            ]
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
            path: 'checkout',
            element: <Outlet />,
            children: [
              { index: true, element: <Checkout /> },
              // { path: "confirm", element: <Checkout_confirm /> }
            ]
          }
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
        ]
      }
    ]
  }
])
