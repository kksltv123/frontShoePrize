import reactDom from "react-dom";
type Props = {
  children: boolean | JSX.Element;
};

// modal div를 가져와 children으로 넣어주는, Portal역할
const Portal: React.FC<Props> = ({ children }) => {

    const el = document.getElementById("modal");
      return reactDom.createPortal(children, el!);
  // createPortal(ModalPortals안에서 랜더링될 컴포넌트, 랜더링 시킬 상위 DOM Element)
};

export default Portal;