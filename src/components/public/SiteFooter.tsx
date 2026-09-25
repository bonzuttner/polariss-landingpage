import Link from "next/link";
import "../landing/styles/footer.css";

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <div className="logo">
              <svg className="wordmark" viewBox="0 0 946 106" aria-hidden="true">
                <use href="#pl-logo" />
              </svg>
            </div>
            <p>愛車の移動を検知して、LINEへ通知。クルマ・バイクのための盗難対策サービス。</p>
          </div>
          <div className="ft-cols">
            <div className="ft-col">
              <b>SERVICE</b>
              <Link href="/about">POLARISSとは</Link>
              <Link href="/howto">使い方</Link>
              <Link href="/compare">比較する</Link>
              <Link href="/price">料金プラン</Link>
              <Link href="/order">POLARISSを購入する</Link>
            </div>
            <div className="ft-col">
              <b>CONTENT</b>
              <Link href="/voices">利用者の声</Link>
              <Link href="/articles">盗難対策ガイド</Link>
              <Link href="/faq">FAQ</Link>
            </div>
            <div className="ft-col">
              <b>COMPANY / LEGAL</b>
              <Link href="/company">運営会社：株式会社OWL-TY</Link>
              <Link href="/contact">お問い合わせ</Link>
              <Link href="/commerce">特定商取引法に基づく表記</Link>
              <Link href="/privacy">個人情報保護方針</Link>
              <Link href="/terms">利用規約</Link>
            </div>
          </div>
        </div>
        <div className="ft-bot">
          <div>© POLARISS</div>
        </div>
      </div>
    </footer>
  );
}