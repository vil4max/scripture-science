# The site checked against «Homo religiosus» (M38, 2026-10-17)

Every descriptive claim (history, dates, names, texts, practice,
organisation) in the site texts that the book's chapters cover, checked
against the book: prot. Oleg Korytko, «Homo religiosus: на путях поиска
истины» (2017). Brief: `docs/tasks/site-m38-korytko-integration.md`.

- **Method.** Six read-only agents (Islam; Judaism; India; China and Japan;
  the ancient world; the glossary) read the chapters in full against the
  listed site files, under one rubric. Each verdict names a printed page;
  each `refined` or `contradicted` verdict rests on an exact excerpt from
  that page, checked by script against the owner's OCR copy (the owner
  chose the text; no page images).
- **Result.** 231 claims with a verdict: 185 confirmed, 42 refined,
  4 contradicted; 100 further claims are outside what the book covers
  (Christian traditions, Sikh sources, the Lion Man, Celtic and Germanic
  religion and others).
- **Doctrine.** A tradition's teaching on the site rests on its own texts;
  the book never overrides it. Where the book adds a nuance to a
  self-description, the nuance goes to the religion's fold «Подробнее по
  книге прот. Олега Корытко» as the author's account, not into the
  tradition's own column.

## Contradictions and their resolution

| Site text | Site says | Book says | Resolution |
|---|---|---|---|
| `other-traditions.json` (buddhism), `history-overview.json` (buddhism) | The Met: the age of the Buddha is the V–IV centuries до Р. Х. | 566–486 or 624–544 до н. э., «VI в.» elsewhere; the book itself says scholars disagree (pp. 601–602) | Site kept: an attributed scholarly overview; the book's years are not imported. |
| `other-traditions.json` (shinto) | Jinja Honcho: about 80 000 shrines, most of them in the association | about 100 000 shrines, 80 000 of them joined the association in 1946 (pp. 207, 214) | Site kept: the official current figure; the book's statistics are not used. |
| `lineage.json` (mesopotamian) | the line ended about 3100 до Р. Х. | the traditions passed on to Babylon and Assyria (p. 254) | **Site corrected**: the line now ends in 651, when, by the site's own source (World History Encyclopedia), the old faith gave way after the Muslim conquest; the book's p. 254 is a second proof. |

## Refinements and where they went

All refinements are on the site now, each with its excerpt, except where
noted.

