import React, { useEffect, useState } from "react";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getBoard, clearBoardFetched } from "../../redux/boards/actions";
import { Table, Button } from "reactstrap";
import ContainerUser from "../layout/ContainerUser";
import AddColumnModal from "../modal/AddColumn";
import RenameColumnModal from "../modal/RenameColumn";
import useModal from "../../hook/useModal";
import ConfirmationDialog from "../modal/ConfirmationDialog";
import { deleteStatus } from "../../redux/boards/actions";
import { removeStatusesFromArray } from "../../helpers/statusesArrayEditting";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MovableRow from "./MovableRow";

const REMOVE_COLUMN_MODAL_TITLE = "Delete Column";
const REMOVE_COLUMN_MODAL_DESCRIPTION = "Do you want to delete column?";

const ColumnsList = ({
  boardsState,
  getBoard,
  clearBoardFetched,
  deleteStatus,
  history,
}) => {
  const {
    params: { boardId },
  } = useRouteMatch("/edit-board-details/:boardId");
  const { loading, board: board } = boardsState;
  const [ready, updateReady] = useState(false);
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

  const [modalVisibleAdd, toggleModalAdd] = useModal();
  const onConfirmed = () => {
    toggleModalAdd();
  };
  const [modalVisibleDelete, toggleModalDelete] = useModal();
  const onDeleteConfirmed = () => {
    statuses = removeStatusesFromArray(statuses, status);
    if (statuses) {
      let tasksList = board?.tasks;
      const model = { statuses, boardId, tasksList };
      deleteStatus(model);
    }
    toggleModalDelete();
  };

  const [status, setStatus] = useState(null);
  const showModal = (status) => {
    setStatus(status);
    toggleModalDelete();
  };

  const [modalVisibleRename, toggleModalRename] = useModal();
  const onConfirmedRename = () => {
    toggleModalRename();
  };
  const showModalRename = (status) => {
    setStatus(status);
    toggleModalRename();
  };

  let statuses = board?.statuses;

  const [records, setRecords] = useState(null);

  useEffect(() => {
    setRecords(board?.statuses);
  }, [board]);

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    if (dragRecord) {
      setRecords((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragRecord);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      });
    }
  };

  const renderRows = (status, index) => {
    return (
      <MovableRow
        key={status}
        index={index}
        id={status.id}
        moveRow={moveRow}
        status={status}
        showModalRename={showModalRename}
        showModal={showModal}
        records={records}
        boardId={boardId}
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ContainerUser>
        <Button color="success" onClick={() => toggleModalAdd()}>
          Add column
        </Button>
        <Table striped>
          <thead>
            <tr>
              <th>Change order</th>
              <th>List of statuses</th>
              <th>Rename Column</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {ready &&
              !!statuses &&
              (!!records ? records : statuses).map((status, i) =>
                renderRows(status, i)
              )}
          </tbody>
        </Table>
        <AddColumnModal
          isOpen={modalVisibleAdd}
          onCancel={toggleModalAdd}
          onConfirm={onConfirmed}
        />
        <ConfirmationDialog
          isOpen={modalVisibleDelete}
          titleText={REMOVE_COLUMN_MODAL_TITLE}
          contentText={REMOVE_COLUMN_MODAL_DESCRIPTION}
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          onCancel={toggleModalDelete}
          onConfirm={onDeleteConfirmed}
        />
        <RenameColumnModal
          isOpen={modalVisibleRename}
          onCancel={toggleModalRename}
          onConfirm={onConfirmedRename}
          oldStatus={status}
        />
      </ContainerUser>
    </DndProvider>
  );
};
const mapStateToProps = ({ boards }) => ({ boardsState: boards });
export default withRouter(
  connect(mapStateToProps, { getBoard, clearBoardFetched, deleteStatus })(
    ColumnsList
  )
);
