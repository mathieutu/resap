/* eslint-disable @typescript-eslint/no-unused-vars,no-console */
const { path } = require('ramda');
const getContentfulEnv = require('./getContentfulEnvironment');
const data = require('./data.json').filter(item => item.id > 200);

const createEntries = async () => {
  console.log(`${data.length} items\n`);

  const contentful = await getContentfulEnv();

  for (const structure of data) {
    // eslint-disable-next-line no-await-in-loop
    await contentful.createEntry('structure', {
      fields: {
        id: { fr: parseInt(structure.id, 10) },
        nom: { fr: structure.nom },
        organisation: { fr: structure.organisation },
        type: { fr: structure.type },
        description: { fr: structure.description },
        latLon: {
          fr: {
            lat: parseFloat(structure.lat),
            lon: parseFloat(structure.lon),
          },
        },
        adresse: { fr: structure.adresse },
        siteWeb: { fr: structure.siteWeb },
        tel: { fr: structure.tel },
      },
    });

    console.log(structure.id);
  }
};

// createEntries().catch(console.error);

const publishEntries = async () => {
  const contentful = await getContentfulEnv();

  const { items } = await contentful.getEntries({ content_type: 'structure', 'sys.archivedAt[exists]': false, 'sys.publishedAt[exists]': false, select: 'sys.id,sys.version', limit: 200 });

  const action = await contentful.createPublishBulkAction({ entities: { items: items.map(({ sys }) => ({
    sys: { ...sys, linkType: 'Entry', type: 'Link' },
  })) } });

  await action.waitProcessing();
};

publishEntries().catch(e => console.error(e, e.action.error.details.errors.map(path(['error', 'details', 'errors']))));
