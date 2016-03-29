var React = require('react');
var Dialog = require('material-ui/lib/dialog');
var FlatButton = require('material-ui/lib/flat-button');

module.exports = React.createClass({
    displayName: 'AboutDialog',
    getInitialState: function(){
        return {
            open: this.props.open,
        };
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({
            open: nextProps.open
        });
    },
    handleClose: function(){
        this.setState({
            open: false,
        });
        this.props.onClose();
    },
    render: function(){
        const actions = [
            <FlatButton 
                label="OK" 
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
        return (
            <div>
                <Dialog
                    title="XJTU Foundation Chemistry LabSkill Platform"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <p>The core labskill software belongs to <a href="//epe.xjtu.edu.cn">XJTU EPE</a>.</p>
                    <p>This platform built by React, NodeJS, MongoDB.</p>
                    <p>Powered by <a href="//izumoriki.com">Riki</a> @ <a href="//isiyue.org">Siyue</a></p>
                    <p>Copyright &copy; 2015-2016, XJTU, <a href="https://github.com/xjtu-siyue/foundation-chemistry-labskill">open source</a> Followed MIT License.</p>
                </Dialog>
            </div>
        );
    }
})