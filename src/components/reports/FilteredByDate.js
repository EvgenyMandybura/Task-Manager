import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import { minutesToString } from "../../helpers/workLogTimeHelper";
import FilterReportsByDateForm from "../forms/FilterReportsByDateForm";
import styles from "./reports.scss";

const ReportsFilteredByDate = ({ reportsState }) => {
    const { filterDateArray, dateRange } = reportsState;
    const history = useHistory();
    const handleRowClick = (taskId) => {
        history.push(`/task-details/${taskId}`);
    };
    return (
        <Container>
            <FilterReportsByDateForm />
            <Table bordered striped>
                <thead>
                <tr>
                    <th>Task</th>
                    <th>WorkLog</th>
                    {dateRange.map((date, key) => (
                        <th key={key}>{date}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filterDateArray?.map((item, key) => (
                    <tr key={key} onClick={() => handleRowClick(item.log.taskId)}>
                        <td>{item.log.taskTitle}</td>
                        <td>{item.log.workLogComment}</td>
                        {item.tempArr.map((x) => (
                            <td>{x == ""? x: minutesToString(item.log.loggedTime)}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

const mapStateToProps = ({ reports }) => ({ reportsState: reports });
export default connect(mapStateToProps, {})(ReportsFilteredByDate);

