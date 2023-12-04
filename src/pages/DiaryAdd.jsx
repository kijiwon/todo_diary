import {
  CommonContainer,
  CommonWrapper,
  CommonLogo,
} from '../component/CommonStyle';
import DiaryEditor from '../component/DiaryEditor';

const DiaryAdd = () => {
  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/diarylogo.png'}
        />
        <DiaryEditor />
      </CommonWrapper>
    </CommonContainer>
  );
};

export default DiaryAdd;
