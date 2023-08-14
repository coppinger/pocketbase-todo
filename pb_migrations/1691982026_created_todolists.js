/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uyf08mgrk3oevpk",
    "created": "2023-08-14 03:00:26.730Z",
    "updated": "2023-08-14 03:00:26.730Z",
    "name": "todolists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "llmx35wj",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "gfbrjlvd",
        "name": "todos",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "qdsjkh86nisexvy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uyf08mgrk3oevpk");

  return dao.deleteCollection(collection);
})
