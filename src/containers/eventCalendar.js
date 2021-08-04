import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar, { Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import EventDetails from './eventDetails';

import * as eventAction from '../store/eventAction';
import * as types from '../store/eventActionTypes';

BigCalendar.momentLocalizer(moment);

class EventCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            eventType: 'add',
            newIndex: 0,
            eventInfo: {}
        }
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(eventAction.GetInitialEvents());
    }

    handleHide() {
        this.setState({ showModal: false });
    }

    handleShow(slotInfo, eventType) {

        var currentIndex = this.props.events.allEvents.length;
        this.setState(
            { showModal: true, eventType: eventType, eventInfo: slotInfo, newIndex: currentIndex }
        );
    }

    deleteEvent(id) {
        this.props.dispatch({
            type: types.REMOVE_EVENT,
            payload: id
        });
        this.setState({ showModal: false });
    }

    addEvent(obj) {
        this.props.dispatch({
            type: types.ADD_EVENT,
            payload: obj
        });
        this.setState({ showModal: false });
    }

    updateEvent(obj) {
        this.props.dispatch({
            type: types.UPDATE_EVENT,
            payload: {
                id: obj.id,
                obj: obj
            }
        });
        this.setState({ showModal: false });
    }

    eventStyle(event, start, end, isSelected) {
        var bgColor = event.hexColor ? event.hexColor : '#265985';
        var style = {
            'backgroundColor': bgColor,
            'borderRadius': '40px',
            'opacity': 1,
            'color': 'white',
            'border': '0px',
            'display': 'block',
            'width': '25%',
            'margin': '5px 10px 0px 10px',
            
        }
        return {
            'style': style
        };
    }


    render() {
        return (
            <div className="bodyContainer">
                <EventDetails showModal={this.state.showModal} handleHide={this.handleHide} eventType={this.state.eventType} eventInfo={this.state.eventInfo}
                    newIndex={this.state.newIndex}
                    deleteEvent={this.deleteEvent} addEvent={this.addEvent} updateEvent={this.updateEvent} />
                <BigCalendar
                    selectable
                    events={this.props.events.allEvents}
                    defaultView={Views.WEEK}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date(moment())}
                    onSelectEvent={event => this.handleShow(event, 'edit')}
                    onSelectSlot={slotInfo => this.handleShow(slotInfo, 'add')}
                    style={{ minHeight: '500px' }}
                    eventPropGetter={this.eventStyle}
                />

            </div>
        );
    }
}

function mapStateToProps(state) {
    var { events } = state
    return {
        events
    };
}

export default connect(mapStateToProps)(EventCalendar);
