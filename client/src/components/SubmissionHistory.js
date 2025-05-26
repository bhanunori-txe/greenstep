import React from 'react';

export default function SubmissionHistory({ entries }) {
  const validEntries = entries.filter(
    (entry) =>
      entry.transport &&
      entry.diet &&
      entry.electricity !== undefined &&
      entry.carbon &&
      entry.createdAt
  );

  return (
    <section className="history-container">
      <h3>Past Submissions</h3>
      {validEntries.length === 0 ? (
        <p className="no-submissions">No submissions yet.</p>
      ) : (
        <ul className="history-list">
          {validEntries.map((entry, index) => (
            <li key={index} className="history-item">
              <span role="img" aria-label="transport">🚗</span> {entry.transport},&nbsp;
              <span role="img" aria-label="diet">🥗</span> {entry.diet},&nbsp;
              <span role="img" aria-label="electricity">⚡</span> {entry.electricity} kWh →{' '}
              <strong>
                <span role="img" aria-label="carbon footprint">🌍</span> {entry.carbon} tons CO₂
              </strong>
              <br />
              <small className="submission-date">
                <span role="img" aria-label="clock">🕒</span> Submitted on: {new Date(entry.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
