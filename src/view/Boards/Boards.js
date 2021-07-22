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
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import "./indexBoards.scss";
import imgPlaceholder from "../../assets/ic-placeholder.svg";
import { getListBoards, getListBoardsClear } from "../../redux/boards/actions";
import ConfirmationDialog from "../../components/modal/ConfirmationDialog";
import useModal from "../../hook/useModal";
import { leaveBoard } from "../../redux/boards/actions";
import HeaderStyles from "../../components/layout/index.module.scss";
import Spinner from "../../components/loaderSpinner/Spinner";

const Boards = ({
  getListBoards,
  getListBoardsClear,
  boardState,
  leaveBoard,
  history,
}) => {
  const { boardsList, removed, loading } = boardState;
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
  }, [removed]);

  const [modalVisibleLeave, toggleModalLeave] = useModal();
  const onLeaveConfirmed = () => {
    leaveBoard(boardId);
    toggleModalLeave();
  };

  const [boardId, setBoardId] = useState(null);

  const showModal = (boardId) => {
    setBoardId(boardId);
    toggleModalLeave();
  };
  const { t } = useTranslation();
  return (
    <ContainerUser>
      <Link to="/make-new-board">
        <Button color="success">{t("boards.addNewBoard")}</Button>
      </Link>
      <div className="row justify-content-center align-self-center">
        {ready && boardsList != "border" && !loading ? (
          boardsList.map((board) => (
            <Card
              className={classNames(
                "col-sm-3 m-2 d-inline-block rounded-3 shadow",
                "wrapBoard"
              )}
              key={board.boardId}
            >
              <CardImg
                src={board.fileUrl ? board.fileUrl : imgPlaceholder}
                alt="Card image"
                className="pt-3"
                onClick={() => history.push(`/board-details/${board.boardId}`)}
              />
              <CardBody>
                <CardTitle tag="h5">{board.title}</CardTitle>
                <CardText>{board.description}</CardText>
                <CardText>
                  <img
                    src={board.queryUser.fileUrl}
                    alt="logo"
                    className={HeaderStyles.userLogo}
                  />
                  <b>{board.queryUser.firstName}</b>
                </CardText>
              </CardBody>
              <div className="toBottom">
                <Button
                  color="secondary"
                  className="cardBoardDetailsBtn"
                  onClick={() =>
                    history.push(`/edit-board-details/${board.boardId}`)
                  }
                >
                  {t("boards.edit")}
                </Button>
                <Button
                  color="danger"
                  value={board.boardId}
                  onClick={() => showModal(board.boardId)}
                  className="cardBoardDetailsBtn"
                >
                  {t("boards.leaveBoard")}
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Spinner />
        )}
      </div>
      <ConfirmationDialog
        isOpen={modalVisibleLeave}
        titleText={t("boards.leaveBoardTitle")}
        contentText={t("boards.doYouWantToLeaveBoard")}
        cancelButtonText={t("boards.cancelButtonText")}
        confirmButtonText={t("boards.confirmButtonText")}
        onCancel={toggleModalLeave}
        onConfirm={onLeaveConfirmed}
      />
    </ContainerUser>
  );
};

const mapStateToProps = ({ boards }) => ({ boardState: boards });
export default withRouter(
  connect(mapStateToProps, { getListBoards, getListBoardsClear, leaveBoard })(
    Boards
  )
);
