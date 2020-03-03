import ReactDOM from "react-dom";
import React from 'react';

import Counter from './components/Counter';

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Counter />, wrapper) : false;
