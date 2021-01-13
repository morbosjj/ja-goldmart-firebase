import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './css/App.css';
import Home from './components/screen/Home';
import Shop from './components/screen/Shop';
import PageNotFound from './components/screen/PageNotFound';
import ProductPage from './components/screen/ProductPage';
import Inquire from './components/screen/Inquire';
import Contacts from './components/screen/Contacts';
// import Signup from './components/screen/Signup';
import Login from './components/screen/Login';
// import ForgotPassword from './components/screen/ForgotPassword';
import Dashboard from './components/screen/Dashboard';
import Inquiry from './components/screen/Inquiry';
import Inquiries from './components/screen/Inquiries';
import Products from './components/screen/Products';
import Description from './components/screen/Description';
import Categories from './components/screen/Categories';
import Result from './components/screen/Result';
import EditDescription from './components/screen/EditDescription';
import UpdateProfile from './components/screen/UpdateProfile';
import Navigation from './components/Navigation/Navigation';
import FooterSite from './components/FooterSite';
import CategoryShop from './components/screen/CategoryShop';
import Resources from './components/screen/Resources';
import About from './components/screen/About';
import OrderForm from './components/screen/OrderForm';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path='/register' component={Signup} /> */}
        <Route exact path='/admin/login' component={Login} />
        {/* <Route exact path='/forgot-password' component={ForgotPassword} /> */}
        <PrivateRoute path='/update-profile' component={UpdateProfile} />

        <PrivateRoute path='/admin/dashboard' component={Dashboard} />
        <PrivateRoute path='/admin/inquiries/:id' component={Inquiry} />
        <PrivateRoute path='/admin/inquiries' component={Inquiries} />
        <PrivateRoute path='/admin/products' component={Products} />
        <PrivateRoute path='/admin/description' component={Description} />
        <PrivateRoute path='/admin/categories' component={Categories} />
        <PrivateRoute path='/admin/result' component={Result} />
        <PrivateRoute path='/admin/edit/:id' component={EditDescription} />

        <Route path='/order-form/:inquiryID' component={OrderForm} />
        <Route path='/about' component={About} />
        <Route path='/product/:name' component={ProductPage} />
        <Route path='/category/:name' component={CategoryShop} />
        <Route path='/inquire' component={Inquire} />
        <Route path='/contacts' component={Contacts} />
        <Route path='/resources' component={Resources} />
        <Route path='/shop' component={Shop} />
        <Route path='/' component={Home} exact />

        <Route>
          <Navigation />
          <PageNotFound />
          <FooterSite />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
