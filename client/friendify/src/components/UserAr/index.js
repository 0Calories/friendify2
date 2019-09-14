import React, { Component } from 'react';

class UserAr extends Component {

  render() {
    return (
      <div dangerouslySetInnerHTML={createMarkUp()}></div>
    );
  }
}

function createMarkUp() {
  return {__html: '<a-scene embedded arjs><a-marker preset="hiro"><a-box position="0 0.5 0" material="color: yellow;"></a-box></a-marker><a-entity camera></a-entity></a-scene>'}
}

export default UserAr