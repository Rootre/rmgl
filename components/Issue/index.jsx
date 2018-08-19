import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import getSlug from 'speakingurl';
import copy from 'copy-to-clipboard';
import { DragSource } from 'react-dnd';

import EditIssue from '../EditIssue';
import Popup from '../Popup';

import {REDMINE_ISSUES_URL} from 'Data/urls';
import ItemTypes from 'Data/item-types';
import {issueSource} from 'Data/dnd/board';

import styles from './issue.scss';


@DragSource(ItemTypes.ISSUE, issueSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@inject('visualStore')
@observer
class Issue extends Component {
    get branchName() {
        const {issue: {id, subject}} = this.props;

        return `feature/${id}-${getSlug(subject)}`;
    }

    handleGitClick = () => {
        copy(this.branchName);
    };

    handleGitlabClick = () => {

    };

    handleSubjectClick = () => {
        const {issue: {id}, visualStore} = this.props;

        visualStore.setPopup(id);
    };

    render() {
        const {connectDragSource, issue, issue: {id, subject}, visualStore} = this.props;

        return connectDragSource(
            <div className={styles.issue}>
                {visualStore.popups.has(id) && (
                    <Popup id={id}>
                        <EditIssue issue={issue}/>
                    </Popup>
                )}
                <strong onClick={this.handleSubjectClick}>{subject}</strong>
                <div className={styles.actions}>
                    <img src={'static/images/git.png'} alt={'Copy Git Branch'} onClick={this.handleGitClick}/>
                    <a href={`${REDMINE_ISSUES_URL}${id}`} target={'_blank'}>
                        <img src={'static/images/redmine.png'} alt={'Go to redmine task'} onClick={this.handleGitClick}/>
                    </a>
                    <img src={'static/images/gitlab.png'} alt={'Go to redmine task'} onClick={this.handleGitlabClick}/>
                </div>
            </div>
        )
    }
}

export default Issue;