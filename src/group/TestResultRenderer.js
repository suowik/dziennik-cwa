import React, {Component} from 'react';
import request from 'request'

class TestResultRenderer extends Component {

    failed(marks) {
        let arrayMarks = this.marksToArray(marks, TestResultRenderer.rawMarkValue);
        let sum = arrayMarks.reduce((a, b)=> {
            return a + b
        });
        return (sum / arrayMarks.length < 3.0) && arrayMarks[arrayMarks.length - 1] < 3;
    }

    componentWillReceiveProps(props) {
        let that = this;
        this.setState({
            row: props.row,
            failed: that.failed(props.row.marks),
            studentId: props.studentId,
            columnId: props.columnId,
            group: props.group
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            row: props.row,
            failed: false,
            studentId: props.studentId,
            columnId: props.columnId,
            group: props.group
        }
    }

    renderMarks(marks, studentId, columnId) {
        let res = this.marksToArray(marks, this.renderMarkFactory(studentId, columnId));
        return res.map((e, i) => {
            if (TestResultRenderer.isNumeric(e) && res[i + 1] != null) {
                return e + "/"
            }
            return e;
        });
    }

    static isNumeric(n) {
        return !isNaN(parseFloat(n));
    }

    renderMarkFactory(studentId, columnId) {
        return (marks, mark, i)=> {
            return TestResultRenderer.rawMarkValue(marks, mark);
        }
    }

    changeMark(studentId, columnId, mark) {
        return (e)=> {
            let group = this.state.group;
            group.students[studentId]['tests'][columnId]['marks'][mark] = e.target.value;
            request.post('https://dziennik-api.herokuapp.com/groups/', {form: JSON.stringify(group)}, e => {
                this.setState({
                    group: group
                });
            });
        }
    }

    marksToArray(marks, cb) {
        return ['first', 'second', 'third'].map((mark, i)=> {
            return cb(marks, mark, i)
        }).filter(m => m !== null);
    }

    static rawMarkValue(marks, mark) {
        let value = marks[mark];
        if (value !== null && value !== undefined) {
            return parseFloat(value)
        }
        return null
    }

    render() {
        return (
            <td className={this.failed(this.state.row.marks) ? 'danger':'success'}>
                {this.renderMarks(this.state.row.marks, this.props.studentId, this.props.columnId)}
            </td>
        )
    }
}

export default TestResultRenderer;