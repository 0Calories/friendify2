import React, { Component } from 'react';

class UserAr extends Component {

  componentDidMount() {
    document.body.innerHTML = createMarkUp();
  }

  render() {
    return (
      <p>test</p>
      // <div dangerouslySetInnerHTML={createMarkUp()}></div>
    );
  }
}

function createMarkUp() {
  return '<a-scene embedded arjs><a-marker preset="hiro"><a-box position="0 0.5 0" material="color: yellow;"></a-box></a-marker><a-entity camera></a-entity></a-scene>'
}

export default UserAr