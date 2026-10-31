import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle, Share2, PlusSquare } from 'lucide-react';

interface Props {
  className?: string;
  variant?: 'button' | 'banner' | 'pill';
}

export const PWAInstallButton: React.FC<Props> = ({ className = '', variant = 'button' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showAndroidModal, setShowAndroidModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowAndroidModal(true);
    }
  };

  return (
    <>
      {variant === 'banner' ? (
        <div className={`bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base">Mobil Ilovani O'rnating</h4>
              <p className="text-teal-100 text-xs sm:text-sm">Smartfonda tez va internetsiz ham ishlash imkoniyati</p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-teal-800 font-bold rounded-xl text-sm shadow hover:bg-teal-50 transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-teal-700" />
            Ilovani yuklab olish
          </button>
        </div>
      ) : variant === 'pill' ? (
        <button
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition shadow-xs ${className}`}
          title="Mobil ilovani telefoningizga o'rnating"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ilova o'rnatish</span>
        </button>
      ) : (
        <button
          onClick={handleInstallClick}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 transition shadow-sm active:scale-95 ${className}`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="hidden sm:inline">Mobil Ilova</span>
          <span className="sm:hidden">O'rnatish</span>
        </button>
      )}

      {/* iOS Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">iPhone / iPad ga o'rnatish</h3>
                <p className="text-xs text-slate-500">Safari brauzeri orqali 2 qadamda</p>
              </div>
            </div>

            <div className="space-y-3 my-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  Safari brauzerining pastki qismidagi <strong>"Ulashish" (Share)</strong> tugmasini bosing:
                  <div className="mt-1 flex items-center gap-1.5 text-teal-600 font-semibold">
                    <Share2 className="w-4 h-4" /> [Share belgisi]
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  Menyudan pastga tushib, <strong>"Bosh ekranga qo'shish" (Add to Home Screen)</strong> tugmasini bosing:
                  <div className="mt-1 flex items-center gap-1.5 text-teal-600 font-semibold">
                    <PlusSquare className="w-4 h-4" /> Bosh ekranga qo'shish
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full mt-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition"
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}

      {/* Android / Browser Guide Modal */}
      {showAndroidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setShowAndroidModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Ilovani O'rnatish</h3>
                <p className="text-xs text-slate-500">Android / Kompyuter orqali</p>
              </div>
            </div>

            <div className="space-y-3 my-4 text-xs sm:text-sm text-slate-700">
              <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-teal-900">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  PWA (Progressive Web App)
                </div>
                Brauzer menyusidagi (3 nuqta <strong>⋮</strong>) tugmasini bosing va <strong>"Ilovani o'rnatish"</strong> yoki <strong>"Bosh ekranga qo'shish"</strong> tugmasini bosing.
              </div>
            </div>

            <button
              onClick={() => setShowAndroidModal(false)}
              className="w-full mt-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </>
  );
};
