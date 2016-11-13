import PubSub from 'pubsub-js';

export default class ErrorTreater {

    publishErrors(errors){
        if(errors.name){
            let nameError = {};
            nameError.message = errors.nameMessage;
            nameError.field = 'name';
            PubSub.publish('validation-error', nameError);    
        }
        if(errors.email){
            let emailError = {};
            emailError.message = errors.emailMessage;
            emailError.field = 'email';
            PubSub.publish('validation-error', emailError);
        }
        if(errors.password){
            let passwordError = {};
            passwordError.message = errors.passwordMessage;
            passwordError.field = 'password';
            PubSub.publish('validation-error', passwordError);
        }
        if(errors.title){
            let titleError = {};
            titleError.message = errors.titleMessage;
            titleError.field = 'title';
            PubSub.publish('validation-error', titleError);    
        }
        if(errors.price){
            let priceError = {};
            priceError.message = errors.priceMessage;
            priceError.field = 'price';
            PubSub.publish('validation-error', priceError);    
        }
        if(errors.author){
            let authorError = {};
            authorError.message = errors.authorMessage;
            authorError.field = 'author';
            PubSub.publish('validation-error', authorError);    
        }
    }
}