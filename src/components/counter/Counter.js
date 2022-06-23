import {Component} from "react";
import './Counter.css';

export class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            count: 0,
            users: [],
        };
        this.btnClick = this.btnClick.bind(this);
    }

    btnClick() {
        this.setState({
            count: this.state.count +1
        });
    }

    loadData = () =>{
        fetch("https://localhost:5001/api/User")
            .then(data => data.json())
            .then(data =>{
                this.setState({
                    users: data
                });
            })
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.loadData();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        /*this.setState({
            date: new Date()
        });*/
    }

    render() {
        console.log(this.state.users);
        return (
            <div>
                <button onClick={this.btnClick}>{this.state.count}</button>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <ul className={'Counter_ul'}>{this.state.users.map(user =>
                    <li key={user.id}>{user.firstName}</li>
                )}</ul>
            </div>
        );
    }
}