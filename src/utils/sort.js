export function sortCrew(crew = []) {
  const priority = ["Director", "Screenplay", "Writer", "Producer"];
  return [...crew].sort((a, b) => {
    const ai = priority.indexOf(a.job);
    const bi = priority.indexOf(b.job);
    if (ai !== -1 || bi !== -1)
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    return (a.department || "").localeCompare(b.department || "");
  });
}
