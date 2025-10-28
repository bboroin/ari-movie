import React from "react";
import {
  formatMoney,
  formatPercent,
  languageLabel,
} from "../../../../utils/format";
import "./DetailInfo.css";

const buildExternalLinks = (external_ids = {}, homepage) => {
  const items = [];
  const { imdb_id, instagram_id, twitter_id, facebook_id } = external_ids || {};

  if (homepage)
    items.push({ type: "homepage", label: "Homepage", href: homepage });
  if (imdb_id)
    items.push({
      type: "imdb",
      label: "IMDb",
      href: `https://www.imdb.com/title/${imdb_id}`,
    });
  if (instagram_id)
    items.push({
      type: "instagram",
      label: "Instagram",
      href: `https://www.instagram.com/${instagram_id}`,
    });
  if (twitter_id)
    items.push({
      type: "twitter",
      label: "X(Twitter)",
      href: `https://x.com/${twitter_id}`,
    });
  if (facebook_id)
    items.push({
      type: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/${facebook_id}`,
    });

  return items;
};

const extractKeywords = (detail) => {
  const list = detail?.keywords?.keywords || [];
  return Array.isArray(list) ? list : [];
};

const DetailInfo = ({ detail }) => {
  const originalTitle = detail?.original_title || "—";
  const productionCountries = detail?.production_countries || "—";
  const originalLanguage = detail?.original_language || null;
  const budget = detail?.budget ?? null;
  const revenue = detail?.revenue ?? null;

  const roiInfo = (() => {
    if (!budget || budget <= 0 || !revenue || revenue <= 0) return null;
    const profit = revenue - budget;
    const ratio = profit / budget;
    return { profit, ratio };
  })();

  const keywords = extractKeywords(detail);
  const links = buildExternalLinks(detail?.external_ids, detail?.homepage);

  return (
    <section className="detail-info section">
      <div className="info-grid">
        {/* 원제/원어 */}
        <div className="info-card">
          <div className="info-subtitle">Original</div>
          <dl className="info-original">
            <div className="info-meta-row">
              <dt>Title</dt>
              <dd>{originalTitle}</dd>
            </div>
            <div className="info-meta-row">
              <dt>Country</dt>
              <dd>{productionCountries.map((c) => c.name).join(", ")}</dd>
            </div>
            <div className="info-meta-row">
              <dt>Language</dt>
              <dd>
                <span className="info-lang">
                  {languageLabel(originalLanguage)}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* 제작비/수익/ROI */}
        <div className="info-card">
          <div className="info-subtitle">Finance</div>
          <dl className="info-finance">
            <div className="info-meta-row">
              <dt>Budget</dt>
              <dd>{formatMoney(budget)}</dd>
            </div>
            <div className="info-meta-row">
              <dt>Revenue</dt>
              <dd>{formatMoney(revenue)}</dd>
            </div>
            <div className="info-meta-row">
              <dt>ROI</dt>
              <dd>
                {roiInfo ? (
                  <span
                    className={
                      "info-roi " +
                      (roiInfo.ratio >= 0 ? "is-positive" : "is-negative")
                    }
                  >
                    {formatPercent(roiInfo.ratio)}
                  </span>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* 키워드 */}
        <div className="info-card info-card--full">
          <div className="info-subtitle">Keywords</div>
          {keywords.length ? (
            <ul className="info-chips">
              {keywords.map((k) => (
                <li key={k.id} className="info-chip">
                  {k.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">등록된 키워드가 없습니다.</p>
          )}
        </div>

        {/* 외부 링크 / SNS */}
        <div className="info-card info-card--full">
          <div className="info-subtitle">External Links</div>
          {links.length ? (
            <ul className="info-links">
              {links.map((l, idx) => (
                <li key={idx}>
                  <a
                    className={`info-link info-link--${l.type}`}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="info-link-label">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">추가 링크가 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailInfo;
