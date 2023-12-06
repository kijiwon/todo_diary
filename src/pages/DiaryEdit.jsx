import {
  CommonContainer,
  CommonLogo,
  CommonWrapper,
} from '../component/CommonStyle';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DiaryEditor from '../component/Diary/DiaryEditor';

const DiaryEdit = () => {
  const id = useParams();
  const diaryList = useSelector((state) => state.diary.data);
  const selectedDiary = diaryList.find(
    (it) => parseInt(it.id) === parseInt(id.id),
  );

  return (
    <CommonContainer>
      <CommonWrapper>
        <CommonLogo
          alt=""
          src={process.env.PUBLIC_URL + '/assets/diarylogo.png'}
        />
        <DiaryEditor isEdit={true} diaryData={selectedDiary} />
      </CommonWrapper>
    </CommonContainer>
  );
};

export default DiaryEdit;
