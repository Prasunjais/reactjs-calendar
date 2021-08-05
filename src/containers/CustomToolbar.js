import React from 'react';
import Toolbar from 'react-big-calendar';
import { 
    DoubleLeftOutlined,
    LeftOutlined,
    RightOutlined,
    DoubleRightOutlined
} from '@ant-design/icons'
import moment from 'moment';

export default class CustomToolbar extends Toolbar {
    goToPrevMonth = () => {
        let mDate = this.props.date;
        let newDate = new Date(mDate);
        // newDate.setDate(mDate.getDate() - 30)
        newDate.setMonth(mDate.getMonth() - 1)
        this.props.onNavigate('next', newDate);
    }

    goToNextMonth = () => {
        let mDate = this.props.date;
        let newDate = new Date(mDate);
        newDate.setMonth(mDate.getMonth() + 1)
        this.props.onNavigate('next', newDate);
    }

    render() {
      return (
        <div className='rbc-toolbar'>
          <span className="rbc-btn-group">
            <a onClick={()=> this.goToPrevMonth()}>
                <DoubleLeftOutlined />
            </a>
            <a onClick={() => this.navigate('PREV')}>
                <LeftOutlined />            
            </a>
            <a className="toolBtn" onClick={() => this.navigate('TODAY')} >Back to Today</a>
            <a onClick={() => this.navigate('NEXT')}>
                <RightOutlined />
            </a>
            <a onClick={() => this.goToNextMonth()}> 
                <DoubleRightOutlined />
            </a>
          </span>
          <span className="rbc-toolbar-label">Selected {moment(this.props.date).format('YYYY')}, {this.props.label}</span>
        </div>
      );
    }
  
    navigate = action => {
      this.props.onNavigate(action)
    }
  }