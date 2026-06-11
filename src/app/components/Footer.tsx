import { MapPin, Phone, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* 会社情報 */}
          <div>
            <h3 className="text-2xl mb-6">キープオン株式会社</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">所在地</p>
                  <p className="text-gray-200">
                    〒581-0075<br />
                    大阪府八尾市渋川町５丁目５−３３
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">電話番号</p>
                  <a
                    href="tel:072-928-6552"
                    className="text-gray-200 hover:text-blue-400 transition-colors"
                  >
                    072-928-6552
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">ウェブサイト</p>
                  <a
                    href="https://keepon-web.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-blue-400 transition-colors break-all"
                  >
                    https://keepon-web.com/
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* キープオンショップ */}
          <div>
            <h3 className="text-2xl mb-6">キープオンショップ</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              証書ファイルをはじめ、記念品やオリジナルグッズの販売も行っています。<br />
              学校・保育用品、イベントで使える商品など幅広くそろえております！
            </p>
            <a
              href="https://keepon-web.com/?mode=cate&cbid=2491988&csid=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ショップサイトへ
            </a>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} キープオン株式会社 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
