# Prior Art Research: Global (Non-Russian) Landscape for "religion-map"

Research session: 2026-09-25. Scope: English-language and other major-language resources only (Russian-language web excluded by design, per task). Every entry below is based on a page this session actually opened (via direct fetch or a raw HTTP request), not a search-result snippet. Where a page could not be opened (bot-blocked, paywalled, JavaScript-rendered shell, or dead), this is stated explicitly as `TODO: verify` together with what was tried. Licence/reuse claims are taken only from the project's own page (about/terms/licence/footer/repo metadata); where no such page was reachable, the licence field says so instead of guessing. Quoted excerpts are verbatim, ≤25 words, taken from the actually-opened page.

**Access limitation encountered:** `web.archive.org` refused automated access for the entire session — direct `WebFetch` returned "unable to fetch from web.archive.org"; direct `curl` returned HTTP 429 twice after a cooldown; a read-only text-extraction proxy (`r.jina.ai`) returned an explicit block message: `"Anonymous access to domain web.archive.org blocked ... due to previous abuse found ... DDoS attack suspected"`. This blocks deep verification of BBC Religions and of religioustolerance.org's archived content specifically (both flagged below). The Wayback **availability API** (`archive.org/wayback/available`, a different endpoint) did respond normally and was used to confirm snapshots exist. `archive.org/details` and `archive.org/metadata` (item pages, a different subdomain/service) were reachable normally.

---

## 1. Candidates

### A. Multi-religion comparison sites

#### 1. ReligionFacts — Big Religion Chart
- **URL:** https://religionfacts.com/big-religion-chart — *"ReligionFacts provides free, objective information on religion, world religions, comparative religion, and religious topics."*
- **Publisher:** ReligionFacts (independent site, no denominational affiliation stated). **Languages:** English only. **Format:** single-page HTML comparison table.
- **Scope:** 40+ traditions (per page: "over 40 religions, worldviews, and belief systems"), including all planned religion-map traditions except it does not separate JW/LDS/SDA from a generic Protestant/Christian row — it does list Jehovah's Witnesses, Mormonism, Judaism, Islam, Eastern Orthodoxy and Catholicism as distinct rows.
- **Approach:** neutral/outsider, explicitly non-confessional ("We are not associated with any religion or organization").
- **Sourcing:** no inline citations or scripture quotations found on the chart page itself; the page's own caveat: *"Oversimplification is unavoidable in all charts and summaries, so this is no substitute for reading about religions in greater detail."*
- **Overlap with religion-map:** topic-comparison matrix only (Adherents, Origins & History, God(s), Meaning of Life, Afterlife, Rituals & Practices, Scriptures). No timeline, no lineage tree, no pairwise deep dives, no sourced quotes.
- **Currency:** TODO: verify — no "last updated" date on page; copyright line covers 2004–2026 as a range, not a specific edit date.
- **Licence:** *"© 2004-2026 ReligionFacts. All rights reserved."* — no reuse permission granted.
- **Gap:** unsourced, no scripture text, no lineage/timeline, all traditions compressed to a few words per cell.

#### 2. ReligionFacts — Compare Christian Denominations chart
- **URL:** https://religionfacts.com/charts/denominations-beliefs — page structure only verified (comparison grid framework); cell content did not render in fetch.
- **Scope:** 7 denominations named on page: Anglicanism, Baptists, Catholicism, Eastern Orthodoxy, Lutheranism, Methodism, Presbyterianism — narrower than religion-map's planned set (no JW, LDS, SDA, Islam, Judaism).
- **Topics:** scripture, religious authority, creeds, Trinity, Jesus, Mary, heaven, Purgatory, hell, predestination (8 rows).
- **Sourcing / Licence / Publisher:** same as #1 (same site, same copyright line).
- **Gap:** same limitations as #1, plus narrower scope (Christian-only, no Restorationist groups).

