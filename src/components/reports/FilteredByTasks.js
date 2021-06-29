import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Container } from "reactstrap";
import { minutesToString } from "../../helpers/workLogTimeHelper";

const ReportsFilteredByTasks = ({ reportsState }) => {
  const { workLogs } = reportsState;

  return (
    <Container>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Task Logged time</th>
            <th>Logs</th>
          </tr>
        </thead>
        <tbody>
          {!!workLogs &&
            workLogs.map((logs, key) => (
              <tr key={key}>
                <td>{logs[0].taskTitle}</td>
                <td>{minutesToString(logs[logs.length - 1])}</td>
                <td>
                  <Table>
                    <tbody>
                      {logs.map(
                        (log, key) =>
                          !!log.loggedTime && (
                            <tr key={key}>
                              <td>{log.workLogComment}</td>
                              <td>{minutesToString(log.loggedTime)}</td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </Table>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = ({ reports }) => ({ reportsState: reports });
export default connect(mapStateToProps, {})(ReportsFilteredByTasks);
