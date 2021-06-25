import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Container } from "reactstrap";
import { getAllLogs, allLogsClear } from "../../redux/reports/actions";
import { minutesToString } from "../../helpers/workLogTimeHelper";

const Reports = ({ getAllLogs, allLogsClear, reportsState }) => {
  const { loading, workLogs } = reportsState;
  const [ready, updateReady] = useState(false);

  const fetchAllReports = async () => {
    getAllLogs("sgsdfg");
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

  return (
    <Container>
      {ready && !loading ? (
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
      ) : (
        <h5>Reports loading...</h5>
      )}
    </Container>
  );
};

const mapStateToProps = ({ reports }) => ({ reportsState: reports });
export default connect(mapStateToProps, { getAllLogs, allLogsClear })(Reports);
