/* ============================================================
   証書ファイル チラシ (A4 両面) — 案B「式典の品格」
   Build: QR生成 → HTML組版 → PDF/PNG出力
   使い方:  node build.js [スマートフォンURL] [LINE URL]
   ============================================================ */
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { chromium } = require('playwright');

const QR_URL_SMARTPHONE = process.argv[2] || 'https://keepon1115.github.io/shosho/';
const QR_URL_LINE       = process.argv[3] || 'https://lin.ee/u8HJvZj';

const OUT_HTML = path.join(__dirname, 'flyer.html');
const OUT_PDF  = path.join(__dirname, '証書ファイル_チラシ_A4両面.pdf');

const f = p => 'file:///' + path.join(__dirname, p).replace(/\\/g, '/');

(async () => {
  const qrOpts = { type: 'svg', margin: 0, errorCorrectionLevel: 'M',
                   color: { dark: '#16243F', light: '#00000000' } };
  const qrSvgSmartphone = await QRCode.toString(QR_URL_SMARTPHONE, qrOpts);
  const qrSvgLine       = await QRCode.toString(QR_URL_LINE, qrOpts);

  const html = buildHTML(qrSvgSmartphone, qrSvgLine);
  fs.writeFileSync(OUT_HTML, html, 'utf8');

  // --- レンダリング（PDF + 各面PNG）---
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 2.4 });
  const page = await ctx.newPage();
  await page.goto(f('flyer.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  await page.pdf({
    path: OUT_PDF, width: '210mm', height: '297mm',
    printBackground: true, preferCSSPageSize: true,
  });

  // PNGプレビュー（高解像度）
  const vp = { width: 1240, height: 1754 }; // A4 @150dpi
  for (const [i, id] of [['1', 'page-front'], ['2', 'page-back']]) {
    await page.setViewportSize(vp);
    const el = await page.$('#' + id);
    await el.screenshot({ path: path.join(__dirname, `preview_${i}_${id.split('-')[1]}.png`), scale: 'device' });
  }

  await browser.close();
  console.log('QR Smartphone →', QR_URL_SMARTPHONE);
  console.log('QR LINE →', QR_URL_LINE);
  console.log('PDF →', OUT_PDF);
})();

