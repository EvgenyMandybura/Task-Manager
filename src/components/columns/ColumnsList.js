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

const REMOVE_COLUMN_MODAL_TITLE = "Delete Column";
const REMOVE_COLUMN_MODAL_DESCRIPTION = "Do you want to delete column?";

const ColumnsList = ({
  boardsState,
  getBoard,
  clearBoardFetched,
  deleteStatus,
}) => {
  const {
    params: { boardId },
  } = useRouteMatch("/edit-board-details/:boardId");
  const { loading, board: board } = boardsState;
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
  let statuses = board?.statuses;
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

  return (
    <ContainerUser>
      <Button color="success" onClick={() => toggleModalAdd()}>
        Add column
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>List of statuses</th>
            <th>Rename Column</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {ready &&
            statuses?.map((status) => (
              <tr key={status}>
                <td> {status}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => showModalRename(status)}
                  >
                    Rename
                  </Button>
                </td>
                <td>
                  <Button color="danger" onClick={() => showModal(status)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
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
  );
};
const mapStateToProps = ({ boards }) => ({ boardsState: boards });
export default withRouter(
  connect(mapStateToProps, { getBoard, clearBoardFetched, deleteStatus })(
    ColumnsList
  )
);
