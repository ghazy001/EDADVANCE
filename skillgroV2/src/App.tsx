import { HelmetProvider } from 'react-helmet-async'
import AppNavigation from './navigation/Navigation'
import { Provider } from 'react-redux'
import store from './redux/store'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <Provider store={store}>
            <HelmetProvider>
                <AuthProvider>
                    <div className="main-page-wrapper">
                        <AppNavigation />
                    </div>
                </AuthProvider>
            </HelmetProvider>
        </Provider>
    )
}

export default App