/* ============================================================ */
function buildHTML(qrSvgSmartphone, qrSvgLine) {
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
<style>
@font-face{font-family:"Mincho";src:url("${f('assets/NotoSerifJP.ttf')}");font-weight:100 900;font-display:block;}
@font-face{font-family:"Gothic";src:url("${f('assets/NotoSansJP.ttf')}");font-weight:100 900;font-display:block;}
@font-face{font-family:"Display";src:url("${f('assets/Italiana.ttf')}");font-weight:400;font-display:block;}
@font-face{font-family:"LatinSerif";src:url("${f('assets/CrimsonPro.ttf')}");font-weight:400;font-display:block;}

:root{
  --cream:#F7F2E7; --cream2:#F1E8D4; --panel:#FBF8F0;
  --navy:#16243F; --navy2:#28344E; --mute:#5C6478;
  --gold:#A67C34; --goldL:#C9A24B; --goldD:#7E5D24;
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
html,body{background:#3a3a3a;}
.page{
  position:relative; width:210mm; height:297mm; overflow:hidden;
  background:var(--cream); color:var(--navy);
  font-family:"Mincho",serif; page-break-after:always;
}
.page:last-child{page-break-after:auto;}

/* ---- 紙の地合い（極薄テクスチャ＋周辺減光）---- */
.paper{position:absolute;inset:0;pointer-events:none;}
.paper::before{content:"";position:absolute;inset:0;
  background:
    radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,.5), transparent 60%),
    radial-gradient(130% 100% at 50% 105%, rgba(120,96,44,.06), transparent 55%);
}
.grain{position:absolute;inset:0;opacity:.05;mix-blend-mode:multiply;pointer-events:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}

/* ---- 金の二重罫の額縁 ---- */
.frame-out{position:absolute;inset:9mm;border:1.3pt solid var(--gold);}
.frame-in{position:absolute;inset:10.8mm;border:.5pt solid var(--gold);opacity:.85;}
.corner{position:absolute;width:7mm;height:7mm;}
.corner i{position:absolute;width:2.4mm;height:2.4mm;background:linear-gradient(135deg,var(--goldL),var(--goldD));
  transform:rotate(45deg);top:50%;left:50%;margin:-1.2mm 0 0 -1.2mm;box-shadow:0 0 0 .4pt var(--cream);}
.c-tl{top:9mm;left:9mm;transform:translate(-50%,-50%);}
.c-tr{top:9mm;right:9mm;transform:translate(50%,-50%);}
.c-bl{bottom:9mm;left:9mm;transform:translate(-50%,50%);}
.c-br{bottom:9mm;right:9mm;transform:translate(50%,50%);}

/* ---- 内容領域 ---- */
.inner{position:absolute;inset:9mm;display:flex;flex-direction:column;
  padding:13mm 16mm;}

/* 共通パーツ */
.eyebrow{font-family:"Display",serif;letter-spacing:.42em;font-size:9pt;color:var(--gold);
  text-align:center;text-indent:.42em;}
.kicker{font-family:"Gothic",sans-serif;font-weight:350;letter-spacing:.46em;font-size:8.5pt;
  color:var(--navy2);text-align:center;text-indent:.46em;}
.rule{display:flex;align-items:center;justify-content:center;gap:5mm;}
.rule .ln{height:.5pt;width:34mm;background:linear-gradient(90deg,transparent,var(--gold));}
.rule .ln.r{background:linear-gradient(90deg,var(--gold),transparent);}
.rule .dia{width:2.6mm;height:2.6mm;background:linear-gradient(135deg,var(--goldL),var(--goldD));transform:rotate(45deg);}
.hair{height:.5pt;background:linear-gradient(90deg,transparent,var(--gold) 12%,var(--gold) 88%,transparent);opacity:.7;}

/* ===================== 表 (FRONT) ===================== */
#page-front .inner{justify-content:space-between;}

.f-top{display:flex;flex-direction:column;align-items:center;gap:2mm;}
.headline{text-align:center;line-height:1.5;letter-spacing:.1em;color:var(--navy);
  font-weight:600;font-size:18pt;margin-top:1mm;}
.headline .em{position:relative;}
.headline .em::after{content:"";position:absolute;left:.04em;right:.04em;bottom:-2mm;height:.7pt;
  background:linear-gradient(90deg,transparent,var(--goldL) 18%,var(--goldD) 82%,transparent);}
.subline{text-align:center;font-family:"Gothic",sans-serif;font-weight:350;font-size:10pt;
  letter-spacing:.18em;color:var(--mute);line-height:1.9;margin-top:2mm;}

.hero{display:flex;flex-direction:column;align-items:center;}
.hero-frame{padding:2.2mm;background:var(--panel);
  box-shadow:0 3mm 9mm rgba(22,36,63,.20),0 0 0 .5pt rgba(126,93,36,.5);}
.hero-frame img{display:block;width:80mm;height:auto;border:.6pt solid var(--gold);}
.hero-cap{font-family:"Gothic",sans-serif;font-weight:350;font-size:8pt;letter-spacing:.22em;
  color:var(--mute);margin-top:3.2mm;text-align:center;}

.triad{display:flex;align-items:stretch;justify-content:center;gap:0;margin:1mm auto 0;}
.triad .t{padding:0 7mm;text-align:center;}
.triad .t+.t{border-left:.5pt solid var(--gold);}
.triad .t .jp{font-size:11pt;letter-spacing:.12em;color:var(--navy);font-weight:500;}
.triad .t .en{font-family:"Display",serif;font-size:7pt;letter-spacing:.3em;color:var(--gold);margin-top:1.6mm;}

/* QRカルトゥーシュ */
.cartouche{display:flex;align-items:center;gap:7mm;justify-content:center;
  border:.8pt solid var(--gold);background:var(--panel);
  padding:5mm 9mm;position:relative;}
.cartouche::before,.cartouche::after{content:"";position:absolute;width:3mm;height:3mm;border:.8pt solid var(--gold);}
.cartouche::before{top:-1.6mm;left:-1.6mm;border-right:none;border-bottom:none;}
.cartouche::after{bottom:-1.6mm;right:-1.6mm;border-left:none;border-top:none;}
.qr{width:25mm;height:25mm;}
.qr svg{width:100%;height:100%;display:block;}
.cart-txt{display:flex;flex-direction:column;gap:1.6mm;}
.cart-txt .big{font-size:13pt;letter-spacing:.1em;color:var(--navy);font-weight:600;}
.cart-txt .sm{font-family:"Gothic",sans-serif;font-weight:350;font-size:8.5pt;letter-spacing:.1em;color:var(--mute);line-height:1.7;}
.cart-txt .url{font-family:"LatinSerif",serif;font-size:8pt;letter-spacing:.04em;color:var(--gold);}

.f-foot{text-align:center;font-family:"Gothic",sans-serif;font-weight:350;font-size:8pt;
  letter-spacing:.16em;color:var(--navy2);}
.f-foot b{font-weight:500;letter-spacing:.18em;}

/* ===================== 裏 (BACK) ===================== */
#page-back .inner{padding:12mm 14mm;}
.b-head{display:flex;flex-direction:column;align-items:center;gap:2.6mm;}
.b-title{font-size:19pt;font-weight:600;letter-spacing:.14em;color:var(--navy);}
.sec-label{display:flex;align-items:center;gap:4mm;margin:0 0 4mm;}
.sec-label .num{font-family:"Display",serif;font-size:12pt;color:var(--gold);letter-spacing:.2em;}
.sec-label .dia2{width:2.6mm;height:2.6mm;background:linear-gradient(135deg,var(--goldL),var(--goldD));transform:rotate(45deg);flex:0 0 auto;}
.sec-label .tx{font-size:12.5pt;font-weight:600;letter-spacing:.16em;color:var(--navy);white-space:nowrap;}
.sec-label .ln{flex:1;height:.5pt;background:linear-gradient(90deg,var(--gold),transparent);opacity:.7;}

.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;}
.gcell{display:flex;flex-direction:column;align-items:center;}
.gcell .imw{width:100%;background:var(--panel);padding:1.6mm;box-shadow:0 1mm 3mm rgba(22,36,63,.12);}
.gcell .imw img{display:block;width:100%;height:34mm;object-fit:cover;border:.5pt solid var(--gold);}
.gcell.wide{grid-column:span 1;}
.gcell .cap{font-family:"Gothic",sans-serif;font-weight:350;font-size:8pt;letter-spacing:.14em;
  color:var(--navy2);margin-top:2.2mm;text-align:center;}
