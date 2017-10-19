import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './Blog.css'

export default class Blog extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className={`BlogContent`}>
          <iframe className="BlogIFrame" src="http://google.com/" />
        </div>
    )
  }
}
