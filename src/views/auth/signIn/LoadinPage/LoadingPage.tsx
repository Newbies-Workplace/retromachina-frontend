import { useEffect } from 'react';
import { useUser } from '../../../../context/UserContext.hook';
import { useNavigate } from 'react-router';
import LoadingView from '../../../../component/loading_view/LoadingView';

const LoadingPage = () => {

    const { login, user } = useUser();
    const navigate = useNavigate();

    useEffect(()=> {
        const params = Object.fromEntries(
            new URLSearchParams(window.location.search)
        );
        login(params)
            .then( () => {navigate('/')})
            .catch()
    }, [])

    return (
        <LoadingView />
    );
};

export default LoadingPage
