import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import { minutesToString } from "../../helpers/workLogTimeHelper";

const ReportsFilteredByBoards = ({ reportsState }) => {
  const { workLogs } = reportsState;
  const history = useHistory();
  const handleRowClick = (boardId) => {
    history.push(`/board-details/${boardId}`);
  };
  return (
    <Container>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Board Name</th>
            <th>Board Logged time</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {!!workLogs &&
            workLogs.map((boards, key) => (
              <tr key={key} onClick={() => handleRowClick(boards.boardId)}>
                <td>{workLogs[key].logs[0][0].boardTitle}</td>
                <td>{minutesToString(boards.sum)}</td>
                <td>
                  <Table>
                    <tbody>
                      {boards.logs.map((tasks, key) => (
                        <tr key={key}>
                          <td>{tasks[0].taskTitle}</td>
                          <td>{minutesToString(tasks[tasks.length - 1])}</td>
                        </tr>
                      ))}
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
export default connect(mapStateToProps, {})(ReportsFilteredByBoards);
