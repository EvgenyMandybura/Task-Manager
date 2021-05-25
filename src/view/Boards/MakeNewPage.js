import React from "react";
import ContainerUser from "../../components/layout/ContainerUser";
import MakeNewPageForm from "../../components/forms/MakeNewPageForm";

const MakeNewPage = () => {
    return (
        <ContainerUser>
            <h1>Make New Page</h1>
            <MakeNewPageForm />
        </ContainerUser>
    );
};

export default MakeNewPage;
