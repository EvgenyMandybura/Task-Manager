import React, { useState, useEffect } from "react";
import { withRouter, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import ContainerUser from "../../components/layout/ContainerUser";
import { getBoard, clearBoardFetched } from "../../redux/boards/actions";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const BoardDetails = ({ getBoard, clearBoardFetched, boardState }) => {
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const { loading, board: board } = boardState;
  const [ready, updateReady] = useState(false);
  const fetchBoard = () => {
    getBoard(boardId);
  };
  useEffect(() => {
    fetchBoard();
    updateReady(true);
    return () => {
      clearBoardFetched();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchBoard();
    }
  }, []);

  return (
    <ContainerUser>
      {ready && !loading && (
        <Card className="cardBoardDetails">
          <Row>
            <Col>
              <CardImg
                top
                width="100%"
                src={board.fileUrl}
                alt="Board logo"
                className="cardBoardDetailsImg"
              />
            </Col>
            <Col>
              <CardBody className="cardBoardDetailsBody">
                <CardTitle tag="h5">{board.title}</CardTitle>
                <CardText>{board.description}</CardText>
                <CardText>List of members:</CardText>
                <CardText>
                  {board.members.map((member) => (
                    <li>{member}</li>
                  ))}
                </CardText>
              </CardBody>
            </Col>
          </Row>
        </Card>
      )}
    </ContainerUser>
  );
};

const mapStateToProps = ({ boards }) => ({ boardState: boards });

export default withRouter(
  connect(mapStateToProps, { getBoard, clearBoardFetched })(BoardDetails)
);
