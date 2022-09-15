import * as React from 'react';
import './style.css';

import FileBox from './FileBox';
import JsonParser from './JsonParser';

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.fileUpdate = this.fileUpdate.bind(this);
  }
  fileUpdate(file: File) {
    console.log('file.name: ', file.name);
    file.text().then((text) => {
      console.log(JsonParser.parse(text));
    });
  }
  render() {
    return (
      <FileBox update={this.fileUpdate} allowedTypes={['application/json']} />
    );
  }
}
