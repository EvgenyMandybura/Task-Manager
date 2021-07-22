import React, { useState, useEffect } from "react";
import { withRouter, useRouteMatch } from "react-router-dom";
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
import { useTranslation } from "react-i18next";

const BoardDetails = ({ getBoard, clearBoardFetched, boardState, history }) => {
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const { loading, board: board } = boardState;
  const [ready, updateReady] = useState(false);
  const [listView, setListView] = useState(false);
  const changeBoardView = (e) => {
    e.preventDefault();
    setListView(!listView);
  };
  const fetchBoard = () => {
    const model = { boardId, history };
    getBoard(model);
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
  const { t } = useTranslation();
  return (
    <ContainerUser>
      <div className="d-flex m-3">
        <Button
          onClick={changeBoardView}
          color="success"
          className="boardButtons"
        >
          {listView ? t("boardDetails.gridView") : t("boardDetails.listView")}
        </Button>
        <Button
          color="success"
          onClick={() => history.push(`/add-new-task/${board.boardId}`)}
          className="boardButtons"
        >
          {t("boardDetails.addNewTask")}
        </Button>
        <Button
          color="success"
          className="boardButtons"
          onClick={() => history.push(`/edit-board-details/${board.boardId}`)}
        >
          {t("boards.edit")}
        </Button>
        <div className="search">
          <Search />
          <SortForm />
          <FilterForm members={board?.members} />
        </div>
      </div>
      {listView ? (
        <div>
          {ready && !loading && (
            <div className="cardBoardDetails">
              <Row>
                <h3 className="text-center">{board.title}</h3>
                <Col xs="9">
                  <ListOfTasks />
                </Col>
                <Col xs="3">
                  <img
                    width="100%"
                    src={board.fileUrl}
                    alt="Board logo"
                    className="cardBoardDetailsImg"
                  />
                  <h5>{t("boardDetails.description")}</h5>
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
