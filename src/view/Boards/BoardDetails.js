import React, { useState, useEffect } from "react";
import { withRouter, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import ContainerUser from "../../components/layout/ContainerUser";
import { getBoard, clearBoardFetched } from "../../redux/boards/actions";
import { Row, Col } from "reactstrap";
import ListOfMembersDetail from "../../components/members/ListOfMembersDetail";

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
        <div className="cardBoardDetails">
          <h3>{board.title}</h3>
          <Row>
            <Col xs="8">
              <img
                width="100%"
                src={board.fileUrl}
                alt="Board logo"
                className="cardBoardDetailsImg"
              />
            </Col>
            <Col xs="4">
              <h5>Description: </h5>
              <p>{board.description}</p>
              <ListOfMembersDetail members={board.members} />
            </Col>
          </Row>
        </div>
      )}
    </ContainerUser>
  );
};

const mapStateToProps = ({ boards }) => ({ boardState: boards });

export default withRouter(
  connect(mapStateToProps, { getBoard, clearBoardFetched })(BoardDetails)
);
