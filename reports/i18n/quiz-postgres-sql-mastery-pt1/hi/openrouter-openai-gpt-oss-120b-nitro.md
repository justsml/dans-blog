# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 28.37
- Input tokens: 13953
- Output tokens: 9284
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.002215
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/hi/index.mdx reports/i18n/quiz-postgres-sql-mastery-pt1/hi
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'क्विज़: डीप पोस्टग्रेज़ – भाग 1'
subTitle: क्या SQL आपको उत्साहित कर देता है?
label: 'Deep PostgreSQL #1'
category: Quiz
subCategory: Database
date: '2024-11-27'
modified: '2024-12-03'
tags:
  - quiz
  - postgresql
  - sql
  - database
  - intermediate
  - advanced
cover_full_width: ../elephant-synthwave-gym-wide.webp
cover_mobile: ../elephant-synthwave-gym-square-200.webp
cover_icon: ../elephant-synthwave-gym-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

> **Part 1 of 2.** [Go to Part 2](/quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 मेरे लिए सबसे पसंदीदा डेटाबेस है! मैं हमेशा नई ट्रिक्स और गोट्चाज़ सीखता रहता हूँ, इसलिए मैंने इन्हें एक नया क्विज़ में डालने का फैसला किया!</p>

यह क्विज़ परिचित और कम‑ज्ञात PostgreSQL सुविधाओं और गोट्चाज़ का मिश्रण कवर करता है: बिल्ट‑इन एग्रीगेट्स से लेकर टाइप कास्टिंग, कॉन्स्ट्रेंट्स, और बहुत कुछ।

शुभकामनाएँ! 🍀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="वार्म‑अप: फ़ंक्शन"
  title="बिल्ट‑इन एग्रीगेट्स"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा PostgreSQL में बिल्ट‑इन एग्रीगेट फ़ंक्शन नहीं है?
    ```sql
        SELECT 
          MIN(grade) as lowest,
          MAX(grade) as highest,
          AVG(grade) as average,
          MEDIAN(grade) as middle
        FROM grades;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `MEDIAN` बिल्ट‑इन नहीं है! आपको चाहिए:
    ```sql
        PERCENTILE_CONT(0.5) 
        WITHIN GROUP (ORDER BY grade)
    ```
    आम बिल्ट‑इन एग्रीगेट्स:
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - विभिन्न सांख्यिकीय फ़ंक्शन
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="वार्म‑अप: टाइप कास्टिंग"
  title="कास्ट सिंटैक्स विविधताएँ"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा प्रकार परिवर्तन **अमान्य** ❌ है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL तीन प्रकार के कास्ट सिंटैक्स को सपोर्ट करता है:

    1. ANSI SQL: `CAST(expression AS type)`.
    2. PostgreSQL: `expression::type`.
    3. टाइप फ़ंक्शन: `type 'literal'`.

    सभी कार्यात्मक रूप से समान हैं, लेकिन:
    - `CAST()` सबसे पोर्टेबल है।
    - `::` PostgreSQL‑विशिष्ट है लेकिन आमतौर पर उपयोग होता है।
    - इनफ़िक्स‑स्टाइल `type 'literal'` कम सामान्य है लेकिन फिर भी वैध है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="प्रतिबंध"
  title="UNIQUE प्रतिबंध और NULL"
  options={[
    {text: 'कोई NULL नहीं अनुमति'},
    {text: 'एक NULL की अनुमति'},
    {text: 'एकाधिक NULL की अनुमति', isAnswer: true},
    {text: 'PostgreSQL संस्करण पर निर्भर करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    यहाँ कितने NULL मानों की अनुमति है?
    ```sql
        CREATE TABLE student_emails (
          student_id INTEGER,
          email VARCHAR(255),
          UNIQUE(email)
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL में UNIQUE प्रतिबंध:
    - कई NULL मानों की अनुमति देते हैं।
    - यूनिकनेस जाँच में `NULL` ≠ `NULL` होता है।

    `NULL` मानों को रोकने के लिए, `NOT NULL` जोड़ें:
    ```sql
        CREATE TABLE student_emails (
          student_id INTEGER,
          email VARCHAR(255) NOT NULL,
          UNIQUE(email)
        );
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="तारीख/समय"
  title="तारीख अंकगणित"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: 'त्रुटि: अमान्य समय'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह क्या लौटाता है?
    ```sql
        SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    इंटरवल्स तारीख रेंज ऑपरेशन्स को सरल बनाने का एक शक्तिशाली उपकरण हैं!

    PostgreSQL में तारीख अंकगणित:
    - `+ interval '24 hours'` 24 घंटे जोड़ता है
    - `+ interval '1 day'` 1 दिन जोड़ता है
    - `+ interval '1 month'` 1 महीना जोड़ता है
    - `+ interval '1 year'` 1 साल जोड़ता है

    परिणाम `2024-11-28 00:00:00` है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="टाइमस्टैम्प"
  title="timestamptz बनाम timestamp"
  options={[
    {text: 'दोनों 8 बाइट्स लेते हैं, लेकिन अलग‑अलग टाइमस्टैम्प अर्थ दर्शाते हैं', isAnswer: true},
    {text: 'They\'},
    {text: 'timestamptz इनपुट टाइमज़ोन को संरक्षित रखता है'},
    {text: 'timestamptz मूल टाइमज़ोन नाम या ऑफ़सेट को संग्रहीत करता है'},
    {text: 'timestamptz टाइमज़ोन के लिए 2‑बाइट का मान रखता है'},
    {text: 'timestamptz, timestamp का उत्तराधिकारी है'},
  ]}
>
  <slot name="question">
  <div className="question">
    `timestamptz` और `timestamp` के बारे में **सबसे सटीक** कथन कौन‑सा है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    दोनों 8 बाइट्स होते हैं, लेकिन वे समान प्रकार का मान नहीं रखते।

    तो अंतर क्या है? यह इनपुट पार्सिंग में है।

    **`timestamptz`**
    - इनपुट को एक निरपेक्ष समय बिंदु में सामान्यीकृत करता है।
    - जब इनपुट में स्पष्ट ऑफ़सेट नहीं होता, तो सर्वर/कनेक्शन के `TimeZone` सेटिंग को ध्यान में रखता है और आउटपुट दिखाते समय भी इसका उपयोग करता है।

    **`timestamp`**
    - टाइमज़ोन परिवर्तन के बिना तिथि और समय संग्रहीत करता है।
    - टाइमज़ोन जानकारी को संरक्षित या सामान्यीकृत नहीं करता।


    **`timestamp`**

    - टाइमज़ोन जानकारी के बिना तिथि और समय संग्रहीत करता है।
    - UTC या किसी विशिष्ट टाइमज़ोन में मानकीकृत तिथियों को स्पष्ट रूप से रखने के लिए उपयोगी है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Postgres प्रकार"
  title="अमान्य प्रकार पहचानें"
  options={[
    {text: 'VARCHAR(100)'},
    {text: 'CHAR(100)'},
    {text: 'TEXT'},
    {text: 'STRING(100)', isAnswer: true},
    {text: 'CHARACTER VARYING(100)'},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा ❌ एक वैध PostgreSQL प्रकार नहीं है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL में डेटा प्रकारों की विस्तृत श्रृंखला है, लेकिन `STRING(100)` उनमें से नहीं है.

    सही स्ट्रिंग प्रकार हैं:
    - `VARCHAR(100)` (परिवर्तनीय‑लंबाई स्ट्रिंग)
    - `CHAR(100)` (स्थिर‑लंबाई स्ट्रिंग)
    - `TEXT` (असीमित लंबाई)
    - `CHARACTER VARYING(100)` (`VARCHAR(100)` के समान)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Postgres प्रकार"
  title="अमान्य प्रकार पहचानें"
  options={[
    {text: 'int'},
    {text: 'real'},
    {text: 'bigint'},
    {text: 'bigserial'},
    {text: 'smallserial'},
    {text: 'decimal128', isAnswer: true},
    {text: 'double precision'},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा ❌ एक वैध PostgreSQL प्रकार नहीं है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह परिचित लग सकता है क्योंकि `decimal128` कई जगहों (जैसे Mongo और Java) में एक प्रकार है। यह वैध PostgreSQL प्रकार नहीं है, `decimal` है।

    सही संख्यात्मक प्रकार हैं:
    - `int` (4-बाइट पूर्णांक)
    - `bigint` (8-बाइट पूर्णांक)
    - `real` (4-बाइट फ्लोटिंग‑पॉइंट)
    - `double precision` (8-बाइट फ्लोटिंग‑पॉइंट)
    - `bigserial` (ऑटो‑इन्क्रीमेंटिंग 8-बाइट पूर्णांक)
    - `smallserial` (ऑटो‑इन्क्रीमेंटिंग 2-बाइट पूर्णांक)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Postgres प्रकार"
  title="अमान्य प्रकार पहचानें"
  options={[
    {text: 'cidr'},
    {text: 'inet'},
    {text: 'ipv4', isAnswer: true},
    {text: 'macaddr'},
    {text: 'macaddr8'},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा ❌ एक वैध PostgreSQL प्रकार नहीं है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    क्या यह आपको निराश, यहाँ तक कि _गुस्से_ में कर गया? आप अकेले नहीं हैं! एक अनाम "कोर" डेटाबेस योगदानकर्ता का उद्धरण देते हुए, "what the hell, Dan?! I crashed on the type questions! Thats violent sir! Not sharing my score, hah." 😈 आपका स्वागत है.

    PostgreSQL के समृद्ध नेटवर्क प्रकारों में `ipv4` शामिल नहीं है। हर बार जब मैं इसे बिना गूगल किए इस्तेमाल करने की कोशिश करता हूँ, तो मैं गलती करता हूँ। शायद `macaddr8` मुझे यह महसूस कराता है कि `ipv4` और `ipv6` प्रकार ज़रूर होने चाहिए। नहीं, `inet` दोनों को कवर करता है। साथ ही, `cidr` दोनों के लिए नेटवर्क मास्क को कवर करता है।

    वैध नेटवर्क प्रकार शामिल हैं:
    - `cidr` (IPv4/IPv6 नेटवर्क पता)
    - `inet` (IPv4/IPv6 होस्ट पता)
    - `macaddr` (MAC पता)
    - `macaddr8` (EUI-64 MAC पता)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Postgres प्रकार"
  title="अमान्य प्रकार पहचानें"
  options={[
    {text: 'xml'},
    {text: 'uuid'},
    {text: 'money'},
    {text: 'currency', isAnswer: true},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा ❌ एक वैध PostgreSQL प्रकार नहीं है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL में कई विशेष प्रकार होते हैं, लेकिन `currency` उनमें से नहीं है!

    वैध प्रकार हैं:
    - `xml` (XML डेटा)
    - `uuid` (UUID)
    - `money` (मुद्रा राशि)
    - `interval` (समय अंतराल)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Postgres प्रकार"
  title="अमान्य प्रकार पहचानें"
  options={[
    {text: 'box'},
    {text: 'line'},
    {text: 'point'},
    {text: 'circle'},
    {text: 'polygon'},
    {text: 'triangle', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा ❌ एक वैध PostgreSQL प्रकार नहीं है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL के पास विशेष प्रकारों का समृद्ध सेट है, लेकिन `triangle` उनमें से नहीं है।

    मुझे लगता है कि आगामी संस्करणों में [GEOS](https://libgeos.org/) `Triangle` OGC/WKT समर्थन शामिल करेंगे, जिसका अर्थ है कि यह अंततः Postgis में शामिल हो जाएगा। (आधारतः, यह उत्तर भविष्य में गलत हो सकता है।)

    सही विशेष प्रकारों में शामिल हैं:
    - `box` (आयताकार बॉक्स)
    - `line` (अनंत रेखा)
    - `point` (2D बिंदु)
    - `circle` (2D वृत्त)
    - `polygon` (2D बहुभुज)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="पूर्णांक अंकगणित"
  title="पूर्णांक ओवरफ़्लो"
  options={[
    {text: '4294967296'},
    {text: 'त्रुटि: पूर्णांक सीमा से बाहर', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    कुल संभावित छात्र आईडी की गणना करते समय क्या होता है?
    ```sql
        SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL का `integer` प्रकार 32‑bit साइन्ड है, जिसकी सीमा `-2,147,483,648` से `2,147,483,647` तक है।

    गणना `256^4` = `4,294,967,296` इस सीमा से अधिक है।

    बड़े संख्याओं को संभालने के लिए:
    ```sql
        -- Use BIGINT
        SELECT 256::bigint * 256 * 256 * 256;

        -- Or numeric for arbitrary precision
        SELECT 256::numeric * 256 * 256 * 256;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="तारीख/समय"
  title="टाइमस्टैम्प सटीकता"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Postgres में अधिकतम `time` सटीकता से अधिक होने वाला सबसे छोटा `timestamp` लिटरल कौन सा है?
    ```sql
        CREATE TABLE class_sessions (
          id INT GENERATED BY DEFAULT AS IDENTITY,
          start_time timestamptz,
          end_time timestamptz
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL timestamps में माइक्रोसेकंड (6 दशमलव स्थान) की सटीकता होती है.

    - अधिकतम: `.123456` (6 अंक)
    - नैनोसेकंड (9 अंक) को समर्थित सटीकता तक गोल या काट दिया जाता है
    - टाइमज़ोन ऑफ़सेट `timestamptz` के लिए स्वीकार्य हैं, लेकिन आवश्यक नहीं

    **कम‑प्रचलित गड़बड़ी:** कुछ भाषा/फ़्रेमवर्क नैनोसेकंड सटीकता भेजते हैं, लेकिन PostgreSQL timestamps को माइक्रोसेकंड सटीकता में संग्रहीत करता है.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Postgres प्रकार"
  title="अमान्य प्रकार पहचानें"
  options={[
    {text: 'lseg'},
    {text: 'bytea'},
    {text: 'tsquery'},
    {text: 'tsvector'},
    {text: 'tsrank', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा ❌ एक वैध PostgreSQL प्रकार नहीं है?

    (सच में, ये (ज्यादातर) वास्तविक प्रकार हैं.)
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL में कई ज्यामितीय और टेक्स्ट सर्च प्रकार बिल्ट‑इन होते हैं, लेकिन `tsrank` उनमें से नहीं है.

    सही ज्यामितीय और टेक्स्ट सर्च प्रकार हैं:
    - `lseg` (लाइन सेगमेंट)
    - `bytea` (बाइनरी डेटा)
    - `tsquery` (टेक्स्ट सर्च क्वेरी)
    - `tsvector` (टेक्स्ट सर्च दस्तावेज़)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="प्रतिबंध"
  title="चेक प्रतिबंध समय"
  options={[
    {text: 'नए या बदले हुए पंक्तियों के लिए तुरंत', isAnswer: true},
    {text: 'लेन‑देन कमिट पर'},
    {text: 'अगली क्वेरी पर'},
    {text: 'कभी नहीं - प्रतिबंध केवल INSERT पर जाँचते हैं'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह ग्रेड प्रतिबंध कब जाँचता है?
    ```sql
        ALTER TABLE students 
        ADD CONSTRAINT valid_grade 
        CHECK (
          (grade >= 0 AND grade <= 100) OR 
          grade IS NULL
        ) NOT VALID;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `NOT VALID` प्रतिबंध:
    - नए INSERT और UPDATE के लिए तुरंत जाँचते हैं
    - मौजूदा पंक्तियों को वैध नहीं करते
    - `VALIDATE CONSTRAINT` से बाद में मौजूदा पंक्तियों को वैध कर सकते हैं
    - बड़े टेबल के लिए उपयोगी होते हैं

    `NOT VALID` के बिना:
    - प्रतिबंध तुरंत जाँचता है
    - सभी मौजूदा पंक्तियों को वैध किया जाता है
    - बड़े टेबल पर धीमा हो सकता है
  </div>
  </slot>
</Challenge>

</QuizUI>

शाबाश! आपने PostgreSQL के कई पहलुओं में गहराई तक पहुँच बनाई! 🐘

आशा है आपको कुछ नया सीखने को मिला, या कम से कम आपका स्कोर दिखाने लायक है! 🏆

<p class="inset">और अधिक Postgres मज़े के लिए देखें [Part 2](/quiz-postgres-sql-mastery-pt2/) 🚀</p>

जीवन में और रोमांच चाहिए? मेरे [Quiz Collection](/challenges/) में अनगिनत* मज़ा देखें!
````
