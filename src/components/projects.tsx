import * as React from 'react';
import { Table, Card, Image, Icon, Button, Modal, Header, Confirm } from 'semantic-ui-react';

interface ProjectsPageState {
    projects: {
        [key: string]: ProjectData
    },
    projectData: ProjectData,
    deleteTaskConfirm: boolean,
    changeTaskModal: boolean,
    result: string
}

interface ProjectData {
    id: string,
    name: string,
    customer: string,
    startDate: string,
    endDate: string,
    imageUrl: string,
    description: string,
    tasks: {
        [taskId: string]: TaskData
    }
}

interface TaskData {
    id: string,
    name: string,
    description: string,
    tags: string
}

class ProjectsPage extends React.Component<any, ProjectsPageState> {

    state = {
        projects: {
            "0": {
                id: "0", name: "test", customer: "test1", startDate: "tommorow", endDate: "today", description: "something important", imageUrl: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
                tasks: {
                    "0": { id: "0", name: "task1", description: "description", tags: "1,2,3,4" }
                }
            },
            "1": {
                id: "1", name: "test2", customer: "test3", startDate: "tommorow", endDate: "today", description: "anafkjdsnjknskjgskdjgn", imageUrl: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
                tasks: {
                    "0": { id: "0", name: "task2", description: "description", tags: "1,2,3,4" }
                }
            }
        },
        projectData: undefined,
        deleteTaskConfirm: false,
        changeTaskModal: false,
        result: 'idle'
    };

    projectRowClickHandler(projectId: string) {
        this.props.history.push({
            pathname: '/projects/' + projectId,
        });
        this.setState({
            projectData: this.state.projects[projectId]
        });
    };

    getProjectRowView(projectData: ProjectData) {
        return (
            <Table.Row onClick={() => this.projectRowClickHandler(projectData.id)} style={{ cursor: "pointer" }}>
                <Table.Cell>{projectData.name}</Table.Cell>
                <Table.Cell>{projectData.customer}</Table.Cell>
                <Table.Cell>{projectData.startDate}</Table.Cell>
                <Table.Cell>{projectData.endDate}</Table.Cell>
            </Table.Row>
        );
    }

    render() {
        if (typeof this.props.match.params.projectId !== 'undefined') {
            return this.renderProjectView(this.state.projectData);
        }
        return this.renderProjectsView();
    }

    renderProjectsView() {
        return (
            <Table stackable celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Имя проекта</Table.HeaderCell>
                        <Table.HeaderCell>Заказчик</Table.HeaderCell>
                        <Table.HeaderCell>Начало работы</Table.HeaderCell>
                        <Table.HeaderCell>Конец работы</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(() => {
                        const projectRowViews = [];
                        Object.values(this.state.projects).forEach(projectData => {
                            projectRowViews.push(this.getProjectRowView(projectData));
                        });
                        return projectRowViews;
                    })()}
                </Table.Body>
            </Table>
        );
    }

    renderProjectView(projectData: ProjectData) {
        console.log(this.state.projectData);
        if (typeof this.state.projectData === 'undefined') {
            this.props.history.push('/projects');
            this.forceUpdate();

            return;
        }
        return (
            <div>
                <Card centered>
                    <Image src={projectData.imageUrl} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{projectData.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Начало проекта {projectData.startDate}</span>
                        </Card.Meta>
                        <Card.Meta>
                            <span className='date'>Конец проекта {projectData.endDate}</span>
                        </Card.Meta>
                        <Card.Description>
                            {projectData.description}
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Table celled stackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Название</Table.HeaderCell>
                            <Table.HeaderCell>Описание</Table.HeaderCell>
                            <Table.HeaderCell>Тэги</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Редактирование</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Удаление</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {(() => {
                            const taskRowViews = [];
                            Object.values(projectData.tasks).forEach((taskData: TaskData) => {
                                taskRowViews.push(this.getTaskRowView(taskData));
                            });
                            return taskRowViews;
                        })()}
                    </Table.Body>
                </Table>
                <Confirm open={this.state.deleteTaskConfirm} header="Вы точно хотите удалить эту задачу?"
                    onCancel={() => this.setState({ result: 'canceled', deleteTaskConfirm: false })}
                    onConfirm={() => this.setState({ result: 'awaiting', deleteTaskConfirm: false })} />
            </div>
        );
    }

    getTaskRowView(taskData: TaskData) {
        return (
            <Table.Row>
                <Table.Cell>{taskData.name}</Table.Cell>
                <Table.Cell>{taskData.description}</Table.Cell>
                <Table.Cell>{taskData.tags}</Table.Cell>
                <Table.Cell>
                    <Button color="orange" labelPosition="left" icon fluid
                        loading={this.state.result === 'awaiting'}>
                        <Icon name="pencil alternate" />Редактировать
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button color="red" labelPosition="left" icon fluid
                        loading={this.state.result === 'awaiting'}
                        onClick={() => this.setState({ deleteTaskConfirm: true })}>
                        <Icon name="trash alternate" /> Удалить
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default ProjectsPage;