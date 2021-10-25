const organizations = [{
  title: 'Médecins du Monde',
  address: '1 rue de la Part Dieu, 69003 Lyon',
  email: 'contact@mdm.com',
  phone: '01 23 45 67 89',
}, {
  title: 'Fédération des Acteurs de la Solidarité',
  address: '51 rue Smith, 69002 Lyon',
  email: 'contact@fas.org',
  phone: '01 23 45 67 89',
}, {
  title: 'Fédération des Acteurs de la Solidarité',
  address: '51 rue Smith, 69002 Lyon',
  email: 'contact@fas.org',
  phone: '01 23 45 67 89',
}, {
  title: 'Médecins du Monde',
  address: '1 rue de la Part Dieu, 69003 Lyon',
  email: 'contact@mdm.com',
  phone: '01 23 45 67 89',
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
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>{organization.email}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Téléphone</dt>
                    <dd>{organization.phone}</dd>
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
