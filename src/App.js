import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Error from './pages/Error';
import Expense from './pages/Expense';
import Documentation from './pages/Documentation'
import Navbar from './components/Navbar';
import login from './pages/login';
import register from "./pages/register";
function App() {
    return (
      <main>
        <Navbar />
          <Switch>
            <Route path='/' component={Expense} exact />
            <Route path='/about' component={Documentation} /> 
            <Route path='/login' component={login} /> 
            <Route path='/register' component={register} /> 
            <Route component={Error} />
          </Switch> 
      </main>
          
    );
}

export default App;