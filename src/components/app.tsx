import * as React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Index from './index';
import { Button, Segment, Modal, Form, Menu, Icon, Message, Container, Header, List, Responsive, Sidebar, Grid, Table } from 'semantic-ui-react';
import ProjectsPage from './projects';

interface AppState {
    [name: string]: any,
    regModalOpened: boolean,
    authModalOpened: boolean,
    mobileMenuOpened: boolean,
    login: string,
    password: string,
    repeatPassword: string,
    email: string,
    reponseAwait: boolean
    error: boolean,
    errorMessages: {
        [key: string]: string
    },
    currentPath: string
}

class App extends React.Component<any, AppState> {

    state = {
        regModalOpened: false,
        authModalOpened: false,
        mobileMenuOpened: false,
        login: "",
        password: "",
        repeatPassword: "",
        email: "",
        reponseAwait: false,
        error: false,
        errorMessages: {},
        currentPath: "/"
    };

    showModal(modalName: string) {
        switch (modalName) {
            case 'register':
                this.setState({
                    regModalOpened: true
                });
                break;
            case 'login':
                this.setState({
                    authModalOpened: true
                });
                break;
        }
    }

    hideModal(modalName: string) {
        switch (modalName) {
            case 'register':
                this.setState({
                    regModalOpened: false
                });
                break;
            case 'login':
                this.setState({
                    authModalOpened: false
                });
                break;
        }
    }

    handleChange = (_e, { name, value }) => this.setState({ [name]: value })

    tryToRegister = () => {
        this.setState({
            reponseAwait: true,
            error: false,
            errorMessages: {}
        });

        const errorMessages = {};
        const { login, password, repeatPassword, email } = this.state;

        if (login.length < 3 || login.length > 16) {
            errorMessages['login'] = 'Login must be longer than 3 and lower than 16 symbols!';
        }

        if (password.length < 6) {
            errorMessages['password'] = 'Password length must be longer than 6!';
        }

        if (repeatPassword.length < 6) {
            errorMessages['repeatPassword'] = 'Repeated password length must be longer than 6!';
        }

        if (repeatPassword !== password) {
            errorMessages['repeatPassword'] = 'Repeated password are not matching with password!';
        }

        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(email)) {
            errorMessages['email'] = 'Wrong email!';
        }

