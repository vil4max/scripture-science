# Source policy

The site promises one picture of the religious world with proof for every claim,
and its sources must be reliable and verified. A reader must be able to check any
statement through the Sources tab, grouped by tradition and topic. Reading
pages contain no numbered citation markers or repeated bibliographies (owner,
2026-09-26). Evidence remains attached to claims in data; demographic dates
and counting methods are displayed in the Sources tab beside the figures.

## Source tiers

1. **Official.** A tradition's own authoritative body or text, for how that
   tradition describes itself: catechisms, confessions, statements of belief,
   official scripture sites. For legal facts: primary legal documents — court
   decisions, laws on official portals, government registers, judgments of
   international courts.
2. **Reference.** Neutral scholarship and statistics: Pew Research Center,
   Encyclopaedia Britannica, peer-reviewed and university sources.
3. **News/NGO.** Reputable media and monitoring organisations, used only when no
   official or reference source states the fact, and labelled as such.

Wikipedia may be cited as a reference source when no official or scholarly
page states the fact (owner, 2026-09-26; `docs/DECISIONS.md`): the specific
article is named as Wikipedia in the title, with a verbatim excerpt of at most
25 words and the access date, like any other source. Prefer the primary or
scholarly source it cites when that can be opened.

Not a source: other aggregators, blogs, forums, anonymous pages, AI-generated
text, and polemical works as the description of the tradition they criticise.
Polemic may appear only as an attributed "how others critique it" line.

## Which source for which claim

| Claim | Required source |
|---|---|
| A tradition's belief or practice | That tradition's own official source |
| Scripture quote | The tradition's own translation, per-verse URL of its official or canonical online text |
| Adherent numbers, volumes, counts | Official or reference source, with year and counting method |
| History and dates | Reference source; a tradition's own dating is labelled as its own |
| Legal status | Primary legal documents, plus the affected party's own statement and, where it exists, an international court's judgment |

## What "verified" means

A claim is verified only when all of these hold:

1. The source page was opened and contains a verbatim excerpt of at most 25
   words that supports the claim; the excerpt is stored with the claim.
2. The URL, the access date and the tier are stored with the claim.
3. An archived copy is linked when one exists, or the source is a stable
   official document.
4. The build check re-fetches every source and confirms the excerpt is still
   there; failures are reported, never hidden.

A claim that fails any of these carries `TODO: verify` in the data and is either
left out of the published site or visibly marked as unconfirmed; the editor
decides which, per claim. Research notes produced by agents are leads, not
verification: key claims are re-checked against the source before they reach
site data.
