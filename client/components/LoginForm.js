import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {hashHistory} from 'react-router';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
// import {Link} from 'react-router';

import AuthForm from './AuthForm';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {errors: []};
    }
    
    componentWillUpdate(nextProps) {
        this.props  //the current set of props
        nextProps // that would be in place once the component is updated
        // console.log(this.props, nextProps);
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard');
        }
    }
    
    onSubmit ({email, password}) {
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{query}]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
        
    }
    
    render  () {
        return (
            <div>
                <h3>Login Form</h3>
                <AuthForm 
                errors = {this.state.errors}
                onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}

export default graphql(query) (graphql(mutation)(LoginForm));