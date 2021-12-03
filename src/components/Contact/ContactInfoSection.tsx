const organizations = [{
  title: 'Coordination régionale des dispositifs PASS, ARS Auvergne-Rhône-Alpes',
  address: <span>ARHM, 290 route de Vienne, BP 8252, <br />69355 LYON Cedex 08</span>,
}, {
  title: 'Fédération des Acteurs de la Solidarité Auvergne Rhône Alpes',
  address: <span>63 rue Smith, <br />69002 Lyon</span>,
}, {
  title: 'Médecins du Monde',
  address: <span>15 Bd Marius Vivier Merle, <br />69003 Lyon</span>,
}, {
  title: 'Réseau social rue hopital',
  address: <span>20 Quai Claude Bernard, <br />69007 Lyon</span>,
}]

export const ContactInfoSection = () => (
  <div>
    <div className="bg-gray-300 w-3/5 mx-auto h-px" />
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="divide-y-2 divide-gray-200">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Coordonnées</h2>
          <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
            {organizations.map(organization => (
              <div key={organization.title}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{organization.title}</h3>
                <dl className="mt-2 text-base text-gray-500 space-y-1">
                  <div>
                    <dt className="sr-only">Adresse</dt>
                    <dd>{organization.address}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)
