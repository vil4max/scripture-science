// The reading route in three parts (owner, 2026-10-09: the iPhone menu had
// no roadmap and the comparison appeared twice). The menu, the homepage and
// the route bar on each page all read this one list.

export interface RouteStep { path: string; label: string; text: string }
export interface RoutePart { title: string; steps: RouteStep[] }

export const ROUTE: RoutePart[] = [
  {
    title: 'Основа',
    steps: [
      { path: 'basics/', label: 'С чего начать', text: 'Христианство за пять минут: кто такой Христос, что такое Библия, Церковь и Таинства.' },
      { path: 'orthodoxy/', label: 'Православная вера', text: 'Учение Церкви по темам — основание всего сравнения.' },
      { path: 'bible/', label: 'Священное Писание', text: 'Библия в Предании Церкви: состав, канон, переводы.' },
    ],
  },
  {
    title: 'Религии мира',
    steps: [
      { path: 'religions/', label: 'Знакомство с религиями', text: 'Кто есть кто и что каждая традиция говорит о себе.' },
      { path: 'timeline/', label: 'История', text: 'Как возникали религии и движения и что их связывает.' },
      { path: 'numbers/', label: 'В цифрах', text: 'Сколько людей относят себя к каждой религии.' },
      { path: 'geography/', label: 'На карте', text: 'Где живут последователи религий.' },
    ],
  },
  {
    title: 'Сравнение',
    steps: [
      { path: 'compare/', label: 'Символ веры и различия', text: 'По каждому члену Символа веры — что говорят другие религии и православный взгляд на расхождение.' },
      { path: 'worship/', label: 'Богослужение и молитва', text: 'Как служат и молятся в каждой религии: службы, распорядок дня и года, молитва дома; тексты православных молитв.' },
    ],
  },
];

export const ROUTE_STEPS = ROUTE.flatMap((part, partIndex) => part.steps.map((step) => ({ ...step, part: partIndex })));
