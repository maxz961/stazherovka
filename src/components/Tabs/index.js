import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import './Tabs.css'


export default () => {
  const login = window.localStorage.getItem('rr_login');
    return (
      <div className="Tabs__block">
        <AppBar>
          <div className='' >
            <Link className="Link__not" to="/"><Tab label="О нас" /></Link>
            <Link className="Link__not" to="/Posts"><Tab label="Посты" /></Link>
            {!login ? <Link className="Link__not" to="/Login"><Tab label="Логин" /></Link>: null}
            {!login ? <Link className="Link__not" to="/Registration"><Tab label="Регестрация" /></Link>: null}
            {login ? <Link className="Link__not" to="/Profile/:id"><Tab label="Профиль" /></Link> : null}
          </div>
        </AppBar>
      </div>
    );
  
}