- **Islam** (18): the Hijra era declared in 637 and counted from 16 July
  622; Uthman's commission of twelve; the 99 names; images (no direct ban in
  the Qur'an, a firm ban on sculpture, regional difference); Ramadan
  restrictions and exemptions; early Sufi asceticism and the middle path;
  the Shia hadith collections; who becomes imam; the shahada before
  witnesses; the meaning of «сунниты» and «шииты»; zakat on the harvest;
  Sufism also in the Volga and Ural regions — as points in
  `src/data/book-points/islam.json`. Not used: the Shia «three prayers»
  (p. 713: combined times; it needs the tradition's own source first),
  revelations «to one people» and the vision of Allah in Paradise
  (doctrine, the site's analysis cards cover it from Muslim sources), the
  suhuf of Ibrahim.
- **Judaism** (8): the Masoretes and the present form of the Tanakh; 248 and
  365 commandments; the festivals of the Torah and the later ones; scribes
  writing down the traditions before Christ; Pesach on 15 Nisan, seven or
  eight days; the differences between the currents; Hasidism in the first
  half of the XVIII century — as points in `book-points/judaism.json`. The
  spelling «Рош а-Шана» in `matrix/judaism.yaml` is now «Рош ха-Шана», as
  elsewhere on the site and in the book (p. 787).
- **India** (7): Hinduism's two sources and its lack of one teaching
  structure; Buddhism's origin in north-east India; Vardhamana as the
  founder of Jainism; Vaishnavism and Shaivism each holding its god
  supreme; the Tripitaka on palm leaves and in baskets — as points in
  `book-points/hinduism.json`, `buddhism.json`, `jainism.json`. Not used:
  Sikhism not accepting the Vedas (the book's one remark on Sikhism).
- **China and Japan** (5): kami venerated in home prayer; у-вэй as refusal
  of purposeful action, not inaction; Daoism's shamanic roots; the цзяо
  liturgy of the Taiwanese communities; the purpose of камидана — as points
  in `book-points/shinto.json` and `daoism.json`.
- **Ancient world** (4): Egyptian ritual texts calling a god «единый»; the
  pharaoh as the only priest; the Eleusinian mysteries until 392 — as points
  in `book-points/egyptian.json` and `greek.json`. Not used: an earlier start
  for Roman religion under Tarquinius Priscus (the chronicle keeps the
  documented −500).

## Every checked claim

`book-points/<id>.json` rows refer to the points the site took from the book
in M37 (then in `book-homo-religiosus.json`); their wording was checked again.

### Islam (гл. XXIII)

74 claims with a verdict (confirmed 56, refined 18); not covered: 15.

| Site text | Claim | Verdict | Book page |
|---|---|---|---|
| `matrix/islam.yaml:10` | хиджра 622 года — переселение в Медину — стала эпохой мусульманского (хиджри) календаря | refined | с. 675 |
| `matrix/islam.yaml:26` | по исламской традиции, Мухаммад получал откровения в 610–632 годах | confirmed | с. 680 |
| `matrix/islam.yaml:30` | Письменный свод закрепили при халифе Усмане около 650 года | refined | с. 686 |
| `matrix/islam.yaml:62` | Ибрахим почитается как ханиф, не бывший ни иудеем, ни христианином; Мухаммад — «печать пророков» | confirmed | с. 664 |
| `matrix/islam.yaml:77` | абсолютное единобожие (таухид): у Аллаха нет сотоварища, детей, равных | confirmed | с. 696 |
| `matrix/islam.yaml:110` | Бог описывается через «самые прекрасные имена» (аль-асма аль-хусна) | confirmed | с. 697 |
| `matrix/islam.yaml:138` | Иса — пророк и Мессия, рождённый Девой Марьям, не Бог; не распят | confirmed | с. 701 |
| `matrix/islam.yaml:199` | ислам признаёт прежние Писания — Таурат и Забур; любой перевод Корана — «перевод смыслов» | refined | с. 699 |
| `matrix/islam.yaml:237` | в суннитском исламе нет рукоположенного духовенства; четыре мазхаба; у шиитов после сокрытия имама следуют богословам | confirmed | с. 726 |
| `matrix/islam.yaml:333` | после смерти душа пребывает в промежуточном состоянии до воскресения; Суд; Рай или Ад | confirmed | с. 703 |
| `matrix/islam.yaml:361` | возвращение Исы как знамение Часа; у шиитов — двенадцатый имам в сокрытии | confirmed | с. 702 |
| `matrix/islam.yaml:414` | пять столпов: шахада, салят, закят, саум, хадж | confirmed | с. 710 |
| `matrix/islam.yaml:448` | вопрос об изображении живых существ остаётся предметом дискуссии | refined | с. 727 |
| `matrix/islam.yaml:472` | Ид аль-Фитр завершает Рамадан; Ид аль-Адха связан с повелением Ибрахиму принести в жертву Исмаила | confirmed | с. 722 |
| `matrix/islam.yaml:496` | пост от рассвета до заката от пищи, питья и близости; послабления больным, путникам, пожилым | confirmed | с. 717 |
| `matrix/islam.yaml:599` | нет централизованного духовенства; авторитет у улемов четырёх мазхабов; у шиитов — имамы, затем богословы | confirmed | с. 713 |
| `matrix/islam.yaml:653` | запрещены мертвечина, кровь, свинина, мясо без имени Бога, опьяняющие напитки и азартные игры | confirmed | с. 659 |
| `analyses/islam.yaml:60` | таухид — абсолютное единобожие; Коран отвергает «Троицу» и сыновство | confirmed | с. 696 |
| `analyses/islam.yaml:182` | в исламе Бог называется «самыми прекрасными именами» (7:180) | refined | с. 697 |
| `analyses/islam.yaml:203` | слово «Аллах» по-арабски означает «Бог» | confirmed | с. 661 |
| `analyses/islam.yaml:258` | Коран говорит о Святом Духе, которым был укреплён Иса (2:87) | confirmed | с. 657 |
| `analyses/islam.yaml:358` | Коран — заключительное откровение; ислам признаёт Таурат, Забур и Инджиль | refined | с. 699 |
| `analyses/islam.yaml:439` | Коран упрекает людей Писания в искажении; искажён текст или толкование — предмет мусульманского богословия | confirmed | с. 699 |
| `analyses/islam.yaml:516` | Мухаммад — «печать пророков», последний в пророческой цепи | confirmed | с. 659 |
| `analyses/islam.yaml:533` | Мухаммад родился через шесть веков после Боговоплощения | confirmed | с. 666 |
| `analyses/islam.yaml:606` | Иса — пророк и Мессия, рождённый Девой, Слово Аллаха, но не Бог | confirmed | с. 701 |
| `analyses/islam.yaml:718` | Коран отрицает смерть Исы на кресте; по одному из толкований распят другой | confirmed | с. 702 |
| `analyses/islam.yaml:1039` | вера в предопределение (кадар); суннитская «средняя» позиция | confirmed | с. 709 |
| `analyses/islam.yaml:1075` | в исламе нет единого ответа о свободе; джабриты и другие течения | confirmed | с. 708 |
| `analyses/islam.yaml:1144` | барзах до воскресения; справедливые Весы (21:47); Рай или Ад | confirmed | с. 703 |
| `analyses/islam.yaml:1166` | мусульманские толкователи по-разному понимают описания Рая; суфии — символически | refined | с. 705 |
| `analyses/islam.yaml:1226` | Иса спустится и будет действовать рядом с Махди; у шиитов Махди — скрытый имам | confirmed | с. 702 |
| `analyses/islam.yaml:1331` | пять столпов; хадж для тех, кто способен его совершить | confirmed | с. 719 |
| `analyses/islam.yaml:1412` | намаз — ежедневная пятикратная молитва; в разных школах нормы отличаются незначительно | refined | с. 713 |
| `analyses/islam.yaml:1488` | вопрос об изображении живых существ — предмет дискуссии; строгое мнение опирается на хадисы | refined | с. 728 |
| `analyses/islam.yaml:1574` | Коран чтит Марьям как избранную, сберегшую целомудрие; мольба — только к Богу | confirmed | с. 701 |
| `analyses/islam.yaml:1670` | Ид аль-Фитр и Ид аль-Адха; шииты справляют траур по имаму Хусейну в Мухаррам | confirmed | с. 722 |
| `analyses/islam.yaml:1700` | в исламском предании о жертве речь идёт об Исмаиле | confirmed | с. 657 |
| `analyses/islam.yaml:1796` | в Рамадан от рассвета до заката воздерживаются от пищи, питья и близости; послабления | refined | с. 717 |
| `analyses/islam.yaml:1912` | суфизм иногда сравнивают с монашеством, но большинство орденов не призывает к безбрачию | refined | с. 731 |
| `analyses/islam.yaml:2009` | Коран запрещает мертвечину, кровь, свинину, вино и азартные игры | confirmed | с. 659 |
| `analyses/islam.yaml:2076` | «Нет принуждения в религии» (2:256) | confirmed | с. 701 |
| `analyses/islam.yaml:2139` | Коран разрешает до четырёх жён при справедливости; дозволены женщины из людей Писания | confirmed | с. 726 |
| `analyses/islam.yaml:2204` | сунниты опираются на сунну и улемов четырёх школ; шииты-имамиты — на имама и предание двенадцати имамов | refined | с. 694 |
| `analyses/islam.yaml:2291` | нет рукоположенного духовенства; у шиитов в отсутствие имама следуют богословам | confirmed | с. 713 |
| `extra-questions.yaml:145` | Коран чтит Марьям как избранную деву, мать Исы | confirmed | с. 701 |
| `extra-questions.yaml:473` | Аллах даровал Давуду Забур (Псалтирь) | confirmed | с. 699 |
| `extra-questions.yaml:861` | пять намазов из двух–четырёх ракаатов, омовение, лицом к Каабе; имам ведёт; пятничная хутба | confirmed | с. 715 |
| `extra-questions.yaml:1634` | намаз можно совершать там, где застало время; личная мольба (дуа) | confirmed | с. 713 |
| `extra-questions.yaml:2122` | пять намазов; пятничная молитва; Рамадан; Ураза-байрам; Курбан-байрам | confirmed | с. 722 |
| `extra-questions.yaml:2710` | намаз — арабские формулы, такбир, Фатиха; дуа на любом языке | confirmed | с. 712 |
| `extra-questions.yaml:3238` | нет духовенства через таинство; имам — лишь предстоятель на молитве; верующие образуют умму | refined | с. 714 |
| `extra-questions.yaml:3756` | в ислам входят, произнеся шахаду | refined | с. 697 |
| `views-of-others.yaml:291` | Коран обещает воздаяние верующим из иудеев, христиан и сабиев (2:62) | confirmed | с. 701 |
| `views-of-others.yaml:324` | Коран говорит о группе людей Писания, искажающей Писание | confirmed | с. 699 |
| `disputes.yaml:244` | строгое мнение опирается на хадисы с запретом изображений; практика различается | confirmed | с. 728 |
| `disputes.yaml:470` | Коран: «не говорите: „Троица!“» | confirmed | с. 701 |
| `disputes.yaml:688` | Коран называет Ису посланником, Словом и духом от Аллаха, но не Богом | confirmed | с. 701 |
| `history-overview.json:252` | Ислам возник в Мекке и Медине в VII веке | confirmed | с. 653 |
| `history-overview.json:525` | суннизм: община, признавшая Абу Бакра преемником | refined | с. 740 |
| `history-overview.json:543` | шиизм: сторонники Али; гибель Хусейна в 680 году | refined | с. 741 |
| `lineage.json:606` | 610 г. · первое откровение в пещере Хира | confirmed | с. 669 |
| `lineage.json:638` | 632 г. · избрание Абу Бакра халифом | confirmed | с. 679 |
| `lineage.json:658` | 632 г. · утверждение права Али на руководство общиной | confirmed | с. 741 |
| `lineage.json:670` | битва при Кербеле, 680 г. | confirmed | с. 717 |
| `lineage.json:1113` | ислам описывает себя как завершение и восстановление единобожия (Коран 5:3) | confirmed | с. 679 |
| `book-points/islam.json` | Кааба с около 360 идолами всех племён | confirmed | с. 660 |
| `book-points/islam.json` | первая попытка записать Коран целиком — Абу Бакр | confirmed | с. 684 |
| `book-points/islam.json` | «золотой век» хадисоведения VIII–IX веков, «шесть сводов» | confirmed | с. 693 |
| `book-points/islam.json` | закят — ежегодный сбор, 1/40 стоимости имущества | refined | с. 716 |
| `book-points/islam.json` | ихрам: две белые ткани и вслух произнесённое намерение | confirmed | с. 720 |
| `book-points/islam.json` | тарика — ответвление от «магистральной дороги» шариата | confirmed | с. 732 |
| `book-points/islam.json` | суфизм в России на Северном Кавказе | refined | с. 740 |
| `book-points/islam.json` | могилы имамов — места паломничества шиитов | confirmed | с. 741 |

### Judaism (гл. XXIV)

56 claims with a verdict (confirmed 48, refined 8); not covered: 51.

| Site text | Claim | Verdict | Book page |
|---|---|---|---|
| `matrix/judaism.yaml:4` | три течения: ортодоксальное, консервативное (масорти), реформистское | confirmed | с. 791 |
| `matrix/judaism.yaml:25` | Танах по составу — канонические книги православного Ветхого Завета | confirmed | с. 772 |
| `matrix/judaism.yaml:26` | неканонических книг в Танахе нет | confirmed | с. 772 |
| `matrix/judaism.yaml:35` | Танах: Тора, Пророки и Писания; складывался в X–II веках до Р. Х. | refined | с. 774 |
| `matrix/judaism.yaml:82` | Письменная Тора и Устная Тора | confirmed | с. 775 |
| `matrix/judaism.yaml:97` | строгий монотеизм: единственный Творец | confirmed | с. 778 |
| `matrix/judaism.yaml:153` | ожидает ещё не пришедшего Машиаха; Иисуса Мессией не признаёт | confirmed | с. 779 |
| `matrix/judaism.yaml:221` | Танах — аббревиатура: Тора (Пятикнижие), Невиим, Ктувим | confirmed | с. 772 |
| `matrix/judaism.yaml:245` | Письменную Тору дополняет Устная Тора в Талмуде; консерваторы держатся галахи | confirmed | с. 759 |
| `matrix/judaism.yaml:289` | путь — жизнь по Торе и заповедям, не спасение одной верой | confirmed | с. 755 |
| `matrix/judaism.yaml:292` | реформисты ставят этическое выше обрядового | confirmed | с. 798 |
| `matrix/judaism.yaml:394` | из 613 заповедей около пятидесяти касаются законов питания | refined | с. 775 |
| `matrix/judaism.yaml:457` | цикл: Шаббат, Рош ха-Шана и Йом Кипур, три паломнических праздника, Ханука, Пурим | refined | с. 786 |
| `matrix/judaism.yaml:476` | главный пост — Йом Кипур | confirmed | с. 787 |
| `matrix/judaism.yaml:584` | нет единого духовенства; раввин — учитель и галахический авторитет | confirmed | с. 763 |
| `matrix/judaism.yaml:608` | кашрут — законы дозволенной и недозволенной пищи | confirmed | с. 782 |
| `matrix/judaism.yaml:611` | кашрут обязателен у ортодоксов, многие реформисты от него отказались | confirmed | с. 783 |
| `analyses/judaism.yaml:70` | Танах: Тора (Пятикнижие), Невиим, Ктувим | confirmed | с. 772 |
| `analyses/judaism.yaml:149` | строгий монотеизм, Троицу не принимает | confirmed | с. 778 |
| `analyses/judaism.yaml:405` | ждёт Машиаха; Храм; приведёт к Богу все народы; Иисуса не признают | confirmed | с. 779 |
| `analyses/judaism.yaml:519` | Иисуса не признают ни Мессией, ни божеством | confirmed | с. 753 |
| `analyses/judaism.yaml:605` | Устная Тора, отражённая в Талмуде, передаётся по преданию от Моисея | refined | с. 759 |
| `analyses/judaism.yaml:704` | из 613 заповедей около пятидесяти посвящены пище | refined | с. 775 |
| `analyses/judaism.yaml:800` | кашрут — законы дозволенной пищи; многие реформисты отказались | confirmed | с. 782 |
| `analyses/judaism.yaml:957` | причина греха не в природе человека | confirmed | с. 755 |
| `analyses/judaism.yaml:1038` | путь — жизнь по Торе и заповедям | confirmed | с. 755 |
| `analyses/judaism.yaml:1117` | после разрушения Храма жертвоприношения не совершаются | confirmed | с. 763 |
| `analyses/judaism.yaml:1302` | Шаббат — седьмой день, работа запрещена | confirmed | с. 781 |
| `analyses/judaism.yaml:1398` | Песах — праздник в память об Исходе из Египта | refined | с. 786 |
| `analyses/judaism.yaml:1529` | главный пост — Йом Кипур, 10 тишрея; покаяние | confirmed | с. 787 |
| `analyses/judaism.yaml:1670` | иудаизм не поощряет аскетизм | confirmed | с. 794 |
| `analyses/judaism.yaml:2025` | ведёт историю от завета с Авраамом и Синая | confirmed | с. 779 |
| `analyses/judaism.yaml:2143` | нет единого духовенства; раввин — учитель и галахический авторитет | confirmed | с. 763 |
| `analyses/judaism.yaml:2188` | иудаизм не един: три течения | confirmed | с. 791 |
| `analyses/judaism.yaml:2191` | современный иудаизм неоднороден; общие черты: монотеизм, Завет, ожидание Мессии | refined | с. 778 |
| `analyses/judaism.yaml:2204` | ортодоксы, консерваторы (масорти), реформисты по-разному относятся к традиции | confirmed | с. 800 |
| `extra-questions.yaml:50` | иудаизм не признаёт Иисуса Мессией | confirmed | с. 753 |
| `extra-questions.yaml:413` | Книга Псалмов (Теилим) — часть еврейской Библии | confirmed | с. 774 |
| `extra-questions.yaml:706` | после разрушения Храма жертвы не приносят; Тору читают в синагоге в праздники и в субботу | confirmed | с. 786 |
| `extra-questions.yaml:1494` | цицит; талит перед утренней молитвой; тфилин в будни | confirmed | с. 786 |
| `extra-questions.yaml:1982` | главные праздники: Песах, Шавуот, Суккот, Рош ха-Шана, Йом Кипур с постом | confirmed | с. 787 |
| `extra-questions.yaml:3128` | народ Израиля, избранный и связанный заветом; синагога — дом собрания | confirmed | с. 763 |
| `extra-questions.yaml:3636` | погружение в микву обязательно для обращающихся (гиюр) | confirmed | с. 780 |
| `views-of-others.yaml:3` | Мишне Тора — кодекс Маймонида (Рамбама), 1180 | confirmed | с. 777 |
| `disputes.yaml:656` | иудаизм не признаёт Иисуса ни Мессией, ни Богом | confirmed | с. 753 |
| `history-overview.json:167` | отдельная ветвь иудаизма после непринятия Христа Мессией | confirmed | с. 756 |
| `lineage.json:36` | раввинистическая ветвь с 70 года, школа в Явне | confirmed | с. 760 |
| `terms.yaml:208` | неканонических книг нет в еврейской Библии | confirmed | с. 772 |
| `terms.yaml:1172` | иудаизм — иноверие, его учение о Боге не совпадает с православным | confirmed | с. 753 |
| `book-points/judaism.json` | Мишна — 63 трактата, Йегуда га-Наси, начало III века | confirmed | с. 775 |
| `book-points/judaism.json` | Гемара: Иерусалимский Талмуд III–IV, Вавилонский III–VII века | confirmed | с. 776 |
| `book-points/judaism.json` | Шулхан арух Иосефа Каро (1488–1575) — главный учебник галахи | confirmed | с. 777 |
| `book-points/judaism.json` | обрезание на восьмой день и в светских семьях | confirmed | с. 780 |
| `book-points/judaism.json` | хасидизм возник в XVIII веке в Восточной Европе | refined | с. 764 |
| `book-points/judaism.json` | реформизм: Германия, первая половина XIX века, затем США; консервативный: XIX век | confirmed | с. 797 |
| `book-points/judaism.json` | каббала — не отдельное течение | confirmed | с. 801 |

### India: Hinduism, Buddhism, Jainism (гл. XIX–XXII)

38 claims with a verdict (confirmed 29, refined 7, contradicted 2); not covered: 7.

| Site text | Claim | Verdict | Book page |
|---|---|---|---|
| `other-traditions.json` (hinduism) | «Древняя Индия; нет единственного основателя» | confirmed | с. 527 |
| `other-traditions.json` (hinduism) | «Индуизм объединяет разные школы и формы почитания» | refined | с. 595 |
| `other-traditions.json` (hinduism) | общими ориентирами служат дхарма, карма и сансара | confirmed | с. 543 |
| `other-traditions.json` (hinduism) | сансара — круговорот рождений | confirmed | с. 543 |
| `other-traditions.json` (hinduism) | мокша — освобождение от сансары | confirmed | с. 544 |
| `other-traditions.json` (hinduism) | пути к освобождению и представления о Боге различаются между традициями | confirmed | с. 595 |
| `other-traditions.json` (buddhism) | происхождение «Индия» | refined | с. 599 |
| `other-traditions.json` (buddhism) | «обзор The Met относит эпоху Будды к V–IV векам до Р. Х.» | contradicted | с. 602 |
| `other-traditions.json` (buddhism) | Четыре благородные истины: страдание, его причина, прекращение и путь | confirmed | с. 608 |
| `other-traditions.json` (sikhism) | «Сикхизм — самостоятельная монотеистическая религия» | refined | с. 545 |
| `history-overview.json` (india) | «Индуизм складывался из разных источников и традиций: у него нет единственного основателя» | refined | с. 527 |
| `history-overview.json` (india) | «здесь нет одной даты, сопоставимой с датой регистрации современной религиозной организации» | confirmed | с. 531 |
| `history-overview.json` (india) | «Дата на шкале — приблизительный ориентир, а не момент основания» | confirmed | с. 532 |
| `history-overview.json` (jainism) | «традиция Древней Индии, связанная с учителем Махавирой» | refined | с. 545 |
| `history-overview.json` (jainism) | путь освобождения души от круговорота перерождений | confirmed | с. 545 |
| `history-overview.json` (buddhism) | period «V–IV века до Р. Х.»; «The Met помещает эпоху Будды в V–IV века до Р. Х.» | contradicted | с. 602 |
| `history-overview.json` (buddhism) | после его смерти развилась религия, распространившаяся далеко за пределы родины | confirmed | с. 600 |
| `history-overview.json` (buddhism) | обзорная датировка не задаёт точных лет его жизни | confirmed | с. 601 |
| `history-overview.json` (buddhism) | timelineText: учение распространилось далеко за пределы Индии; точные годы жизни Будды обсуждаются | confirmed | с. 601 |
| `lineage.json` (hinduism) | на шкале с −2000 (Britannica: texts and practices from the 2nd millennium BCE) | confirmed | с. 512 |
| `lineage.json` (buddhism) | на шкале с −563 (Britannica: c. 563–483 BCE) | confirmed | с. 602 |
| `lineage.json` (jainism) | на шкале с −700 (Britannica: 7th–5th century BCE) | confirmed | с. 564 |
| `book-points/hinduism.json` | индуизм вырос из брахманизма, вышедшего из борьбы с буддизмом иной религией | confirmed | с. 559 |
| `book-points/hinduism.json` | общая основа течений — почитание шрути и смрити | confirmed | с. 595 |
| `book-points/hinduism.json` | тримурти: Брахма, Вишну, Шива — создатель, хранитель, разрушитель | confirmed | с. 595 |
| `book-points/hinduism.json` | два крупнейших направления — вишнуизм (вайшнавизм) и шиваизм | refined | с. 595 |
| `book-points/hinduism.json` | в Бхагавадгите — учение о трёх путях к освобождению | confirmed | с. 568 |
| `book-points/hinduism.json` | пуджа перед мурти дома и в храме | confirmed | с. 593 |
| `book-points/buddhism.json` | историчность Будды: долго спорили, сегодня большинство считает, что он жил | confirmed | с. 601 |
| `book-points/buddhism.json` | упадок в Индии VII–XIII веков, распространение в Азии | confirmed | с. 600 |
| `book-points/buddhism.json` | Трипитака произнесена на Первом соборе, записана в 80 году до Р. Х. на Шри-Ланке на пали | refined | с. 611 |
| `book-points/buddhism.json` | три варианта канона: палийский, китайский, тибетский | confirmed | с. 613 |
| `book-points/buddhism.json` | два направления: Тхеравада и Махаяна, их география | confirmed | с. 639 |
| `book-points/buddhism.json` | Благородный восьмеричный путь: восемь ступеней в трёх этапах | confirmed | с. 635 |
| `book-homo-religiosus.json` (chapters) | гл. XIX «Религиозно-культурная ситуация в Древней Индии», с. 503–530 | confirmed | с. 503 |
| `book-homo-religiosus.json` (chapters) | гл. XX «Религиозные представления в Древней Индии эпохи брахманизма и Упанишад», с. 531–562 | confirmed | с. 531 |
| `book-homo-religiosus.json` (chapters) | гл. XXI «Индуизм», с. 563–598 | confirmed | с. 563 |
| `book-homo-religiosus.json` (chapters) | гл. XXII «Буддизм», с. 599–652 | confirmed | с. 599 |

### China and Japan (гл. VI–IX)

43 claims with a verdict (confirmed 37, refined 5, contradicted 1); not covered: 4.

| Site text | Claim | Verdict | Book page |
|---|---|---|---|
| `other-traditions.json` (shinto) | традиция без единственного основателя | confirmed | с. 191 |
| `other-traditions.json` (shinto) | японская храмовая и обрядовая традиция почитания ками | confirmed | с. 193 |
| `other-traditions.json` (shinto) | ками, связанных с природой, местами и предками | confirmed | с. 195 |
| `other-traditions.json` (shinto) | нет единого догматического свода и общего канона | confirmed | с. 196 |
| `other-traditions.json` (shinto) | религиозная жизнь сосредоточена вокруг святилищ, праздников мацури и обрядов очищения | refined | с. 193 |
| `other-traditions.json` (shinto) | распространён прежде всего в Японии | confirmed | с. 191 |
| `other-traditions.json` (shinto) | Jinja Honcho объединяет большинство из примерно 80 000 святилищ | contradicted | с. 214 |
| `other-traditions.json` (daoism) | Китай; философские тексты и религиозные сообщества | confirmed | с. 157 |
| `other-traditions.json` (daoism) | философское наследие «Дао дэ цзина» и «Чжуан-цзы» | confirmed | с. 165 |
| `other-traditions.json` (daoism) | и организованные религиозные школы | confirmed | с. 157 |
| `other-traditions.json` (daoism) | ключевые темы — следование Дао | confirmed | с. 171 |
| `other-traditions.json` (daoism) | недеяние (у-вэй) | refined | с. 181 |
| `other-traditions.json` (daoism) | простота и согласие с естественным порядком | confirmed | с. 181 |
| `other-traditions.json` (daoism) | религиозные формы включают общины, ритуалы и практики совершенствования | confirmed | с. 174 |
| `other-traditions.json` (daoism) | связан прежде всего с Китаем и Тайванем | confirmed | с. 184 |
| `history-overview.json` (confucianism) | период «Древний Китай» | confirmed | с. 128 |
| `history-overview.json` (confucianism) | китайская традиция, связанная с учителем Конфуцием | confirmed | с. 127 |
| `history-overview.json` (confucianism) | он учил человечности | confirmed | с. 142 |
| `history-overview.json` (confucianism) | нравственному воспитанию | confirmed | с. 141 |
| `history-overview.json` (confucianism) | и соблюдению обрядов | confirmed | с. 145 |
| `history-overview.json` (confucianism) | связывая благополучие общества с ответственностью человека перед семьёй и общиной | confirmed | с. 145 |
| `history-overview.json` (confucianism) | его ученики сохранили и распространили это учение | confirmed | с. 135 |
| `history-overview.json` (daoism) | период «Древний Китай» | confirmed | с. 157 |
| `history-overview.json` (daoism) | у истоков стоят тексты, связанные с Лао-цзы и Чжуан-цзы | refined | с. 157 |
| `history-overview.json` (daoism) | они описывают Дао — «Путь», естественный ход мира — и жизнь в согласии с ним | confirmed | с. 166 |
| `history-overview.json` (daoism) | позднее возникли даосские религиозные общины со своими обрядами и священнослужителями | confirmed | с. 157 |
| `history-overview.json` (shinto) | традиция Японии, выросшая из древних местных верований и обрядов | confirmed | с. 193 |
| `history-overview.json` (shinto) | синто связывает священное с природой: животными, растениями, скалами и водопадами | confirmed | с. 194 |
| `history-overview.json` (shinto) | эти обычаи складывались в местных общинах задолго до оформления храмовых традиций | confirmed | с. 194 |
| `lineage.json` (confucianism) | from −551, approx | confirmed | с. 128 |
| `lineage.json` (daoism) | from −400, approx | confirmed | с. 163 |
| `lineage.json` (shinto) | from −300, approx (Yayoi) | confirmed | с. 192 |
| `book-points/daoism.json` | Чжан Даолин, «путь небесных наставников», II век от Р. Х. | confirmed | с. 157 |
| `book-points/daoism.json` | у даосизма никогда не было единого центра | confirmed | с. 158 |
| `book-points/daoism.json` | второй по значению трактат назван по имени Чжуан-цзы | confirmed | с. 165 |
| `book-points/daoism.json` | «Жить долго, не умирая» — главная цель | confirmed | с. 172 |
| `book-points/daoism.json` | литургия цзяо в первый и пятнадцатый день месяца | refined | с. 184 |
| `book-points/shinto.json` | ками-но-мити возникло как противопоставление буддизму | confirmed | с. 192 |
| `book-points/shinto.json` | «Кодзики», указ Тэмму, 712 год, древнейшая японская книга | confirmed | с. 196 |
| `book-points/shinto.json` | мисоги повторяет омовение Идзанаги | confirmed | с. 207 |
| `book-points/shinto.json` | во многих японских домах есть малые домашние алтари — камидана | refined | с. 208 |
| `book-points/shinto.json` | каннуси читает норито, молящиеся подносят тамагуси | confirmed | с. 210 |
| `book-points/shinto.json` | декабрь 1945 года: религии уравнены, синто утратило особое положение | confirmed | с. 214 |

### The ancient world (гл. II–V, X–XVIII)

20 claims with a verdict (confirmed 15, refined 4, contradicted 1); not covered: 23.

| Site text | Claim | Verdict | Book page |
|---|---|---|---|
| `history-overview.json` (evidence) | «Человеколев» — отправная точка для вопроса о духовном мире древних людей, а не дата рождения религии | confirmed | с. 34 |
| `history-overview.json` (cities) | в Месопотамии религия влияла на поведение, политические решения и материальную культуру | confirmed | с. 253 |
| `history-overview.json` (cities) | историю верований читают по текстам, изображениям, храмам и ритуальным предметам | confirmed | с. 222 |
| `history-overview.json` (roman) | в Древнем Риме почитали многих богов | confirmed | с. 494 |
| `history-overview.json` (roman) | общественные жертвоприношения были тесно связаны с государственной жизнью | confirmed | с. 500 |
| `history-overview.json` (roman) | дома семьи обращались к ларам — божествам-покровителям дома и семьи | confirmed | с. 493 |
| `history-overview.json` (egyptian) | в Древнем Египте почитали множество богов | refined | с. 265 |
| `history-overview.json` (egyptian) | среди богов — Осирис и Гор (Сехмет книга не упоминает) | confirmed | с. 262 |
| `history-overview.json` (egyptian) | к богам обращались через обряды и подношения | refined | с. 280 |
| `history-overview.json` (greek) | почитали Зевса, Афину, Аполлона и других богов | confirmed | с. 398 |
| `history-overview.json` (greek) | каждому богу приписывали свою область власти | confirmed | с. 398 |
| `history-overview.json` (greek) | в святилищах приносили дары и жертвы | confirmed | с. 422 |
| `history-overview.json` (greek) | религиозные праздники объединяли жителей городов и всего греческого мира | confirmed | с. 423 |
| `history-overview.json` (slavic) | среди почитаемых божеств был Перун, связанный с громом | confirmed | с. 302 |
| `lineage.json` (mesopotamian) | from −4100 (approx) | confirmed | с. 220 |
| `lineage.json` (mesopotamian) | to −3100 (approx) | contradicted | с. 254 |
| `lineage.json` (egyptian) | from −3200 (approx) | confirmed | с. 260 |
| `lineage.json` (roman) | from −500 (approx): Roman history before the 5th century BC is obscure | refined | с. 478 |
| `lineage.json` (greek) | from −800 (approx), from the time of Homer | confirmed | с. 395 |
| `lineage.json` (greek) | to 363 (Julian) | refined | с. 447 |
