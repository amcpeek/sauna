

import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getAllTasksByProjectId } from '../../store/task'

let newInitialData = ''
let allTasksByProg = ''


const BetterData = () => {
    // const { id } = useParams()
    const dispatch = useDispatch()
    let id = 1

    const findProjectTest = async () => {
        const returnTasks = await dispatch(getAllTasksByProjectId(id))

    }


    useEffect(() => {
        findProjectTest()
     }, [dispatch ])

     let allTasksByProgObj = useSelector(state => { return state.task.tasksByProjectId})
     if(allTasksByProgObj && allTasksByProgObj[id]) {
        // console.log('well what is it', allTasksByProgObj)
        allTasksByProg = Object.values(allTasksByProgObj[id])
     }



     if(allTasksByProg && allTasksByProgObj) {
        let just1 = allTasksByProg.filter(task => task.stageId == 1)
        let just1taskIds = just1.map(task => task.id)
        let just2 = allTasksByProg.filter(task => task.stageId == 2)
        let just2taskIds = just2.map(task => task.id)
        let just3 = allTasksByProg.filter(task => task.stageId == 3)
        let just3taskIds = just3.map(task => task.id)
        // console.log('just1', just1)


        newInitialData = {
            tasks: allTasksByProgObj[id],
            columns: {
                1: {
                    id: 1,
                    title: 'To Do?',
                    taskIds: just1taskIds
                },
                2: {
                    id: 2,
                    title: 'In Progress',
                    taskIds: just2taskIds
                },
                3: {
                    id: 3,
                    title: 'Complete',
                    taskIds: just3taskIds
                }
            },
            columnOrder: [1,2,3]
         }
         console.log('newInitialData', newInitialData)
     }

    return (
        <div>
              {newInitialData && (
            <div>{newInitialData.columns[1].title}</div>

        )}

        </div>


    )
}


export default BetterData

// if(newInitialData) {
//     console.log('can I do this', newInitialData)

// }
