import React from 'react';
import Header from './Header';
import Action from './Action';
import TodoList from './TodoList';

export default class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.clearItems = this.clearItems.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.state = {
            items: [],
            finished: []
        }
    }

    componentDidMount() {
        const json = localStorage.getItem('items');
        const items = JSON.parse(json);

        const jsonFinish = localStorage.getItem('finished');
        const finished = JSON.parse(jsonFinish);

        if(items) {
            this.setState({
                items
            })
        }
        if(finished) {
            this.setState({
                finished
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.items.length !== this.state.items.length) {
            const json = JSON.stringify(this.state.items);
            localStorage.setItem('items', json)
        }
        if(prevState.finished.length !== this.state.finished.length) {
            const json = JSON.stringify(this.state.finished);
            localStorage.setItem('finished', json)
        }
    }

    clearItems() {
        this.setState({
            items : [],
            finished : []
        })
    }

    addItem(item) {

        if(!item) {
            return "Please add item!"
        } else if (this.state.items.indexOf(item) > -1) {
            return "This item already added!"
        } else {
            this.setState((prevState) => {
                return {items : prevState.items.concat(item)}
            })
        }
    }

    deleteItem(item) {
        this.setState((prevState) => {
            const arr = prevState.items.filter((i) => {
                return item != i
            })
            const arrFinished = prevState.finished.filter((i) => {
                return item != i
            })
            return {
                items : arr,
                finished : arrFinished
            }
        })
    }

    checkItem(item,bool) {
        if (!(this.state.finished.indexOf(item) > -1)) {
            this.setState((prevState) => {
                return {finished : prevState.finished.concat(item)}
            })
        } else {
            this.setState((prevState) => {
                const arr = prevState.finished.filter((i) => {
                    return item != i
                })
                return {
                    finished : arr
                }
            })
        }
    }

    render() {
        const app = {
            title: "Todo Application"
        }
            return (
                <div className='container my-5'>
                    <div className="card shadow-lg p-3 mb-5 rounded">
                        <div className="card-header text-center">
                            <Header title={app.title}/>
                        </div>
                        <div className="card-body">
                            <TodoList items={this.state.items} finished={this.state.finished} checkItem={this.checkItem} deleteItem={this.deleteItem} clearItems={this.clearItems}/>
                        </div>
                        <div className="card-footer">
                            <Action addItem={this.addItem}/>
                        </div>
                    </div>
                </div>
            );
    }
}