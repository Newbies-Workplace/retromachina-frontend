import {useEffect} from 'react';
import {useUser} from '../../../context/user/UserContext.hook';
import {useNavigate} from 'react-router';
import {LoadingView} from '../../../component/organisms/loading_view/LoadingView';
import {AuthParams} from '../../../api/auth/Auth.interface';
import {getRedirectPath, setRedirectPath} from "../../../context/useRedirect";

const LoadingPage = () => {
    const {login} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        const params = Object.fromEntries(
            new URLSearchParams(window.location.search),
        )

        login({...params as unknown as AuthParams})
            .then(() => {
                const redirectPath = getRedirectPath()
                setRedirectPath(null)

                navigate(redirectPath ?? '/')
            })
            .catch()
    }, [])

    return (
        <LoadingView />
    )
}

export default LoadingPage
