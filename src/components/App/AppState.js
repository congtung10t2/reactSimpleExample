import React, { Component } from 'react';
const ProgressBar = (props) => {
    return (
        <div key={props.keyValue} className="progress-bar">
          <Filler limit={props.limit} value={props.value} />
          <div className="text">{Math.round(props.value/props.limit*100)}%</div>
        </div>
      )
  }
const Filler = (props) => {
    const red = props.value < props.limit ? '' : ' red'
    const classes = `filler${red}`
    return (<div key={props.keyValue}  className={classes} style={{ width: `${Math.min(props.value/props.limit, 1.0)*100}%` }} > </div>)
}
class AppState extends Component {
    constructor(){
        super()
        this.state = {
            buttons: [], 
            bars: [],
            limit: 0,
            select: 0
        }
    }
    componentDidMount() {
        fetch('http://pb-api.herokuapp.com/bars').then(result=> {
            return result.json()
        }).then(data => {
            let buttons = data.buttons
            let bars = data.bars
            let limit = data.limit
            this.setState({buttons: buttons, bars: bars, limit: limit})
            console.log(this.state)
        })
    }
    onClick(value) {
        let sum = this.state.bars[this.state.select] + value
        if(sum < 0) {
            this.state.bars[this.state.select] = 0 
        } else {
            this.state.bars[this.state.select] = sum
        }
        this.setState(this.state)
    }
    handleChange(event) {
        this.state.select = event.target.value
        this.setState(this.state)
    }
    
   
    render() {
    return (
    <div className="content">
        <label>
          Adjust with the limit is: {this.state.limit}
        </label>
        <div>{this.state.bars.map((value) => <ProgressBar keyValue={value} limit={this.state.limit}  value={value} />)}</div>
        <div className="command-div">
            <select className="select-bar" value={this.state.value} onChange={(event) => this.handleChange(event)}>
                {
                this.state.bars.map((value,index) => 
                    <option value={index}>{index}</option>)
                }
            </select>
        {this.state.buttons.map((element) => <button onClick={() => this.onClick(element)} key={element}>{element}</button>)}
        </div>
   </div>)
    }
}
export default AppState