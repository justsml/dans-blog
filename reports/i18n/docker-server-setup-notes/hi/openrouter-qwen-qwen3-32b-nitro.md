# Translation Candidate
- Slug: docker-server-setup-notes
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-04-06--docker-server-setup-notes/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 72.20
- Input tokens: 21594
- Output tokens: 10302
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004200
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-server-setup-notes --locale hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: डॉकर सर्वर स्थापना
date: '2015-04-06'
modified: '2022-07-30'
subTitle: एकल कमांड के साथ डेटाबेस सर्वर शुरू करें
category: DevOps
subCategory: docker
tags:
  - devops
  - docker
  - server
  - postgres
  - mysql
  - mongodb
  - elasticsearch
  - setup
  - shell-script
related:
  - docker-makes-everything-better
  - docker-rocks
  - docker-security-tips-for-self-hosting
cover: ../markus-spiske-193031-unsplash.webp
cover_mobile: ../w300_markus-spiske-193031-unsplash.webp
cover_icon: ../icon_markus-spiske-193031-unsplash.webp
---
## डॉकर सर्वर स्थापना

> ऐतिहासिक टिप्पणी: यह 2015 का स्थानीय विकास संदर्भ है। यह पुराने कार्यप्रवाह को समझने में सहायक है, लेकिन इन अंशों को वर्तमान उत्पादन सलाह के रूप में नहीं लें। आधुनिक डॉकर कंपोज़ फ़ाइलें, कस्टम नेटवर्क, फ़िक्स्ड इमेज संस्करण, प्रमाणीकरण, सीक्रेट्स और समीक्षा के साथ अपडेट ऑटोमेशन आज अधिक सुरक्षित प्रारंभिक मान्यताएं हैं।

### यह गाइड किसके लिए है?

- क्या आपने कभी एक ऐप के साथ एक 'थ्रो-अवे' डेटाबेस के साथ टेस्ट करने की इच्छा की है?
- क्या आपने एक संदिग्ध कोडबेस विरासत में मिला है? अपने वर्तमान डेटाबेस के एक्सेस को साझा करने से बचना अधिक पसंद करते हैं?
- सुरक्षा-संवेदनशील क्लाइंट्स के साथ काम कर रहे हैं? क्रॉस-संदूषण के जोखिम को न लें! कंटेनरों का उपयोग करें और डेटा टिकाऊपन पर नियंत्रण रखें!
- अपने विकास परिवेश को नवीनतम डेटाबेस संस्करण में अपग्रेड नहीं कर सकते क्योंकि आपके पुराने ऐप 12 साल पुराने माइक्रोसॉफ्ट एमएसएसक्यूएल के संस्करण पर निर्भर हैं?

> कभी भी उन कारणों को आपके रास्ते में नहीं आने दें!

### एकल-रेखा लिंक के लिए त्वरित संदर्भ

इस लेख में कुछ लोकप्रिय डेटाबेस शुरू करने के लिए एकल-रेखा कमांड हैं, जिनमें शामिल हैं:

<section class="font-lg">

<p><a href="#postgres-server"><svg style={{display: 'inline-block', margin: '0 0.5rem'}} role="img" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg"><title>PostgreSQL icon</title><path fill="currentColor" d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.827 2.865.305 4.482.415 6.682c.03.607.203 1.597.49 2.879s.69 2.783 1.193 4.152c.503 1.37 1.054 2.6 1.915 3.436.43.419 1.022.771 1.72.742.49-.02.933-.235 1.315-.552.186.245.385.352.566.451.228.125.45.21.68.266.413.103 1.12.241 1.948.1.282-.047.579-.139.875-.27.011.33.024.653.037.98.041 1.036.067 1.993.378 2.832.05.137.187.843.727 1.466.54.624 1.598 1.013 2.803.755.85-.182 1.931-.51 2.649-1.532.71-1.01 1.03-2.459 1.093-4.809.016-.127.035-.235.055-.336l.169.015h.02c.907.041 1.891-.088 2.713-.47.728-.337 1.279-.678 1.68-1.283.1-.15.21-.331.24-.643s-.149-.8-.446-1.025c-.595-.452-.969-.28-1.37-.197a6.27 6.27 0 0 1-1.202.146c1.156-1.947 1.985-4.015 2.458-5.845.28-1.08.437-2.076.45-2.947.013-.871-.058-1.642-.58-2.309C21.36.6 19.067.024 17.293.004c-.055-.001-.11-.002-.165-.001zm-.047.64c1.678-.016 3.822.455 5.361 2.422.346.442.449 1.088.437 1.884-.013.795-.16 1.747-.429 2.79-.522 2.02-1.508 4.375-2.897 6.488a.756.756 0 0 0 .158.086c.29.12.951.223 2.27-.048.332-.07.575-.117.827.075a.52.52 0 0 1 .183.425.704.704 0 0 1-.13.336c-.255.383-.758.746-1.403 1.045-.571.266-1.39.405-2.116.413-.364.004-.7-.024-.985-.113l-.018-.007c-.11 1.06-.363 3.153-.528 4.108-.132.77-.363 1.382-.804 1.84-.44.458-1.063.734-1.901.914-1.038.223-1.795-.017-2.283-.428-.487-.41-.71-.954-.844-1.287-.092-.23-.14-.528-.186-.926-.046-.398-.08-.885-.103-1.434a51.426 51.426 0 0 1-.03-2.523 3.061 3.061 0 0  \n
</section>

