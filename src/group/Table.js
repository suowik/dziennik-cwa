import React, {Component} from 'react';

import {resolveSemester} from '../common/resolveSemester.js'

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: props.headers,
            rows: props.rows,
            group: props.group,
            renderer: props.renderer
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            headers: props.headers,
            rows: props.rows,
            group: props.group,
            renderer: props.renderer

        })
    }

    render() {
        return (
            <table className="table table-striped table-condensed">
                <thead>
                <tr>
                    {this.state.headers.map((col, idx) => (
                        <th key={idx}>{col}</th>
                    ))}
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th colSpan={this.state.headers.length}>

                    </th>
                </tr>
                </tfoot>
                <tbody>
                {resolveSemester(this.state.group).students.map((student, idx) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.surname}</td>
                        {student[this.state.rows].map((row, idx) => (
                            <this.state.renderer row={row} studentId={student.id} columnId={idx} key={idx}
                                                 group={this.state.group}/>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}


export default Table;