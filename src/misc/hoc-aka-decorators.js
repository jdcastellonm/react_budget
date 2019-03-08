import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        {props.isAdmin && <p>The info is: {props.info}</p>}
    </div>
);

const withAdminWarning = (WrappedComp) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Don't share.</p>}
            <WrappedComp {...props}/>
        </div>
    );
};

const requireAuth = (WrappedComp) => {
    return (props) => (
        <div>
            {props.isAuth && <p>You successfuly auth'd.</p>}
            <WrappedComp {...props}/>
        </div>
    )
}

// const AdminInfo =  withAdminWarning(Info);
const AuthInfo = requireAuth(Info);

const external = {
    isAdmin: true,
    isAuth: true,
    info: 'IT WORKS'
}
// spread objects get copied to the component's props
ReactDOM.render(<AdminInfo {...external}/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo {...external}/>, document.getElementById('app'));