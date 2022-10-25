import { useRecoilState } from "recoil";
import styled from "styled-components";
import ModalState from "../../atom/ModalState";

type Props = {
  children: boolean | JSX.Element;
};

//렌더링시켜줄 modal
const Modal: React.FC<Props>  = ({ children }) => {
  // 리코일 ModalState 에서 전역관리
  const [modalState, setModalState] = useRecoilState(ModalState);


  return (
    <Background theaterModal>
        <Content>
          {children}
        </Content>
      <div className="close" onClick={() => setModalState(false)}></div>
    </Background>
  );
};

const Background = styled.div<{theaterModal: boolean}>`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    backdrop-filter: blur(5px);
    .close {
        position: fixed;
        cursor: pointer;
        inset: 0;
        z-index: 5;
    }
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${props => props.theaterModal === true ? 'fadeIn' : 'fadeOut'};
    animation-fill-mode: forwards;
`

const Content = styled.div`
    z-index: 1005;
    position: relative;
    border-radius: 15px;
    background-color: #fff;
    box-sizing: border-box;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: slideUp;
    animation-fill-mode: forwards;
    padding: 13px 20px 20px 20px;
`

export default Modal;