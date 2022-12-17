import {useEffect} from 'react';
import {useUser} from '../../../context/UserContext.hook';
import {useNavigate} from 'react-router';
import {LoadingView} from '../../../component/loading_view/LoadingView';
import { AuthParams } from '../../../api/auth/Auth.interface';

const LoadingPage = () => {
    const { login } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const params = Object.fromEntries(
            new URLSearchParams(window.location.search)
        );
        login(params as unknown as AuthParams)
            .then(() => {navigate('/')})
            .catch()
    }, [])

    return (
        <LoadingView />
    );
};

export default LoadingPage
