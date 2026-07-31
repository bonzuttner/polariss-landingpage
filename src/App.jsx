import { useEffect, useState } from "react";

const SHOPIFY_URL = "https://polariss-store.myshopify.com/";
const PARTNER_URL =
  "https://polariss-store.myshopify.com/products/%E6%AF%8E%E6%9C%88%E9%80%9A%E4%BF%A1%E8%B2%BB";
const ORIGINAL_SITE = "https://thingsline.co.jp/index";

const heroImages = [
  "/images/hero-line.webp",
  "/images/hero-bike.webp",
  "/images/hero-device.webp",
];

const quickLinks = [
  {
    number: "01",
    title: "POLARISSって？",
    text: "盗難対策 × GPS追跡 × LINEをひとつにした次世代IoTデバイス。",
    href: "#what",
  },
  {
    number: "02",
    title: "主な機能",
    text: "使い慣れたLINEで監視・通知・リアルタイム追跡まで。",
    href: "#features",
  },
  {
    number: "03",
    title: "利用者の声",
    text: "実際にシステムをご利用いただいているお客様のリアルな声。",
    href: "#voice",
  },
  {
    number: "04",
    title: "よくある質問",
    text: "サービス内容、導入方法、通知やサポートについてご案内します。",
    href: "#faq",
  },
];

const features = [
  {
    index: "01",
    eyebrow: "EASY TO USE",
    title: "LINEから簡単操作",
    text: "POLARISS.NETは、あなたの愛車を守る為に作られたIoTセキュリティシステム。「もしも」の時を徹底的に考え抜いて作られました。",
    image: "/images/feature-line.webp",
    href: `${ORIGINAL_SITE}/line%e3%81%8b%e3%82%89%e7%b0%a1%e5%8d%98%e6%93%8d%e4%bd%9c/`,
  },
  {
    index: "02",
    eyebrow: "NOTIFICATION",
    title: "シンプルかつスピーディな通知",
    text: "4G LTE通信を使ったクラウドインフォメーションで愛車を監視。移動を検知するとスマートフォンへ通知し、盗難やイタズラの迅速な察知を支えます。",
    image: "/images/feature-notification.webp",
    href: `${ORIGINAL_SITE}/%e3%82%bb%e3%83%b3%e3%82%b5%e3%83%bc%e6%a4%9c%e7%9f%a5%e3%81%a7line%e3%81%ab%e9%80%9a%e5%91%8a/`,
  },
  {
    index: "03",
    eyebrow: "TRACKING",
    title: "マップ上でリアルタイム追跡",
    text: "GPS、GLONASS、みちびきによる高精度位置情報へ、LINEの画面から自由にアクセス。専用アプリは不要で、万が一のときも愛車の所在を確認できます。",
    image: "/images/feature-tracking.webp",
    href: `${ORIGINAL_SITE}/long-battery/`,
  },
  {
    index: "04",
    eyebrow: "EXPAND",
    title: "進化し続けるIoTマルチツール",
    text: "二輪・四輪向けソフトウェアを自社開発。ネットワークを活用した盗難アラートなど、より強固なセキュリティへアップデートを続けていきます。",
    image: "/images/security-system.webp",
    href: `${ORIGINAL_SITE}/%e5%ba%83%e3%81%8c%e3%82%8b%e6%8b%a1%e5%bc%b5%e3%82%b7%e3%82%b9%e3%83%86%e3%83%a0/`,
  },
];

const faqs = [
  {
    question: "POLARISSとはなんですか？",
    answer:
      "POLARISSはIoTと呼ばれる技術を利用した車両セキュリティサービスです。指定の端末を愛車に設置していただくことで、GPSをはじめとした位置情報や車両動態を確認できます。",
  },
  {
    question: "POLARISSの特徴はなんですか？",
    answer:
      "特別で煩雑な作業を必要とせず愛車に設置でき、専用アプリのダウンロードやログインも不要です。普段使っているLINEから迅速に情報を取得・送信でき、IoTならではの継続的なアップデートにも対応します。",
  },
  {
    question: "LINEではどのような操作や通知を受けられますか？",
    answer:
      "LINEから監視のスタート・ストップ、クラウド上に保存された愛車の位置情報へのアクセスができます。監視中に予期しない移動を検知した場合は、LINEへ自動で移動通知が届きます。",
  },
  {
    question: "POLARISSはどのように設定しますか？",
    answer:
      "購入後、ご登録アドレスへ届くメールの登録マニュアルに沿ってお手続きください。設定済みの端末が届いたら愛車に設置し、すぐにご利用いただけます。",
  },
];

