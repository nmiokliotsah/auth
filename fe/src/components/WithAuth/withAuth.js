import React from 'react';
import { api } from '../../api/api';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    render() {
      return <ComponentToProtect {...this.props} />;
    }
  }
}