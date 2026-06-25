import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Реквизиты | Александра Пирог",
};

export default function RequisitesPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-dark">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <h1 className="font-display text-4xl sm:text-5xl">Реквизиты</h1>

        <div className="mt-8 rounded-[2rem] border border-brand-dark/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="space-y-4 font-ui text-base leading-8 text-brand-brown">
            <div>
              <span className="font-medium text-brand-dark">
                Индивидуальный предприниматель:
              </span>
              <br />
              Пирог Александра Александровна
            </div>

            <div>
              <span className="font-medium text-brand-dark">ИНН:</span>
              <br />
              232309553312
            </div>

            <div>
              <span className="font-medium text-brand-dark">ОГРН:</span>
              <br />
              322237500319194
            </div>

            <div>
              <span className="font-medium text-brand-dark">Телефон:</span>
              <br />
              +7 (964) 890-83-41
            </div>

            <div>
              <span className="font-medium text-brand-dark">Email:</span>
              <br />
              alekssandra170191@gmail.com
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
