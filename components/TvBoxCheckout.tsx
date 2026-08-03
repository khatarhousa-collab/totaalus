import React, { useEffect, useRef, useState } from 'react';
import { trackWhatsAppConversion } from './analytics';
import { Logo } from './Logo';

const whatsappNumber = '447414662070';

const PRODUCT = {
  name: 'Android 14 TV Box',
  subtitle: '+ 12 maanden IPTVTotaal abonnement cadeau',
  price: 200,
  image: '/box-main.png',
};

const formatEuro = (n: number) => `€${n.toFixed(2).replace('.', ',')}`;

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postcode: string;
  city: string;
  phone: string;
  country: string;
};

const initialForm: FormState = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  postcode: '',
  city: '',
  phone: '',
  country: 'Nederland',
};

interface Props {
  onClose: () => void;
}

const paymentMethods = [
  { id: 'ideal', label: 'iDEAL', desc: 'Betaal veilig via je eigen bank' },
  { id: 'bancontact', label: 'Bancontact', desc: 'Voor betalingen vanuit België' },
  { id: 'creditcard', label: 'Creditcard', desc: 'Visa, Mastercard' },
];

export const TvBoxCheckout: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [step, setStep] = useState<'information' | 'payment'>('information');
  const [payment, setPayment] = useState('ideal');
  const orderPageId = useRef<string | null>(null);

  // Lock background scroll while the checkout is open, and close on Escape.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Save to Notion via our serverless function. Non-blocking: never blocks checkout.
  const saveOrder = (status: string) => {
    const paymentLabel = paymentMethods.find((m) => m.id === payment)?.label ?? '';
    fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        action: orderPageId.current ? 'update' : 'create',
        pageId: orderPageId.current,
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          apartment: form.apartment,
          postcode: form.postcode,
          city: form.city,
          country: form.country,
          product: PRODUCT.name,
          price: PRODUCT.price,
          paymentMethod: status === 'Order placed' ? paymentLabel : undefined,
          status,
        },
      }),
    })
      .then((r) => r.json())
      .then((j) => {
        if (j && j.pageId) orderPageId.current = j.pageId;
      })
      .catch(() => {
        /* saving must never block the customer's checkout */
      });
  };

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const validate = (): boolean => {
    const required: (keyof FormState)[] = ['email', 'firstName', 'lastName', 'address', 'postcode', 'city', 'phone'];
    const next: Partial<Record<keyof FormState, boolean>> = {};
    required.forEach((k) => {
      if (!form[k].trim()) next[k] = true;
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goToPayment = () => {
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]') as HTMLElement | null;
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError?.focus();
      return;
    }
    saveOrder('Details filled');
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    saveOrder('Order placed');
    const method = paymentMethods.find((m) => m.id === payment)?.label ?? '';
    const msg =
      `Hallo, ik wil graag de ${PRODUCT.name} bestellen (incl. 12 maanden IPTVTotaal abonnement) voor ${formatEuro(PRODUCT.price)}.\n\n` +
      `*Mijn gegevens:*\n` +
      `Naam: ${form.firstName} ${form.lastName}\n` +
      `E-mail: ${form.email}\n` +
      `Telefoon: ${form.phone}\n` +
      `Adres: ${form.address}${form.apartment ? `, ${form.apartment}` : ''}\n` +
      `Postcode: ${form.postcode} ${form.city}\n` +
      `Land: ${form.country}\n` +
      `Betaalmethode: ${method}`;
    trackWhatsAppConversion();
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const inputClass = (key: keyof FormState) =>
    `w-full px-4 h-[52px] rounded-md border bg-white text-base sm:text-[15px] text-gray-900 placeholder-gray-500 outline-none transition-colors focus:border-gray-900 focus:ring-1 focus:ring-gray-900 ${
      errors[key] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
    }`;

  const OrderSummary = () => (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img src={PRODUCT.image} alt={PRODUCT.name} className="w-full h-full object-cover" />
          </div>
          <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1.5 rounded-full bg-gray-500 text-white text-xs font-semibold flex items-center justify-center">
            1
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-snug">{PRODUCT.name}</p>
          <p className="text-xs text-gray-500 leading-snug mt-0.5">{PRODUCT.subtitle}</p>
        </div>
        <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{formatEuro(PRODUCT.price)}</p>
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>Subtotaal</span>
          <span className="font-medium">{formatEuro(PRODUCT.price)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>Verzending</span>
          <span className="font-medium text-green-600">Gratis</span>
        </div>
      </div>

      <div className="flex items-end justify-between pt-3 border-t border-gray-200">
        <span className="text-base font-semibold text-gray-900">Totaal</span>
        <div className="text-right">
          <span className="text-xs text-gray-500 mr-1.5">EUR</span>
          <span className="text-xl font-bold text-gray-900">{formatEuro(PRODUCT.price)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile order summary toggle */}
      <div className="lg:hidden border-b border-gray-200 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <button
            onClick={() => setSummaryOpen((o) => !o)}
            className="w-full flex items-center justify-between py-4 text-sm text-gray-800"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {summaryOpen ? 'Besteloverzicht verbergen' : 'Besteloverzicht tonen'}
              <svg className={`w-4 h-4 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <span className="font-bold text-gray-900">{formatEuro(PRODUCT.price)}</span>
          </button>
          {summaryOpen && <div className="pb-6 pt-1"><OrderSummary /></div>}
        </div>
      </div>

      {/* Full-bleed split: white form half + gray summary half, aligned to viewport center */}
      <div className="w-full lg:min-h-[calc(100dvh-65px)] bg-white">
      <div className="max-w-[1000px] mx-auto lg:grid lg:grid-cols-2">
        {/* LEFT — form */}
        <div className="px-5 sm:px-8 py-8 lg:py-12 lg:border-r lg:border-gray-200">
          <div className="max-w-[500px] mx-auto lg:mx-0 lg:ml-auto lg:mr-8 space-y-8">

            {/* Breadcrumb steps */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setStep('information')}
                className={step === 'information' ? 'font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-900'}
              >
                Gegevens
              </button>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className={step === 'payment' ? 'font-semibold text-gray-900' : 'text-gray-400'}>Betaling</span>
            </div>

            {step === 'information' && (
            <>
            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
              <div>
                <input
                  type="email"
                  placeholder="E-mailadres"
                  value={form.email}
                  onChange={update('email')}
                  data-error={errors.email || undefined}
                  className={inputClass('email')}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">Vul een geldig e-mailadres in</p>}
              </div>
            </section>

            {/* Delivery */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Bezorging</h2>

              <div>
                <select value={form.country} onChange={update('country')} className={inputClass('country')}>
                  <option>Nederland</option>
                  <option>België</option>
                  <option>Duitsland</option>
                  <option>Luxemburg</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Voornaam"
                    value={form.firstName}
                    onChange={update('firstName')}
                    data-error={errors.firstName || undefined}
                    className={inputClass('firstName')}
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">Verplicht</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Achternaam"
                    value={form.lastName}
                    onChange={update('lastName')}
                    data-error={errors.lastName || undefined}
                    className={inputClass('lastName')}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">Verplicht</p>}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Adres en huisnummer"
                  value={form.address}
                  onChange={update('address')}
                  data-error={errors.address || undefined}
                  className={inputClass('address')}
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">Verplicht</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Appartement, suite, etc. (optioneel)"
                  value={form.apartment}
                  onChange={update('apartment')}
                  className={inputClass('apartment')}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Postcode"
                    value={form.postcode}
                    onChange={update('postcode')}
                    data-error={errors.postcode || undefined}
                    className={inputClass('postcode')}
                  />
                  {errors.postcode && <p className="mt-1 text-xs text-red-500">Verplicht</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Plaats"
                    value={form.city}
                    onChange={update('city')}
                    data-error={errors.city || undefined}
                    className={inputClass('city')}
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-500">Verplicht</p>}
                </div>
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Telefoonnummer"
                  value={form.phone}
                  onChange={update('phone')}
                  data-error={errors.phone || undefined}
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">Verplicht — we bevestigen je bestelling via WhatsApp</p>}
              </div>
            </section>

            {/* Continue to payment */}
            <button
              onClick={goToPayment}
              className="w-full h-14 rounded-md bg-gray-900 hover:bg-black active:scale-[0.99] transition-all text-white font-bold text-base flex items-center justify-center gap-2"
            >
              Doorgaan naar betaling
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </>
            )}

            {step === 'payment' && (
            <>
            {/* Review of details */}
            <div className="rounded-md border border-gray-300 divide-y divide-gray-200 text-sm">
              <div className="flex items-start gap-4 px-4 py-3">
                <span className="w-16 text-gray-500 flex-shrink-0">Contact</span>
                <span className="flex-1 text-gray-900 break-all">{form.email}</span>
                <button onClick={() => setStep('information')} className="text-gray-500 underline hover:text-gray-900 flex-shrink-0">Wijzigen</button>
              </div>
              <div className="flex items-start gap-4 px-4 py-3">
                <span className="w-16 text-gray-500 flex-shrink-0">Bezorgen</span>
                <span className="flex-1 text-gray-900">
                  {form.firstName} {form.lastName}, {form.address}{form.apartment ? `, ${form.apartment}` : ''}, {form.postcode} {form.city}, {form.country}
                </span>
                <button onClick={() => setStep('information')} className="text-gray-500 underline hover:text-gray-900 flex-shrink-0">Wijzigen</button>
              </div>
            </div>

            {/* Payment */}
            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Betaling</h2>
                <p className="text-sm text-gray-500 mt-0.5">Alle transacties zijn beveiligd en versleuteld.</p>
              </div>

              <div className="rounded-md border border-gray-300 divide-y divide-gray-200 overflow-hidden">
                {paymentMethods.map((m) => (
                  <label key={m.id} className={`flex items-center gap-3 px-4 py-4 cursor-pointer transition-colors ${payment === m.id ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="w-4 h-4 accent-gray-900"
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-gray-900">{m.label}</span>
                      <span className="block text-xs text-gray-500">{m.desc}</span>
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex items-start gap-2.5 rounded-md bg-gray-50 border border-gray-200 px-4 py-3 text-xs text-gray-600">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Na het plaatsen van je bestelling neemt onze medewerker direct via WhatsApp contact met je op met een beveiligde betaallink om de betaling af te ronden.
              </div>
            </section>

            {/* Place order */}
            <button
              onClick={handlePlaceOrder}
              className="w-full h-14 rounded-md bg-gray-900 hover:bg-black active:scale-[0.99] transition-all text-white font-bold text-base flex items-center justify-center gap-2"
            >
              Bestelling plaatsen · {formatEuro(PRODUCT.price)}
            </button>

            <button onClick={() => setStep('information')} className="w-full text-center text-sm text-gray-500 underline hover:text-gray-900">
              ← Terug naar gegevens
            </button>
            </>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Veilig &amp; versleuteld · Je gegevens worden alleen gebruikt voor je bestelling
            </div>
          </div>
        </div>

        {/* RIGHT — order summary (desktop) */}
        <div className="hidden lg:block px-8 py-12">
          <div className="max-w-[400px] mr-auto ml-8 sticky top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
