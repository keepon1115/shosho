import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { MessageCircle, Mail } from 'lucide-react';

interface CTAModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'sample' | 'quote';
}

export function CTAModal({ open, onOpenChange, type }: CTAModalProps) {
  const [contactMethod, setContactMethod] = useState<'line' | 'email' | null>(null);

  const handleLineClick = () => {
    window.open('https://lin.ee/u8HJvZj', '_blank');
    toast.success('LINEを開きました。お気軽にメッセージをお送りください。');
    onOpenChange(false);
    setContactMethod(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            無料サンプル・見積がほしい
          </DialogTitle>
          <DialogDescription>
            {contactMethod === null ? (
              'お問い合わせ方法をお選びください'
            ) : (
              'LINEでのお問い合わせがスムーズです'
            )}
          </DialogDescription>
        </DialogHeader>

        {contactMethod === null ? (
          <div className="grid gap-4 py-4">
            <Button
              onClick={() => setContactMethod('line')}
              className="h-auto py-6 bg-[#06C755] hover:bg-[#05b34d] text-white flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              <div className="text-left">
                <div>LINEで問い合わせる</div>
                <div className="text-xs opacity-90">（おすすめ）即座に返信できます</div>
              </div>
            </Button>
            <Button
              onClick={() => setContactMethod('email')}
              variant="outline"
              className="h-auto py-6 flex items-center justify-center gap-3"
            >
              <Mail className="w-6 h-6" />
              <div className="text-left">
                <div>メールで問い合わせる</div>
                <div className="text-xs text-gray-500">アドレス：clat2@keepon-web.com</div>
              </div>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto py-6 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200"
            >
              <a 
                href="https://keepon-web.com/?pid=178253619" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-blue-900">サンプル注文する</div>
                  <div className="text-xs text-blue-700">オンラインショップで注文</div>
                </div>
              </a>
            </Button>
          </div>
        ) : contactMethod === 'line' ? (
          <div className="py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-4">
              <MessageCircle className="w-12 h-12 text-[#06C755] mx-auto mb-3" />
              <p className="mb-4">
                LINEアプリが開きます。<br />
                お気軽にメッセージをお送りください。
              </p>
              <Button
                onClick={handleLineClick}
                className="bg-[#06C755] hover:bg-[#05b34d] text-white"
              >
                LINEを開く
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => setContactMethod(null)}
              className="w-full"
            >
              戻る
            </Button>
          </div>
        ) : (
          <div className="py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-4">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="mb-4">
                下記のメールアドレスまで<br />
                お気軽にお問い合わせください。
              </p>
              <div className="bg-white border border-blue-300 rounded-lg p-4 mb-4">
                <p className="text-blue-600">clat2@keepon-web.com</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setContactMethod(null)}
              className="w-full"
            >
              戻る
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
