import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./kanban.scss";
import { COLUMN_NAMES } from "../../constants/taskStatuses";
import { useRouteMatch, withRouter } from "react-router-dom";
import { getListTasks, getListTasksClear } from "../../redux/tasks/actions";
import dateFormat from "../../helpers/dateHelper";
import { connect } from "react-redux";
import { SUMMARY } from "../../constants/sortFields";

const MovableItem = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
  taskDetails,
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column,
        };
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
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, name, currentColumnName, type: "Our first type" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { ...rest } = COLUMN_NAMES;
        let value;
        Object.keys(rest).forEach((key) => {
          value = rest[key];
          if (name === value) {
            changeItemColumn(item, value);
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
    <div ref={ref} className="movableItem" style={{ opacity }}>
      <p>{taskDetails.summary}</p>
      <p>{taskDetails.assignee}</p>
      <p>
        Time:
        {dateFormat(taskDetails.timeEstimation.seconds)}
      </p>
    </div>
  );
};

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
  const { tasksList } = tasksState;
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const fetchTasks = () => {
    const model = { boardId, SUMMARY };
    getListTasks(model);
  };
  useEffect(() => {
    fetchTasks();
    return () => {
      getListTasksClear();
    };
  }, []);
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
      .filter((item) => item.taskStatus === columnName)
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
      <DndProvider backend={HTML5Backend}>
        {tempArray.map((column) => (
          <Column title={column} className="column">
            {returnItemsForColumn(column)}
          </Column>
        ))}
      </DndProvider>
    </div>
  );
};

const mapStateToProps = ({ tasks }) => ({
  tasksState: tasks,
});

export default withRouter(
  connect(mapStateToProps, { getListTasks, getListTasksClear })(BoardKanbanView)
);
