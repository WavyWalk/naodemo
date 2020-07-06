import React, { useState } from "react";
import {
    NavbarBrand,
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from "reactstrap"
import { Link, NavLink } from "react-router-dom";
import {CurrentUserState} from "../../states/CurrentUserState"

const TopMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentUserState = CurrentUserState.instance.use()

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md" className="top-menu">
                <NavbarBrand>
                    <NavLink to={'/'} className="nav-link">
                        Hans demo
                    </NavLink>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {currentUserState.isOrganiser()
                            && <NavItem>
                                <NavLink to={`/user/roleOrganiser/dashboard/events`} className="nav-link">
                                    My dashboard
                                </NavLink>
                            </NavItem>
                        }
                        <NavItem>
                            <NavLink to={`/aboutDemo`} className="nav-link">
                                About demo
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        {currentUserState.isLoggedIn()
                            ? <div className="current-user-nav">
                                <span className="logged-in-user-name">
                                    {currentUserState.userInstance?.firstName} {currentUserState.userInstance?.lastName}
                                </span>
                                <Button size="xs"
                                    onClick={()=>{
                                        CurrentUserState.instance.logout()
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                            : <>
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                                <NavLink to={'/user/registerOrganizer'} className="nav-link">
                                    Register
                                </NavLink>
                            </>
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export {TopMenu}