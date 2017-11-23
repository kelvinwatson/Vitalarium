import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AboutContainer from '../../Containers/AboutContainer';
import DashboardContainer from '../../Containers/DashboardContainer';
import FooterContainer from '../../Containers/FooterContainer';
import NavigationContainer from '../../Containers/NavigationContainer';
import LoginContainer from '../../Containers/LoginContainer';
// import BlogContainer from '../../Containers/BlogContainer';
import App from '../../App';
import './Root.css';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="Route__HeightController">

        <NavigationContainer/>

        <Route path="/login" component={LoginContainer} />
        <Route path="/dashboard" component={DashboardContainer} />
        {/*<Route path="/blog" component={BlogContainer} />*/}
        <Route path="/about" component={AboutContainer} />
        <Route exact path="/" component={App} />

        <FooterContainer/>
      </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;
