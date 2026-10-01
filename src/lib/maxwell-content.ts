// Original images extracted from the supplied company profile PDF and served locally.
const imagePath = '/assets/images';
export const brand = {
  logo: `${imagePath}/maxwell-logo.png`,
  portrait: `${imagePath}/maxwell-ceo.png`,
};
const productImages = [
  `${imagePath}/maxwell-product-01.jpg`,
  `${imagePath}/maxwell-product-02.jpg`,
  `${imagePath}/maxwell-product-03.jpg`,
  `${imagePath}/maxwell-product-04.png`,
  `${imagePath}/maxwell-product-05.jpg`,
  `${imagePath}/maxwell-product-06.jpg`,
  `${imagePath}/maxwell-product-07.jpg`,
  `${imagePath}/maxwell-product-08.jpg`,
  `${imagePath}/maxwell-product-09.jpg`,
  `${imagePath}/maxwell-product-10.jpg`,
  `${imagePath}/maxwell-product-11.jpg`,
  `${imagePath}/maxwell-product-12.jpg`,
  `${imagePath}/maxwell-product-13.jpg`,
  `${imagePath}/maxwell-product-14.png`,
  `${imagePath}/maxwell-product-15.jpg`,
  `${imagePath}/maxwell-product-16.png`,
  `${imagePath}/maxwell-product-17.jpg`,
];
export type Product = { id: string; slug: string; image: string; alt: string };
export const products: [Product, ...Product[]] = productImages.map((image, index) => ({
  id: String(index + 1).padStart(2, '0'),
  slug: `product-${String(index + 1).padStart(2, '0')}`,
  image,
  alt: `Automotive component shown in Maxwell Rubber Industry company profile, image ${String(index + 1).padStart(2, '0')}`,
})) as [Product, ...Product[]];
export const clients = [
  { name: 'Pepsi', image: `${imagePath}/client-pepsi.png` },
  { name: 'Nimir Industrial Chemicals Ltd.', image: `${imagePath}/client-nimir.png` },
  { name: 'Faisal Movers', image: `${imagePath}/client-faisal.png` },
  { name: 'Gourmet', image: `${imagePath}/client-gourmet.png` },
  { name: 'Coca-Cola', image: `${imagePath}/client-coca-cola.png` },
  { name: 'Daewoo Bus', image: `${imagePath}/client-daewoo.png` },
];
export const values = [
  { title: 'Quality', description: 'We are committed to maintaining high quality and consistency in every product we manufacture.' },
  { title: 'Integrity', description: 'We believe in honest business practices, transparency, and building trust with our customers and partners.' },
  { title: 'Reliability', description: 'We focus on delivering dependable products and services that our customers can rely on.' },
  { title: 'Customer focus', description: "We understand our customers’ needs and work to provide products and services that meet their expectations." },
  { title: 'Continuous improvement', description: 'We continuously improve our processes, products, and standards to achieve better results.' },
];
export const strengths = [
  { title: 'High quality', description: 'Quality-focused products built to meet industry requirements.' },
  { title: 'Heavy duty', description: 'Durable rubber parts designed for demanding automotive applications.' },
  { title: 'Reliable performance', description: 'Consistent products that customers can depend on.' },
  { title: 'Customer satisfaction', description: 'Dedicated service focused on customer needs and long-term relationships.' },
];
export const companyDescription = 'Maxwell Rubber Industry is a trusted manufacturer and exporter of high-quality, heavy-duty automotive rubber parts. Since 2000, we have been committed to delivering durable, reliable, and precision-made rubber components designed to meet the demanding requirements of the automotive industry.';
export const vision = 'To become a recognized and trusted name in the global automotive rubber industry.';
export const mission = 'To manufacture and export high-quality, heavy-duty automotive rubber parts with consistent performance and durability.';
