const statesDE = [
  'Baden Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
];

export const statesRender = () => {
  const stateDatalistEl = document.querySelector('#stateOptions');

  statesDE.forEach((state) => {
    const option = document.createElement('option');

    option.setAttribute('value', state);
    stateDatalistEl.append(option);
  });
};
