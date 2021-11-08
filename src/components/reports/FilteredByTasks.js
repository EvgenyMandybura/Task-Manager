import React from "react";
import { connect } from "react-redux";
import { Table, Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import { minutesToString } from "../../helpers/workLogTimeHelper";
import { useTranslation } from "react-i18next";

const ReportsFilteredByTasks = ({ reportsState }) => {
  const { workLogs } = reportsState;
  const history = useHistory();
  const handleRowClick = (taskId) => {
    history.push(`/task-details/${taskId}`);
  };
  const { t } = useTranslation();
  return (
    <Container>
      <Table bordered striped>
        <thead>
          <tr>
            <th>{t("reports.taskName")}</th>
            <th>{t("reports.taskLogged")}</th>
            <th>{t("reports.logs")}</th>
          </tr>
        </thead>
        <tbody>
          {!!workLogs &&
            workLogs.map((logs, key) => (
              <tr key={key} onClick={() => handleRowClick(logs[0].taskId)}>
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
