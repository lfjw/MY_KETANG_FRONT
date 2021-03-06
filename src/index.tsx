import React from 'react';
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './assets/style/common.scss'
import Home from './view/Home'
import Mine from './view/Mine'
import Profile from './view/Profile'
import Login from './view/Login'
import Register from './view/Register'
import Detail from "src/view/Detail";
import Cart from "src/view/Cart";

import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import Tab from './components/Tab'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <main className='main-container'>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/Mine' exact component={Mine}></Route>
            <Route path='/Profile' exact component={Profile}></Route>
            <Route path='/Login' exact component={Login}></Route>
            <Route path='/Register' exact component={Register}></Route>
            <Route path='/detail/:id' exact component={Detail}></Route>
            <Route path='/cart' exact component={Cart}></Route>
          </Switch>
        </main>
        <Tab></Tab>
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'))