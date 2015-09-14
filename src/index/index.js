/*-----------------------------------------------------
 * @Description:     react示例
 * @author:          lianmin.slm
 * @date             2015.8.29
 * ---------------------------------------------------*/

'use strict';

require('./style.css');

var App = React.createClass({
    getDefaultProps: function () {
        return {
            hint: 'you have input'
        }
    },
    getInitialState: function () {
        return {
            name: 'world'
        }
    },
    handleSubmit: function (ev) {
        alert('hello, ' + this.state.name + '!');
        ev.preventDefault();
    },
    handleFieldChange: function (ev) {
        var val = ev.target.value;

        this.setState({
            name: val
        });
    },
    render: function () {

        return <div className="page">
            <form action="" onSubmit={this.handleSubmit}>
                <label>你的名字：</label>
                <input ref="nameField"
                       type="text"
                       onChange={this.handleFieldChange}
                       defaultValue={this.state.name}/>
                <button type="submit">submit</button>
            </form>

            <div className="container">
                <span>{this.props.hint}</span>
                <strong>{this.state.name}</strong>
            </div>
        </div>
    }
});

React.render(<App hint="您已输入:"/>, document.body);
