import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROLE } from '../enum/roleUser'
import { UserContext } from '../store/user'


export const ProtectRoute = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = useContext(UserContext)
    const userRole = state?.currentUser?.role
    useEffect(() => {
        if (!state.currentUser) {
            if (location.pathname.includes("/client/cart")
                || location.pathname.includes("/client/checkout")
                || location.pathname.includes("/client/checkout/confirm")
                || location.pathname.includes("/client/checkout/success")
                || location.pathname.includes("/client/checkout/user")
            ) {
                navigate('/client', { replace: true })
            }
            if (location.pathname.startsWith('/client')
                || location.pathname.startsWith('/register')
                || location.pathname.startsWith('/forget-password')
                || location.pathname.startsWith('/change-password')
                || location.pathname === '/') {
                return
            }

            navigate('/', { replace: true })
        }

        const isAllowed = location.pathname.startsWith(
            state?.currentUser?.role === ROLE.CUSTOMER
                ? '/client'
                : [ROLE.ADMIN, ROLE.MANAGER, ROLE.STAFF].includes(state?.currentUser?.role) ? '/admin' : null
        )

        if (!isAllowed) {
            let redirectPath;
            switch (state?.currentUser?.role) {
                case ROLE.ADMIN:
                    redirectPath = '/admin'
                    break
                case ROLE.CUSTOMER:
                    redirectPath = '/client'
                    break
                case ROLE.MANAGER:
                    redirectPath = '/admin'
                    break
                case ROLE.STAFF:
                    redirectPath = '/admin'
                    break
                default: redirectPath = '/'

            }
            navigate(redirectPath, { replace: true })
        }
        if (state?.currentUser?.role === ROLE.STAFF && (
            location.pathname.startsWith('/admin/product') ||
            location.pathname.startsWith('/admin/consignment') ||
            location.pathname.startsWith('/admin/users') ||
            location.pathname.startsWith('/admin/sales') ||
            location.pathname.startsWith('/admin/category') ||
            location.pathname.startsWith('/admin/banner') ||
            location.pathname.startsWith('/admin/overview')
        )) {
            navigate('/admin', { replace: true });
        }

        if (state?.currentUser?.role === ROLE.ADMIN && (
            location.pathname.startsWith('/admin/product') ||
            location.pathname.startsWith('/admin/consignment') ||
            location.pathname.startsWith('/admin/sales') ||
            location.pathname.startsWith('/admin/category') ||
            location.pathname.startsWith('/admin/banner') ||
            location.pathname.startsWith('/admin/overview') ||
            location.pathname.startsWith('/admin/orders') ||
            location.pathname.startsWith('/admin/customer-support') ||
            location.pathname.startsWith('/admin/customers')
        )) {
            navigate('/admin', { replace: true });
        }
        if (state?.currentUser?.role === ROLE.MANAGER && (
            location.pathname.startsWith('/admin/customer-support') ||
            location.pathname.startsWith('/admin/users') ||
            location.pathname.startsWith('/admin/orders') ||
            location.pathname.startsWith('/admin/customers')
        )) {
            navigate('/admin', { replace: true });
        }
    }, [state?.currentUser, navigate, location.pathname])

    return children
}
