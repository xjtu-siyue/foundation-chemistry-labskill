var $ = require('jquery');
var React = require('react');

module.exports = React.createClass({
    displayName: 'Content',
    componentDidMount: function() {
        this.setState({
            timer: setInterval(this.check, 1000)
        });
    },
    componentWillUnmount: function(){
        clearInterval(this.state.timer);
        this.setState({
            timer: null
        });
    },
    check: function() {
        $.get('check', function(data) {
            if (data.code == 0) {

            }
        }.bind(this));
    },
    render: function() {
        var style = {
            position: 'absolute',
            width: '100%',
            height: 'Calc(100% - 64px)',
        };
        return (
            <div>
                <object style={style}>
                    <param name="movie" value="player/playershell.swf" />
                    <param name="FlashVars" value="vBgColor=0x6c6c6c&amp;vFSCommand=true&amp;vAOSupport=false&amp;rqPresentationID=Qn88k6chCRiRFoP&amp;rqStartSlide=1&amp;link=http%3A//58.206.125.14/"/>
                </object>
            </div>
        );
    }
});
