import styled from 'styled-components';
import { COLOR, SIZE } from '../style/Theme';
import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';

const InfoWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 30%;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 4px double ${COLOR.bg_blue};
  border-radius: 50%;

  @media (min-width: ${SIZE.tablet}) {
    width: 20%;
  }
`;

const LinkWrapper = styled.div`
  font-size: 20px;
  font-family: 'Poor Story';
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  @media (min-width: ${SIZE.tablet}) {
    font-size: 24px;
  }
`;

const LinkButton = styled.button`
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: ${COLOR.bg_pink};
  font-size: 12px;
  font-family: 'Sunflower';
  font-weight: 600;
  margin-top: 10px;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.btn_pink_hover};
  }

  @media (min-width: ${SIZE.tablet}) {
    height: 40px;
  }
`;

const Info = () => {
  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/infologo.png'}
        />
        <InfoWrapper>
          <ProfileImg
            alt=""
            src={process.env.PUBLIC_URL + '/assets/profile.png'}
          />
          <LinkWrapper>
            <div>
              <p>Github</p>
              <LinkButton
                onClick={() =>
                  window.open('https://github.com/kijiwon/todo_diary')
                }
              >
                Github 이동하기
              </LinkButton>
            </div>
            <div>
              <p>Notion</p>
              <LinkButton
                onClick={() =>
                  window.open(
                    'https://www.notion.so/6d2a5a31cb544a5d9c1342a7f2ba468f?pvs=4',
                  )
                }
              >
                Notion 이동하기
              </LinkButton>
            </div>
          </LinkWrapper>
        </InfoWrapper>
      </CommonWrapper>
    </CommonContainer>
  );
};

export default Info;
