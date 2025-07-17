export const departements = [
  { code: '01', nom: 'Ain', textColor: 'text-lime-500', bgColor: 'bg-lime-500' },
  { code: '03', nom: 'Allier', textColor: 'text-green-300', bgColor: 'bg-green-300' },
  { code: '07', nom: 'Ard\u00e8che', textColor: 'text-yellow-300', bgColor: 'bg-yellow-300' },
  { code: '15', nom: 'Cantal', textColor: 'text-red-300', bgColor: 'bg-red-300' },
  { code: '26', nom: 'Dr\u00f4me', textColor: 'text-indigo-300', bgColor: 'bg-indigo-300' },
  { code: '38', nom: 'Is\u00e8re', textColor: 'text-emerald-300', bgColor: 'bg-emerald-300' },
  { code: '42', nom: 'Loire', textColor: 'text-orange-300', bgColor: 'bg-orange-300' },
  { code: '43', nom: 'Haute-Loire', textColor: 'text-purple-300', bgColor: 'bg-purple-300' },
  { code: '63', nom: 'Puy-de-D\u00f4me', textColor: 'text-amber-300', bgColor: 'bg-amber-300' },
  { code: '69', nom: 'Rh\u00f4ne', textColor: 'text-sky-300', bgColor: 'bg-sky-300' },
  { code: '73', nom: 'Savoie', textColor: 'text-pink-300', bgColor: 'bg-pink-300' },
  { code: '74', nom: 'Haute-Savoie', textColor: 'text-cyan-300', bgColor: 'bg-cyan-300' },
 ] as const

export type Departement = typeof departements[number]
export type DepartementCode = Departement['code']
