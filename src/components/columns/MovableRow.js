import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";

const DND_ITEM_TYPE = "row";

const MovableRow = ({
  index,
  moveRow,
  setRecords,
  status,
  showModalRename,
  showModal,
}) => {
  const changeColumn = (currentItem, columnName) => {
    setRecords((prevState) => {
      return prevState.map((e) => {
        console.log(setRecords);
        //  editTask(model);
      });
    });
  };

  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
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
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DND_ITEM_TYPE, index },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <tr ref={dropRef} style={{ opacity }} key={status}>
      <td ref={dragRef}>move</td>

      <td> {status}</td>
      <td>
        <Button color="warning" onClick={() => showModalRename(status)}>
          Rename
        </Button>
      </td>
      <td>
        <Button color="danger" onClick={() => showModal(status)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(MovableRow));
