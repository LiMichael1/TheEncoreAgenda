import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import svg from '../assets/microphone.png';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <header>
                <Navbar
                    className='navbar-expand-sm navbar-toggleable-sm ng-white nav'
                    container
                    light
                >
                    <NavbarBrand tag={Link} to='/' className='navbar-brand'>
                        The Encore Agenda{' '}
                        <img src={svg} className='navbar-icon' />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className='mr-2' />
                    <Collapse
                        className='d-sm-inline-flex flex-sm-row-reverse'
                        isOpen={!this.state.collapsed}
                        navbar
                    >
                        <ul className='navbar-nav flex-grow'>
                            {/*<NavItem>*/}
                            {/*  <NavLink tag={Link} className='text-dark' to='/'>*/}
                            {/*    Home*/}
                            {/*  </NavLink>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                            {/*  <NavLink tag={Link} className='text-dark' to='/fetch-data'>*/}
                            {/*    Fetch data*/}
                            {/*  </NavLink>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                            {/*  <NavLink tag={Link} className='text-dark' to='/Leaderboard'>*/}
                            {/*    LeaderBoard*/}
                            {/*  </NavLink>*/}
                            {/*</NavItem>*/}
                            <NavItem>
                                <NavLink tag={Link} to='/calendar'>
                                    Calendar
                                </NavLink>
                            </NavItem>
                            <LoginMenu></LoginMenu>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