        if (Object.keys(errorMessages).length > 0) {
            this.setState({
                reponseAwait: false,
                error: true,
                errorMessages
            });
        }
    }

    tryToLogin = () => {
        this.setState({
            reponseAwait: true,
            error: false,
            errorMessages: {}
        });

        const errorMessages = {};
        const { login, password } = this.state;

        if (login.length < 3 || login.length > 16) {
            errorMessages['login'] = 'Login must be longer than 3 and lower than 16 symbols!';
        }

        if (password.length < 6) {
            errorMessages['password'] = 'Password length must be longer than 6!';
        }

        if (Object.keys(errorMessages).length > 0) {
            this.setState({
                reponseAwait: false,
                error: true,
                errorMessages
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        console.log(this.props.location);
        this.setState({ currentPath: '/' });
    }

    public render() {
        return (
            <BrowserRouter>
                <Sidebar.Pushable as="div">
                    <Sidebar
                        as={Menu}
                        animation='push'
                        icon='labeled'
                        inverted
                        onHide={() => this.setState({ mobileMenuOpened: false })}
                        vertical
                        visible={this.state.mobileMenuOpened}
                        width='thin'
                    >
                        <Menu.Item as={Link} to="/" name='Home' active={this.state.currentPath === '/'} />
                        <Menu.Item as={Link} to="/projects" name='Projects' active={this.state.currentPath === '/projects'} />
                        {/* <Menu.Item as={Link} to="/tasks" name='Tasks' active={this.state.currentPath === '/tasks'} onClick={this.pageSelectionHandler} /> */}
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment inverted vertical textAlign="center">
                            <Menu inverted pointing secondary>
                                <Responsive as={Menu.Menu} minWidth={Responsive.onlyTablet.minWidth}>
                                    <Menu.Item as={Link} to="/" name='Home' active={this.state.currentPath === '/'} />
                                    <Menu.Item as={Link} to="/projects" name='Projects' active={this.state.currentPath === '/projects'} />
                                    {/* <Menu.Item as={Link} to="/projects:" name='Tasks' active={this.state.currentPath === '/tasks'} onClick={this.pageSelectionHandler} /> */}
                                </Responsive>
                                <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                                    <Button icon inverted labelPosition="left"
                                        onClick={() => this.setState({ mobileMenuOpened: !this.state.mobileMenuOpened })}>
                                        <Icon name="sidebar" />Menu
                                    </Button>
                                </Responsive>

                                <Menu.Menu position='right'>
                                    <Menu.Item name='register' onClick={() => this.showModal('register')} />
                                    <Menu.Item name='login' onClick={() => this.showModal('login')} />
                                </Menu.Menu>
                            </Menu>

                            <h2>TimeManager</h2>
                            <p>Kek</p>
                        </Segment>
                        <Segment vertical>
                            <Container text>
                                <Switch>
                                    <Route exact path="/" component={Index} />;
                                    <Route path="/projects/:projectId?" component={ProjectsPage} />
                                </Switch>
                            </Container>
                        </Segment>
                        <Segment vertical inverted>
                            <Container>
                                <Grid stackable inverted divided columns={3} textAlign="center">
                                    <Grid.Column width={4}>
                                        <Header as="h4" inverted>About</Header>
                                        <List link inverted>
                                            <List.Item>Sitemap</List.Item>
                                            <List.Item>About Us</List.Item>
                                            <List.Item>Contact Us</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as="h4" inverted>Services</Header>
                                        <List link inverted>
                                            <List.Item>Pre-orders</List.Item>
                                            <List.Item>DNA</List.Item>
                                            <List.Item>FAQ</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Header as="h4" inverted>Example project</Header>
                                        <p>Just simple project. Its almost 6:00AM in Novosibirsk! While in Tula/Moscow 2:00AM!</p>
                                    </Grid.Column>
                                </Grid>
                            </Container>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>


                <Modal basic dimmer open={this.state.regModalOpened} closeIcon
                    onClose={() => this.hideModal('register')}
                >
                    <Modal.Header>Registration</Modal.Header>
                    <Modal.Content>
                        <Form inverted error>
                            <Form.Field required>
                                <Form.Input label="Login" type="text" placeholder="Login" name="login"
                                    value={this.state.login}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    minLength={3}
                                    maxLength={16}
                                    error={typeof this.state.errorMessages['login'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input label="Password" type="password" placeholder="Password" name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    error={typeof this.state.errorMessages['password'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input label="Repeat password" type="password" placeholder="Password" name="repeatPassword"
                                    value={this.state.repeatPassword}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    error={typeof this.state.errorMessages['repeatPassword'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input label="E-mail" type="email" placeholder="E-mail" name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    error={typeof this.state.errorMessages['email'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Button.Group fluid>
                                <Button type="submit" color="red"
                                    onClick={() => this.hideModal('register')}
                                    inverted
                                >
                                    <Icon name='remove' />Cancel
                                    </Button>
                                <Button.Or />
                                <Button type="button" color="green" loading={this.state.reponseAwait}
                                    onClick={this.tryToRegister}
                                    inverted
                                >
                                    <Icon name='checkmark' />Register
                                    </Button>
                            </Button.Group>
                            <Message error header="Form validation error" list={Object.values(this.state.errorMessages)}
                                className={this.state.error ? "visible" : "hidden"} />
                        </Form>
                    </Modal.Content>
                </Modal>

                <Modal basic dimmer open={this.state.authModalOpened} closeIcon
                    onClose={() => this.hideModal('login')}
                >
                    <Modal.Header>Authorization</Modal.Header>
                    <Modal.Content>
                        <Form inverted error>
                            <Form.Field required>
                                <Form.Input label="Login" type="text" placeholder="Login" name="login"
                                    value={this.state.login}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    minLength={3}
                                    maxLength={16}
                                    error={typeof this.state.errorMessages['login'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input label="Password" type="password" placeholder="Password" name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    disabled={this.state.reponseAwait}
                                    error={typeof this.state.errorMessages['password'] !== 'undefined'}
                                    required
                                />
                            </Form.Field>

                            <Button.Group fluid>
                                <Button type="submit" color="red"
                                    onClick={() => this.hideModal('login')}
                                    inverted
                                >
                                    <Icon name='remove' />Cancel
                                    </Button>
                                <Button.Or />
                                <Button type="button" color="green" loading={this.state.reponseAwait}
                                    onClick={this.tryToLogin}
                                    inverted
                                >
                                    <Icon name='checkmark' />Log-in
                                    </Button>
                            </Button.Group>
                            <Message error header="Form validation error" list={Object.values(this.state.errorMessages)}
                                className={this.state.error ? "visible" : "hidden"} />
                        </Form>
                    </Modal.Content>
                </Modal>
            </BrowserRouter>
        )
    }

}

export default App;