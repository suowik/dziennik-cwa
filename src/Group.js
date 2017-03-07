import React, {Component} from 'react';
import request from 'request'
import Table from './group/Table.js'
import TestResultRenderer from './group/TestResultRenderer.js'

class Group extends Component {

    componentDidMount() {
        var that = this;
        request.get('https://dziennik-api.herokuapp.com/protected/' + that.props.params.groupId, function (err, res, body) {
            let group = JSON.parse(body);
            group.students.forEach(student => {
                if (student.tests === undefined) {
                    student.tests = []
                }
                if (student.attendances === undefined) {
                    student.attendances = []
                }
            });
            let refStudent = group.students[0];

            let attendanceHeaders = refStudent.attendances.map(attendance=> {
                return attendance.date
            });
            let testNames = refStudent.tests.map(test=> {
                return test.name
            });
            let commonHeaders = ["Imię", "Nazwisko"];

            that.setState({
                attendanceHeaders: commonHeaders.concat(attendanceHeaders).concat("[% obecności]"),
                attendances: attendanceHeaders,
                testNames: commonHeaders.concat(testNames),
                tests: testNames,
                group: group
            });
        });
    }

    constructor(props) {
        super(props);
        let group = {
            name: "",
            _id: "",
            dateOfActivities: "",
            students: [
                {
                    id: 1,
                    name: "",
                    surname: "",
                    tests: [],
                    attendances: []
                }
            ]
        };


        let commonHeaders = ["Imię", "Nazwisko"];
        let refStudent = group.students[0];
        let attendanceHeaders = refStudent.attendances.map(attendance=> {
            return attendance.date
        });
        let testNames = refStudent.tests.map(test=> {
            return test.name
        });
        this.state = {
            attendanceHeaders: commonHeaders.concat(attendanceHeaders),
            attendances: attendanceHeaders,
            testNames: commonHeaders.concat(testNames),
            tests: testNames,
            group: group
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="page-header">
                        <h4>Wyniki kolokwiów</h4>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <Table headers={this.state.testNames}
                                       rows='tests'
                                       group={this.state.group}
                                       renderer={TestResultRenderer}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group;