import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import {
  getTaskComments,
  getTaskCommentsClear,
} from "../../redux/comments/actions";
import { useRouteMatch } from "react-router-dom";
import styles from "./styles.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const CommentsList = ({ getTaskComments, getTaskCommentsClear, Comments }) => {
  const {
    params: { taskId },
  } = useRouteMatch("/task-details/:taskId");
  const { comments, loading, lastVisible } = Comments;
  const fetchTaskComments = () => {
    const model = { taskId, lastVisible: lastVisible };
    getTaskComments(model);
  };
  const [allList, setAllList] = useState(null);
  useEffect(() => {
    if (comments.length != 0 && lastVisible != null) {
      setAllList(comments);
    }
  }, [comments]);
  const fetchMoreData = async () => {
    fetchTaskComments();
    await setAllList(allList.concat(comments));
  };

  useEffect(() => {
    fetchTaskComments();
    return () => {
      getTaskCommentsClear();
    };
  }, []);

  useEffect(() => {
    if (!!loading) {
      fetchTaskComments();
    }
  }, [loading]);

  return (
    <Container>
      <h4>Comments:</h4>
      {!!allList && (
        <div>
          <InfiniteScroll
            dataLength={allList.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {allList.map((comment) => (
              <div key={comment.timeStamp} className="commentContainer">
                <Row>
                  <Col xs={2}>
                    <div className="userAvatarWr">
                      <img src={comment.creatorData.fileUrl} alt="User logo" />
                    </div>
                  </Col>

                  <Col xs={8}>
                    <div>
                      <p>{comment.commentCreator}</p>
                      <p>{new Date(comment.timeStamp).toLocaleDateString()}</p>
                      <p> {comment.description}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = ({ comments }) => ({ Comments: comments });
export default connect(mapStateToProps, {
  getTaskComments,
  getTaskCommentsClear,
})(CommentsList);
