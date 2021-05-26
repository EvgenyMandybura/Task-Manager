import React, { useState, useEffect } from "react";
import ContainerUser from "../../components/layout/ContainerUser";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./indexBoards.scss";
import imgPlaceholder from "../../assets/ic-placeholder.svg";
import { getListBoards, getListBoardsClear } from "../../redux/boards/actions";

const Boards = ({ getListBoards, getListBoardsClear, boardState, history }) => {
  const { boardsList: boardsList } = boardState;
  const [ready, updateReady] = useState(false);
  const fetchBoards = () => {
    getListBoards();
  };
  useEffect(() => {
    fetchBoards();
    updateReady(true);
    return () => {
      getListBoardsClear();
    };
  }, []);

  return (
    <ContainerUser>
      <h1>List of boards:</h1>
      <Link to="/make-new-board">
        <Button color="success">Add New Board</Button>
      </Link>
      <div>
        {ready && boardsList != "" ? (
          boardsList.map((board) => (
            <Card
              className="cardBoards"
              onClick={() => history.push(`/board-details/${board.boardId}`)}
              key={board.boardId}
            >
              <CardImg
                src={board.fileUrl ? board.fileUrl : imgPlaceholder}
                alt="Card image"
              />
              <CardBody>
                <CardTitle tag="h5">{board.title}</CardTitle>
                <CardText>{board.description}</CardText>
                <CardText>{board.creatorId}</CardText>
                <CardText>userPhoto: {board.userPhoto}</CardText>
                <Button color="secondary">Edit</Button>
                <Button color="dander">Leave board</Button>
              </CardBody>
            </Card>
          ))
        ) : (
          <h3>Now boards</h3>
        )}
      </div>
    </ContainerUser>
  );
};

const mapStateToProps = ({ boards }) => ({ boardState: boards });
export default withRouter(
  connect(mapStateToProps, { getListBoards, getListBoardsClear })(Boards)
);
