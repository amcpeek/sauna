import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchOneTask } from '../../store/task'


const ViewTask = ({selectedTask}) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div className='jc-st lr-margin-small'>
        {selectedTask &&
        <div className=''>
        <h2 className='should-wrap-task-edit'>{selectedTask.name}</h2>
        <p className='should-wrap-task-edit'>{selectedTask.description}</p>
        </div>
        }
        </div>

    )
}

export default ViewTask
