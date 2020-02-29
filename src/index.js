import ReactDOM from "react-dom";
import React from 'react';

import HelloWorld from './components/helloworld/HelloWorld';

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<HelloWorld />, wrapper) : false;
