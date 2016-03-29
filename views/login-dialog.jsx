var $ = require('jquery');
var React = require('react');

var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/flat-button');

module.exports = React.createClass({
    displayName: 'LoginDialog',
    getInitialState: function(){
        return {
            open : this.props.open,
            username : '',
            password : '',
        }
    },
    componentWillReceiveProps : function(nextProps){
        this.setState({
            open : nextProps.open
        });
    },
    onUsernameChange : function(event){
        this.setState({
            username : event.target.value,
        });
    },
    onPasswordChange : function(event){
        this.setState({
            password : event.target.value,
        });
    },
    handleSubmit : function(){
        $.post('login', {
            username : this.state.username,
            password : this.state.password,
        }, function(data){
            if(data.code == 0){
                this.props.onLogin();
                this.handleClose();
            }
            else 
                alert('wrong username or password');
        }.bind(this));
    },
    handleClose: function(){
        this.setState({
            open: false,
        });
        this.props.onClose();
    },
    render: function(){
        const actions = [
            <RaisedButton
                label="Log In"
                primary={true}
                onTouchTap={this.handleSubmit}
            />,
            <RaisedButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,            
        ];
        return (
            <div>
                <Dialog
                    title="Log In"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField 
                        floatingLabelText="username"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                    />
                    <br/>
                    <TextField
                        floatingLabelText="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                </Dialog>
            </div>
        );
    }
});