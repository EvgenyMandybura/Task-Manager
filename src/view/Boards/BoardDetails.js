import React, { useState, useEffect } from "react";
import { withRouter, useRouteMatch, Link } from "react-router-dom";
import { connect } from "react-redux";
import ContainerUser from "../../components/layout/ContainerUser";
import { getBoard, clearBoardFetched } from "../../redux/boards/actions";
import { Row, Col, Button } from "reactstrap";
import ListOfMembersDetail from "../../components/members/ListOfMembersDetail";
import Search from "../../components/forms/SearchForm";
import ListOfTasks from "../../components/tasks/ListOfTasks";
import FilterForm from "../../components/forms/FilterForm";
import SortForm from "../../components/forms/SortForm";
import BoardKanbanView from "../../components/kanbanView/boardsView";

const BoardDetails = ({ getBoard, clearBoardFetched, boardState, history }) => {
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const { loading, board: board } = boardState;
  const [ready, updateReady] = useState(false);
  const [listView, setListView] = useState(true);
  const changeBoardView = (e) => {
    e.preventDefault();
    setListView(!listView);
  };
  const fetchBoard = () => {
    getBoard(boardId);
  };
  useEffect(() => {
    fetchBoard();
    updateReady(true);
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchBoard();
    }
  }, []);

  return (
    <ContainerUser>
      <Button onClick={changeBoardView}>
        {listView ? "Grid view" : "List view"}
      </Button>
      {listView ? (
        <div>
          {ready && !loading && (
            <div className="cardBoardDetails">
              <h3>{board.title}</h3>

              <Row>
                <Col xs="8">
                  <div className="search">
                    <Search />
                    <FilterForm members={board.members} />
                    <SortForm />
                    <Button
                      color="success"
                      onClick={() =>
                        history.push(`/add-new-task/${board.boardId}`)
                      }
                    >
                      Add New Task
                    </Button>
                  </div>
                  <ListOfTasks />
                </Col>
                <Col xs="4">
                  <img
                    width="100%"
                    src={board.fileUrl}
                    alt="Board logo"
                    className="cardBoardDetailsImg"
                  />
                  <h5>Description: </h5>
                  <p>{board.description}</p>
                  <ListOfMembersDetail members={board.members} />
                </Col>
              </Row>
            </div>
          )}
        </div>
      ) : (
        <BoardKanbanView />
      )}
    </ContainerUser>
  );
};

const mapStateToProps = ({ boards }) => ({ boardState: boards });

export default withRouter(
  connect(mapStateToProps, { getBoard, clearBoardFetched })(BoardDetails)
);
