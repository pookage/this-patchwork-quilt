import React from "react";
import ReactDOM from "react-dom";


class ExampleComponent extends React.Component {

  render() {

    return React.createElement(
      'h1',{}, 'Like'
    );
  }
}

ReactDOM.render(
	React.createElement(ExampleComponent),
	document.getElementById("app")
);