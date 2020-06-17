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
          </Switch>
        </main>
        <Tab></Tab>
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'))