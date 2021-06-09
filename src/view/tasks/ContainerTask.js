import React from "react";
import { Container, Card, CardBody } from "reactstrap";
import classNames from "classnames";
import styles from "./index.module.scss";

const ContainerUser = ({ children }) => {
  return (
    <Container className={classNames(styles.containerTask, "flex-fill")}>
      <Card className={styles.card}>
        <CardBody className="p-0">{children}</CardBody>
      </Card>
    </Container>
  );
};

export default ContainerUser;
