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
    componentDidMount() {
      api.checkToken()
        .then(res => {
          if (200) {
            this.setState({ loading: false });
          } else {
            throw new Error(res.error);
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;

      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}