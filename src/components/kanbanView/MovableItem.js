import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./kanban.scss";
import { withRouter } from "react-router-dom";
import { editTask } from "../../redux/tasks/actions";
import dateFormat from "../../helpers/dateHelper";
import { connect } from "react-redux";

const MovableItem = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
  taskDetails,
  editTask,
  history,
  boardsState,
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map(() => {
        const { taskId, boardId } = taskDetails;
        const model = { taskId, taskStatus: columnName, history, boardId };
        editTask(model);
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { index, name, currentColumnName, type: "Our first type" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { name } = dropResult;
        boardsState.board.statuses.forEach((key) => {
          if (name === key) {
            changeItemColumn(item, key);
          }
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="movableItem"
      style={{ opacity }}
      onClick={() => history.push(`/task-details/${taskDetails.taskId}`)}
    >
      <p>{taskDetails.summary}</p>
      <p>{taskDetails.assignee}</p>
      <p>
        Time:
        {dateFormat(taskDetails.timeEstimation.seconds)}
      </p>
    </div>
  );
};

const mapStateToProps = ({ boards }) => ({ boardsState: boards });

export default withRouter(connect(mapStateToProps, { editTask })(MovableItem));
