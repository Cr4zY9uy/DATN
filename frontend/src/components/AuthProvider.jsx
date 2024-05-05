import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { ACTION_USER, UserContext } from '../store/user'
import { getMe } from '../services/user_service'
import Notification from '../utils/configToastify'

export const AuthProvider = ({ children }) => {
    const { state, dispatch } = useContext(UserContext)
    const { isError } = useQuery({
        queryKey: ['getMe'],
        queryFn: () => getMe(),
        enabled: !!state?.currentUser
    })

    useEffect(() => {
        if (!isError) return
        dispatch({ type: ACTION_USER.LOGOUT })
        Notification({ message: "Token expired!!", type: 'error' })

    }, [isError, dispatch])

    return children
}
