import React from 'react';
import {Router,Redirect,Route,IndexRedirect,IndexRoute,hashHistory} from 'react-router';
import Page from '@/components/Page'
import Home from './pages/home'
import StepOne from './pages/stepOne'
import StepTwo from './pages/stepTwo'
import StepThree from './pages/stepThree'
import UploadCard from './pages/uploadCard'
import './App.css';

function App() {
  return (
    <Router history={hashHistory}>
      <Route  path="/" component={Page}>
        <IndexRedirect to="home" />
        <Route path="home" component={Home}/>
        <Route path="stepone" component={StepOne}/>
        <Route path="steptwo" component={StepTwo}/>
        <Route path="stepthree" component={StepThree}/>
        <Route path="uploadcard" component={UploadCard}/>
      </Route>
      <Redirect from="/*" to="/" />
    </Router>
  );
}

export default App;
