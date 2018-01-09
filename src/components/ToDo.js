import React from 'react';

class ToDo extends React.Component {

    state = {
        input: "",
        tasks: [],
        filter: "All",
        edit: ""
    }

    getInputClass = () => {
        return this.state.tasks.length === 0 ? 'shadow' : 'no-shadow';
    }

    allFilter = () => {
        if(this.state.filter === 'All')
            return 'filter selected'
        else
            return 'filter'
    }

    activeFilter = () => {
        if(this.state.filter === 'Active')
            return 'filter selected'
        else
            return 'filter'
    }

    completedFilter = () => {
        if(this.state.filter === 'Completed')
            return 'filter selected'
        else
            return 'filter'
    }

    filterSelected = (id) => {
        this.setState({filter: id})
    }

    updateInput = (val) => {
        this.setState({input: val})
    }

    toggleTask = (taskId) => {
        const { tasks } = this.state;
        this.setState(state => {
            return {
                ...state,
                tasks: tasks.map(task => {
                    return task.id === taskId ? {
                        ...task,
                        status: task.status === 'active' ? 'completed' : 'active'
                    } : task
                })
            }
        });
    }

    keyPressed = (key) => {
        if(key === 'Enter' && this.state.input.trim().length > 0){
            const task = this.state.input;
            let d = Date.now();
            let temp = {
                id: d.toString(),
                task: task,
                hover: false,
                status: 'active'
            }
            let tempTasks = this.state.tasks;
            tempTasks.push(temp);
            this.setState(state => {
                return {
                    ...state,
                    input: "",
                    tasks: tempTasks
                }
            });
        }
    }

    mouseEntered = (taskId) => {
        console.log("Hovering on ", taskId)
        const { tasks } = this.state;
        this.setState(state => {
            return {
                ...state,
                tasks: tasks.map(task => {
                    return task.id === taskId ? {
                        ...task,
                        hover: true
                    } : {
                        ...task,
                        hover: false
                    }
                })
            }
        });
    }

    mouseExited = (taskId) => {
        const { tasks } = this.state;
        this.setState(state => {
            return {
                ...state,
                tasks: tasks.map(task => {
                    return task.id === taskId ? {
                        ...task,
                        hover: false
                    } : task
                })
            }
        });
    }

    deleteTask = (taskId) => {
        let temp = this.state.tasks.filter(task => task.id !== taskId);
        this.setState({tasks: temp})
    }

    render(){
        const { input, tasks, filter } = this.state;
        let items = [];
        if(filter === 'Completed'){
            items = tasks.filter(task => task.status === 'completed');
        }
        else if(filter === 'Active'){
            items = tasks.filter(task => task.status === 'active');
        }
        else {
            items = tasks;
        }
        return (
            <div>
                <div style={styles.heading}>todos</div>
                <input 
                    type='text'
                    className={this.getInputClass()}
                    placeholder='What needs to be done?'
                    value={input}
                    onChange={e => this.updateInput(e.target.value)} 
                    onKeyPress={e => this.keyPressed(e.key)}/>

                {/* Tasks */}
                {tasks.length > 0 &&
                    <div>
                        {items.map(task => (
                            <div 
                                key={task.id} 
                                className='tasks'
                                onMouseEnter={e => this.mouseEntered(task.id)}
                                onMouseLeave={e => this.mouseExited(task.id)}>
                                
                                <label className="checkbox-container">
                                    <input 
                                        checked={task.status === 'completed'}
                                        className='toggle'
                                        type='checkbox' 
                                        onChange={e => this.toggleTask(task.id)} />
                                    <span className="checkmark"></span>
                                </label>
                                {this.state.edit === task.id ? 
                                    <input 
                                        type='text'
                                        value={task.task}
                                        onChange={e => this.updateInput(e.target.value)} 
                                        onKeyPress={e => this.keyPressed(e.key)}/>
                                    :
                                    <span className={task.status}>{task.task}</span>
                                }
                                {task.hover && 
                                    <button 
                                        className='delete' 
                                        onClick={e => this.deleteTask(task.id)}/>
                                }
                            </div>
                        ))}

                        {/* Filters */}
                        <div style={styles.labels}>
                            <div style={{paddingLeft: '2em', cursor: 'default'}}>
                                {tasks.length === 1 ?
                                    <div>{tasks.length} item left</div>
                                    :
                                    <div>{tasks.length} items left</div>
                                }
                            </div>
                            <div style={styles.taskTypes}>
                                <div 
                                    id='All'
                                    className={this.allFilter()}
                                    onClick={e => this.filterSelected(e.target.id)}>
                                    All
                                </div>
                                <div 
                                    id='Active'
                                    className={this.activeFilter()}
                                    onClick={e => this.filterSelected(e.target.id)}>
                                    Active
                                </div>
                                <div 
                                    id='Completed'
                                    className={this.completedFilter()}
                                    onClick={e => this.filterSelected(e.target.id)}>
                                    Completed
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const styles = {
    heading: {
        fontFamily: 'Raleway',
        color: 'rgba(175, 47, 47, 0.5)',
        fontSize: '100px',
        margin: 0,
        cursor: 'default',
    },
    labels: {
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: '1px solid #e6e6e6',
        margin: 'auto',
        background: 'white',
        padding: '16px 60px 16px 16px',
        textAlign: 'left',
        width: '50%',
        fontWeight: '100',
        fontFamily: 'Dosis',
        color: '#757575',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)',
    },
    taskTypes: {
        display: 'flex',
        flex: 2,
        justifyContent: 'space-around',
        paddingLeft: '5em',
    }
}

export default ToDo;