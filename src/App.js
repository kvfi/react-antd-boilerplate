import { Route, Router, Switch } from 'react-router-dom'

import GlobalContainer from './containers/global-container'
import Home from './pages/home'
import Keycloak from 'keycloak-js'
import { KeycloakProvider } from 'react-keycloak'
import React from 'react'
import { createBrowserHistory } from 'history'

const App = () => {
    const keycloak = new Keycloak('/keycloak.json')
    const history = createBrowserHistory()

    const keycloakProviderInitConfig = {
        onLoad: 'login-required'
    }

    return (
        <KeycloakProvider keycloak={keycloak} initConfig={keycloakProviderInitConfig}>
            <Router history={history}>
                <GlobalContainer>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                    </Switch>
                </GlobalContainer>
            </Router>
        </KeycloakProvider>
    )
}

export default App
