import { styled } from 'styled-components';
import { COLOR, SIZE } from '../style/Theme';
import Button from './Button';

const ModalWrapper = styled.div`
  width: 80%;
  height: 160px;
  position: fixed;
  z-index: 1000;
  background-color: #fff;
  border: 2px solid ${COLOR.btn_pink};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-family: 'Poor Story';
    font-size: 22px;
    margin-bottom: 30px;
  }

  @media screen and (min-width: ${SIZE.tablet}) {
    width: 400px;
    height: 200px;
    top: 200px;
    left: 40%;
  }
`;

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Modal = ({ onClick, setState }) => {
  return (
    <ModalWrapper>
      <p>삭제하시겠습니까?</p>
      <ModalButtonWrapper>
        <Button type={'cancel'} text={'취소'} onClick={() => setState(false)} />
        <Button type={'delete'} text={'삭제'} onClick={onClick} />
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

export default Modal;
