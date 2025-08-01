import { Button, Group } from '@mantine/core';

import { useAuth } from 'Context/auth-provider';

import classes from 'Styles/components/header.module.css';
import MachinaLogo from 'Assets/machina-logo.svg';

function Header() {
  const { onLogout } = useAuth();
    return (
      <header className={classes.header}>
          <div className={classes.inner}>
            <Group>
              <img src={MachinaLogo} alt="logo" />
            </Group>
            <Group>
              <Group ml={50} gap={5}>
                <Button onClick={onLogout}>Sign Out</Button>
              </Group>
            </Group>
          </div>
      </header>
    );
}

export default Header;