.gallery2{display:grid;grid-template-columns:repeat(2,1fr);gap:5mm;margin-top:5mm;}
.gallery2 .imw img{height:40mm;}

.reasons{display:flex;gap:0;}
.reasons .r{flex:1;padding:0 6mm;}
.reasons .r+.r{border-left:.5pt solid var(--gold);}
.reasons .r .n{font-family:"LatinSerif",serif;font-weight:400;font-size:17pt;color:var(--gold);letter-spacing:.06em;}
.reasons .r .t{font-size:11.5pt;font-weight:600;letter-spacing:.08em;color:var(--navy);margin:2.4mm 0 2.6mm;line-height:1.4;}
.reasons .r .d{font-family:"Gothic",sans-serif;font-weight:350;font-size:8.4pt;letter-spacing:.04em;color:var(--mute);line-height:1.85;}

.flow{display:flex;align-items:center;justify-content:center;gap:0;}
.flow .step{text-align:center;padding:0 3mm;}
.flow .step .k{font-family:"LatinSerif",serif;font-weight:400;font-size:8pt;color:var(--gold);letter-spacing:.24em;}
.flow .step .s{font-size:10pt;font-weight:500;letter-spacing:.06em;color:var(--navy);margin-top:1.8mm;white-space:nowrap;}
.flow .arw{color:var(--gold);font-size:9pt;padding:0;align-self:flex-start;margin-top:3.2mm;}

