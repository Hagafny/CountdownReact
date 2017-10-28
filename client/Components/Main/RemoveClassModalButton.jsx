import React from 'react'

export default class RemoveClassModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let {id, title} = this.props;
        id = id.substr(1); //remove the precedding 'c'
        $(".removeClassNameFiller").text(title);
        $("#removeClassModal").attr('data-courseId', id).modal('show');
    }

    render() {
        return (
        <i onClick={this.onClick} className="fa fa-window-close" aria-hidden="true"></i>);
    }
}
