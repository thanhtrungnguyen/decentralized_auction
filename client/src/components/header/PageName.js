import { Link } from "react-router-dom";
import styles from "../../styleCss/stylesComponents/pageName.module.css";

const PageName = ({ home, pageName, link }) => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.Link}>
                    <Link className={styles.txt} to={`/${home}`}>
                        Home
                    </Link>
                    <label>/</label>
                    <Link to={`/${link}`} className={styles.txtR}>
                        {pageName}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PageName;
