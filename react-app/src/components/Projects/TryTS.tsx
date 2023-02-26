import * as React from "react";
import * as ReactDOM from "react-dom";
import { fetchOneProject } from '../../store/project'
import { getAllTasksByProjectId } from '../../store/task'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import arrayOfColors from '../../assets/ArrayOfColors';

interface RootState {
  project: {
    [key: string]: {
      id: number;
      name: string;
      description: string;
      ownerId: number;
      teamId: number;
      owner: {
        id: number;
        username: string;
        email: string;
      }
    }
  },
  task: {
    ['tasksByProjectId']: {
      [key: string]: {
        [key: string] :
        {
          id: number;
          name: string;
          description: string;
          assigneeId: number;
          dueDate: string;
          stageId: number;
          projectId: number;
        }
      }
    }
  }
}



const TryTS = () => {
  type testParams = { id: string}
  const { id } = useParams<testParams>()
  const dispatch = useDispatch()
  const findProjectTest = async () => {
    const returnProject = await dispatch(fetchOneProject(id))
    const returnTasks = await dispatch(getAllTasksByProjectId(id))

  }
  React.useEffect(() => {
    findProjectTest()
 }, [dispatch ])
 let oneProject = useSelector((state: RootState) => state.project[id])
 let allTasksByProg = useSelector((state: RootState) => state.task.tasksByProjectId[id])
 let allTasksByProgArr: any[] | undefined
 if(allTasksByProg) {
   allTasksByProgArr = Object.values(allTasksByProg)
   console.log("allTasksByProgArr", allTasksByProgArr[0], allTasksByProg[0])
 }

if(oneProject) {
  return (
    <div>
    <div>{oneProject.name}</div>
    <div>{oneProject.description}</div>
    <div>Contact the Project Leader:</div>
    <div>{oneProject.owner && oneProject.owner.username}</div>
    <div>{oneProject.owner && oneProject.owner.email}</div>
    <div className='f width-100-per jc-c'>
                        <div className="col lr-margin-med">
                        <div className='row jc-st margin-t-2'>
                            <div className='all-teams-name'>
                                <div className='l-margin-small'>
                                    <h2>Task</h2>

                                    </div>
                                </div>
                            <div className='all-teams-owner'>
                            <div className='l-margin-small'>
                                <h2>Description</h2>
                            </div>
                                </div>
                            <div className='all-teams-members-task'>
                            <div className='l-margin-small'>
                                <h2>Due Date</h2>
                            </div>
                                </div>
                                <div className='all-teams-owner'>
                            <div className='l-margin-small'>
                                <h2>Status</h2>
                            </div>
                                </div>
                        </div>

                         {allTasksByProg && allTasksByProgArr && (allTasksByProgArr.map(task => {
                                  return (
                                    <div className=''>
                                    <div className='row'>
                                        <div className='row all-teams-name ai-c '>
                                            <div className='solid-round-sq jc-c ai-c tb-margin lr-margin-small  font-small-med pad-04' style={{backgroundColor: arrayOfColors[task.id]}}><i className="fa-regular fa-circle-check lr-margin-small"></i></div>
                                            <div className='tb-margin'> {task.name} </div>
                                        </div>
                                        <div className='row all-teams-owner ai-c'>
                                                <>
                                                <div className='solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small'></div>
                                                <div className='ai-c'>{task.description}</div>
                                                </>
                                        </div>
                                        <div className='ai-c'>
                                            <div className='row all-teams-members-task ai-c'>
                                                <div className='l-margin-small'>
                                                  {new Intl.DateTimeFormat('en-US', {  month: 'short', day: 'numeric',  timeZone: 'UTC' }).format(new Date(task.dueDate))}

                                                  </div>
                                                </div>
                                        </div>
                                        <div className='row all-teams-owner ai-c'>
                                                <>
                                                <div className='solid-circle jc-c ai-c font-small-med pad-04 tb-margin lr-margin-small'></div>
                                                <div className='ai-c'>{task.stageId}</div>
                                                </>
                                        </div>
                                    </div>
                                        </div>
                                  )}))}
                                        </div>
                    </div>

    </div>
  )

}
return ( null)


}

export default TryTS
