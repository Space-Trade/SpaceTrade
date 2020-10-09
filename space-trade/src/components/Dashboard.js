import * as React from "react";
import { Container } from "@material-ui/core";
import Leftbar from "./elements/leftbar"

const Dashboard = ({ }) => {
    return (
        <div>
            <Leftbar />
            <Container maxWidth="md">
                Dashboard
            </Container>
        </div>
    );
}

export default Dashboard;