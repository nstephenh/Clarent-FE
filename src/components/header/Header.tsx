import useAuth from 'hooks/useAuth';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Header.module.scss';
import ClarentLogo from '../../img/CoinLogo.png';
import {
  BsGithub,
  BsPersonFill,
  FaDiscord,
  FaTwitter,
  GiCardRandom,
  GiTreasureMap,
  RiLogoutBoxRLine
} from 'react-icons/all';

const Header = () => {
  const { isLoggedIn, logOut } = useAuth();

  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logOut();
  };

  return (
    <div>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <Link to="/" className={styles.logo}>
              <img
                src={ClarentLogo}
                alt={'Logo Clarent - link to homepage'}
              />
            </Link>
          </li>
          <li>
            <a
              href="https://linktr.ee/Clarent"
              target={'_blank'}
              className={styles.social}
              title={'Patreon Link'}
            >
              Support Us!
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a
              href="https://github.com/Clarent/Clarent"
              target={'_blank'}
              className={styles.social}
              title={'Github Link'}
            >
              <BsGithub></BsGithub>
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/JykuRkdd5S"
              target={'_blank'}
              className={styles.social}
              title={'Discord Link'}
            >
              <FaDiscord></FaDiscord>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/clarent_online"
              target={'_blank'}
              className={styles.social}
              title={'Twitter Link'}
            >
              <FaTwitter></FaTwitter>
            </a>
          </li>
          <li>
            <a href="https://beta.clarent.net/game/Roguelike/CreateGame.php">
              <GiTreasureMap></GiTreasureMap> <span>RogueLike</span>
            </a>
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/user">
                <BsPersonFill></BsPersonFill> <span>Profile</span>
              </Link>
            ) : (
              <Link to="/user/login" className={styles.login}>
                <button>Login</button>
              </Link>
            )}
          </li>
          {isLoggedIn && (
            <li>
              <a href="" onClick={handleLogOut}>
                <RiLogoutBoxRLine></RiLogoutBoxRLine> <span>Logout</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Header;
