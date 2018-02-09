import React, {Component} from 'react';
import request from 'request'
import Table from './group/Table.js'
import TestResultRenderer from './group/TestResultRenderer.js'

import {resolveSemester} from './common/resolveSemester.js'

class Group extends Component {

    componentDidMount() {
        var that = this;
        request.get('https://dziennik-api.herokuapp.com/protected/' + that.props.params.groupId, function (err, res, body) {
            let group = JSON.parse(body);
            let semester = resolveSemester(group);
            semester.students.forEach(student => {
                if (student.tests === undefined) {
                    student.tests = []
                }
                if (student.attendances === undefined) {
                    student.attendances = []
                }
                if (student.homework === undefined) {
                    student.homework = []
                }
            });
            if (group.announcements === undefined) {
                group.announcements = []
            }
            let refStudent = semester.students[0];
            let attendanceHeaders = [];
            let testNames = [];
            let homeworkNames = [];
            if (refStudent) {
                attendanceHeaders = refStudent.attendances.map(attendance => {
                    return attendance.date
                });
                testNames = refStudent.tests.map(test => {
                    return test.name
                });
                homeworkNames = refStudent.homework.map(hw => {
                    return hw.date
                });
            }

            let commonHeaders = ["Imię", "Nazwisko"];

            that.setState({
                attendanceHeaders: commonHeaders.concat(attendanceHeaders).concat("[% obecności]"),
                attendances: attendanceHeaders,
                homeworkHeaders: commonHeaders.concat(homeworkNames).concat(""),
                homework: homeworkNames,
                testNames: commonHeaders.concat(testNames),
                tests: testNames,
                group: group
            });
        });
    }

    constructor(props) {
        super(props);
        let group = {
            _id: "GT%H$EW#^",
            name: "",
            description: "",
            activeYear: "2016/2017",
            activeSemester: 2,
            announcements: [],
            semesters: [
                {
                    year: "2016/2017",
                    semester: 2,
                    students: [
                        {
                            name: "",
                            id: 0,
                            tests: [],
                            homework: [],
                            surname: "",
                            attendances: []
                        }
                    ]
                }
            ],
            password: "",
            dateOfActivities: ""
        };

        let commonHeaders = ["Imię", "Nazwisko"];
        let refStudent = group.semesters[0].students[0];
        let attendanceHeaders = refStudent.attendances.map(attendance => {
            return attendance.date
        });
        let testNames = refStudent.tests.map(test => {
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
                {this.state.group.announcements.length > 0 &&
                <div className="col-sm-12">
                    <div className="page-header">
                        <h4>Ogłoszenia</h4>
                    </div>
                    <table className="table table-striped table-condensed">
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.group.announcements.map((a, i) =>
                            <tr key={i}>
                                <td>{a.date}</td>
                                <td>{a.text}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>}
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