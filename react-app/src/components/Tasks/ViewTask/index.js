import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchOneTask } from '../../../store/task'


const ViewTask = ({selectedTask}) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    // const findProjectTest = async () => {
    //      const returnProject = await dispatch(fetchOneProject(id))
    // }

    // useEffect(() => {
    //    findProjectTest()
    // }, [dispatch])


    return (
        <div className='width-100-per jc-st'>
        {selectedTask &&
        <div>
        <h2 className='width-100-per jc-st'>{selectedTask.name}</h2>
        <div className='width-100-per jc-st'>{selectedTask.description}</div>
        </div>
        }
        </div>

    )
}

export default ViewTask
