import * as React from 'react';
import 'semantic-ui-css/semantic.min.css';

interface IndexState {
    [name: string]: any,
    regModalOpened: boolean,
    authModalOpened: boolean,
    mobileMenuOpened: boolean,
    login: string,
    password: string,
    repeatPassword: string,
    email: string,
    reponseAwait: boolean
    error: boolean,
    errorMessages: {
        [key: string]: string
    }
}

class Index extends React.Component<any, IndexState> {

    

    render() {
        return (
            <div>index</div>
        );
    }
}

export default Index;