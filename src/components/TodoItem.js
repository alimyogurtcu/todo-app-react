import React from 'react';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.state = {
            bool: false,
        };
    }

    deleteItem() {
        this.props.deleteItem(this.props.item)
    }

    checkItem() {
        const currentState = this.state.bool;
        this.props.checkItem(this.props.item, this.state.bool)
        this.setState({ bool: !currentState });
    }

    render () {
        const check = (this.props.finished.indexOf(this.props.item) > -1)
        return (
            <li className="list-group-item">
                {check ? <p className="todo"><del>{this.props.item}</del></p> : <p className="todo">{this.props.item}</p>}
                <button className="btn btn-outline-danger btn-sm block float-end" onClick={this.deleteItem}><i className="fas fa-times"></i></button>
                <button className={check ? 'btn btn-success btn-sm block float-start mx-2': 'btn btn-outline-success block btn-sm float-start mx-2'}  onClick={this.checkItem}><i className="fas fa-check"></i></button>
            </li>
        );
    }
}