**नोट:** ये कमांड स्थानीय विकास के लिए शॉर्टकट हैं। यदि आप उन्हें उत्पादन में अपनाते हैं, तो पहले प्रमाणीकरण, सीक्रेट प्रबंधन, बैकअप, नेटवर्क नीति, पिन किए गए इमेज, और अपग्रेड प्लान जोड़ें।

> **उन्नत डॉकर उपयोगकर्ता:** यदि आप `docker-compose` के साथ परिचित हैं, तो आपके `docker-compose.yml` फ़ाइलों में नीचे के शेल कमांड का उपयोग करने के लिए उन्हें बदलना चाह सकते हैं।

### पोस्टग्रेस सर्वर

> एक कंटेनर शुरू करें, जिसे `pg-localhost` के रूप में नामित करें

```sh
# Store db files on a local path, outside the container
mkdir -p $HOME/.postgres-data

docker run \
  --name pg-localhost \
  -p 127.0.0.1:5432:5432 \
  -e POSTGRES_PASSWORD=password \
  --restart unless-stopped \
  -it \
  --shm-size=256mb \
  postgres:16-alpine \
  postgres -c 'listen_addresses=*' \
    -c 'password_encryption=scram-sha-256' \
    -c 'shared_memory_type=sysv' \
    -c 'shared_buffers=256MB' \
    -c 'max_connections=200'
```

> आवश्यकतानुसार कमांड लाइन विकल्पों को संशोधित करें। (पोस्टग्रेस डैमन आर्ग्यूमेंट्स डॉकर इमेज नाम `postgres:16-alpine` के बाद शुरू होते हैं। देखें `postgres -c 'listen_addresses=*'...`)

> `psql` प्रम्पट को पोस्टग्रेस उपयोगकर्ता के रूप में प्राप्त करें

```sh
docker exec --user postgres -it pg-localhost psql
```

> कंटेनर की शेल को रूट के रूप में प्राप्त करें

```sh
docker exec -it pg-localhost bash
```

**नोट:** ऊपर कमांड आधिकारिक एल्पीन लिनक्स बेस इमेज का उपयोग करता है। _यह आपका सामान्य डेबियन वातावरण नहीं है।_

> डेबियन/यूबुंटू बेस इमेज का उपयोग करने के लिए, `postgres:12-alpine` को `postgres:12` में बदलें।

### मॉंगोडीबी सर्वर

```sh
mkdir -p $HOME/.mongodb/data

docker run -d \
  --name mongodb \
  --restart on-failure:5 \
  -p 127.0.0.1:27017:27017 \
  -v $HOME/.mongodb:/data \
  mongo:7 \
  bash -c 'mongod --bind_ip 0.0.0.0'
```

अब जब आपका सर्वर स्थापित हो गया है, तो निम्नलिखित कमांड का उपयोग करके आप डेटा की पुष्टि कर सकते हैं कि यह `$HOME/.mongodb` में सही से संग्रहीत है:

```sh
ls -lach $HOME/.mongodb
```

चलिए `mongosh` CLI टूल का उपयोग करके सर्वर से जुड़ते हैं। (अगर आपके पास यह इंस्टॉल नहीं है तो नीचे देखें।)

```sh
#> प्रासंगिक तर्कों का उपयोग कर रहा है:
mongosh
```

और आपको इस तरह कुछ दिखाई देना चाहिए:

![मॉंगो शेल आउटपुट का पूर्वावलोकन](../mongo-shell-screenshot.webp)

#### मॉंगो CLI उपकरण स्थापित करें

##### ब्रू और ओएसएक्स का उपयोग करें

```sh
brew tap mongodb/brew
brew install mongodb-community-shell
```

### म्यूज़ल सर्वर

> **चेतावनी:** नीचे `MYSQL_ROOT_PASSWORD` में पासवर्ड बदलें।

```sh
mkdir -p $HOME/.mysql

docker run -d \
  -v $HOME/.mysql:/var/lib/mysql \
  -p 127.0.0.1:3306:330.6 \
  --name mysql-$USER \
  -e MYSQL_DATABASE=$USER \
  -e MYSQL_ROOT_HOST='172.*.*.*' \
  -e MYSQL_ROOT_PASSWORD='p@ssw0rd' \
  mysql/mysql-server:8
```

### ईलास्टिकसर्च सर्वर

