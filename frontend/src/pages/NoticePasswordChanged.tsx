export default function NoticePasswordChanged() {
  return (
    <div>
      <img src="photos/Screenshot 2023-01-11 at 11.58.24 PM.png" alt="" />
      <div>密碼已成功更改！</div>

      <Button
        className={styles.button}
        color="violet"
        radius="xl"
        type="submit"
        onClick={() => {
          navigate("/");
        }}
      >
        <span>確認新密碼</span>
        <IconArrowNarrowRight className={styles.registerIcon} />
      </Button>
    </div>
  );
}
