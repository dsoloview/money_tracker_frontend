import {Navigate, useRouteError} from "react-router-dom";

const ErrorComponent = () => {
    const error = useRouteError();
    if (error && typeof error === 'object' && 'status' in error) {
        if (error.status === 401) {
            return <Navigate to={'/'}/>
        }
    }
    return (
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
        </div>
    );
}

export default ErrorComponent;