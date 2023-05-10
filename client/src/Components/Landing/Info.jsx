import styles from "../../Styles/landing.module.css";
function Info() {
  return (
    <><div className={styles.newBlock} >
           </div>
      <div className={styles.infogrid}>
        <div className={styles.coupon}>
          <span>save upto rs 150</span>
          <span className={styles.offerImage}>
            <img src={require("../../Images/abhi1.webp")} alt="coupon-1" />
          </span>
          <span>Use code FIRST</span>
        </div>
        <div className={styles.coupon}>
          <span>save upto rs 150</span>
          <span className={styles.offerImage}>
            <img src={require("../../Images/CARD2.webp")} alt="coupon-1" />
          </span>
          <span>Use code FIRST</span>
        </div>
        <div className={styles.coupon}>
          <span>save upto rs 150</span>
          <span className={styles.offerImage}>
            <img src={require("../../Images/card3.webp")} alt="coupon-1" />
          </span>
          <span>Use code FIRST</span>
        </div>
      </div>
    </>
  );
}

export default Info;
