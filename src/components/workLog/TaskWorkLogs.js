import React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { minutesToString } from "../../helpers/workLogTimeHelper";
import styles from "../comments/styles.scss";
import { useTranslation } from "react-i18next";

const TaskWorkLogs = ({ workLogsState }) => {
  const { workLogs } = workLogsState;
  const { t } = useTranslation();
  return (
    <Container>
      {workLogs.map((logWork) => (
        <div key={logWork.timeStamp} className="commentContainer">
          <Row>
            <Col xs={2}>
              <div className="userAvatarWr">
                <img src={logWork.creatorData.fileUrl} alt="User logo" />
              </div>
            </Col>

            <Col xs={8}>
              <div>
                <p>
                  {t("tasks.user")} {logWork.creatorData.firstName + " "}
                  {logWork.creatorData.lastName}
                </p>
                <p>
                  {t("tasks.date")}{" "}
                  {new Date(logWork.timeStamp).toLocaleDateString()}
                </p>
                <p>
                  {t("tasks.comment")} {logWork.workLogComment}
                </p>
                <p>
                  {t("tasks.loggedTime")} {minutesToString(logWork.loggedTime)}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};

const mapStateToProps = ({ workLogs }) => ({ workLogsState: workLogs });
export default connect(mapStateToProps)(TaskWorkLogs);
