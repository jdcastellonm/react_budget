class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
        this.removeOptions = this.removeOptions.bind(this);
        this.pickOption = this.pickOption.bind(this);
        this.addOption = this.addOption.bind(this);
        this.removeSingleOption = this.removeSingleOption.bind(this);
    }
    // lifecycle
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {}
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            // only store if new state is different from prev
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount() {}
    //
    removeOptions() {
        this.setState(() => ({ options: [] }));
    }
    removeSingleOption(optionToRemove) {
        this.setState(prevState => ({ options: prevState.options.filter(current => current !== optionToRemove) }));
    }
    pickOption() {
        let choice = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[choice]);
    }
    addOption(option) {
        if (!option) {
            return "Please enter a valid option.";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists.";
        }
        this.setState(() => ({ options: this.state.options.concat(option) }));
    }
    render() {
        const subtitle = "Put your life in the hands of a computer.";
        return React.createElement(
            'div',
            null,
            React.createElement(Header, { subtitle: subtitle }),
            React.createElement(Action, { hasOptions: this.state.options.length > 0, pickOption: this.pickOption }),
            React.createElement(Options, { options: this.state.options, removeSingleOption: this.removeSingleOption, removeOptions: this.removeOptions }),
            React.createElement(AddOption, { addOption: this.addOption })
        );
    }
}
const Header = props => {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};
Header.defaultProps = {
    title: "Indecision"
    // class Header extends React.Component {
    //     render() {
    //         return (
    //             <div>
    //                 <h1>{this.props.title}</h1>
    //                 <h2>{this.props.subtitle}</h2>
    //             </div>
    //         );
    //     }
    // }

};const Action = props => {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { disabled: !props.hasOptions, onClick: props.pickOption },
            'What should I do?'
        )
    );
};
// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button disabled={!this.props.hasOptions} onClick={this.props.pickOption}>What should I do?</button>
//             </div>
//         );
//     }
// }

const Options = props => {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { disabled: props.options.length === 0, onClick: props.removeOptions },
            'Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            { style: { color: 'brown' } },
            'Please add some options to get started!'
        ),
        props.options.map((current, index) => {
            return React.createElement(Option, { key: index, optionText: current, removeSingleOption: props.removeSingleOption });
        })
    );
};
// class Options extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button disabled={this.props.options.length === 0} onClick={this.props.removeOptions}>Remove All</button>
//                 {
//                     this.props.options.map( (current, index) => {
//                         return <Option key={index} optionText={current}/>
//                     })
//                 }
//             </div>
//         );
//     }
// }

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();
        let choice = e.target.elements.option.value.trim();
        let error = this.props.addOption(choice);
        this.setState(() => ({ error }));
        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { onSubmit: this.handleAddOption },
                this.state.error && React.createElement(
                    'p',
                    { style: { color: 'red' } },
                    this.state.error
                ),
                React.createElement('input', { type: 'text', name: 'option' }),
                React.createElement(
                    'button',
                    null,
                    'Add Option'
                )
            )
        );
    }
}

const Option = props => {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            props.optionText
        ),
        React.createElement(
            'button',
            { onClick: () => props.removeSingleOption(props.optionText) },
            'Remove'
        )
    );
};
// class Option extends React.Component {
//     render() {
//         return (
//             <p>{this.props.optionText}</p>
//         )
//     }
// }

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
