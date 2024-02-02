const knex = require("../db/connection");

function create(supplier) {
  return knex("suppliers")
    .insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
function read(supplier_id) {
  return knex("suppliers").select("*").where({ supplier_id }).first();
}

function update(updatedSupplier) {
  return knex("suppliers")
    .select("*")
    .where({ supplier_id: updatedSupplier.supplier_id })
    .update(updatedSupplier, "*");
  //may need .then((updatedPost) => updatedPost[0]);
}
function destroy(supplier_id) {
  return knex("suppliers").where({ supplier_id }).del();
  //may be where supplier_id: supplerId
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
