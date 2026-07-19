// Pulls Account records from Salesforce and pushes them to the data
// warehouse. The field list below must match the Account schema in the
// org — if an admin renames a field, this file is what breaks.

const ACCOUNT_FIELDS = [
  "Id",
  "Name",
  "Industry",
  "CustomerPriority1111__c",
];

export async function fetchAccounts(conn) {
  const soql = `SELECT ${ACCOUNT_FIELDS.join(", ")} FROM Account`;
  const result = await conn.query(soql);
  return result.records.map((r) => ({
    id: r.Id,
    name: r.Name,
    industry: r.Industry,
    priority: r.CustomerPriority1111__c,
  }));
}
