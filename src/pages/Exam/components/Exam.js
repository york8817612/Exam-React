import * as React from 'react';
import { useParams } from "react-router-dom";

export default function Exam() {
    let params = useParams();
    return <h2>Exam: {params.id}</h2>;
}