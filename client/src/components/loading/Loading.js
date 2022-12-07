import styles from "../../styleCss/loading.module.css";
import LoadingScreen from "react-loading-screen";

const Loading = () => {
  return (
    <>
      <LoadingScreen
        loading={true}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc="https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM="
        text="Please wait loading!!!"
      ></LoadingScreen>
    </>
  );
};
export default Loading;
