// Use local images from assets
export const artifacts = [
  {
    id: '1',
    name: 'Bronze Mask of Queen Mother Idia',
    description: 'A 16th-century bronze mask from the Benin Empire, representing Queen Idia, the mother of Oba Esigie who ruled during the empire\'s golden age.',
    origin: 'Benin Empire (Modern-day Nigeria)',
    period: '16th Century',
    category: 'Sculptures',
    image_url: require('../../assets/artifacts/benin-mask.png'),
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Great Sphinx of Giza',
    description: 'A limestone statue depicting a mythical creature with the head of a human and the body of a lion, representing pharaonic power in ancient Egypt.',
    origin: 'Ancient Egypt',
    period: 'Old Kingdom (c. 2686-2181 BCE)',
    category: 'Sculptures',
    image_url: require('../../assets/artifacts/sphinx.png'),
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Aksumite Obelisk',
    description: 'A granite stele from the ancient kingdom of Aksum, decorated with intricate geometric patterns and false doors.',
    origin: 'Kingdom of Aksum (Modern-day Ethiopia)',
    period: '4th Century CE',
    category: 'Sculptures',
    image_url: require('../../assets/artifacts/aksumite-obelisk.png'),
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Timbuktu Manuscripts',
    description: 'Ancient manuscripts from Timbuktu covering topics from astronomy to music, showcasing Africa\'s rich intellectual history.',
    origin: 'Mali Empire',
    period: '13th-17th Century',
    category: 'Paintings',
    image_url: require('../../assets/artifacts/timbuktu-manuscript.png'),
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Terracotta Head',
    description: 'A naturalistic terracotta head from the Nok culture, known for their sophisticated terracotta sculptures.',
    origin: 'Nok Culture (Modern-day Nigeria)',
    period: '500 BCE - 200 CE',
    category: 'Sculptures',
    image_url: require('../../assets/artifacts/nok-head.png'),
    created_at: new Date().toISOString()
  }
];