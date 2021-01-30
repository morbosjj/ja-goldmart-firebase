import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute';
import './css/App.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import PageNotFound from './pages/PageNotFound';
import ProductPage from './pages/ProductPage';
import Inquire from './pages/Inquire';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inquiry from './pages/Inquiry';
import Inquiries from './pages/Inquiries';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Order from './pages/Order';
import Description from './pages/Description';
import Categories from './pages/Categories';
import Result from './pages/Result';
import EditDescription from './pages/EditDescription';
import UpdateProfile from './pages/UpdateProfile';
import Navigation from './component/Navigation';
import FooterSite from './component/FooterSite';
import CategoryShop from './pages/CategoryShop';
import Resources from './pages/Resources';
import About from './pages/About';
import OrderForm from './pages/OrderForm';
import OrderDetails from './pages/OrderDetails';

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
        <PrivateRoute path='/admin/orders/:id' component={Order} />
        <PrivateRoute path='/admin/orders' component={Orders} />
        <PrivateRoute path='/admin/description' component={Description} />
        <PrivateRoute path='/admin/categories' component={Categories} />
        <PrivateRoute path='/admin/result' component={Result} />
        <PrivateRoute path='/admin/edit/:id' component={EditDescription} />

        <Route path='/order-form/:inquiryID' component={OrderForm} />
        <Route path='/order-details' component={OrderDetails} />
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
