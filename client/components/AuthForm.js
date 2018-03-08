import React, {Component} from 'react';
/*import {graphql} from 'react-apollo';
import query from '../queries/CurrentUser';
import {Link} from 'react-router';
import mutation from '../mutations/Logout';*/

class AuthForm extends Component {
    
    constructor (props) {
        super(props);
        this.state = {email: '', password: ''};
    }
    
   
    onSubmit(event) {
        event.preventDefault();   
        const {email, password} = this.state;
        this.props.onSubmit({email, password});
        // or if we can guarantee that the state would not be mutated in the callback, we can try this:
        // this.props.onSubmit(this.state);
    }
    
    render  () {
        return (
            <div className="row">
                <form className = "col s4" onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input 
                            placeholder="Email"
                            value={this.state.email} 
                            onChange={e => this.setState ({email: e.target.value})}
                        />
                    </div>
                    <div className="input-field">
                       
                        <input 
                            placeholder="Password"
                            type = "password"
                            value={this.state.password} 
                            onChange={e => this.setState ({password: e.target.value})}
                        />
                    </div>
                    <div className="errors">
                        {this.props.errors.map(error => <div key={error}>{error}</div>)}
                    </div>

                    <button className="btn">Submit</button>
                </form>
            </div>
        );
    }
}

export default AuthForm;