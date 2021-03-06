import React from 'react';
import {Modal, Button} from 'react-bootstrap'

export default class MessageBox extends React.Component {
    constructor(props) {
		super(props);

		this.okHandler      = this.okHandler.bind(this);
		this.closeHandler   = this.closeHandler.bind(this);
		this.closeBox       = this.closeBox.bind(this);

		this.state = {
			show: false,
			confirm: false,
			title: '',
			message: '',
		}
    }

    alert(title, message) {
		this.okCb = this.closeBox();
		this.setState({title, message, show: true, confirm: false});

		return this;
    }

    confirm(title, message) {
		this.okCb = this.cancleCb = this.closeBox;
		this.setState({title, message, show: true, confirm: true});

		return this;
    }

    runCb(cb) {
		if (cb && typeof(cb) === 'function') {
			cb();
		}
    }

    closeBox() {
		this.setState({show: false});
    }

    okHandler() {
		this.runCb(this.okCb);
		this.okCb = this.closeBox;
		this.closeBox();
    }

    closeHandler() {
		this.runCb(this.cancleCb);
		this.cancleCb = this.closeBox;
		this.closeBox();
    }

    ok(cb) {
		this.okCb = cb;

		return this;
    }

    cancle(cb) {
		this.cancleCb = cb;

		return this;
    }

    render() {
		return (
			<div>
				<Modal show={this.state.show} onHide={this.closeHandler}
					container={this} aria-labelledby="contained-modal-title">

					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title">
							{this.state.title}
						</Modal.Title>
					</Modal.Header>

					<Modal.Body id="contained-modal-body">
						{this.state.message}
					</Modal.Body>

					<Modal.Footer>
						{ 
							this.state.confirm?
							(<Button onClick={this.closeHandler}>Cancle</Button>): null
						}
						<Button onClick={this.okHandler}>Ok</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
    }
}

