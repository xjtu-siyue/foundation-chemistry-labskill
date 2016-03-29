var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
require('react-tap-event-plugin')();

var AppBar = require('material-ui/lib/app-bar');
var LeftNav = require('material-ui/lib/left-nav');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Divider = require('material-ui/lib/divider');

var SvgIcon = require('material-ui/lib/svg-icons');
var Content = require('./content.jsx');
var LoginDialog = require('./login-dialog.jsx');
var RegistDialog = require('./regist-dialog.jsx');
var AboutDialog = require('./about-dialog.jsx');

var Index = React.createClass({
    displayName: 'Index',
    getInitialState: function() {
        return {
            leftNavOpen: false,
            loginDialogOpen: false,
            registDialogOpen: false,
            aboutDialogOpen: false,
        };
    },
    handleToggleLeftNav: function() {
        this.setState({
            leftNavOpen: !this.state.leftNavOpen
        });
    },
    handleLoginDialogToggle: function() {
        this.setState({
            loginDialogOpen: !this.state.loginDialogOpen,
        });
    },
    handleRegistDialogToggle: function() {
        this.setState({
            registDialogOpen: !this.state.registDialogOpen,
        });
    },
    handleAboutDialogToggle: function() {
        this.setState({
            aboutDialogOpen: !this.state.aboutDialogOpen,
        });
    },
    handleLogout: function() {
        $.get('logout', function(data) {
            if (data.code == 0)
                this.setState({
                    user: null,
                });
        }.bind(this));
    },
    onLogin: function() {
        $.get('user', function(data) {
            if (data.code == 0) {
                this.setState({
                    user: data.body
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div>
                <AppBar
                    title="Foundation Chemistry LabSkill"
                    onLeftIconButtonTouchTap={this.handleToggleLeftNav}
                    />
                <LeftNav
                    docked={false}
                    open={this.state.leftNavOpen}
                    onRequestChange={this.handleToggleLeftNav}
                    >
                    <img src="logo.jpg" alt="西安交通大学 能动学院" style={{ maxWidth: '100%' }}/>
                    <Divider />
                    {this.state.user ?
                        <MenuItem
                            primaryText="Log out"
                            leftIcon={<SvgIcon.ActionExitToApp />}
                            onTouchTap={this.handleLogout}
                            />
                        :
                        <MenuItem
                            primaryText="Log In"
                            leftIcon={<SvgIcon.ActionAccountCircle />}
                            onTouchTap={this.handleLoginDialogToggle}
                            />
                    }
                    {this.state.user ? null :
                        <MenuItem
                            primaryText="Sign Up"
                            leftIcon={<SvgIcon.SocialPersonAdd />}
                            onTouchTap={this.handleRegistDialogToggle}
                            />
                    }
                    <Divider />
                    <MenuItem
                        primaryText="About"
                        leftIcon={<SvgIcon.ActionInfo />}
                        onTouchTap={this.handleAboutDialogToggle}
                        />

                </LeftNav>
                {this.state.user ?
                    <Content></Content>
                    : null
                }
                <LoginDialog open={this.state.loginDialogOpen} onClose={this.handleLoginDialogToggle} onLogin={this.onLogin}/>
                <RegistDialog open={this.state.registDialogOpen} onClose={this.handleRegistDialogToggle} onRegist={this.onLogin} />
                <AboutDialog open={this.state.aboutDialogOpen} onClose={this.handleAboutDialogToggle} />
            </div>
        );
    }
});
var app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Index></Index>, app);
document.body.style.margin = 0;
document.title = 'XJTU FCLSP';