.contact{display:flex;gap:7mm;align-items:stretch;
  border:.8pt solid var(--gold);background:var(--panel);padding:6mm 8mm;}
.contact .co{flex:1.65;}
.contact .co .nm{font-size:12.5pt;font-weight:600;letter-spacing:.12em;color:var(--navy);margin-bottom:0;}
.contact .co .row{font-family:"Gothic",sans-serif;font-weight:350;font-size:8.2pt;letter-spacing:.04em;
  color:var(--navy2);line-height:2;white-space:nowrap;}
.contact .co .row span{display:inline-block;width:14mm;color:var(--gold);letter-spacing:.14em;}
.contact .vline{width:.5pt;background:linear-gradient(180deg,transparent,var(--gold),transparent);}
.contact .line{flex:.95;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.6mm;}
.contact .line .lb{font-size:10.5pt;font-weight:600;letter-spacing:.1em;color:var(--navy);text-align:center;line-height:1.6;}
.contact .line .qr{width:24mm;height:24mm;}
.contact .line .sm{font-family:"Gothic",sans-serif;font-weight:350;font-size:7.6pt;letter-spacing:.12em;color:var(--mute);}

.b-foot{text-align:center;font-family:"Display",serif;font-size:7.5pt;letter-spacing:.34em;color:var(--gold);text-indent:.34em;}
</style></head><body>

<!-- ================= 表 (FRONT) ================= -->
<section class="page" id="page-front">
  <div class="paper"></div><div class="grain"></div>
  <div class="frame-out"></div><div class="frame-in"></div>
  <div class="corner c-tl"><i></i></div><div class="corner c-tr"><i></i></div>
  <div class="corner c-bl"><i></i></div><div class="corner c-br"><i></i></div>

  <div class="inner">
    <div class="f-top">
      <div class="eyebrow">KEEPON&nbsp;&nbsp;CO., LTD.</div>
      <div class="kicker">名入れ・箔押し　賞状・証書ファイル</div>
      <div class="rule"><span class="ln"></span><span class="dia"></span><span class="ln r"></span></div>
      <h1 class="headline">大切な一紙を大切に保管する<br>「<span class="em">賞状・証書ケース</span>」</h1>
      <p class="subline">名入れ・箔押しでオリジナルを演出します。</p>
    </div>

    <div class="hero">
      <div class="hero-frame"><img src="${f('assets/cert-grave.png')}" alt="証書ケース実例"></div>
      <div class="hero-cap">布張り・銀箔押し仕様（実例）</div>
    </div>

    <div class="triad">
      <div class="t"><div class="jp">名入れ・箔押し</div><div class="en">PERSONALIZED</div></div>
      <div class="t"><div class="jp">布張り・和紙仕立て</div><div class="en">FINE MATERIAL</div></div>
      <div class="t"><div class="jp">1冊から対応</div><div class="en">FROM ONE</div></div>
    </div>

    <div class="cartouche">
      <div class="qr">${qrSvgSmartphone}</div>
      <div class="cart-txt">
        <div class="big">スマートフォンで詳しく</div>
        <div class="sm">商品ページ・無料サンプル・お見積り・ご相談</div>
        <div class="url">keepon1115.github.io/shosho/</div>
      </div>
    </div>

    <div class="f-foot"><b>キープオン株式会社</b>　TEL 072-928-6552　／　大阪府八尾市渋川町5-5-33</div>
  </div>
</section>