```sh
mkdir -p $HOME/.elastic

docker run -d \
  --name elastic \
  -p 127.0.0.1:9200:9200 \
  -p 127.0.0.1:9300:9300 \
  -v $HOME/.elastic:/data \
  docker.elastic.co/elasticsearch/elasticsearch:8.15.5 bash -c 'elasticsearch --cluster.name elastic_cluster --node.name elastic01 --path.data /data/elastic-data --path.logs /data/elastic-logs '
```

##### सुरक्षा टिप्पणियाँ

> **टिप्पणी:** `-p 127.0.0.1:27017:27017` प्रकार का पोर्ट विकल्प आपके इंस्टेंस के एक्सेस को डॉकर सर्वर के स्थानीय होस्ट नेटवर्क तक सीमित करता है।  
> बाहरी एक्सेस अनुमति देने के लिए लोकल आईपी प्रीफिक्स को हटाएं और पोर्ट्स प्रकाशित करें: `-p 27017:27017`। **आवश्यक सुरक्षा उपायों को अपनाए गए होना आवश्यक है।**

**सुझावित:** हमेशा एक पोर्ट स्कैनिंग टूल (जैसे nmap/masscan) का उपयोग करें अपने नेटवर्क विन्यास की पुष्टि करने के लिए (अलग प्रणाली और अलग नेटवर्क से)।
```

अब आपके पास डेटाबेस सर्वर शुरू करने के लिए कमांड हैं, अगला चरण अपने एप्लिकेशन को डॉकर इमेज के रूप में पैक करना है। भाग 2 नीचे जारी है:

## नोडजीएस वेब एप्लिकेशन का पैकेजिंग

1. अपनी परियोजना के मूल में एक खाली फ़ाइल `Dockerfile` जोड़ें।
1. _(वैकल्पिक, अनुशंसित)_ .gitignore नियमों का उपयोग करके बड़े अनावश्यक पथों को बाहर रखने के लिए एक `.dockerignore` फ़ाइल जोड़ें। डिफ़ॉल्ट रूप से सभी परियोजना फ़ाइलें शामिल होती हैं।

#### अपने एप्लिकेशन के मूल में एक `Dockerfile` बनाएं

```dockerfile
# NodeJS के लिए उदाहरण
FROM node:22
EXPOSE 3000
COPY . /app/
WORKDIR /app
RUN apt-get update && apt-get dist-upgrade -yqq
RUN ["npm", "install"]

# ओवरराइड करने योग्य कमांड
CMD ["npm", "start"]
```

डॉकरफ़ाइल का उपयोग करना और परिणामों को कंसोल के माध्यम से दिखाना आसान है (नीचे कमांड देखें)।

कमांड लाइन में, `cd` का उपयोग करके अपनी परियोजना फ़ोल्डर में जाएं और निम्नलिखित `build` कमांड चलाएं - जब भी आप डिप्लॉयमेंट में परिवर्तन करते हैं या ओएस या एनवीरनमेंट विन्यास बदलना/अपग्रेड करना चाहते हैं।

```sh
docker build -t app-name-here .
```

{/*
#### डॉकर इंस्टॉल

अगर आपके पास डॉकर इंस्टॉल नहीं है तो नीचे दिए गए कमांड का उपयोग करके लिनक्स या मैकओएस पर इंस्टॉल करें:

```sh
curl -sSL https://get.docker.com/ | sh
``` */}

### मुख्य डॉकर कमांड्स की संदर्भ सूची

#### डॉकर इमेज बनाएं

```sh

docker build -t app-name-here .

```

#### वेब एप्प बनाएं/चलाएं जो डीबी सर्वर्स से लिंक हो

```sh

docker network create app-local
docker network connect app-local mongodb
docker network connect app-local elastic
docker run -d --name webapp01 --network app-local -p 3000:3000 app-name-here

```

#### इंटरैक्टिव तरीके से चलाएं (नॉन-डेमन, कंसोल में)

```sh

docker run -it --name webapp01 --network app-local -p 3000:3000 app-name-here bash

```

#### कंटेनर इंस्टेंस या इमेज हटाएं

> महत्वपूर्ण: किसी भी डेटा को माउंटेड वॉल्यूम पथ पर स्टोर नहीं किया गया है तो वह खो जाएगा!!

```sh

# इमेज हटाएं
docker rmi -f app-name-here
docker rm -f webapp01
# अब अपना `docker run...` फिर से चलाएं
# उदाहरण के लिए, ऊपर दिए गए डीबी इंस्टेंस हटाएं, निम्नलिखित चलाएं: (शुरू करें `docker stop {mongo,elastic}` जैसे कमांड के साथ)
docker rm -f mongo elastic
```

```
# इमेज हटाएं
docker rmi -f app-name-here
docker rm -f webapp01
# अब अपना `docker run...` फिर से चलाएं
# उदाहरण के लिए, ऊपर दिए गए डीबी इंस्टेंस हटाएं, निम्नलिखित चलाएं: (शुरू करें `docker stop {mongo,elastic}` जैसे कमांड के साथ)
docker rm -f mongo elastic
```
````
