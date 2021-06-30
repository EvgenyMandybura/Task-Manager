import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Container } from "reactstrap";
import { getAllLogs, allLogsClear } from "../../redux/reports/actions";
import { minutesToString } from "../../helpers/workLogTimeHelper";
import {
  ALL_REPORTS,
  FILTERED_BY_TASK,
  FILTERED_BY_BOARD,
} from "../../constants/reportsQuery";
import { Button } from "reactstrap";
import ReportsFilteredByTasks from "./FilteredByTasks";
import ReportsFilteredByBoards from "./FilteredByBoard";
import styles from "./reports.scss";

const Reports = ({ getAllLogs, allLogsClear, reportsState }) => {
  const { loading, workLogs } = reportsState;
  const [ready, updateReady] = useState(false);
  const [queryReports, setQueryReports] = useState(ALL_REPORTS);

  const fetchAllReports = async () => {
    getAllLogs(ALL_REPORTS);
  };

  useEffect(() => {
    fetchAllReports();
    updateReady(true);
    return () => {
      allLogsClear();
    };
  }, []);

  useEffect(() => {
    if (!!loading) {
      fetchAllReports();
    }
  }, []);

  const getGroupedTasks = (e) => {
    e.preventDefault();
    setQueryReports(FILTERED_BY_TASK);
    getAllLogs(FILTERED_BY_TASK);
  };

  const getGroupedBoards = (e) => {
    e.preventDefault();
    setQueryReports(FILTERED_BY_BOARD);
    getAllLogs(FILTERED_BY_BOARD);
  };

  const getAllReport = (e) => {
    e.preventDefault();
    setQueryReports(ALL_REPORTS);
    getAllLogs(ALL_REPORTS);
  };

  return (
    <Container>
      {ready && !loading ? (
        <div>
          <Button color="success" onClick={getAllReport} className={styles.btn}>
            All report
          </Button>
          <Button
            color="success"
            onClick={getGroupedTasks}
            className={styles.btn}
          >
            Group by tasks
          </Button>
          <Button color="success" onClick={getGroupedBoards}>
            Group by boards
          </Button>
          {queryReports == ALL_REPORTS && (
            <Table bordered>
              <thead>
                <tr>
                  <th>Board name</th>
                  <th>Task Name</th>
                  <th>Comment</th>
                  <th>Logged time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {!!workLogs &&
                  workLogs.map((log) => (
                    <tr key={log.timeStamp}>
                      <td>{log.boardTitle}</td>
                      <td>{log.taskTitle}</td>
                      <td>{log.workLogComment}</td>
                      <td>{minutesToString(log.loggedTime)}</td>
                      <td>{new Date(log.timeStamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
          {queryReports == FILTERED_BY_TASK && <ReportsFilteredByTasks />}
          {queryReports == FILTERED_BY_BOARD && <ReportsFilteredByBoards />}
        </div>
      ) : (
        <h5>Reports loading...</h5>
      )}
    </Container>
  );
};

const mapStateToProps = ({ reports }) => ({ reportsState: reports });
export default connect(mapStateToProps, { getAllLogs, allLogsClear })(Reports);