const specs = [
  ["タイプ", "POLARISS京セラGPSユニット"],
  ["型番", "LU1CMO13"],
  ["サイズ", "約83 × 49 × 13.8mm"],
  ["重量", "約63g"],
  ["電池容量", "1,500mAh"],
  ["位置情報", "GPS / GLONASS / みちびき"],
  ["センサー", "温度 / 加速度"],
  ["通信方式", "LTE Cat.M1"],
  ["対応Band", "B1 / B8 / B19 / B26"],
  ["SIM", "nano SIM"],
];

function ArrowLink({ href, children, className = "" }) {
  return (
    <a className={`arrow-link ${className}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || heroPaused) return undefined;
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="POLARISS.NET ホーム">
          <img src="/images/polariss-logo.gif" alt="POLARISS.NET" />
        </a>

        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#what">POLARISS</a>
          <a href="#features">機能</a>
          <a href="#voice">利用者の声</a>
          <a href="#faq">Q&amp;A</a>
          <a href="#contact">サポート</a>
        </nav>

        <div className="header-actions">
          <a className="text-action" href={PARTNER_URL}>
            お取引様
          </a>
          <a className="button button-small button-primary" href={SHOPIFY_URL}>
            Buy Now <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="モバイルナビゲーション">
          <a href="#what" onClick={closeMenu}>
            <span>01</span>POLARISSって何？
          </a>
          <a href="#features" onClick={closeMenu}>
            <span>02</span>主な機能
          </a>
          <a href="#voice" onClick={closeMenu}>
            <span>03</span>利用者の声
          </a>
          <a href="#faq" onClick={closeMenu}>
            <span>04</span>よくある質問
          </a>
          <a href="#contact" onClick={closeMenu}>
            <span>05</span>お問合せ
          </a>
        </nav>
        <div className="mobile-menu-actions">
          <a className="button button-primary" href={SHOPIFY_URL}>
            オンラインストアへ
          </a>
          <a className="button button-ghost" href={PARTNER_URL}>
            お取引様はこちら
          </a>
        </div>
      </div>

      <main id="top">
        <section
          className="hero"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          <div className="hero-media" aria-hidden="true">
            {heroImages.map((image, index) => (
              <img
                className={heroIndex === index ? "is-active" : ""}
                src={image}
                alt=""
                key={image}
              />
            ))}
          </div>
          <div className="hero-overlay" />

          <div className="hero-content shell">
            <p className="eyebrow light">
              LINE + GPS / SMART VEHICLE SECURITY
            </p>
            <h1>
              大切な愛車を、
              <br />
              <em>24時間守る。</em>
            </h1>
            <p className="hero-copy">
              盗難対策・GPS追跡・LINE通知をひとつに。
              <br />
              次世代IoTカーセキュリティ、POLARISS.NET。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={SHOPIFY_URL}>
                購入する <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-glass" href="#what">
                POLARISSを知る <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-rail">
            <div className="hero-dots" aria-label="メイン画像の切り替え">
              {heroImages.map((image, index) => (
                <button
                  className={heroIndex === index ? "is-active" : ""}
                  type="button"
                  onClick={() => setHeroIndex(index)}
                  aria-label={`画像 ${index + 1} を表示`}
                  aria-current={heroIndex === index}
                  key={image}
                >
                  <span />
                </button>
              ))}
            </div>
            <p>SCROLL TO DISCOVER</p>
          </div>
        </section>

        <section className="metric-band" aria-label="POLARISSのポイント">
          <div className="metric">
            <strong>24 / 365</strong>
            <span>いつでも愛車を見守る</span>
          </div>
          <div className="metric">
            <strong>約66円 / 日</strong>
            <span>続けやすい安心プラン</span>
          </div>
          <div className="metric">
            <strong>LINE</strong>
            <span>専用アプリ不要</span>
          </div>
          <div className="metric">
            <strong>GPS</strong>
            <span>高精度リアルタイム追跡</span>
          </div>
        </section>

        <section className="quick-links shell">
          {quickLinks.map((item) => (
            <a className="quick-card" href={item.href} key={item.number}>
              <span className="quick-number">{item.number}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
              <span className="quick-arrow" aria-hidden="true">
                ↘
              </span>
            </a>
          ))}
        </section>

        <section className="problem-section">
          <div className="shell problem-grid">
            <div className="problem-copy">
              <p className="eyebrow light">THE THREAT IS REAL</p>
              <h2>
                車の盗難は、
                <br />
                もはや日常の脅威。
              </h2>
              <p>
                被害に遭ってからではもう遅い。その課題を解決するための知恵と工夫を、小さな端末に詰め込みました。
              </p>
              <div className="price-callout">
                <span>1日わずか</span>
                <strong>約66円</strong>
                <span>から始める安心</span>
              </div>
              <ArrowLink href={SHOPIFY_URL} className="arrow-link-light">
                今すぐ購入する
              </ArrowLink>
            </div>
            <div className="problem-image">
              <img
                src="/images/security-system.webp"
                alt="車両に設置するPOLARISSセキュリティシステム"
              />
              <div className="image-note">
                <span>POLARISS.NET</span>
                <strong>IoT SECURITY</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section section shell" id="what">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">ABOUT POLARISS</p>
              <h2>POLARISSって何？</h2>
            </div>
            <p>
              「POLARISS」は、デジタル社会のセキュリティニーズに応えるために設計された革新的なソリューションです。企業や個人が直面するリスクを未然に防ぎ、安心してデジタル環境を活用できるようサポートします。
            </p>
          </div>

          <div className="about-panel">
            <div className="about-visual">
              <img
                src="/images/hero-device.webp"
                alt="POLARISSをLINEから操作するスマートフォン画面"
              />
            </div>
            <div className="about-details">
              <p className="overline">ONE DEVICE, THREE CORE FUNCTIONS</p>
              <h3>愛車との時間を、もっと安心で快適に。</h3>
              <p>
                クルマ・バイクの盗難対策に特化したファームウェアを、POLARISS.NETと京セラで独自開発。LINEからの操作、移動検知通知、位置追跡をシームレスにつなぎます。
              </p>
              <div className="about-tags" aria-label="主要機能">
                <span>LINE CONTROL</span>
                <span>LIVE GPS</span>
                <span>4G LTE</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section section" id="features">
          <div className="shell">
            <div className="section-heading centered-heading">
              <p className="eyebrow">CORE FEATURES</p>
              <h2>
                シンプルな操作で、
                <br />
                確かな安心を。
              </h2>
            </div>

            <div className="feature-list">
              {features.map((feature, index) => (
                <article
                  className={`feature-row ${index % 2 ? "reverse" : ""}`}
                  key={feature.index}
                >
                  <div className="feature-image">
                    <img src={feature.image} alt="" />
                    <span>{feature.index}</span>
                  </div>
                  <div className="feature-copy">
                    <p className="eyebrow">{feature.eyebrow}</p>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                    <ArrowLink href={feature.href}>詳しく見る</ArrowLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="manga-section section">
          <div className="shell manga-grid">
            <div className="manga-copy">
              <p className="eyebrow">POLARISS IN COMICS</p>
              <h2>マンガで見るPOLARISS</h2>
              <p>
                ポラリスの先端技術や革新的なサービスを、マンガ形式でわかりやすくご紹介。LINEやGPSを活用した最新のセキュリティ対策を、楽しく直感的にご体感ください。
              </p>
              <a
                className="button button-dark"
                href={`${ORIGINAL_SITE}/wp-content/uploads/2024/10/comic_post.pdf`}
              >
                マンガを読む（PDF） <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a
              className="manga-image"
              href={`${ORIGINAL_SITE}/wp-content/uploads/2024/10/comic_post.pdf`}
              aria-label="POLARISSのマンガをPDFで読む"
            >
              <img
                src="/images/manga-preview.webp"
                alt="マンガで見るPOLARISSのプレビュー"
              />
              <span className="manga-badge">READ</span>
            </a>
          </div>
        </section>

        <section className="testimonial-section section" id="voice">
          <div className="shell">
            <div className="section-heading testimonial-heading">
              <div>
                <p className="eyebrow light">USER VOICE</p>
                <h2>利用者の声</h2>
              </div>
              <p>導入後に感じた、安心感と使いやすさ。</p>
            </div>

            <article className="testimonial-card">
              <div className="quote-mark" aria-hidden="true">
                “
              </div>
              <div className="testimonial-main">
                <span className="testimonial-label">
                  車・ファミリーユース
                </span>
                <h3>離れた駐車場でも安心</h3>
                <blockquote>
                  家族で乗っているワンボックスについて盗難の話を多く聞くようになり、POLARISSの導入を決めました。やや離れた場所に駐車場を借りていますが、位置情報の精度も高く安心感につながっています。移動した際の第一報も想像より早く通知が入りました。
                </blockquote>
              </div>
              <div className="testimonial-person">
                <img
                  src="/images/testimonial-avatar.webp"
                  alt=""
                  width="84"
                  height="84"
                />
                <div>
                  <strong>Yさん</strong>
                  <span>ファミリーカー所有</span>
                </div>
              </div>
            </article>

            <ArrowLink
              href={`${ORIGINAL_SITE}/%e5%88%a9%e7%94%a8%e8%80%85%e3%81%ae%e5%a3%b0/`}
              className="testimonial-link"
            >
              ほかの利用者の声を見る
            </ArrowLink>
          </div>
        </section>

        <section className="faq-section section shell" id="faq">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">QUESTIONS &amp; ANSWERS</p>
              <h2>よくある質問</h2>
            </div>
            <p>
              POLARISSのサービス内容、導入方法、サポート体制に関する主なご質問にお答えします。
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details className="faq-item" key={faq.question}>
                <summary>
                  <span className="faq-number">
                    Q{String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{faq.question}</strong>
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <span>A</span>
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="faq-footer">
            <ArrowLink href={`${ORIGINAL_SITE}/qa/`}>
              すべての質問を見る
            </ArrowLink>
          </div>
        </section>

        <section className="comparison-section">
          <div className="shell comparison-grid">
            <div>
              <p className="eyebrow light">WHY POLARISS</p>
              <h2>
                他社製品と比較しても、
                <br />
                選ばれる理由があります。
              </h2>
            </div>
            <div className="comparison-copy">
              <p>
                LINEだけで完結する操作性、長期間駆動を実現したバッテリー、リアルタイム追跡、そして充実したサポート体制。愛車を守るための価値を総合的にご提供します。
              </p>
              <a
                className="button button-light"
                href={`${ORIGINAL_SITE}/%e4%bb%96%e7%a4%be%e8%a3%bd%e5%93%81%e3%81%a8%e3%81%ae%e6%af%94%e8%bc%83/`}
              >
                他社製品比較を見る <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="assurance-section shell" aria-label="購入時の安心">
          <article>
            <span className="assurance-icon" aria-hidden="true">
              01
            </span>
            <h3>1年間の保証付き</h3>
            <p>安心してご利用いただけるよう、1年間の保証をお付けしています。</p>
          </article>
          <article>
            <span className="assurance-icon" aria-hidden="true">
              02
            </span>
            <h3>クレジットカード対応</h3>
            <p>
              スムーズなお支払いに対応。毎月のサブスクリプションはいつでも解約可能です。
            </p>
          </article>
          <article>
            <span className="assurance-icon" aria-hidden="true">
              03
            </span>
            <h3>簡単に設置可能</h3>
            <p>
              複雑な配線は不要。不安な方にはプロの設置サービスもご利用いただけます。
            </p>
          </article>
        </section>

        <section className="product-section section">
          <div className="shell">
            <div className="product-hero">
              <div className="product-heading">
                <p className="eyebrow light">PRODUCT &amp; PLAN</p>
                <h2>
                  LINE + GPSで
                  <br />
                  大切なものを守る。
                </h2>
                <p>
                  お申し込み確認後、速やかにGPS発信機を発送。簡単な登録作業だけで、すぐにご利用いただけます。
                </p>
              </div>
              <div className="product-price">
                <span>GPS発信機本体</span>
                <strong>
                  ¥19,800<small>（税込）</small>
                </strong>
                <div className="price-separator" />
                <span>月額通信費</span>
                <strong>
                  ¥2,178<small>から（税込）</small>
                </strong>
                <p>1日わずか約66円</p>
                <a
                  className="button button-primary button-wide"
                  href={SHOPIFY_URL}
                >
                  Buy Now <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="specs-panel">
              <div className="specs-intro">
                <p className="eyebrow">PRODUCT DETAILS</p>
                <h3>製品仕様</h3>
                <p>
                  対応アプリケーションはLINE。使い慣れた画面から、すべての機能をご利用いただけます。
                </p>
                <div className="line-chip">LINE COMPATIBLE</div>
              </div>
              <dl className="specs-grid">
                {specs.map(([term, value]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <ul className="spec-notes">
              <li>ご利用状況によってバッテリー持続時間が変わる場合があります。</li>
              <li>製品仕様およびサービス内容は予告なく変更することがあります。</li>
              <li>実際の色と多少異なる場合があります。</li>
            </ul>
          </div>
        </section>

        <section className="contact-section section" id="contact">
          <div className="shell contact-grid">
            <div>
              <p className="eyebrow">CONTACT</p>
              <h2>
                小さな疑問も、
                <br />
                お気軽にどうぞ。
              </h2>
            </div>
            <div className="contact-copy">
              <p>
                POLARISSに関するご不明点や、購入方法・施工店についてのご質問に専門スタッフが丁寧にお答えします。あなたの大切な資産を守るための最適な方法をご提案します。
              </p>
              <div className="contact-actions">
                <a
                  className="button button-dark"
                  href={`${ORIGINAL_SITE}/%e3%81%8a%e5%95%8f%e5%90%88%e3%81%9b/`}
                >
                  お問合せフォームへ <span aria-hidden="true">↗</span>
                </a>
                <a className="phone-link" href="tel:045-264-8772">
                  <span>PHONE</span>
                  045-264-8772
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-top">
          <div className="footer-brand">
            <img src="/images/polariss-logo.gif" alt="POLARISS.NET" />
            <p>LINE + GPS SMART VEHICLE SECURITY</p>
          </div>
          <div className="footer-links">
            <div>
              <h3>Explore</h3>
              <a href="#what">POLARISSって何？</a>
              <a href="#features">主な機能</a>
              <a href="#voice">利用者の声</a>
              <a href="#faq">よくある質問</a>
            </div>
            <div>
              <h3>Support</h3>
              <a
                href={`${ORIGINAL_SITE}/%e3%83%9e%e3%83%8b%e3%83%a5%e3%82%a2%e3%83%ab%e3%83%80%e3%82%a6%e3%83%b3%e3%83%ad%e3%83%bc%e3%83%89/`}
              >
                マニュアル
              </a>
              <a
                href={`${ORIGINAL_SITE}/%e6%95%85%e9%9a%9c%e3%81%8b%e3%81%aa%e3%81%a8%e6%80%9d%e3%81%86%e5%89%8d%e3%81%ab/`}
              >
                故障かなと思う前に
              </a>
              <a href="#contact">お問合せ</a>
            </div>
            <div>
              <h3>Shop</h3>
              <a href={SHOPIFY_URL}>Buy Now ↗</a>
              <a href={PARTNER_URL}>お取引様 ↗</a>
            </div>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>© POLARISS.NET All Rights Reserved.</p>
          <div>
            <a href={`${ORIGINAL_SITE}/87-2/`}>ご利用規約</a>
            <a
              href={`${ORIGINAL_SITE}/%e5%80%8b%e4%ba%ba%e6%83%85%e5%a0%b1%e4%bf%9d%e8%ad%b7%e6%96%b9%e9%87%9d/`}
            >
              個人情報保護方針
            </a>
            <a
              href={`${ORIGINAL_SITE}/%e4%bc%9a%e7%a4%be%e6%a6%82%e8%a6%81/`}
            >
              特定商取引法に基づく表記
            </a>
            <a
              href={`${ORIGINAL_SITE}/%e7%89%b9%e5%ae%9a%e5%95%86%e5%8f%96%e5%bc%95%e6%b3%95%e3%81%ab%e5%9f%ba%e3%81%a5%e3%81%8f%e8%a1%a8%e8%a8%98/`}
            >
              会社概要
            </a>
          </div>
        </div>
      </footer>

      <a className="mobile-buy-bar" href={SHOPIFY_URL}>
        <span>
          <small>ONLINE STORE</small>
          今すぐ購入する
        </span>
        <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}

export default App;
