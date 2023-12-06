import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';

const Info = () => {
  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/infologo.png'}
        />
      </CommonWrapper>
    </CommonContainer>
  );
};

export default Info;
