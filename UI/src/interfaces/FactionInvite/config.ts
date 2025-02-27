import { FactionHash } from '../../shared/Fraction/FactionHash'

type ConfigItem = {
  screenBlurColor: string
  windowBlurColor: string
  pedImageUrl: string
  textBackground: string
  name: string
  description: string
}

export const Config: Record<FactionHash, ConfigItem> = {
  [FactionHash.Imperials]: {
    screenBlurColor: '#431317',
    windowBlurColor: '#36070C',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '#671B22',
    description:
      'Империя – это порядок, а порядок – это сила. Солдат, ты доказал свою преданность Императору. Вступай в ряды Легиона, и вместе мы восстановим мир в Скайриме. Здесь нет места слабости, только дисциплина и верность Империи.',
    name: 'Имперский легион',
  },
  [FactionHash.Dark_Brotherhood]: {
    screenBlurColor: '#3D3C3D',
    windowBlurColor: '#2D2C2D',
    pedImageUrl: require('./assets/images/peds/dark-brotherhood.png'),
    textBackground: '#333233',
    description:
      'Смерть – наш союзник, а тень – наш дом. Ты доказал свою преданность Тёмному Братству, и теперь настало время присоединиться к нам. Прими наши правила, служи безмолвному владыке, и тебе откроются секреты, о которых простые смертные лишь шепчут в страхе.',
    name: 'Темное братство',
  },
  [FactionHash.Thieves_Guild]: {
    screenBlurColor: '#473F34',
    windowBlurColor: '#1E1A15',
    pedImageUrl: require('./assets/images/peds/thieves-guid.png'),
    textBackground: '#29231D',
    description:
      'В этом мире есть два типа людей: те, кто платит, и те, кто забирает. Мы видели, что ты умеешь быть вторым. Вступай в Гильдию Воров, стань частью семьи, и золото потечёт к тебе рекой. Мы не судим – мы только смотрим, насколько ты хорош в своём деле.',
    name: 'Гильдия воров',
  },
  [FactionHash.Khajiit]: {
    screenBlurColor: '#473B2B',
    windowBlurColor: '#342A1C',
    pedImageUrl: require('./assets/images/peds/khajits.png'),
    textBackground: '#52422C',
    description:
      'Пески перемен несут удачу тому, кто умеет её ловить. Каджиты живут торговлей, тайнами и хитростью. Если у тебя есть нюх на золото и сердце свободного духа, присоединяйся к нашему каравану – мы путешествуем, зарабатываем и никогда не оглядываемся назад.',
    name: 'Каджитский караван',
  },
  [FactionHash.Bards_College]: {
    screenBlurColor: '#493527',
    windowBlurColor: '#442A18',
    pedImageUrl: require('./assets/images/peds/bards.png'),
    textBackground: '#52422C',
    description:
      'Песнь и легенда – вот что делает героя бессмертным. Ты показал талант к искусству, а значит, тебе место среди нас. Вступай в Коллегию Бардов, стань голосом истории и вдохновением для будущих поколений.',
    name: 'Коллегия бардов',
  },
  [FactionHash.College_of_Winterhold]: {
    screenBlurColor: '#192534',
    windowBlurColor: '#1F324A',
    pedImageUrl: require('./assets/images/peds/winterhold.png'),
    textBackground: '#2B4666',
    description:
      'Магия – это знание, а знание – это сила. Ты проявил талант, который нельзя игнорировать. Вступай в Коллегию Винтерхолда, где тебе откроются тайны, скрытые от простых смертных. Пусть Аркана станет твоим оружием.',
    name: 'Коллегия винтерхолда',
  },
  [FactionHash.Thalmor]: {
    screenBlurColor: '#232914',
    windowBlurColor: '#343D1D',
    pedImageUrl: require('./assets/images/peds/thalmor.png'),
    textBackground: '#55652C',
    description:
      'Ты осознал истину, дитя Нирна. Верховные эльфы ведут этот мир к совершенству, и ты можешь стать частью нашего великого дела. Вступай в ряды Талмора, и вместе мы очистим Тамриэль от хаоса и слабости.',
    name: 'Талморский легион',
  },
  [FactionHash.Stormcloaks]: {
    screenBlurColor: '#162532',
    windowBlurColor: '#213241',
    pedImageUrl: require('./assets/images/peds/stormbrothers.png'),
    textBackground: '#293F52',
    description:
      'Скайрим – для нордов! Ты не раз доказал свою преданность нашему делу. Вставай в наши ряды, сражайся за свободу и стань частью великой революции! Мы свергнем Империю, и Скайрим снова станет свободным!',
    name: 'Братья бури',
  },
  [FactionHash.Hold_Eastmarch]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
  [FactionHash.Hold_Falkreath]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
  [FactionHash.Hold_Haafingar]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
  [FactionHash.Hold_Hjaalmarch]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
  [FactionHash.Hold_Pale]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
  [FactionHash.Hold_Reach]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
  [FactionHash.Hold_Rift]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
  [FactionHash.Hold_Whiterun]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
  [FactionHash.Hold_Winterhold]: {
    screenBlurColor: '',
    windowBlurColor: '',
    pedImageUrl: require('./assets/images/peds/imperial.png'),
    textBackground: '',
    description: '',
    name: '',
  },
}