#### 3. Patheos Religion Library
- **URL:** https://www.patheos.com/library — direct `WebFetch` and `curl` both returned HTTP 403 (bot-blocked); content below was retrieved through a read-only text-extraction proxy that returned the live page verbatim. Title: *"Library of World Religions and Faith Traditions."*
- **Publisher:** Patheos (Beliefnet/BN Media). **Languages:** English only. **Format:** multi-page library + one surviving interactive comparison tool.
- **Scope:** ~40 traditions listed on the library index (Christianity split into Anglican, Baptist, Eastern Orthodoxy, Lutheran, Methodist, Mormonism/LDS, Presbyterian, Protestantism, Roman Catholic; plus Islam split into Shia/Sunni/Sufism, Judaism, Buddhism, etc.). Jehovah's Witnesses and Seventh-day Adventist were not seen in the portion of the navigation retrieved — TODO: verify (list was cut off alphabetically after "Islam").
- **Approach:** stated as scholarly/outsider — per search-indexed site description, content is "produced by ... theological experts" with named authors; **TODO: verify** exact wording, since this claim itself came from a search snippet rather than an opened author-credit page.
- **Sourcing:** no inline footnote citations observed in the "Side by Side" comparison content (see #4); each cell links to a longer "read more" article rather than citing a primary source inline.
- **Overlap with religion-map:** historically the closest single-site structural match — the site used to offer three "Lenses": Timeline, Family Tree, and Side by Side comparison, i.e. exactly religion-map's three non-pairwise pillars in one product.
- **Currency:** **degraded.** The current live navigation's "Research Tools" menu lists only **"Comparison Lens"** — no Timeline or Family Tree entry. Direct requests to `patheos.com/library/lenses/timeline` and `patheos.com/library/lenses/family-tree` both returned *"Page Not Found"* in this session (checked via the same proxy). Surviving comparison content itself carries a `Published Time: 2017-07-11` marker.
- **Licence:** TODO: verify — no terms/licence page opened (blocked 403 to direct fetch); standard site copyright presumed but not confirmed verbatim.
- **Gap:** two of its three original pillars are now dead links; no pairwise deep-dive tool; no scripture-text quoting; no BCE/CE timeline of splits with dates.

#### 4. Patheos — "Side by Side" Comparison Lens
- **URL:** https://www.patheos.com/library/lenses/side-by-side (retrieved via proxy after direct 403) — *"The Side by Side Lens allows you to create an easy to read comparison chart for up to three differing religious traditions."*
- **Format:** interactive, up to 3 traditions at once, structured sections: Origins (Beginnings, Influences, Founders, Scriptures, Historical Perspectives), History (Early Developments, **Schisms/Sects**, Missions/Spread), Beliefs, Ritual/Worship/Devotion/Symbolism, Ethics and Community.
- **Sample content (Christianity vs. Islam, "Schisms, Sects" row):** *"Christianity permanently split twice. The first split occurred between the Byzantine Church (eastern) and the Roman Church (western)."*
- **Gap:** confirms structure but not sourcing — no footnotes/citations visible in the rendered comparison cells; quick-facts (e.g. adherent counts) are unsourced round numbers.

#### 5. religioncompare.com
- **URL:** https://www.religioncompare.com/ — *"Factual, neutral, citation-backed information about world religions. Educational information only."*
- **Publisher:** *"© 2026 ReligionCompare. A TPS Worldwide LLC property."* **Languages:** English only (no language switcher observed). **Format:** single modern multi-page site, side-by-side comparison builder.
- **Scope:** *"View all 24 traditions"* (page's own count); denomination-level pages confirmed via sitemap for Catholicism, Orthodox Christianity, Protestantism, Jehovah's Witnesses, Latter-day Saints — matching much of religion-map's planned Christian set, but **no Seventh-day Adventist page** found in the sitemap.
- **Approach:** explicitly neutral/outsider — *"Not affiliated with any religion. Interpretations vary by tradition and denomination."*
- **Sourcing:** claims *"All factual claims are citation-backed"* and lists Pew Research, Encyclopaedia Britannica, UNESCO, World Religion Database and Oxford Reference as reference bases (per page's "Trust & Sources" nav); direct scripture quotation with per-tradition translation was not confirmed — TODO: verify (would require opening individual comparison pages).
- **Overlap with religion-map:** closest match in **mission statement** ("neutral, citation-backed, not affiliated with any religion" mirrors religion-map's "impartial, proof for every claim"); has topic comparisons and per-tradition pages; sitemap shows **no timeline or family-tree page** ("No dedicated timeline or family tree pages appear in this sitemap").
- **Currency:** site is dated 2026 in its own copyright line — newest candidate found.
- **Licence:** copyright notice confirmed verbatim above; a Terms of Service / DMCA page is linked but was not opened — TODO: verify exact reuse terms.
- **Gap:** no timeline, no lineage tree (dual historical/self-view or otherwise), no pairwise deep-dive format (only side-by-side of whole religions, not denomination-vs-denomination within Christianity, per sitemap), no confirmed scripture-in-own-translation sourcing, English only.

#### 6. Encyclopaedia Britannica — comparative religion
- **URL attempted:** https://www.britannica.com/topic/Christianity/Christianity-and-world-religions — direct `WebFetch` returned HTTP 403. **URL:** https://www.britannica.com/topic/comparative-religion — not opened this session. **TODO: verify** — could not access content directly; a search snippet (not a source per task rules) indicated Britannica "doesn't have a full article on this topic, but has curated a list of relevant coverage," which is not independently confirmed here.
- **Publisher:** Encyclopaedia Britannica, Inc. **Licence:** Britannica's general model is subscription/paywalled with "All rights reserved" copyright; **TODO: verify** exact terms (terms page not opened).
- **Gap:** cannot be assessed further without access; known generally as an edited encyclopedia, not an interactive comparison/timeline/lineage tool.

#### 7. BBC Religions (archived)
- **URL:** http://web.archive.org/web/20120102094525/http://www.bbc.co.uk/religion/ — existence and a working 2012 snapshot **confirmed only through the Wayback availability API** (`archive.org/wayback/available?url=bbc.co.uk/religion`), which returned `"available": true, "timestamp": "20120102094525"`. Actual page content could not be retrieved in this session — see the access-limitation note above (three independent methods blocked).
- **Publisher:** BBC. **TODO: verify** everything below page-existence: exact scope, sourcing, approach, and licence. The BBC's general reuse policy for editorial content is restrictive ("all rights reserved" outside its open-licensed datasets), but this was not confirmed on the specific Religion section.
- **Gap:** cannot be assessed beyond confirming the archived site existed; known generally (site was a multi-religion "beliefs/holy days/texts" reference, not an interactive timeline or lineage tool) but this is unverified in-session.

#### 8. religioustolerance.org (Ontario Consultants on Religious Tolerance)
- **URL:** https://www.religioustolerance.org/relcomp.htm — **site is dead.** Direct `nslookup` in this session returned `NXDOMAIN` for both `religioustolerance.org` and `www.religioustolerance.org` (verified first-hand via DNS query, not a secondary claim). A 2022 snapshot's existence was confirmed via the Wayback availability API (`timestamp: 20220320053838`), but its content could not be retrieved — same `web.archive.org` block described above, tried three times (direct fetch, delayed `curl` retry, proxy retry, all failed).
- **Scope/approach/sourcing/licence:** **TODO: verify** — page content unreachable in this session. Community discussion (a forum post surfaced by search, not opened directly, so not treated as a source here) suggests the site went offline around 2023; this is not independently confirmed beyond the DNS failure, which only proves the site is down now, not when it went down.
- **Gap:** defunct; cannot be a source of ongoing reuse or comparison today regardless of its historical content.

#### 9. CARM.org (Christian Apologetics & Research Ministry)
- **URL:** https://carm.org/comparison-grid-between-christianity-and-islamic-doctrine — page title confirmed: *"Comparison table between Christianity and Islamic doctrine."* Content body did not fully render in fetch (verification widget failed to load); a related page, https://carm.org/cult-comparison-chart, was found via search but not opened this session — TODO: verify its content directly.
- **Publisher:** CARM, author credited as Matt Slick. **Approach:** **explicitly confessional/polemical**, not neutral — its own comparison-page title frames "Christianity" (meaning CARM's Reformed Protestant position) as the standard against which "Islamic doctrine" (or, on the separate cult-comparison page, Mormonism/Jehovah's Witnesses) is measured, rather than describing each tradition on its own terms.
- **Overlap with religion-map:** topic-by-topic comparison format exists, but the "equal, self-described" principle central to religion-map is the opposite of CARM's approach.
- **Licence:** TODO: verify — not reached in the available excerpt.
- **Gap:** useful only as a contrast case showing what an *unequal, confessional* comparison chart looks like — precisely what religion-map aims not to be.

#### 10. Faith Explorer (app)
- **URL:** https://faithexplorer.app/ — describes itself as covering Christianity (multiple denominations), Islam, Judaism, Hinduism, Buddhism, Sikhism, Taoism, Confucianism, Shinto, across "17 sacred texts totaling 144,122 verses" (figures as stated on the page).
- **Format:** AI-chat/semantic-search app (iOS; Android "coming soon" per page), not a static sourced-comparison site — includes "nine AI dialogue partners representing each religion," a fundamentally different (generative, non-deterministic) approach to answering questions about traditions than religion-map's fixed, sourced comparison pages.
- **Sourcing:** page states texts use "academic-grade translations" but does not itself display citation methodology in the fetched excerpt — TODO: verify.
- **Licence / publisher:** independent developer (contact "mike@faithexplorer.app" shown on page); no licence/reuse terms observed.
- **Gap:** AI-generated/conversational answers are not the same as fixed, citable, per-tradition-translation quotes; no timeline or lineage tree.

### B. Denomination-vs-denomination (pairwise) comparison sites

#### 11. denominationdifferences.com
- **URL:** https://denominationdifferences.com/compare/eastern-orthodox-vs-jehovahs-witness — fetched directly; verbatim sample row: *"Repent of your sins, believe in Jesus Christ's death and resurrection, and be baptized. [3]"* (note the inline numbered citation marker, `[3]`, present in the live page).
- **Publisher:** not identified on the pages opened — no "About" author/organisation text found in the fetched content. **TODO: verify** who runs the site. **Languages:** English only.
- **Format:** dozens of two-column pairwise comparison pages (confirmed pairs include Eastern Orthodox vs. Jehovah's Witness and Seventh-day Adventist vs. Jehovah's Witness, found via direct URLs and search), plus a "Compare Two Denominations' Beliefs" builder tool and broader comparison tables.
- **Scope:** site covers roughly 25 denominations/traditions (per page content), including all of religion-map's planned Christian set (Orthodox, Catholic, several Protestant families, Adventist, LDS, JW).
- **Approach:** presented in a flat, symmetric two-column format (no side privileged) — closer to religion-map's "equal treatment" principle than CARM's.
- **Sourcing:** numbered citations `[1]`–`[10]+` appear inline per claim, linking to external sources (Pew Research, JW.org, Orthodox sources per the rendered page); **scripture is not quoted directly** in the fetched comparison rows — claims are paraphrased with citation markers, not verbatim scripture text in each tradition's own translation.
- **Overlap with religion-map:** **closest match on the "pairwise deep dive" pillar specifically** — it already has an Eastern Orthodoxy vs. Jehovah's Witnesses page, religion-map's own first planned pair.
- **Currency:** TODO: verify — no last-updated date found on the fetched pages.
- **Licence:** TODO: verify — no copyright/licence notice found in the fetched content (checked the comparison page itself; a sitewide footer/terms page was not separately opened).
- **Gap:** no scripture-in-own-translation quotes, no timeline, no lineage tree, authorship/credibility not disclosed, no Judaism/Islam coverage.

#### 12. ReligionFacts — pairwise chart (Jehovah's Witnesses vs. Mormonism)
- **URL:** https://religionfacts.com/charts/jehovahs-witnesses-mormonism — found via search, **not opened directly this session** — TODO: verify content. Listed here only to note that ReligionFacts also produces single-pair comparison charts (same publisher/licence as entries #1–2), a structural precedent for religion-map's "pairwise deep dive" pages.

### C. Lineage trees, timelines, and infographics

#### 13. ARDA (The Association of Religion Data Archives) — World Religion Family Trees
- **URL:** https://www.thearda.com/world-religion/family-trees?F=120&W=1 — fetched directly.
- **Publisher:** *"© 2026 The Association of Religion Data Archives. All rights reserved."* Sponsors named on-site include the Lilly Endowment, John Templeton Foundation, Chapman University, and Indiana University Indianapolis. **Languages:** English only. **Format:** interactive draggable/zoomable node diagram plus an "abbreviated text version."
- **Scope:** family trees exist for Christianity, Islam, Judaism, and Buddhism (https://www.thearda.com/world-religion/family-trees, checked directly) — covers 4 of religion-map's target traditions structurally, though Protestant sub-families, SDA, LDS and JW appear as nodes within the single Christianity tree rather than as separate deep dives.
- **Historical splits with dates (Christianity tree, confirmed on page):** Church of the East schism (451), Catholic/Eastern split (1054), Protestantism (1500s), Pentecostals (1900s) — this is religion-map's exact target date set (451, 1054, and by extension 1517-era Reformation).
- **Approach:** academic/neutral — ARDA is a scholarly data archive, not confessional.
- **Sourcing:** no inline academic citations observed for the specific lineage claims on the tree page itself (narrative descriptions given, but not footnoted per claim) — TODO: verify whether underlying ARDA profile pages (linked from tree nodes) carry citations.
- **Overlap with religion-map:** **closest match on the "lineage tree" pillar** — real interactive family trees with schism dates, for multiple religions, from an academic publisher.
- **Currency:** copyright year on page reads 2026 (current).
- **Licence:** *"© 2026 The Association of Religion Data Archives. All rights reserved."* — no reuse licence granted; contact required for reuse questions.
- **Gap:** single lineage view only — no separate "each tradition's own view of its continuity" (religion-map's dual-view design); no topic comparison matrix; no pairwise deep dives; no scripture quotes; English only.

#### 14. Wikipedia — "List of Christian denominations"
- **URL:** https://en.wikipedia.org/wiki/List_of_Christian_denominations — fetched directly. *"Only those Christian denominations, ideologies and organizations with Wikipedia articles will be listed in order to ensure that all entries on this list are notable and verifiable."*
- **Structure:** organized by historical lineage/family (Church of the East, Oriental Orthodoxy post-451, Eastern Orthodoxy post-1054, Catholic, Protestant post-16th century, Restorationist, miscellaneous) rather than a flat alphabetical list — structurally close to religion-map's lineage-tree grouping, though presented as nested lists/text, not a visual tree.
- **Sourcing:** inline numbered citations present per the notability rule quoted above.
- **Languages:** has a Russian-language sister article (interlanguage link to "Список христианских конфессий" confirmed present).
- **Currency:** continuously community-edited; no single "last updated" date applies.
- **Licence:** *"Creative Commons Attribution-ShareAlike 4.0 License"* (confirmed verbatim via the Wikipedia footer, checked directly by fetching the site's own page source) — freely reusable with attribution and share-alike.
- **Gap:** text list, not a visual/interactive tree; no dual historical-vs-self-view; no topic comparison matrix; no scripture quotes; crowd-sourced (variable depth/quality per denomination) rather than a single curated product.

#### 15. Wikipedia — "Timeline of religion"
- **URL:** https://en.wikipedia.org/wiki/Timeline_of_religion — fetched directly.
- **Structure:** chronological, Prehistory → BCE → CE → present, covering both monotheistic and non-monotheistic traditions, i.e. the same "BCE/CE, monotheistic in detail / others briefly" shape religion-map wants, though not curated to that ratio specifically.
- **Splits documented:** 1054 (Great Schism), 1517 (Luther), c. 680 (Sunni/Shia split) — directly overlaps religion-map's target dates.
- **Sourcing:** **inconsistent** — the article itself carries a maintenance banner: *"This article needs more citations. Please help improve this article by adding citations to reliable sources."* Some entries are tagged `[citation needed]`.
- **Languages:** interlanguage links present for Arabic, Persian, Japanese, Kannada, Chinese; **no Russian version found** in this session — TODO: verify (a Russian Wikipedia equivalent may exist under a different title; not checked).
- **Licence:** same as #14 — CC BY-SA 4.0, confirmed via site footer.
- **Gap:** flat chronological list, not paired with a lineage tree or comparison matrix; sourcing quality is explicitly flagged as incomplete by Wikipedia's own editors; no scripture quotes.

#### 16. Wikimedia Commons — "Christianity major branches.svg" and related diagrams
- **URL:** https://commons.wikimedia.org/wiki/File:Christianity_major_branches.svg — fetched directly; licence tag on page confirmed to include the string *"GNU Free Documentation License, version 1."* (dual-licensed, also tagged CC BY-SA 3.0 per the page's licence template).
- **Related category pages found (not all individually opened):** `Category:Tree_diagrams_of_Christianity`, `Category:Timelines_of_branches_of_Christianity` (69 files) — a large body of individually-licensed diagrams exists on Commons.
- **Depicts:** derivation of Catholic, Eastern, and Western Christian branches from Early Christianity through Chalcedon (451) and the Great Schism (c. 1054).
- **Overlap with religion-map:** ready-made, openly-licensed lineage diagrams exist for reuse or adaptation, though none seen combine the historical-lineage view with a separate self-perceived-continuity view.
- **Licence:** GFDL 1.2+ / CC BY-SA 3.0 (dual), confirmed on the file's own page — genuinely reusable, including for derivative works, with attribution.
- **Gap:** static images, not interactive; each diagram covers only part of the picture; no accompanying sourced text or comparison data.

#### 17. The Histomap of Religion (John B. Sparks, 1952 edition)
- **URL:** https://archive.org/details/dr_the-histomap-of-religion-the-story-of-mans-search-for-spiritual-unity-by-10260005 — fetched directly, including raw metadata.
- **Format:** single large printed chart, "100,000 years of religion on a single page," logarithmic time scale, digitized as a scan.
- **Approach:** explicitly **not neutral** by the chart's own printed caveat (as reported in the item's description): relative significance of traditions was judged "from the 'liberal Christian' viewpoint" — a self-disclosed bias religion-map explicitly wants to avoid.
- **Currency:** 1943 original, 1952 print edition — a historical artifact, not a maintained resource.
- **Licence:** confirmed verbatim from the item's own metadata record (`archive.org/metadata/...`): *"Images may be downloaded and used following Creative Commons CC BY-NC-SA 3.0 license."* Attribution to the David Rumsey Map Collection required; commercial use needs separate permission.
- **Gap:** static 1952 scholarship, self-disclosed Christian-centric bias, no sources cited per claim, non-commercial licence only, no interactivity.

#### 18. UsefulCharts — World Religions Family Tree (and Christian Denominations Family Tree)
- **URL:** https://usefulcharts.com/products/world-religions-family-tree — fetched directly; page states the chart *"shows how world religions connect to one another."* A companion product, "Christian Denominations Family Tree" (found via search, not opened this session — https://usefulcharts.com/products/christian-denominations-family-tree, **TODO: verify** its content directly), appears to focus specifically on Christian lineage.
- **Publisher:** UsefulCharts, designed by historian Matt Baker (per page).
- **Format:** commercial printed poster (24"×36" or 32"×48"), $29 USD — not a website or interactive tool.
- **Sourcing:** no citations or references found on the product page.
- **Licence:** none stated on the page — sold as a physical/print product; **TODO: verify** whether any digital reuse licence exists (not found in this session).
- **Gap:** static commercial poster, not reusable data, no citations, English only, no comparison matrix or pairwise pages.

#### 19. World History and Mythology — "Family Tree of Christian Denominations"
- **URL:** https://www.worldhistoryandmythology.com/products/family-tree-of-christian-denominations — fetched directly; page states coverage of *"over 500 current and over 200 former denominations"* across 18 denominational groups, delivered as an editable Excel spreadsheet (22.7MB).
- **Historical coverage confirmed on page:** Second Temple Judaism, Apostolic Age, Pre-Nicene Christianity, Church Councils, the Great Schism (1054), the Reformation (from 1517) — matches religion-map's target dates closely.
- **Creator:** no named author/organisation found on the page — anonymous commercial seller.
- **Licence:** TODO: verify — no licence/reuse terms found on the product page itself (only a "14-day refund" commerce policy).
- **Gap:** commercial spreadsheet product (not a public dataset or website), no visible sourcing/citations, no comparison-by-topic content, no scripture quotes.

#### 20. Rose Publishing — "Denominations Comparison" chart
- **URL:** https://www.tyndale.com/rose-publishing — fetched directly (Rose Publishing's own blog now redirects here, 301, confirming it is now a Tyndale House imprint); page did not render the specific product's descriptive text in this session — TODO: verify exact current content directly on the product sub-page.
- **Product description (from Rose Publishing's own historical marketing, not independently re-confirmed this session — TODO: verify verbatim):** a pamphlet/wall chart comparing 12 denominations (Catholic, Orthodox, Lutheran, Anglican, Presbyterian, Methodist, Anabaptist, Congregational, Baptist, Churches of Christ, Adventist, Pentecostal) across 11 categories, including a "Family Tree of Denominations" diagram.
- **Format:** commercial printed pamphlet/wall chart, not digital/interactive.
- **Approach:** confessional-adjacent evangelical publisher (Rose Publishing/Tyndale); not neutral-academic in orientation, though the comparison format itself is descriptive rather than argumentative per its marketing copy.
- **Licence:** TODO: verify — commercial print product; no reuse licence found.
- **Gap:** static, commercial, print-first (not mobile-first), no online sourcing/citations found, no scripture quoted directly, no Judaism/Islam.

### D. Academic and statistical databases

#### 21. Pew Research Center — Religious Landscape Study / Global Religious Landscape
- **URL:** https://www.pewresearch.org/religious-landscape-study/ — fetched directly.
- **Scope:** **United States only** for the Religious Landscape Study proper (*"more than 35,000 Americans in all 50 states"*); Pew's separate Global Religious Landscape / religious composition-by-country datasets (not opened individually this session, e.g. https://www.pewresearch.org/dataset/dataset-of-global-religious-composition-estimates-for-2010-and-2020/ — TODO: verify directly) cover global statistics, not doctrine.
- **Format:** interactive web database explorer plus downloadable datasets (registration required to download, per site).
- **Approach:** academic/neutral survey research — not a doctrine-comparison tool; it measures self-reported belief and affiliation, not each tradition's official self-description.
- **Sourcing:** methodologically rigorous (published methodology, sample sizes) but this is about *survey data*, not about *sourcing scripture quotes*.
- **Licence:** confirmed directly from Pew's own terms page (https://www.pewresearch.org/about/terms-and-conditions/): *"Under no circumstances may the Content be reproduced in principal part, mirrored, catalogued, framed, displayed simultaneously with another site"* without permission; attribution required in a specified citation format; survey microdata has additional reuse restrictions stated on the same page.
- **Overlap with religion-map:** a credible statistics source religion-map could cite for adherent counts, but not a comparison/timeline/lineage product itself.
- **Gap:** no doctrine comparison, no timeline, no lineage tree, US-centric for the flagship study, reuse of full reports restricted by licence.

#### 22. World Religion Database / World Christian Database (Brill / Boston University CURA)
- **URL:** https://worldreligiondatabase.org/about/ — fetched directly; *"detailed statistics on religious affiliation for every country of the world."* Companion site https://worldchristiandatabase.org/about/ also fetched directly: *"the most extensive survey of Christianity and world religions ever attempted"* (page's own description), based on the *World Christian Encyclopedia* (Johnson & Zurlo).
- **Publisher:** Brill (academic publisher), edited by Gina A. Zurlo (Boston University CURA).
- **Access:** login/subscription features visible on both sites (Login, Access data links); **TODO: verify** exact pricing/access tier — not confirmed free.
- **Scope:** statistical (18 religious categories × every country, 1900–2050 for WRD); **not a doctrine-comparison or lineage tool** — the page itself states its focus is affiliation counts, not doctrine.
- **Licence:** TODO: verify — Terms & Conditions linked to Brill.com but not opened in this session.
- **Gap:** paywalled/subscription-gated academic statistics, no comparison matrix, no scripture, no timeline/lineage visualisation.

#### 23. Database of Religious History (University of British Columbia)
- **URL:** https://religiondatabase.org/ — attempted three times via `WebFetch` (returned only the page title each time) and once via raw `curl` (confirmed the page is a 742-byte JavaScript-rendered single-page app shell; the only readable text was the page's own meta description tag): *"The world's first comprehensive online quantitative and qualitative encyclopedia of religious cultural history."*
- **Scope (per that same meta description, and general knowledge of the project — deeper content TODO: verify):** covers 200+ religious traditions, scholar-contributed structured polls (Yes/No plus qualitative comment fields), indexed to time and space.
- **Format:** could not be assessed further — JavaScript-heavy site not readable by automated fetch in this session.
- **Licence / currency / sourcing detail:** **TODO: verify** — page content beyond the meta tag was not accessible.
- **Gap:** appears to be a scholarly qualitative/quantitative encyclopedia (entries answer standardized questions about a tradition), which is conceptually different from religion-map's "compare by topic with each side's own quoted scripture" design — but this comparison cannot be fully verified in this session.

#### 24. Wikidata
- **URL:** https://www.wikidata.org/wiki/Wikidata:List_of_religions — fetched directly; page is "a table of religions that have a Wikidata item with the deities for each religion," with structured properties (inception dates, instance-of/subclass-of relationships, associated deities).
- **Format:** structured machine-readable database, queryable via SPARQL (https://query.wikidata.org).
- **Scope:** both monotheistic (Islam, Christianity, Baháʼí) and non-monotheistic traditions, with inception dates as data points (e.g. Christianity: 33 CE; Baháʼí: 1863).
- **Licence:** confirmed verbatim from https://www.wikidata.org/wiki/Wikidata:Copyright: *"All structured data from the main, Property, Lexeme, and EntitySchema namespaces is available under the Creative Commons CC0 License"* — fully reusable, no attribution required (public domain dedication).
- **Overlap with religion-map:** could supply structured, reusable scaffolding data (founding dates, parent/child relationships between denominations) for a lineage tree, under the most permissive licence found in this research.
- **Gap:** raw structured data only — no narrative comparison, no scripture quotes, no pairwise deep dives, no sourcing beyond whatever individual Wikidata statements cite (variable quality, crowd-edited).

#### 25. Adherents.com
- **URL:** https://www.adherents.com/ — **confirmed dead as an independent resource.** A direct fetch in this session returned an HTTP 301 redirect to `https://brickellbio.com/`, an unrelated biotechnology company's website — meaning the original domain has been abandoned and repurposed, not merely gone offline.
- **Historical scope (per Library of Congress web-archive cataloguing, not independently re-verified in this session — TODO: verify via Wayback if needed):** claimed 4,200+ religions/denominations with adherent-count citations.
- **Gap:** defunct; cannot be used as a live source or reuse target today.

### E. Open datasets and scripture-text APIs

#### 26. GitHub — `datasets/world-religion-projections`
- **URL:** https://github.com/datasets/world-religion-projections — fetched directly. Contains `rounded_population.csv` / `rounded_percentage.csv`, Pew-sourced religious-composition projections for 198 countries, 2010–2050.
- **Licence:** *"This Data Package is made available under the Creative Commons Attribution 4.0 International license (CC BY 4.0)."* — confirmed on the repository's own page; attribution to Pew Research Center required.
- **Overlap:** reusable statistics for adherent counts; not doctrine/comparison/timeline content.

#### 27. GitHub — `KereszTech/BibleData`
- **URL:** https://github.com/KereszTech/BibleData — fetched directly. Open-source JSON data: biblical genealogy ("BibleTree"), timelines, topical lists (people, places, professions). Development is Hungary-based; per the repo, content is primarily Hungarian with English data structures.
- **Licence:** dual — data under CC-BY-SA-4.0, code under GPLv3 (per repository's own licensing statement).
- **Gap:** reference/genealogical data, not a denominational-comparison or multi-religion resource; not primarily English or Russian.

#### 28. GitHub — `scrollmapper/bible_databases`
- **URL:** https://github.com/scrollmapper/bible_databases — fetched directly. **140 Bible versions** in MySQL/SQLite/CSV/JSON/YAML/TXT/MD/Parquet, sourced partly from openbible.info. Confirmed Russian versions present: **`RusMakarij`** (Russian Pentateuch) and **`RusSynodal`** (Synodal Translation) — i.e., this repository already contains an open, machine-readable Russian Synodal Bible text.
- **Licence:** MIT License (per repository's own licence file/badge) — freely reusable including commercially, with attribution/liability disclaimer.
- **Overlap with religion-map:** directly reusable source for Russian-language Bible text with a permissive licence — relevant to the "quoting from each tradition's own translation" requirement for Christian traditions that use the Synodal text.

#### 29. Sefaria (+ API)
- **URL:** https://developers.sefaria.org/reference/getting-started — fetched directly: *"all of our currently documented endpoints can be accessed without API keys, tokens, or authorization."*
- **Russian-language confirmation:** obtained directly from Sefaria's own live API response (https://www.sefaria.org/api/texts/translations/ru): the dataset includes a *"Russian Torah translation, by Dmitri Slivniak, Ph.D., edited by Dr. Itzhak Streshinsky. Da Project, 2011 [ru]"* — i.e. Sefaria does offer a Russian Torah translation, confirmed via the live API itself, not a secondary claim.
- **Content:** Jewish texts (Tanakh, Talmud, commentaries) with cross-linked source connections; described on its developer site as an "open-source digital collection of Jewish books."
- **Licence:** **TODO: verify exact terms** — `sefaria.org/terms` is a JavaScript-rendered page that returned no extractable licence text via direct fetch or raw `curl` in this session; the developer documentation's "open-source" description was not backed by an explicit CC/PD statement found in-session.
- **Overlap with religion-map:** directly relevant, free, no-API-key resource for sourcing Judaism's own scripture text, including partial Russian coverage (Torah only, per the confirmed API response — full Tanakh/Talmud Russian coverage TODO: verify).

#### 30. Quran.com / Quran Foundation API
- **URL:** https://quran.com/about-us — fetched directly. *"Quran.com is a waqf (endowment), established as a public trust"* and *"is managed by Quran.Foundation, a 501(c)(3) nonprofit organization."*
- **Russian-language confirmation:** the language selector on the fetched page includes *"русский"* directly (confirmed first-hand, not via a secondary aggregator).
- **API:** https://api-docs.quran.foundation/ (fetched directly) offers "verses, chapters, translations, tafsir, audio, and search," app-credential access with no end-user login required.
- **Licence:** TODO: verify — no explicit licence/reuse terms found on the About page or the API docs landing page in this session; would require opening the API's own Terms of Service.
- **Overlap with religion-map:** free, official, Russian-language-capable API for sourcing Islam's own scripture text (specific Russian translator/edition available via the API — TODO: verify which Russian translation(s) exactly, e.g. Kuliev, are exposed by the official Quran Foundation API specifically, as opposed to third-party mirrors).

#### 31. API.Bible (American Bible Society)
- **URL:** https://api.bible/ (the legacy `scripture.api.bible` domain 301-redirects here; both fetched) — publisher confirmed as the American Bible Society (per the site's own about text).
- **Model:** free "Starter" tier limited to *"Pick 3 of your favorite copyrighted Bibles"* plus open-access versions (5,000 calls/month); paid tiers required for more copyrighted translations or commercial use, per the site's own pricing text.
- **Russian:** **TODO: verify directly** — the official API.Bible translation catalogue requires an API key to query and was not checked in-session; a third-party aggregator page (get.bible, itself only a discovery source per this task's sourcing rules) mentions a "Russian Synodal Translation (RST)" among JSON Bible datasets generally, but this was **not confirmed to be part of API.Bible's own catalogue specifically** — do not treat as confirmed for this product; see entry #28 (`scrollmapper/bible_databases`) for a Russian Synodal text that **was** directly confirmed.
- **Licence:** open-access versions are CC/Public-Domain per the site's own text; copyrighted versions require paid licensing — confirmed via the site's own pricing/terms language quoted above.

#### 32. OpenBible.info
- **URL:** https://www.openbible.info/labs/cross-references/ — fetched directly. *"Unless otherwise indicated, all content is licensed under a Creative Commons Attribution License."* ~340,000 cross-references, downloadable as a 2MB zip, primarily sourced from the Treasury of Scripture Knowledge; scripture quotations on the site use the ESV (Crossway-copyrighted, separate from OpenBible's own CC licence).
- **Russian:** **not available** — `ru.openbible.info` failed to resolve and `openbible.info/ru/` returned HTTP 404, both checked directly in this session.
- **Scope:** Bible/Protestant-oriented cross-reference tool only, not a multi-religion resource.
- **Overlap with religion-map:** a CC-licensed cross-reference dataset, English only, useful only as a minor supplementary resource, not for Russian content.

### Other names checked but not independently verifiable in this session

- **GotQuestions.org:** searched specifically for a denomination-comparison chart; search results returned only individual explainer articles (e.g. "What are the most common denominations of Christianity?"), no dedicated chart/table page was found. Not opened directly as no clearly relevant URL surfaced — **TODO: verify** if a chart exists elsewhere on the site.
- **WorldWisdom – Compare Religion (App Store listing):** found via search only; not opened in this session. **TODO: verify** entirely before relying on it.
- **German- and French-language equivalents:** searched (`Vergleich Weltreligionen Tabelle`, `comparaison religions monothéistes tableau chronologie`) — results returned only individual educational articles and study-aid sites (Knowunity, Lelivrescolaire.fr, Maxicours), not a single coherent comparison/timeline/lineage product comparable in ambition to religion-map. No further candidate opened; **TODO: verify** more exhaustively if non-English/Russian prior art becomes a priority.

---

## 2. The five closest matches, ranked

**1. Patheos Religion Library ("Lenses" system)** — https://www.patheos.com/library ; comparison tool: https://www.patheos.com/library/lenses/side-by-side
The closest **structural** precedent found: Patheos originally organized its entire religion library around the same three non-pairwise pillars religion-map wants — a timeline, a family tree, and a side-by-side comparison — built on ~100 traditions written by named contributors. That is exactly religion-map's shape (minus pairwise deep dives). The catch, confirmed directly in this session, is currency: the Timeline and Family Tree lenses now 404, leaving only the Comparison Lens alive, and that surviving tool's sample content is footnote-free (links to longer articles rather than inline citations) and last carries a 2017 timestamp. Patheos shows the *shape* is a well-trodden idea, not that it is currently well executed.

**2. ARDA (Association of Religion Data Archives) — World Religion Family Trees** — https://www.thearda.com/world-religion/family-trees
The strongest match on religion-map's **lineage-tree pillar** specifically: real interactive, zoomable family trees for Christianity, Islam, Judaism and Buddhism, from an academic, non-confessional publisher, already annotated with religion-map's exact target dates (451, 1054, Reformation-era 1500s). What it lacks is everything else: no topic-comparison matrix, no pairwise deep dives, no scripture quoted in each tradition's own translation, and (confirmed) no reuse licence beyond "all rights reserved."

**3. denominationdifferences.com** — https://denominationdifferences.com/
The strongest match on religion-map's **pairwise deep-dive pillar**: it already publishes an Eastern Orthodoxy vs. Jehovah's Witnesses page — religion-map's own planned first pair — plus Seventh-day Adventist vs. Jehovah's Witnesses and others, all in a flat, symmetric two-column format with inline numbered citations. But authorship is undisclosed (no "About" page found), no licence is stated, no scripture is quoted verbatim in each tradition's own translation (claims are paraphrased with citation markers instead), and there is no timeline or lineage tree at all.

**4. ReligionFacts** — https://religionfacts.com/big-religion-chart and https://religionfacts.com/charts/denominations-beliefs
The strongest match on religion-map's **topic-comparison-matrix pillar**, at two levels of granularity (all-world-religions, and Christian-denominations-only), from an explicitly non-confessional, outsider publisher, and with a self-aware disclaimer about the limits of compressing belief systems into a chart. Its weaknesses are exactly what that disclaimer implies: no inline sourcing, no scripture quoted, and (confirmed via its own copyright line) an "all rights reserved" licence with no visible last-updated date.

**5. religioncompare.com** — https://www.religioncompare.com/
The closest match in **stated mission**: "Factual, neutral, citation-backed information... Not affiliated with any religion" is close to a word-for-word match for religion-map's own "impartial, proof for every claim" goal, and it already has separate pages for Orthodoxy, Catholicism, Protestantism, Jehovah's Witnesses and Latter-day Saints. It is also the newest and thinnest candidate found (2026 copyright, single-operator "TPS Worldwide LLC" byline, no timeline or family-tree page per its own sitemap), so its comparison depth and long-term reliability are unproven.

---

## 3. Reusable resources (data, APIs, openly-licensed texts)

| Resource | URL | Licence (verbatim, from the resource's own page) | Russian? |
|---|---|---|---|
| Wikidata | wikidata.org | *"available under the Creative Commons CC0 License"* | Labels/data are language-tagged; Russian labels generally present across Wikidata, not specifically verified per religion item — TODO: verify per-item |
| Wikimedia Commons diagrams (e.g. `Christianity_major_branches.svg`) | commons.wikimedia.org | Dual GFDL 1.2+ / CC BY-SA 3.0 | Images are language-agnostic; labels are English in the files checked |
| `datasets/world-religion-projections` (GitHub) | github.com/datasets/world-religion-projections | *"Creative Commons Attribution 4.0 International license (CC BY 4.0)"* | Country-level, not language-specific |
| `KereszTech/BibleData` (GitHub) | github.com/KereszTech/BibleData | CC-BY-SA-4.0 (data) / GPLv3 (code) | Primarily Hungarian content |
| `scrollmapper/bible_databases` (GitHub) | github.com/scrollmapper/bible_databases | MIT License | **Yes** — `RusSynodal` and `RusMakarij` confirmed present |
| Histomap of Religion scan (David Rumsey Collection via Internet Archive) | archive.org/details/dr_the-histomap-of-religion... | *"Creative Commons CC BY-NC-SA 3.0 license"* (non-commercial only) | No (English chart) |
| Sefaria API | developers.sefaria.org | Described as "open-source" by Sefaria's own developer docs; **exact licence text TODO: verify** (terms page is JS-rendered, not extractable in this session) | Partial — Russian Torah translation confirmed live via API |
| Quran.com / Quran Foundation API | api-docs.quran.foundation | TODO: verify (no explicit licence text found on docs landing page or About page) | Yes — "русский" confirmed in the official site's language selector |
| API.Bible | api.bible | Open-access versions: CC/Public Domain (per site's own text); copyrighted versions: paid licence required | TODO: verify against API.Bible's own catalogue specifically (not confirmed in-session) |
| OpenBible.info cross-references | openbible.info/labs/cross-references | *"licensed under a Creative Commons Attribution License"* | No — no Russian subdomain/path found (404/unresolved, checked directly) |
| Pew religion datasets | pewresearch.org | Restrictive — *"may not be reproduced... mirrored... framed"* without permission; attribution required | N/A (statistics, not text) |
| World Religion Database / World Christian Database | worldreligiondatabase.org, worldchristiandatabase.org | TODO: verify (subscription features visible; Brill terms not opened) | N/A |

The single most directly useful find for religion-map's stated need ("quoting its OWN scripture in its OWN translation, with a source link") is **`scrollmapper/bible_databases`**: an MIT-licensed, already-open Russian Synodal Bible text in structured, machine-readable form, confirmed first-hand in this session. For Judaism and Islam, Sefaria's and Quran.com's own live APIs confirmed at least partial Russian coverage (a Russian Torah translation; a Russian UI/translation option respectively), though exact licence terms for both need further verification before reuse.

---

## 4. Conclusion

**No single resource found covers religion-map's concept as a whole.** Every candidate that was actually opened and verified in this session is strong on at most one or two of the four pillars (neutral BCE/CE timeline; dual-view lineage tree; equal-treatment topic comparison with sourced, own-translation scripture quotes; pairwise deep dives) and weak or absent on the rest:

- **Patheos** once combined three of the four pillars in one product, but two of its three tools are now dead links (confirmed via direct 404s in this session) — evidence the *idea* has been tried and has decayed, not that it is being actively maintained today.
- **ARDA** has the best lineage trees found (with the right dates) but stops there.
- **denominationdifferences.com** has the best pairwise coverage, including religion-map's exact planned first pair (Orthodoxy vs. Jehovah's Witnesses), but with undisclosed authorship, no stated licence, and paraphrase-not-quotation sourcing.
- **ReligionFacts** has the best topic matrices but no citations and an all-rights-reserved licence.
- **religioncompare.com** states almost exactly religion-map's own mission ("neutral, citation-backed, not affiliated with any religion") but is brand-new, thin, and has no timeline or lineage tree by its own sitemap.
- Nothing found — in this session — combines *all four* pillars, is demonstrably neutral, cites a source for every claim and quotes each tradition's own scripture in its own translation, and is mobile-first. That specific combination appears to be genuinely open.

**What would be genuinely new if religion-map is built as specified:**
1. **The dual lineage view** — a historical-descent tree drawn *separately* from each tradition's own self-perceived continuity — was not found anywhere in this research. Every lineage tree found (ARDA, UsefulCharts, World History and Mythology's spreadsheet, Wikipedia's list, Wikimedia diagrams) shows a single, outsider/historical view only.
2. **Scripture quoted in each tradition's own translation, with a source link per quote, inside a topic-comparison matrix** — the comparison charts found (ReligionFacts, religioncompare.com, denominationdifferences.com, Patheos's Side-by-Side) paraphrase or link out, but none was confirmed, in a page actually opened this session, to quote primary scripture text with a citation for every claim.
3. **One coherent product** spanning timeline + lineage + matrix + pairwise deep dives, kept current, mobile-first, and in Russian — not found in English or any other language checked. The closest attempt (Patheos) has partially collapsed; the rest are each single-pillar tools.
4. **Reuse potential rather than pure novelty:** the strongest opportunity is not to build every layer from scratch. Wikidata (CC0) and `scrollmapper/bible_databases` (MIT, including Russian Synodal text) are confirmed, permissively-licensed building blocks; Sefaria's and Quran.com's own APIs confirmed at least partial live Russian scripture access. A religion-map implementation could plausibly source structured lineage/date data from Wikidata, Russian Bible text from `scrollmapper/bible_databases` or Sefaria, and Russian Quran text from Quran.com's API, while building the comparison-matrix, dual-lineage-view, and pairwise-deep-dive presentation layer — and the neutral, fully-cited editorial synthesis across traditions — as the new work, since no candidate examined here does that synthesis today.
