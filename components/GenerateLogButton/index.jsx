import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import copy from 'copy-to-clipboard';

import Button from '../Button';
import Popup from '../Popup';

import {getLogs, getDaysOfActivity} from '../../helpers/log';

import styles from './generate-log-button.scss';

@inject('visualStore')
@observer
class GenerateLogButton extends Component {
    get popupID() {
        return 'custom-log-popup';
    }

    handleCustomLogsClick = () => {
        const {visualStore} = this.props;

        visualStore.setPopup(this.popupID);
    };

    generateLog = (log_date = new Date().setDate(new Date().getDate() - 1)) => {
        const logs = getLogs(log_date);

        if (logs.length === 0) {
            alert('Nothing to show');
            return;
        }

        const logs_in_string = logs.reduce((msg, log) => (
            `${msg}> ${log.name} ${log.status.length > 0 ? `(${log.status.join(' - ')})` : ''}\n`
        ), '');

        copy(logs_in_string);
        alert(logs_in_string);
    };

    render() {
        const {visualStore} = this.props;

        return (
            <div className={styles.wrapper}>
                <Button label={'Show yesterday\'s log'} onClick={() => this.generateLog()}/>
                <Button label={'Custom logs'} onClick={this.handleCustomLogsClick}/>
                {visualStore.popups.has(this.popupID) && (
                    <Popup id={this.popupID}>
                        <ul className={styles.popupList}>
                            {getDaysOfActivity().reverse().map(day => {
                                const date = new Date(day);

                                return (
                                    <li key={date.getTime()} onClick={() => this.generateLog(date.getTime())}>
                                        {date.getDate()}. {date.getMonth()}. {date.getFullYear()}
                                    </li>
                                )
                            })}
                        </ul>
                    </Popup>
                )}
            </div>
        );
    }
}

export default GenerateLogButton;