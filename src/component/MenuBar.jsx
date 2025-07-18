import { styled, keyframes } from 'styled-components';
import { COLOR, SIZE } from '../style/Theme';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CiBoxList } from 'react-icons/ci';
import { FaCalendarAlt, FaPen } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { IoMdFlower } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;
const slideOut = keyframes`
    0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-200%);
  }
`;

const MenuBarWrapper = styled.header`
  background-color: ${COLOR.bg_pink};
  color: white;
  display: ${(props) => (props.size === 'desktop' ? 'none' : 'flex')};
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 1000000;
  @media screen and (min-width: ${SIZE.tablet}) {
    display: ${(props) => (props.size === 'mobile' ? 'none' : 'flex')};
    width: 80px;
    height: 100vh;
    position: absolute;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
`;

const MenuButton = styled.button`
  border: none;
  background-color: inherit;
  color: white;
  margin-top: 20px;
  cursor: pointer;
`;

const SideBarWrapper = styled.div`
  display: ${(props) => (props.$opened === 'true' ? 'flex' : 'none')};
  width: 120px;
  height: 100vh;
  flex-direction: column;
  align-items: start;
  position: fixed;
  background-color: ${COLOR.bg_pink};

  margin-left: 80px;
  text-align: start;
  animation: ${(props) => (props.$isAnimated === 'true' ? slideIn : slideOut)}
    0.3s ease-in-out;

  font-size: 33px;
  z-index: 1000;
`;

const IconWrapper = styled.div`
  display: flex;
  height: 220px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  font-weight: bold;
`;

const NavWrapper = styled.nav`
  display: flex;
  height: 210px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 158px;
`;

export const NavbarLink = styled(NavLink)`
  color: white;
  font-size: 26px;
  font-family: 'Poor Story';
  font-weight: 500;
  text-decoration: none;
  text-align: start;
  &:hover,
  &:focus,
  &.active {
    color: ${COLOR.dark_pink};
    text-decoration: dashed;
  }
`;

export const DesktopMenuBar = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleOpenSideBar = () => {
    if (!openMenu && !isAnimated) {
      setIsAnimated(true);
      setOpenMenu(true);
    } else {
      setIsAnimated(false);
      setTimeout(() => {
        setOpenMenu(false);
      }, 300);
    }
  };

  return (
    <>
      <MenuBarWrapper size={props.size} $opened={openMenu.toString()}>
        <MenuButton
          onClick={handleOpenSideBar}
          role="button"
          aria-label="menu-button"
        >
          {openMenu ? (
            <IoClose style={{ fontSize: '28px' }} />
          ) : (
            <FiMenu style={{ fontSize: '28px' }} />
          )}
        </MenuButton>
        <IconWrapper>
          <CiBoxList style={{ fontSize: '32px' }} />
          <FaPen style={{ fontSize: '30px' }} />
          <FaCalendarAlt style={{ fontSize: '30px' }} />
          <IoMdFlower style={{ fontSize: '30px' }} />
        </IconWrapper>
      </MenuBarWrapper>
      <SideBarWrapper
        $opened={openMenu.toString()}
        $isAnimated={isAnimated.toString()}
      >
        <NavWrapper>
          <NavbarLink to={'/'} onClick={handleOpenSideBar}>
            투두
          </NavbarLink>
          <NavbarLink to={'/diary'} onClick={handleOpenSideBar}>
            다이어리
          </NavbarLink>
          <NavbarLink to={'/calendar'} onClick={handleOpenSideBar}>
            캘린더
          </NavbarLink>
          <NavbarLink to={'/info'} onClick={handleOpenSideBar}>
            어바웃
          </NavbarLink>
        </NavWrapper>
      </SideBarWrapper>
    </>
  );
};

export const MobileMenuBar = (props) => {
  return (
    <MenuBarWrapper size={props.size}>
      <NavbarLink to={'/'}>투두</NavbarLink>
      <NavbarLink to={'/diary'}>다이어리</NavbarLink>
      <NavbarLink to={'/calendar'}>캘린더</NavbarLink>
      <NavbarLink to={'/info'}>어바웃</NavbarLink>
    </MenuBarWrapper>
  );
};
