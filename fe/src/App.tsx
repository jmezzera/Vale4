import React, {Component} from 'react';
import { getUsers } from './Services/Users';
import UserList from './Components/UserList';


type AppState = {
    users: {_name: string}[]
}
export default class App extends Component<{}, AppState>{
    constructor(){
        super({});
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        getUsers()
            .then(users => this.setState({users}))
    }
    render(){
        return (
            <UserList users={this.state.users} />
        )
    }
}