const digitsOnly = (value: string) => value.replace(/\D/g, '');

const whatsappNumber = digitsOnly(process.env.WHATSAPP_NUMBER ?? '');
const phoneNumber = (process.env.PHONE_NUMBER ?? '').trim();

export const siteConfig = {
  whatsappNumber,
  whatsappUrl: (text?: string) =>
    `https://wa.me/${whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`,
  phoneNumber: phoneNumber || whatsappNumber,
  phoneDialNumber: digitsOnly(phoneNumber) || whatsappNumber,
};
