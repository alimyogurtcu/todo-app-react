import React from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
    render() {
        return (
            <div>
                <ul className="list-group">
                    {
                        this.props.items.map((item,index) => 
                            <TodoItem finished={this.props.finished} checkItem={this.props.checkItem} deleteItem={this.props.deleteItem} key={index} item={item}/>
                        )
                    }
                </ul>
                {
                    this.props.items.length > 0
                    ?
                    <p>
                        <button className="btn btn-danger mt-3 btn-sm float-end" onClick={this.props.clearItems}>Clear todos</button>
                    </p>
                    :
                    <p className="alert alert-warning mt-3">Please add your todo</p>
                }
            </div>
        );
    }
}
