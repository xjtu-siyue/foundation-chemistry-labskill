var $ = require('jquery');
var React = require('react');

var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var FlatButton = require('material-ui/lib/flat-button');
var RadioButton = require('material-ui/lib/radio-button');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var AutoComplete = require('material-ui/lib/auto-complete');

module.exports = React.createClass({
    displayName: 'RegistDialog',
    getInitialState: function() {
        return {
            open: this.props.open,
            username: '',
            password: '',
            studentId: '',
            teacherId: '',
            code: '',
            group: 'student',
            schoolList: [],
            majorList: [],
        }
    },
    componentDidMount: function() {
        $.get('schools', function(data) {
            this.setState({
                schoolList: data,
            });
        }.bind(this));
        $.get('majors', function(data) {
            this.setState({
                majorList: data
            });
        }.bind(this));
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            open: nextProps.open
        });
    },
    onUsernameChange: function(event) {
        this.setState({
            username: event.target.value,
        });
    },
    onPasswordChange: function(event) {
        this.setState({
            password: event.target.value,
        });
    },
    onStudentIdChange: function(event) {
        this.setState({
            studentId: event.target.value,
        });
    },
    handleSubmit: function() {
        $.post('regist', {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            group: this.state.group,
            studentId: this.state.studentId,
            grade: this.state.grade,
            major: this.state.major,
            school: this.state.school,
            code: this.state.code,
        }, function(data) {
            if (data.code == 0) {
                this.props.onRegist();
                this.handleClose();
            }
            else
                alert('error');
        }.bind(this));
    },
    handleClose: function() {
        this.setState({
            open: false,
        });
        this.props.onClose();
    },
    onGroupChange: function(event, value) {
        this.setState({
            group: value,
        });
    },
    onTeacherIdChange: function(event) {
        this.setState({
            teacherId: event.target.value,
        });
    },
    onGradeChange: function(event, index, value) {
        this.setState({
            grade: value,
        });
    },
    onMajorChange: function(value) {
        this.setState({
            major: value,
        });
    },
    onSchoolChange: function(event, index, value) {
        this.setState({
            school: value,
        });
    },
    onCodeChange: function(event) {
        this.setState({
            code: event.target.value,
        });
    },
    onNameChange: function(event) {
        this.setState({
            name: event.target.value,
        });
    },
    render: function() {
        const actions = [
            <FlatButton
                label="Sign Up"
                primary={true}
                onTouchTap={this.handleSubmit}
                />,
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
                />,
        ];
        const grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(e => (new Date()).getFullYear() - e);
        return (
            <div>
                <Dialog
                    title="Sign Up"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
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
                    <br/>
                    <TextField
                        floatingLabelText="Real Name"
                        value={this.state.name}
                        onChange={this.onNameChange}
                        />
                    <RadioButtonGroup
                        name="group"
                        valueSelected={this.state.group}
                        onChange={this.onGroupChange}
                        >
                        <RadioButton
                            value="student"
                            label="As a student"
                            />
                        <RadioButton
                            value="teacher"
                            label="As a teacher"
                            />
                    </RadioButtonGroup>
                    {this.state.group == 'student' ? (
                        <div>
                            <TextField
                                floatingLabelText="Student ID"
                                value={this.state.studentId}
                                onChange={this.onStudentIdChange}
                                />
                            <br/>
                            <SelectField
                                floatingLabelText="Grade"
                                value={this.state.grade}
                                onChange={this.onGradeChange}
                                >
                                {grades.map((e, i) => <MenuItem key={i} value={e} primaryText={e}/>) }
                            </SelectField>
                            <br/>
                            <AutoComplete
                                floatingLabelText="Major in"
                                hintText="Type a key to find the major"
                                searchText={this.state.major}
                                dataSource={this.state.majorList}
                                onNewRequest={this.onMajorChange}
                                />
                            <br/>
                        </div>
                    ) : null
                    }
                    <SelectField
                        floatingLabelText="School"
                        value={this.state.school}
                        onChange={this.onSchoolChange}
                        >
                        {this.state.schoolList.map((e, i) => <MenuItem key={i} value={e} primaryText={e} />) }
                    </SelectField>
                    <br/>
                    {this.state.group == 'teacher' ?
                        <div>
                            <TextField
                                floatingLabelText="Teacher ID"
                                value={this.state.teacherId}
                                onChange={this.onTeacherIdChange}
                                />
                            <br/>
                            <TextField
                                floatingLabelText="Invitation Code"
                                hintText="Ask other teachers for the code"
                                value={this.state.code}
                                onChange={this.onCodeChange}
                                />
                        </div>
                        : null
                    }
                </Dialog>
            </div>
        );
    }
});