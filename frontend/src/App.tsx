
import { HelmetProvider } from 'react-helmet-async'
import AppNavigation from './navigation/Navigation'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <HelmetProvider>
        <div className="main-page-wrapper">
          <AppNavigation />
        </div>
      </HelmetProvider>
    </Provider>
  )
}

export default App
