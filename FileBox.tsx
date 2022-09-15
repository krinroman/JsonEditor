import * as React from 'react';

type FileBoxProps = {
  update: (file: File) => void;
  allowedTypes: string[];
};
type FileBoxState = {
  file: File | null;
  errors: string[] | null;
};
export default class FileBox extends React.Component<
  FileBoxProps,
  FileBoxState
> {
  constructor(props: FileBoxProps) {
    super(props);
    this.state = {
      file: null,
      errors: null,
    };
  }
  onFileChange = (event: any) => {
    this.setState({ errors: null });
    const file: File = event.target.files[0];
    if (!(file as File).type) {
      return this.setState({ errors: ['Неверный тип переменной'] });
    }
    if (
      this.props.allowedTypes.indexOf(file.type) == -1 &&
      this.props.allowedTypes.length > 0
    ) {
      return this.setState({ errors: ['Неверный тип файла'] });
    }
    this.setState({ file: file });
    this.props.update(file);
  };
  errors() {
    if (this.state.errors) {
      return (
        <ul>
          {this.state.errors.map((error) => {
            return <li>{error}</li>;
          })}
        </ul>
      );
    }
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.onFileChange} />
        {this.errors()}
      </div>
    );
  }
}
