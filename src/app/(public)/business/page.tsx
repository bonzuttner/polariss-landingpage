import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Bell, Check, MapPin, MessageCircle, Radio, ShieldCheck, Truck, Warehouse, Wrench } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import "./business.css";

export const metadata = buildMetadata({
  title: "法人向けの車両盗難対策",
  description: "事業で使うバイク・クルマの盗難対策に。移動の検知、LINEへの通知、GPSでの位置確認、ユーザー同士の見守りで、これまでの防犯対策を補完します。法人での導入をご相談ください。",
  path: "/business",
});

const consultationUrl = "/contact?type=business";
const useCases = [
  { icon: Truck, title: "配送・訪問で使う車両に", text: "配達用のバイクや訪問用のクルマ。日々の業務で使う車両の、駐車中の備えを見直したいときに。", label: "日々の業務を支える車両" },
  { icon: Warehouse, title: "離れた駐車場・保管場所に", text: "事務所から離れた駐車場や、夜間・休日に人がいない保管場所。目が届きにくい時間の備えに。", label: "確認に行きづらい保管場所" },
  { icon: Wrench, title: "社用車・業務用バイクに", text: "営業や現場への移動に使う車両。ロックや防犯カメラに加え、動かされた後への備えを重ねたいときに。", label: "既存の防犯対策を補完" },
];
const features = [
  { no: "01", icon: Radio, title: "車両の動きを検知", text: "本体の加速度センサーで車両の動きをとらえます。駐車中の変化を知るための起点になります。" },
  { no: "02", icon: Bell, title: "いつものLINEへ通知", text: "移動の検知をLINEへお知らせ。専用アプリを新しく入れずに、使い慣れた画面で確認できます。" },
  { no: "03", icon: MapPin, title: "地図で位置を確認", text: "GPSで取得した位置情報を地図で確認。通知を受け取った後、車両がどこにいるかを確かめられます。" },
];
const steps = [
  { no: "01", title: "利用条件をご相談", text: "車種・台数・保管場所・導入時期をお知らせください。まだ検討段階でもご相談いただけます。" },
  { no: "02", title: "仕様・条件を確認", text: "取り付けや給電の方法、利用環境、費用・契約条件を確認します。" },
  { no: "03", title: "登録・取り付け", text: "利用者と車両を登録し、本体を設置。通知と位置情報を確認できる状態にします。" },
  { no: "04", title: "見守りを開始", text: "日々の確認方法と、通知を受けたときの対応を決めて、運用を始めます。" },
];
const faqs = [
  { q: "複数台の導入について相談できますか？", a: "はい。導入を検討している車両の種類と台数をお知らせください。必要な台数や利用条件に応じて、費用・契約条件をご確認ください。" },
  { q: "法人向けの料金はどこで確認できますか？", a: "法人での導入費用・契約条件は、お問い合わせからご相談ください。希望台数や利用方法を添えていただくと、確認がスムーズです。" },
  { q: "どのような車両・場所でも使えますか？", a: "設置スペースや給電方法、電波の届き方など、車両や保管場所によって確認が必要です。位置情報や通知は、通信状況・周囲の環境に左右されます。導入前に利用条件をご確認ください。" },
  { q: "担当者への通知や、複数人での運用はどうなりますか？", a: "必要な通知の受け取り方や、誰がどの車両を確認するかなど、ご希望の運用方法をお知らせください。対応可否と設定方法を導入前に確認します。" },
  { q: "盗難が起きたときはどうすればよいですか？", a: "安全を最優先に、車両の位置情報や状況を確認し、警察への連絡・情報提供にご活用ください。POLARISSは、盗難の防止や車両の発見・回収を保証するものではありません。" },
];

