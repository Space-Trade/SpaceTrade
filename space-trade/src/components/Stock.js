import * as React from "react";
import { Container } from "@material-ui/core";
import { useParams } from "react-router-dom";

const Stock = ({ }) => {
    let { stockId } = useParams(); //hace la request con este stockId // ejemplo: TSLA
    return (
        <Container maxWidth="md">
            Stock Id {stockId}
        </Container>
    );
}

export default Stock;