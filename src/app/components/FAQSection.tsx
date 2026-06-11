import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import { CTAModal } from './CTAModal';

export function FAQSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'sample' | 'quote'>('sample');

  const openModal = (type: 'sample' | 'quote') => {
    setModalType(type);
    setModalOpen(true);
  };

  const faqs = [
    {
      question: 'スマホで撮った写真でも印刷できますか？',
      answer: 'はい、スマートフォンで撮影したお写真でも対応可能です。ただし、解像度や明るさによって仕上がりに差が出る場合がございます。できるだけ明るく、ピントの合った画像をご用意いただけますと、より美しく仕上がります。',
    },
    {
      question: '注文は何個からできますか？',
      answer: '1個から可能です。ただし名入れ代は1個でもかかりますのでご注意ください。',
    },
    {
      question: '注文後のキャンセルは可能ですか？',
      answer: '校正（デザイン確認）前であれば、キャンセル可能です。校正デザイン作成後にキャンセルされる場合は、キャンセル料として3,300円（税込）を頂戴いたします。予めご了承ください。',
    },
    {
      question: '納期はどれくらいかかりますか？',
      answer: '校正デザインのご確認完了後、約2週間以内に発送いたします。※時期やご注文状況により変動する場合がございます。',
    },
    {
      question: '複数の配送先に分けて送ることはできますか？',
      answer: 'はい、可能です。発送先リストをご共有いただければ、個別対応いたします。LINEやメールにてお気軽にご相談ください。',
    },
    {
      question: '昨年と同じ内容で注文したいのですが？',
      answer: 'リピーター様は、LINEで「昨年と同じ」とメッセージいただくだけでOK！お名前や内容をすぐにお調べし、スムーズにご対応いたします。',
    },
    {
      question: '法人名義での注文や請求書の発行はできますか？',
      answer: 'はい、法人様からのご注文も承っております。お見積書・納品書・請求書などの発行も可能です。必要書類は事前にお申し付けください。',
    },
    {
      question: 'ファイル形式はどれが必要ですか？',
      answer: 'JPEG、GIF、PNGなどの一般的な画像形式も使用できますが、推奨はAI形式（Adobe Illustrator形式）です。くっきりとしたロゴや文字の再現に最適です。',
    },
    {
      question: 'LINEとメール、どちらから連絡すれば良いですか？',
      answer: 'LINEでのご連絡がおすすめです！すぐに返信できるうえ、画像のやりとりもスムーズです。もちろんメールでのご連絡も承っております。',
    },
    {
      question: '注文内容に不安があるのですが、相談できますか？',
      answer: 'もちろんです！「こういうことってできますか？」という段階でも大歓迎です。担当スタッフが丁寧に対応いたしますので、まずはお気軽にお問い合わせください。',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-stone-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-gray-500 mb-3">FAQ</p>
          <h2 className="text-gray-900 mb-4">
            よくある質問
          </h2>
          <p className="text-lg text-gray-600">
            お客様からよくいただくご質問です。<br />
            他にございましたら、お気軽にご連絡ください。
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-blue-900">
                  <span className="pr-4">Q{index + 1}. {faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  <div className="pt-2 pb-4">
                    <span className="inline-block mb-2">A.</span> {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => openModal('sample')}
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-6"
          >
            ▶ 無料サンプル・見積がほしい
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-gray-300 hover:border-blue-900 hover:bg-blue-50 px-8 py-6"
          >
            <a href="https://keepon-web.com/?mode=cate&cbid=2491988&csid=1" target="_blank" rel="noopener noreferrer">
              ▶ 商品詳細ページをみてみる
            </a>
          </Button>
        </div>
      </div>

      <CTAModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        type={modalType}
      />
    </section>
  );
}