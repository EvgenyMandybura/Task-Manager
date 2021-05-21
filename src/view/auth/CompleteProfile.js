import React from "react";
import { connect } from "react-redux";
import CompleteProfileForm from "../../components/forms/CompleteProfileForm";
import ContainerAuth from "./ContainerAuth";

const CompleteProfile = () => {
    return (
        <ContainerAuth>
            <CompleteProfileForm />
        </ContainerAuth>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(CompleteProfile);
