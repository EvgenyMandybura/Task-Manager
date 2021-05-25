import React from "react";
import ContainerUser from "../../components/layout/ContainerUser";
import {Button, Card, CardBody, CardTitle, CardSubtitle, CardText} from "reactstrap";
import {Link} from "react-router-dom";
import "./indexBoards.scss"

const Boards = () => {
    return (
        <ContainerUser>
            <h1>Boards Boards Boards</h1>
            <Link to="/make-new-board">
                <Button color="success">Add New Board</Button>
            </Link>
            <div>
                <Card className="cardBoards">
                    <CardBody>
                        <CardTitle tag="h5">Board title</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Board subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card className="cardBoards">
                    <CardBody>
                        <CardTitle tag="h5">Board title</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card className="cardBoards">
                    <CardBody>
                        <CardTitle tag="h5">Board title</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
            </div>


        </ContainerUser>
    );
};

export default Boards;