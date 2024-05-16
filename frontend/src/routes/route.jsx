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
import { FavouriteProvider } from "../store/favourite";
import { ListOfUser } from "../views/admin/page/user/ListOfUser";
import { CrudUser } from "../views/admin/page/user/CrudUser";
import { ListOfCustomer } from "../views/admin/page/customer/ListOfCustomer";
import { DetailCustomer } from "../views/admin/page/customer/DetailCustomer";
import { ListOfOrder } from "../views/admin/page/order/ListOfOrder";
import { DetailOrder } from "../views/admin/page/order/DetailOrder";
import UpdateProduct from "../views/admin/page/product/detail-product/update-product/UpdateProduct";
import { ListOfComment } from "../views/admin/page/product/detail-product/comment/ListOfComment";
import { ListOfRating } from "../views/admin/page/product/detail-product/rating/ListOfRating";
import { DetailRating } from "../views/admin/page/product/detail-product/rating/DetailRating";
import { DetailComment } from "../views/admin/page/product/detail-product/comment/DetailComment";
import { ListOfSale } from "../views/admin/page/sale/ListOfSale";
import { DetailSale } from "../views/admin/page/sale/DetailSale";
import { ListOfConsignment } from "../views/admin/page/consignment/ListOfConsignment";
import { DetailConsignment } from "../views/admin/page/consignment/DetailConsignment";
import { Infomation } from "../views/admin/page/customer/Information";
import { ListOfOrderCustomer } from "../views/admin/page/customer/customer_order/ListOfOrderCustomer";
import { DetailOrderCustomer } from "../views/admin/page/customer/customer_order/DetailOrderCustomer";
import PageNotFound from "../views/admin/page/404notfound";
import { ManageChat } from "../views/admin/page/chat/ManageChat";
import { SupportChat } from "../views/admin/page/chat/SupportChat";

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
            element: <DetailProduct />,
            children: [
              { index: true, element: <UpdateProduct /> },
              { path: 'comments', element: <ListOfComment /> },
              {
                path: 'ratings', element: <Outlet />, children: [
                  { index: true, element: <ListOfRating /> },
                  { path: ":rating_id", element: <DetailRating /> }
                ]
              },
              {
                path: 'comments', element: <Outlet />, children: [
                  { index: true, element: <ListOfComment /> },
                  { path: ":comment_id", element: <DetailComment /> }
                ]
              },
            ]
          }
        ]
      },
      {
        path: 'users',
        element: <Outlet />,
        children: [
          { index: true, element: <ListOfUser /> },
          { path: 'create', element: <CrudUser /> },
          {
            path: ':user_id',
            element: <CrudUser />
          }
        ]
      },
      {
        path: 'customers',
        element: <Outlet />,
        children: [
          { index: true, element: <ListOfCustomer /> },
          {
            path: ':user_id',
            element: <Infomation />,
            children: [
              { index: true, element: <DetailCustomer /> },
              {
                path: 'orders', element: <Outlet />, children: [
                  { index: true, element: <ListOfOrderCustomer /> },
                  { index: ':order_id', element: <DetailOrderCustomer /> }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'orders',
        element: <Outlet />,
        children: [
          { index: true, element: <ListOfOrder /> },
          {
            path: ':order_id',
            element: <DetailOrder />
          }
        ]
      },
      {
        path: 'sales',
        element: <Outlet />,
        children: [
          { index: true, element: <ListOfSale /> },
          {
            path: ':sale_id',
            element: <DetailSale />
          },
          {
            path: 'create',
            element: <DetailSale />
          }
        ]
      },
      {
        path: 'consignment',
        element: <Outlet />,
        children: [
          { index: true, element: <ListOfConsignment /> },
          {
            path: ':consignment_id',
            element: <DetailConsignment />
          },
          {
            path: 'create',
            element: <DetailConsignment />
          },
        ]
      },
      {
        path: 'customer-support',
        element: <Outlet />,
        children: [
          { index: true, element: <ManageChat /> },
          {
            path: ':chat_id',
            element: <SupportChat />
          },

        ]
      }
    ]
  },
  {
    path: '/client',
    element: (
      <ProtectRoute>
        <AuthProvider>
          <ModalProvider>
            <CartProvider>
              <LogProvider>
                <FavouriteProvider>
                  <LayoutClient />
                </FavouriteProvider>
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
  },
  {
    path: '*', element: <PageNotFound />
  }

])
