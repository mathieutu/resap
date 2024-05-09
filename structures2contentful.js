/* eslint-disable @typescript-eslint/no-unused-vars,no-console,no-await-in-loop,import/no-unresolved */
const { path,
  map,
  filter,
  sortBy,
} = require('ramda');
const { writeFile } = require('node:fs/promises');
const getContentfulEnv = require('./getContentfulEnvironment');
const data = require('./data.json');

const createEntries = async () => {
  console.log(`${data.length} items\n`);

  const contentful = await getContentfulEnv();

  for (const structure of data) {
    await contentful.createEntryWithId('structure', structure.id, {
      fields: {
        nom: { fr: structure.nom },
        organisation: { fr: structure.organisation },
        type: { fr: structure.type },
        // description: { fr: structure.description },
        // specialite: { fr: structure.specialite },
        latLon: {
          fr: {
            lat: parseFloat(structure.lat),
            lon: parseFloat(structure.lon),
          },
        },
        adresse: { fr: structure.adresse },
        siteWeb: { fr: structure.siteWeb },
        tel: { fr: structure.tel },
        email: { fr: structure.email },
      },
    });

    console.log(structure.id);
  }
};

// createEntries().catch(console.error);

const publishEntries = async () => {
  const contentful = await getContentfulEnv();

  const { items } = await contentful.getEntries({ content_type: 'structure', 'sys.archivedAt[exists]': false, 'sys.publishedAt[exists]': false, /* 'fields.type': 'CADA', */ select: 'sys.id,sys.version', limit: 200 });

  const action = await contentful.createPublishBulkAction({ entities: { items: items.map(({ sys }) => ({
    sys: { ...sys, linkType: 'Entry', type: 'Link' },
  })) } });

  return action.waitProcessing();
};

const unPublishEntries = async () => {
  const contentful = await getContentfulEnv();

  const { items } = await contentful.getEntries({ content_type: 'structure', 'sys.archivedAt[exists]': false, 'sys.publishedAt[exists]': true, select: 'sys.id', limit: 200 });

  const action = await contentful.createUnpublishBulkAction({ entities: { items: items.map(({ sys }) => ({
    sys: { ...sys, linkType: 'Entry', type: 'Link' },
  })) } });

  await action.waitProcessing();
};

const allEntries = async () => {
  const contentful = await getContentfulEnv();

  const res = await contentful.getEntries({
    limit: 1000,
    content_type: 'structure',
  });
  // writeFileSync('./entries.json', JSON.stringify(res, null, 2));
  return res.items;
};

const deleteAllEntries = async () => {
  const contentful = await getContentfulEnv();

  const entries = await allEntries();
  for (const entry of entries) {
    await contentful.deleteEntry(entry.sys.id);
  }
};

// Export all entries to JSON
allEntries()
  .then(filter(({ sys }) => !sys.archivedAt && sys.publishedAt))
  .then(map(({ sys, fields }) => ({
    id: Number(sys.id),
    updatedAt: sys.updatedAt,
    title: fields.nom?.fr,
    organization: fields.organisation?.fr,
    type: fields.type?.fr,
    lat: fields.latLon?.fr.lat,
    lon: fields.latLon?.fr.lon,
    address: fields.adresse?.fr,
    url: fields.siteWeb?.fr,
    phone: fields.tel?.fr,
    email: fields.email?.fr,
  })))
  .then(sortBy(path(['id'])))
  .then(arr => writeFile('./export-structures.json', JSON.stringify(arr, null, 2)).then(() => arr))
  // https://jsononline.net/fr/json-to-csv pour le CSV (tout en browser, pas d'appel API)
  .then(console.log)
  .catch(console.error);

// publishEntries().catch(e => console.error(e, e.action.error.details.errors.map(path(['error', 'details', 'errors']))));
