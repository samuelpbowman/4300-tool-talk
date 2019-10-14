import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import info from './la-pa.js';

/*
 * The cards that show up in the detail view
 * are generated here; they merely show 
 * information and were not designed to have
 * any functionality for the purpose of my
 * demonstration.
 */
function OptionCard(d) {
    return (
        <div className="optionCard">
            <h3>{ d["name"] }</h3>
            <p>{ d["desc"] }</p>
            <p>£{ d["price"] }</p>
        </div>
    );
}

/*
 * Class representing the main view in which menu
 * items for a given category are shown in a 
 * detail view.
 */
class OptionPane extends React.Component {
    render() {
        let cards = [];
        for(var d in this.props.data) {
            cards.push(OptionCard(this.props.data[d]));
        }
        return (
            <div id="optionPane">
                { cards }
            </div>
        );
    }
}

/*
 * I only registered the MenuCard objects as a function because
 * there's no need for them to carry any data; they only have 
 * a label and a callback function (passed by the parent object).
 */
function MenuCard(data, callback) {
    return (
        <div className="menuCard" onClick={() => callback(data)}>
            <h3>{ data }</h3>
        </div>
    );
}

/*
 * this class represents the scrollable side bar
 * in here we render each category's button and
 * set the callback function based on the value
 * of a given category.
 */
class SideMenu extends React.Component {
    render() {
        var cards = [];
        for(let d in this.props.data) {
            cards.push(MenuCard(d, () => this.props.setOptions(d)));
        }

        return (
            <div id="sideMenu">
                { cards }
            </div>
        );
    }
}

/*
 * the class for the top-level container
 * the point here was to have a marshall for clicking a 
 * menu category so that the options for that category could
 * be rendered alongside.
 */
class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
        this.setOptions = this.setOptions.bind(this);
    }

    setOptions(ops) {
        this.setState({
            options: this.props.data["categories"][ops],
        });
    }

    render() {
        return (
            <div id="container">
                <SideMenu data={this.props.data["categories"]} setOptions={this.setOptions} />
                <OptionPane data={this.state.options} />
            </div>
        );
    }
}

//actually start the application
ReactDOM.render(
    <Container data={info}/>,
    document.getElementById('root')
);
