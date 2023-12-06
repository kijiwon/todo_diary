import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ControlMenu } from '../ControlMenu';
import Button from '../Button';
import DiaryItem from './DiaryItem';

const DiaryListWrapper = styled.section`
  width: 90%;
  height: 70%;
  overflow-y: scroll;
  align-items: center;
  overflow-y: hidden;
`;

const ControlBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const sortOptionList = [
  {
    value: 'latest',
    name: '최신순',
  },
  {
    value: 'oldest',
    name: '오래된순',
  },
];

const DiaryList = ({ diaryData }) => {
  const [sortDiaryType, setSortDiaryType] = useState('latest');
  const nav = useNavigate();
  const diaryList = useSelector((state) => state.diary.data);

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      // date 하이픈 제거하고 비교
      const dateA = parseInt(a.date.replace(/-/g, ''), 10);
      const dateB = parseInt(b.date.replace(/-/g, ''), 10);

      if (sortDiaryType === 'latest') {
        return dateB - dateA;
      } else if (sortDiaryType === 'oldest') {
        return dateA - dateB;
      }
    };

    const sortedList = diaryData.sort(compare);
    return sortedList;
  };

  return (
    <DiaryListWrapper>
      <ControlBox>
        <ControlMenu
          value={sortDiaryType}
          onChange={setSortDiaryType}
          optionList={sortOptionList}
        />
        <Button
          type={'add'}
          text={'작성하기'}
          onClick={() => nav('/diary/add')}
        />
      </ControlBox>
      {diaryList.length !== 0 &&
        getProcessedDiaryList().map((it) => <DiaryItem key={it.id} {...it} />)}
    </DiaryListWrapper>
  );
};

export default DiaryList;
