import React from 'react';
import { observer } from 'mobx-react';

import UserStore from '../../stores/UserStore';
import LoginForm from '../../components/Login/LoginForm/LoginForm';
import SubmitButton from '../../components/Login/SubmitButton/SubmitButton';

import './Admin.css';

class Admin extends React.Component {
    
    async componentDidMount() {
        try {
            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            let result = await res.json();
            
            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            } else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }
        } catch(e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }
    
    async doLogout() {
        try {
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            let result = await res.json();
            
            if (result && result.success) {
                UserStore.isLoggedIn = false;
                UserStore.username = '';
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    render() {
        if (UserStore.loading) {
            return (
                <body>
                    Loading, please wait...
                </body>
            );
        } else {
            if (UserStore.isLoggedIn) {
                return (
                    <body> 
                    <div className='container'>
                        Welcome {UserStore.username}
                        <SubmitButton
                            text={'Log out'}
                            disabled={false}
                            onClick={ () => this.doLogout() }
                        />
                         </div>
                    </body>
                );
            } else {
                return (
                    <body>
                        <div className='container'>
                            <LoginForm />
                        </div>
                    </body>
                );
            }
        }
    }
}
export default observer(Admin);
