import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import './Tabs.css'


export default () => {
  const login = window.localStorage.getItem('rr_login');
    return (
      <div className="Tabs__block">
        <AppBar>
          <Tabs >
            <Link className="Link__not" to="/"><Tab label="О нас" /></Link>
            <Link className="Link__not" to="/Login"><Tab label="Логин" /></Link>
            <Link className="Link__not" to="/Registration"><Tab label="Регестрация" /></Link>
            {login ? <Link className="Link__not" to="/Profile"><Tab label="Профиль" /></Link> : null}
          </Tabs>
        </AppBar>
      </div>
    );
  
}


