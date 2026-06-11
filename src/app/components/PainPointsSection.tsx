import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function PainPointsSection() {
  const painPoints = [
    {
      number: '1',
      title: '紛失・破損の不安',
      problem: '墓地使用許可証を施主が紛失し、\n改葬許可の再申請が必要になった',
      solution: '持ち出しや保管が簡単に。',
      solutionDetail: '丈夫な布張り仕様で長期保管に最適。大切な書類を安全に守ります。',
    },
    {
      number: '2',
      title: '式典・授与の格式不足',
      problem: '紙フォルダーでは\nチープに見える',
      solution: '箔押しで荘厳さと高級感を演出',
      solutionDetail: 'タイトル・ロゴを金／銀で統一し、ブランド価値向上',
    },
    {
      number: '3',
      title: '小ロット・名入れのハードル',
      problem: '30冊だけ欲しいが従来の業者は100冊〜\nロゴが細かく従来は断られた',
      solution: '1冊から名入れ可',
      solutionDetail: '細密箔押し実績あり。小ロットでも高品質な仕上がりをお約束します。',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-6xl mx-auto">
        {/* 見出し */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-gray-500 mb-3">〜よくあるお悩み〜</p>
          <h2 className="text-gray-900 mb-8">
            こんなお悩み、ありませんか？
          </h2>
        </div>

        {/* お悩み→解決カード */}
        <div className="space-y-8">
          {painPoints.map((item) => (
            <div
              key={item.number}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* 番号バッジ */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <span className="text-white text-2xl">{item.number}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-0">
                {/* 問題側 */}
                <div className="p-8 md:p-10 pt-20 md:pt-10 bg-gradient-to-br from-red-50 to-white border-b md:border-b-0 md:border-r border-red-100">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <h3 className="text-xl text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line pl-9">
                    {item.problem}
                  </p>
                </div>

                {/* 解決側 */}
                <div className="p-8 md:p-10 bg-gradient-to-br from-green-50 to-white relative">
                  {/* 矢印アイコン（モバイルでは非表示） */}
                  <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 rounded-full items-center justify-center shadow-lg z-10">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-green-700 mb-2">解決</div>
                      <h3 className="text-xl text-gray-900 mb-3">
                        {item.solution}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.solutionDetail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 総括メッセージ */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl blur-sm opacity-20"></div>
          <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl text-center">
            <h3 className="text-2xl sm:text-3xl mb-4">
              これらのお悩み、すべて解決いたします。
            </h3>
            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl mx-auto">
              キープオンの賞状・証書ケースは、高級感のある布張り・和紙仕立てです。<br />
              小ロットから対応可能で、あなただけのオリジナルを実現。大切な書類を末永く守ります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}