import { useParams } from 'react-router-dom';
import {
  CommonContainer,
  CommonLogo,
  CommonWrapper,
} from '../component/CommonStyle';

const DiaryEdit = () => {
  const id = useParams();
  console.log(id);
  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/diarylogo.png'}
        />
      </CommonWrapper>
    </CommonContainer>
  );
};

export default DiaryEdit;
