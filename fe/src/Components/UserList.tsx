import React, {Component} from 'react'


type UserListState = {

}

type UserListProps = {
    users: {_name: string}[]
}
export default class UserList extends Component<UserListProps, UserListState>{
    render(){        
        return (
            <ul>
                {this.props.users.map(user => <li>{user._name}</li>)}
            </ul>
        )
    }
}