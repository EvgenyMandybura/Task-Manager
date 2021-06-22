import React, { useEffect, useState } from "react";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getBoard, clearBoardFetched } from "../../redux/boards/actions";
import { Table, Button } from "reactstrap";
import ContainerUser from "../layout/ContainerUser";
import AddColumnModal from "../modal/AddColumn";
import useModal from "../../hook/useModal";

const ColumnsList = ({ boardsState, getBoard, clearBoardFetched }) => {
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

  const [modalVisibleAdd, toggleModalAdd] = useModal();
  const onConfirmed = () => {
    toggleModalAdd();
  };

  const statuses = board?.statuses;
  return (
    <ContainerUser>
      <Button color="success" onClick={() => toggleModalAdd()}>
        Add column
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>List of statuses</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {ready &&
            statuses?.map((status) => (
              <tr>
                <td> {status}</td>
                <td>
                  <Button color="danger">Delete</Button>
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
    </ContainerUser>
  );
};
const mapStateToProps = ({ boards }) => ({ boardsState: boards });
export default withRouter(
  connect(mapStateToProps, { getBoard, clearBoardFetched })(ColumnsList)
);
