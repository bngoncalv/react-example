import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class CustomInput extends Component{

    constructor(){
        super();
        this.state = {msgErro: ''};
    }

    componentDidMount(){
        PubSub.subscribe('validation-error', (topic, error) => {
            if(error.field === this.props.name){
                this.setState({msgErro: error.message});
            }
        });

        PubSub.subscribe('clear-errors', (topic) => {
            this.setState({msgErro: ''});
        });
    }

    render(){
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label> 
                <input {...this.props}/>
                <span className="error">{this.state.msgErro}</span>                  
            </div>
        );
    }
}