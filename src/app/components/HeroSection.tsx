import { useState } from 'react';
import { Button } from './ui/button';
import { CTAModal } from './CTAModal';
import heroImage from 'figma:asset/55310ceb89a131421ae99a98ab935f06d4b4340c.png';

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'sample' | 'quote'>('sample');

  const openModal = (type: 'sample' | 'quote') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景画像 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1761165308258-807a13490986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRlbXBsZSUyMGdhcmRlbiUyMHN0b25lfGVufDF8fHx8MTc2Mjc1NjA1NXww&ixlib=rb-4.1.0&q=80&w=1080)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <img
              src={heroImage}
              alt="証書ファイル"
              className="w-64 h-80 object-cover rounded-lg shadow-2xl border-4 border-white/20"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-900/30 to-indigo-900/30" />
          </div>
        </div>

        <h1 className="text-white mb-6 px-4 drop-shadow-lg">
          賞状や証書を大切に保管する<br className="sm:hidden" />「賞状・証書ケース」
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow">
          名入れ・箔押しでオリジナルを演出します。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => openModal('sample')}
            className="bg-blue-900 hover:bg-blue-800 text-white border-2 border-blue-700 shadow-lg px-8 py-6"
          >
            ▶ 無料サンプル・見積がほしい
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-white/95 hover:bg-white text-gray-900 border-2 border-white shadow-lg px-8 py-6 backdrop-blur-sm"
          >
            <a href="https://keepon-web.com/?mode=cate&cbid=2491988&csid=1" target="_blank" rel="noopener noreferrer">
              ▶ 商品詳細ページをみてみる
            </a>
          </Button>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
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