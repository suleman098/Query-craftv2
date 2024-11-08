export function isValidExcelFormula(input) {
  const formulaPattern = /^=[A-Z]+\([^()]*\)$/i;
  return formulaPattern.test(input.trim());
}

export function isValidExcelDescription(input) {
  return !input.trim().startsWith("=");
}

export function isValidSQLQuery(input) {
  const sqlPattern =
    /^(SELECT|INSERT|UPDATE|DELETE)\s+.*?(FROM|INTO|SET|VALUES)?\s+.*;?$/i;
  return sqlPattern.test(input.trim());
}

export function isValidSQLDescription(input) {
  const invalidPattern =
    /^(SELECT|INSERT|UPDATE|DELETE|WITH)\s+.*?(FROM|INTO|SET|VALUES|JOIN)?\s+.*?;?$/i;

  const hasSQLKeywords =
    /\b(total|sum|average|count|max|min|table|column|row|record|from|where|department|salary|employee|retrieve|select)\b/i;

  // Returns true if it contains keywords in descriptive form and is not an actual query
  const isNaturalLanguageDescription =
    !invalidPattern.test(input.trim()) && hasSQLKeywords.test(input.trim());

  return isNaturalLanguageDescription;
}