export default function BusinessPage() {
  return (
    <div className="business-page" id="business-top">
      <section className="business-hero" aria-labelledby="business-title">
        <div className="business-container">
          <nav className="business-breadcrumb" aria-label="現在の位置"><Link href="/">ホーム</Link><span aria-hidden="true">／</span><span>法人のお客様</span></nav>
          <div className="business-hero-grid">
            <div className="business-hero-copy">
              <p className="business-eyebrow"><span />事業で車両を使う、法人のお客様へ</p>
              <h1 id="business-title">事業を支える車両に、<br /><em>もう一つの備えを。</em></h1>
              <p className="business-hero-lead">配送用のバイクも、現場へ向かうクルマも。<br />目が届きにくい時間に、移動を知り、位置を確かめる。<br className="business-desktop-break" />POLARISSが、事業で使う車両の盗難対策を補完します。</p>
              <div className="business-hero-actions">
                <Link href={consultationUrl} className="business-button business-button-primary" data-business-cta="hero">法人導入について相談する<ArrowUpRight size={19} aria-hidden="true" /></Link>
                <a href="#business-features" className="business-text-link">できることを見る<ArrowDown size={16} aria-hidden="true" /></a>
              </div>
              <p className="business-hero-note">車種・台数・利用環境に合わせて、導入をご相談ください。</p>
            </div>
            <div className="business-product">
              <div className="business-product-rings" aria-hidden="true"><i /><i /><i /></div>
              <div className="business-product-topline"><span>車両に取り付ける、小さな備え</span><span>POLARISS</span></div>
              <Image src="/images/device.webp" alt="車両に設置するPOLARISSのGPS本体" width={700} height={464} priority className="business-device-image" />
              <div className="business-product-caption"><ShieldCheck size={18} aria-hidden="true" /><span>移動の検知から、位置の確認まで。</span></div>
              <div className="business-signal-flow"><span><Radio size={18} aria-hidden="true" />動きを検知</span><ArrowRight size={16} aria-hidden="true" /><span><MessageCircle size={18} aria-hidden="true" />LINEへ通知</span><ArrowRight size={16} aria-hidden="true" /><span><MapPin size={18} aria-hidden="true" />位置を確認</span></div>
            </div>
          </div>
          <div className="business-hero-bottom"><span>ロック・ガレージ・防犯カメラ。その備えに、POLARISSを。</span><a href="#business-use-cases">法人での活用を知る<ArrowDown size={15} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="business-section" id="business-use-cases" aria-labelledby="business-use-title">
        <div className="business-container">
          <div className="business-section-heading"><p className="business-section-label">01 / 活用シーン</p><h2 id="business-use-title">目が届かない時間にも、<br />備えは重ねられる。</h2><p>業務が終わった後も、車両は事業を支える大切な資産。<br />駐車中の備えを、利用場面から考えます。</p></div>
          <div className="business-use-grid">{useCases.map(({ icon: Icon, title, text, label }) => <article className="business-use-card" key={title}><Icon size={28} strokeWidth={1.4} aria-hidden="true" /><p className="business-card-label">{label}</p><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="business-section business-feature-section" id="business-features" aria-labelledby="business-feature-title">
        <div className="business-container">
          <div className="business-section-heading business-heading-split"><div><p className="business-section-label">02 / POLARISSができること</p><h2 id="business-feature-title">知る。確かめる。<br />次の対応につなげる。</h2></div><p>盗まれないための対策に、動かされた後の備えを。<br />異変に気づき、状況を確認するための機能を備えています。</p></div>
          <div className="business-feature-list">{features.map(({ no, icon: Icon, title, text }) => <article className="business-feature" key={no}><span className="business-feature-no">{no}</span><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="business-mutual"><div className="business-mutual-icon"><ShieldCheck size={30} strokeWidth={1.4} aria-hidden="true" /></div><div><p className="business-section-label">ユーザー同士の見守り</p><h3>位置を知る、その先を「相互監視」で。</h3><p>必要なときには、周辺のPOLARISSユーザーへ情報をつなげる相互監視も。発見につながる情報の共有を目指す仕組みです。</p></div><Link href="/about#ch05" className="business-text-link">仕組みを見る<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <p className="business-smallprint">位置情報の取得・通知は、通信状況や周囲の環境に左右されます。相互監視の受付・開始は選択できます。不審者や盗難車両に直接接触せず、安全を最優先にしてください。</p>
        </div>
      </section>

      <section className="business-principle" aria-labelledby="business-principle-title"><div className="business-container business-principle-grid"><div><p className="business-section-label">既存の対策に、もう一つの備え</p><h2 id="business-principle-title">守る備えに、<br />気づく備えを。</h2></div><div className="business-layers"><div><span>これまでの防犯対策</span><p>ロック・チェーン・ガレージ・アラーム・防犯カメラ</p></div><span className="business-plus" aria-hidden="true">＋</span><div className="business-layer-polariss"><span>POLARISS</span><p>移動の検知・LINEへの通知・位置の確認・相互監視</p></div><p className="business-principle-note">既存の防犯対策を活かしながら、盗難対策を補完します。</p></div></div></section>

      <section className="business-section" id="business-start" aria-labelledby="business-start-title"><div className="business-container"><div className="business-section-heading business-heading-split"><div><p className="business-section-label">03 / 導入の進め方</p><h2 id="business-start-title">まずは、使う車両と<br />保管場所のことから。</h2></div><p>車種や設置方法、通知を受けたときの対応まで。<br />実際の利用条件を確認してから、導入をご検討ください。</p></div><ol className="business-steps">{steps.map(({ no, title, text }) => <li key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><div className="business-consultation-strip"><span><Check size={18} aria-hidden="true" />導入台数が決まっていない段階でも、ご相談いただけます。</span><Link href={consultationUrl} className="business-text-link" data-business-cta="steps">導入について相談する<ArrowUpRight size={17} aria-hidden="true" /></Link></div></div></section>

      <section className="business-section business-faq-section" id="business-faq" aria-labelledby="business-faq-title"><div className="business-container business-faq-grid"><div className="business-section-heading"><p className="business-section-label">04 / よくあるご質問</p><h2 id="business-faq-title">導入前に、<br />確認したいこと。</h2><Link href="/faq" className="business-text-link">製品全般のご質問はこちら<ArrowUpRight size={16} aria-hidden="true" /></Link></div><div className="business-faq-list">{faqs.map(({ q, a }) => <details key={q}><summary>{q}<span aria-hidden="true">＋</span></summary><p>{a}</p></details>)}</div></div></section>

      <section className="business-contact" aria-labelledby="business-contact-title"><div className="business-container business-contact-grid"><div><p className="business-eyebrow">法人での導入をご検討の方へ</p><h2 id="business-contact-title">事業の車両に、<br />どんな備えが必要ですか。</h2><p>車種や台数、ご利用環境をお聞かせください。<br />導入方法や費用・契約条件について、ご相談いただけます。</p></div><div className="business-contact-action"><Link href={consultationUrl} className="business-button business-button-primary" data-business-cta="bottom">法人導入について相談する<ArrowUpRight size={20} aria-hidden="true" /></Link><p>お問い合わせフォームへ進みます。</p><Link href="/about" className="business-contact-secondary">製品について詳しく見る<ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>
    </div>
  );
}