<!-- ================= 裏 (BACK) ================= -->
<section class="page" id="page-back">
  <div class="paper"></div><div class="grain"></div>
  <div class="frame-out"></div><div class="frame-in"></div>
  <div class="corner c-tl"><i></i></div><div class="corner c-tr"><i></i></div>
  <div class="corner c-bl"><i></i></div><div class="corner c-br"><i></i></div>

  <div class="inner" style="justify-content:space-between;">
    <div class="b-head">
      <div class="eyebrow">PRODUCT&nbsp;&nbsp;VARIATIONS</div>
      <div class="b-title">こんな証書も、つくれます。</div>
      <div class="rule"><span class="ln"></span><span class="dia"></span><span class="ln r"></span></div>
    </div>

    <div>
      <div class="gallery">
        <div class="gcell"><div class="imw"><img src="${f('assets/cert-grave.png')}"></div><div class="cap">墓地使用承諾証</div></div>
        <div class="gcell"><div class="imw"><img src="${f('assets/cert-thanks.png')}"></div><div class="cap">感謝状</div></div>
        <div class="gcell"><div class="imw"><img src="${f('assets/cert-baptism.png')}"></div><div class="cap">バプテスマ証書</div></div>
      </div>
      <div class="gallery2">
        <div class="gcell"><div class="imw"><img src="${f('assets/cert-diploma.png')}"></div><div class="cap">Diploma・卒業証書</div></div>
        <div class="gcell"><div class="imw"><img src="${f('assets/cert-temple.png')}"></div><div class="cap">納骨証書・法号授与証</div></div>
      </div>
    </div>

    <div>
      <div class="sec-label"><span class="dia2"></span><span class="tx">選ばれる、三つの理由</span><span class="ln"></span></div>
      <div class="reasons">
        <div class="r"><div class="n">01</div><div class="t">紛失・破損を防ぐ<br>堅牢な仕立て</div><div class="d">丈夫な布張り仕様で、大切な書類を長期保管。持ち出しや保存も安心です。</div></div>
        <div class="r"><div class="n">02</div><div class="t">箔押しの<br>荘厳・高級感</div><div class="d">タイトルやロゴを金・銀で統一。式典・授与にふさわしい格式を演出します。</div></div>
        <div class="r"><div class="n">03</div><div class="t">1冊からの<br>名入れ対応</div><div class="d">小ロットでも対応。細密な箔押し実績があり、高品質に仕上げます。</div></div>
      </div>
    </div>

    <div>
      <div class="sec-label"><span class="dia2"></span><span class="tx">ご注文の流れ</span><span class="ln"></span></div>
      <div class="flow">
        <div class="step"><div class="k">STEP 1</div><div class="s">お問い合わせ</div></div>
        <div class="arw">―</div>
        <div class="step"><div class="k">STEP 2</div><div class="s">校正デザイン作成</div></div>
        <div class="arw">―</div>
        <div class="step"><div class="k">STEP 3</div><div class="s">内容のご確認</div></div>
        <div class="arw">―</div>
        <div class="step"><div class="k">STEP 4</div><div class="s">約2週間で発送</div></div>
      </div>
    </div>

    <div class="contact">
      <div class="co">
        <div style="display:flex;align-items:center;gap:3mm;margin-bottom:3mm;">
          <img src="${f('assets/rogo.png')}" style="height:9mm;" alt="キープオン">
          <div class="nm">キープオン株式会社</div>
        </div>
        <div class="row"><span>運営会社</span>キープオン株式会社</div>
        <div class="row"><span>所在地</span>〒581-0075　大阪府八尾市渋川町5-5-33</div>
        <div class="row"><span>電話</span>072-928-6552</div>
        <div class="row"><span>メール</span>clat2@keepon-web.com</div>
        <div class="row"><span>WEB</span>keepon-web.com</div>
      </div>
      <div class="vline"></div>
      <div class="line">
        <div class="lb">お問い合わせは<br>LINEが便利です</div>
        <div class="qr">${qrSvgLine}</div>
        <div class="sm">商品ページ・お見積り・ご相談</div>
      </div>
    </div>

    <div class="b-foot">A　TIMELESS　FRAME　FOR　WHAT　MATTERS</div>
  </div>
</section>

</body></html>`;
}
