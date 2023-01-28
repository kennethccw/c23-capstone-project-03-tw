import styles from "../css/adoptionDetail.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdoptionDetail() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.containerForAll}>
      <IoIosArrowBack className={styles.navigateBackButton} onClick={() => navigate(-1)} />
      <div className={styles.adoptionDetailHeaderContainer}>
        <img className={styles.adoptionDetailHeaderImg} src="/photos/logo_pic-09-09.png" alt="" />
        <h1>申請領養動物程序</h1>
      </div>
      <hr className={styles.adoptionDetailHr} />
      <div className={styles.adoptionAllContianer}>
        <div className={styles.adoptionTextContainer}>
          <div className={styles.circleContainer}>
            <span>1</span>
          </div>
          <h2 className={styles.adoptionDetailH2}>第一步</h2>
          <ol className={styles.adoptionDetailOl}>
            <li>首要明白想成為一位負責任的動物主人，你所需要負上的法律責任及經濟承擔。</li>
            <br />
            <li>然後了解清楚本中心的領養動物條款及細則。</li>
            <br />
            <li>最後才在線上遞交申請表格，相關職員會和你安排時間探訪心儀的動物。</li>
          </ol>
        </div>
        <div className={styles.adoptionTextContainer}>
          <div className={styles.circleContainer}>
            <span>2</span>
          </div>
          <h2 className={styles.adoptionDetailH2}>第二步</h2>
          <ol className={styles.adoptionDetailOl}>
            <li>詳細陳述你飼養動物的準備。你與領養之動物合照相片一張。全套（共 10 頁申請領養動物文件）。</li>
            <br />
            <li>展示你的詳細家居環境影片。</li>
            <br />
            <li>申領動物審批時間不一，本中心大概需時 7 至 10 天完成，因此請耐心等候。</li>
          </ol>
        </div>
        <div className={styles.adoptionTextContainer}>
          <div className={styles.circleContainer}>
            <span>3</span>
          </div>
          <h2 className={styles.adoptionDetailH2}>第三步</h2>
          <ol className={styles.adoptionDetailOl}>
            <li>同日需一拼遞交申領人之身份證副本及住址證明（必須以最近 3 個月之水/電/煤/家居寬頻/差餉或印有申領人之租約証明）。</li>
            <br />
            <li>由確認成功領養當日計，一星期之內領養之動物便可回家，屆時本中心職員便携同所需之食用品交到府上 (車費由領養人自付)，並將領養之貓貓交予新主人開始照顧，整個領養程序及家訪便於此日完成。</li>
            <br />
            <li>更多的相關詳情，我們會在收到你的線上申請後告知你。</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
