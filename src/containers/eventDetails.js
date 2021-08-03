import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import '../css/datetime.css';

var Datetime = require('react-datetime');

export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
            eventDetail: {
                id: this.props.eventType === 'add' ? this.props.newIndex : this.props.eventInfo.id,
                title: this.props.eventInfo && this.props.eventInfo.title ? this.props.eventInfo.title : null,
                start: this.props.eventInfo && this.props.eventInfo.start ? this.props.eventInfo.start : moment(),
                end: this.props.eventInfo && this.props.eventInfo.end ? this.props.eventInfo.end : moment,
                allDay: this.props.eventInfo.allDay ? true : false,
                hexColor: '#265985',
                notes: this.props.eventInfo.notes ? this.props.eventInfo.notes : ''
            }
        }
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal,
            eventDetail: {
                id: nextProps.eventType === 'add' ? nextProps.newIndex : nextProps.eventInfo.id,
                title: nextProps.eventInfo && nextProps.eventInfo.title ? nextProps.eventInfo.title : '',
                start: new Date(nextProps.eventInfo && nextProps.eventInfo.start ? nextProps.eventInfo.start : moment()),
                end: new Date(nextProps.eventInfo && nextProps.eventInfo.end ? nextProps.eventInfo.end : moment()),
                allDay: nextProps.eventInfo.allDay ? true : false,
                hexColor: nextProps.eventInfo.hexColor ? nextProps.eventInfo.hexColor : '#265985',
                notes: nextProps.eventInfo.notes ? nextProps.eventInfo.notes : ''

            }
        });
    }

    changeHandler(e, ref) {
        var eventDetail = this.state.eventDetail;
        var val = '';
        if (ref !== "allDay") {
            if (ref === "start" || ref === "end") {
                val = new Date(moment(e));

            } else {
                val = e.target.value;
            }
        } else {
            var val = e.target.checked;
        }

        eventDetail[ref] = val;
        this.setState({ eventDetail });
    }

    render() {
        return (
            <Modal show={this.state.showModal}
                onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Event Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}