import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./kanban.scss";
import { COLUMN_NAMES } from "../../constants/taskStatuses";
import { useRouteMatch, withRouter } from "react-router-dom";
import { getListTasks, getListTasksClear } from "../../redux/tasks/actions";
import { connect } from "react-redux";
import { SUMMARY } from "../../constants/sortFields";
import MovableItem from "./MovableItem";

const Column = ({ children, className, title }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getBackgroundColor = () => {
    if (isOver) {
      return "rgb(188,251,255)";
    } else {
      return "";
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p className="columnTitle">{title}</p>
      {children}
    </div>
  );
};

export const BoardKanbanView = ({
  getListTasks,
  getListTasksClear,
  tasksState,
}) => {
  const { tasksList, loading } = tasksState;
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const [ready, updateReady] = useState(false);
  const fetchTasks = () => {
    const model = { boardId, SUMMARY };
    getListTasks(model);
  };
  useEffect(() => {
    fetchTasks();
    updateReady(true);
    return () => {
      getListTasksClear();
    };
  }, []);

  useEffect(() => {
    setItems(tasksList);
  }, [loading]);

  const [items, setItems] = useState(tasksList);
  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item?.taskStatus === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.taskId}
          name={item.summary}
          currentColumnName={item.taskStatus}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
          taskDetails={item}
        />
      ));
  };

  const { ...rest } = COLUMN_NAMES;
  const tempArray = [];
  Object.keys(rest).forEach((key) => tempArray.push(rest[key]));

  return (
    <div className="containerKanban">
      {tasksList.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          {tempArray.map((column) => (
            <Column title={column} className="column" key={column}>
              {returnItemsForColumn(column)}
            </Column>
          ))}
        </DndProvider>
      )}
    </div>
  );
};

const mapStateToProps = ({ tasks }) => ({
  tasksState: tasks,
});

export default withRouter(
  connect(mapStateToProps, { getListTasks, getListTasksClear })(BoardKanbanView)
);
