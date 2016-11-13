import React, { Component } from 'react';
import CustomInput from './CustomInput';
import CustomSubmitButton from './CustomSubmitButton';
import PubSub from 'pubsub-js';
import ErrorTreater from './ErrorTreater'

class FormAuthor extends Component {

    constructor(){
        super();
        this.count = 1;
        this.state = {list : [], name: '', email: '', password: ''};
        this.authors = {list : []};

        this.error = {};
    }

    sendForm = (event) => {
        event.preventDefault();
        PubSub.publish('clear-errors', {});
        if(this.validateForm()){
            let author = {id: ++this.count, name: this.state.name, email: this.state.email, password: this.state.password};
            this.authors.list.push(author);
            PubSub.publish('update-author-list', this.authors);
            this.setState({name: '', email:'', password: ''});
        }else{
            new ErrorTreater().publishErrors(this.error);
        }
    }

    validateForm(){
        this.error = {};
        let isValid = true;
        if(!this.state.name){
            this.error.name = true;
            this.error.nameMessage = 'Name must be filled';
            isValid = false;
        }
        if(!this.state.email){
            this.error.email = true;
            this.error.emailMessage = 'Email must be filled';
            isValid = false;
        }
        if(!this.state.password){
            this.error.password = true;
            this.error.passwordMessage = 'Password must be filled';
            isValid = false;
        }
        return isValid;
    }

    saveChange = (inputName, event) => {
        let field = {};
        field[inputName] = event.target.value;
        this.setState(field);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="post">
                  <CustomInput id="name" type="text" label="Name" name="name" value={this.state.name} onChange={this.saveChange.bind(this, 'name')}/>
                  <CustomInput id="email" type="text" label="Email" name="email" value={this.state.email} onChange={this.saveChange.bind(this, 'email')}/>
                  <CustomInput id="password" type="password" label="Password" name="password" value={this.state.password} onChange={this.saveChange.bind(this, 'password')}/>
                  <CustomSubmitButton label="Save"/>
                </form>
            </div>
        );
    }
}

class TableAuthor extends Component {

    render() {
        return (
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.list.map((author) => {
                        return (
                          <tr key={author.id}>
                            <td>{author.name}</td>
                            <td>{author.email}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table> 
            </div>
        );
    }
}

export default class AuthorBox extends Component {

    constructor(){
        super();
        this.state = {list : []};
    }

    componentDidMount(){
        PubSub.subscribe('update-author-list', (topic, newList) =>{
            this.setState(newList);
        });
    }

    render(){
        return (
            <div>
                <div className="header">
                    <h1>Create Author</h1>
                </div>
                <div className="content" id="content">
                    <FormAuthor></FormAuthor>
                    <TableAuthor list={this.state.list}></TableAuthor>
                </div>
            </div>
        );
    }
}