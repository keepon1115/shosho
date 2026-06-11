import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { CTAModal } from './CTAModal';
import productImage1 from 'figma:asset/53b303386f64d415b97e4f766920745b7569eba8.png';
import productImage2 from 'figma:asset/57402d7dddd860a0ea4e19285175fee8aaea56f7.png';
import productImage3 from 'figma:asset/55310ceb89a131421ae99a98ab935f06d4b4340c.png';
import productImage4 from 'figma:asset/b91ec4f8a9539f9bc30dd335e845bbc203d0db5f.png';
import productImage5 from 'figma:asset/78c84ba2f4f7f94b70d794ea78c77efc0eec0017.png';

export function ProductGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'sample' | 'quote'>('sample');

  const openModal = (type: 'sample' | 'quote') => {
    setModalType(type);
    setModalOpen(true);
  };

  // 商品画像（5枚に変更）
  const productImages = [
    {
      id: 1,
      src: productImage3,
      alt: '墓地使用承諾証',
      isWide: false,
    },
    {
      id: 2,
      src: productImage2,
      alt: '感謝状',
      isWide: false,
    },
    {
      id: 3,
      src: productImage1,
      alt: 'バプテスマ証書',
      isWide: false,
    },
    {
      id: 4,
      src: productImage4,
      alt: 'Diploma証書ケース',
      isWide: true,
    },
    {
      id: 5,
      src: productImage5,
      alt: '納骨証書・法号授与証',
      isWide: true,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">
            こんな証書もつくれます！！
          </h2>
        </div>

        {/* 商品画像グリッド - 上列3つ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {productImages.slice(0, 3).map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* 横長画像グリッド - 下列2つ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          {productImages.slice(3).map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-gray-200">
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