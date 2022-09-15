import * as React from 'react';

type FileBoxProps = {
  update: (file: File) => void;
  allowedTypes: string[];
};
type FileBoxState = {
  file: File | null;
  errors: string[] | null;
};
export default class  extends React.Component<