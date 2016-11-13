import React, { Component } from 'react';
import CustomInput from './CustomInput';
import CustomSubmitButton from './CustomSubmitButton';
import PubSub from 'pubsub-js';
import ErrorTreater from './ErrorTreater'

export default class BookBox extends Component {

    constructor(){
        super();
        this.state = {list : []};
    }

    componentDidMount(){
        PubSub.subscribe('update-book-list', (topic, newList) =>{
            this.setState(newList);
        });
    }

    render(){
        return (
            <div>
                <div className="header">
                    <h1>Create Book</h1>
                </div>
                <div className="content" id="content">
                    <FormBook></FormBook>
                    <TableBook list={this.state.list}></TableBook>
                </div>
            </div>
        );
    }
}

class TableBook extends Component {

    render() {
        return (
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Author</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.list.map((book) => {
                        return (
                          <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.price}</td>
                            <td>{book.author}</td>
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

class FormBook extends Component {
    
    constructor(){
        super();
        this.count = 1;
        this.state = {list : [], title: '', price: '', author: ''};
        this.books = {list : []};

        this.error = {};
    }

    sendForm = (event) => {
        event.preventDefault();
        PubSub.publish('clear-errors-book', {});
        if(this.validateForm()){
            let book = {id: ++this.count, title: this.state.title, price: this.state.price, author: this.state.author};
            this.books.list.push(book);
            PubSub.publish('update-book-list', this.books);
            this.setState({title: '', price:'', author: ''});
        }else{
            new ErrorTreater().publishErrors(this.error);
        }
    }

    validateForm(){
        this.error = {};
        let isValid = true;
        if(!this.state.title){
            this.error.title = true;
            this.error.titleMessage = 'Title must be filled';
            isValid = false;
        }
        if(!this.state.price){
            this.error.price = true;
            this.error.priceMessage = 'Price must be filled';
            isValid = false;
        }
        if(!this.state.author){
            this.error.author = true;
            this.error.authorMessage = 'Author must be filled';
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
                  <CustomInput id="title" type="text" label="Title" name="title" value={this.state.title} onChange={this.saveChange.bind(this, 'title')}/>
                  <CustomInput id="price" type="text" label="Price" name="price" value={this.state.price} onChange={this.saveChange.bind(this, 'price')}/>
                  <CustomInput id="author" type="text" label="Author" name="author" value={this.state.author} onChange={this.saveChange.bind(this, 'author')}/>
                  <CustomSubmitButton label="Save"/>
                </form>
            </div>
        );
    }
}