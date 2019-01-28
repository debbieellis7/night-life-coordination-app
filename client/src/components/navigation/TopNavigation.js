import React from 'react';
import {
  Container,
  Dropdown,
  Image,
  Menu
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import gravatarUrl from 'gravatar-url';
import { logout } from '../../actions/auth';

const TopNavigation = ({ user, logout, userEmail }) => (
  <nav className="topNavagiation">
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Image size='mini' src='/images/logo.png' style={{ marginRight: '1.5em' }} />
          Night Life Coordination
          </Menu.Item>
        <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            {/* {userEmail ? userEmail : ""} */}
            <Dropdown trigger={<Image avatar src={gravatarUrl(user.email ? user.email : "placeholder@placeholder.com")} />}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  </nav>
)

const mapStateToProps = state => ({
  user: state.auth.user,
  userEmail: state.auth.user.email
})

export default connect(mapStateToProps, { logout })(TopNavigation)