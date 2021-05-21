import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import styles from "./index.module.scss";

const AuthCardContainer = ({ children, cardClass = styles.card }) => {
  return (
    <Container>
      <Card className={cardClass}>
        <CardBody className="p-0">{children}</CardBody>
      </Card>
    </Container>
  );
};

export default AuthCardContainer;
