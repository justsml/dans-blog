# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ar/index.mdx
- Validation: deferred
- Runtime seconds: 156.83
- Input tokens: 21893
- Output tokens: 24993
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.009589
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: نصائح أمان Docker الأساسية للاستضافة الذاتية
subTitle: أمّن خدماتك المستضافة ذاتيًا، من الدفاع إلى المراقبة!
date: '2025-01-04'
modified: '2025-07-09'
tags:
  - docker
  - security
  - devops
  - containers
  - best-practices
category: Security
social_image: ../desktop-social.webp
cover_full_width: ../docker-ukiyo-e-wide.webp
cover_mobile: ../docker-ukiyo-e-container-square-200.webp
cover_icon: ../docker-ukiyo-e-container-square-200.webp
cover_credit: © 2025 Dan Levy
---
import {CodeTabs} from '../../../../components/CodeTabs';

**جدول المحتويات**

- 🧗‍♀️ [للشجعان](#️-for-the-brave)
- 🔄 [رقصة `:latest`](#-the-latest-dance)
- 🔐 [إدارة الأسرار: الطريقة الصحيحة](#-secrets-management)
- 🌐 [خطر الشبكة](#-network-hazard)
- 🛡️ [ضوابط الوصول](#️-access-controls)
- 🔍 [المراقبة والتحقق](#-monitoring--verification)
- ⏰ [نصائح غالبًا ما تُغفل](#-often-overlooked-tips)
- 🚀 [قائمة التحقق للإنتاج](#-production-checklist)
- 📚 [قراءات إضافية](#-further-reading)

## 🧗‍♀️ للشجعان

إذا كنت تستضيف خدمات Docker بنفسك، فإن الأمان هو مسؤوليتك من الأعلى إلى الأسفل—لا يوجد مزود سحابي ليحميك من فحص المنافذ أو الإعدادات الرديئة. سواء كنت تشغل تطبيقات على شبكتك المنزلية أو تستأجر خوادم افتراضية خاصة (VPS) من مزودين مثل Vultr وDigitalOcean وLinode وAWS وAzure وGoogle Cloud، ستحتاج إلى تأمين الأمور—والتحقق من أنك فعلتها بشكل صحيح.

في هذا الدليل، سنستعرض أمان Docker—من بعض التقنيات `الأقل شهرة` إلى أخرى `يصعب إتقانها`؛ سنستكشف رموز الكناري (canary tokens)، وحدات التخزين للقراءة فقط، قواعد جدار الحماية، تقسيم الشبكة وتقويتها، إضافة وكلاء موثَّقين، والمزيد.

سنقارن أيضًا بين الشبكات المنزلية وإعدادات السحابة العامة ونوضح لك كيفية إعداد وكيل مصادقة أساسي باستخدام Nginx. في النهاية، سيكون لديك عدة خيارات لإبعاد الدخلاء (الأصدقاء، العائلة، وأحيانًا حتى نفسك...)

هذا كثير من الأمور! لكن الكثير منها مترابط، ويمكنك اختيار ما هو الأكثر صلة بإعدادك. 🍀

## 🔄 رقصة `:latest`

الحفاظ على تحديث الصور أمر بالغ الأهمية للأمان. ومع ذلك، الاعتماد على `:latest` قد يُدخل تغييرات مكسرة أو بنيات ضعيفة دون خطوة مراجعة.

### الطريقة الآمنة للتحديث

اجمع أوامر التحديث مع `pull` أو `build` لتحديث الصور عمدًا، ثم أعد التشغيل في نافذة زمنية يمكنك فيها ملاحظة أي خلل.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### تثبيت الإصدار مقابل الأحدث

اختيار الإصدار المناسب لتثبيته هو موازنة بين الاستقرار والأمان. إليك بعض الاستراتيجيات الشائعة:

```yaml
# docker-compose.yml
# ...
  # تثبيت الإصدار الدقيق، الأفضل للخدمات الحرجة
  image: postgres:17.2

  # تثبيت إصدار التصحيح، جيد للخدمات غير الحرجة
  image: postgres:17.2

  # تثبيت الإصدار الرئيسي، مثالي للمشاريع الهواة
  image: postgres:17

  # Yolo، تجنب إن أمكن
  image: postgres:latest
```

استخدم [Dependabot](https://github.com/features/security) أو [Renovate](https://github.com/renovatebot/renovate) لفتح طلبات سحب قابلة للمراجعة للتحديثات. لأي شيء ستشعر بالأسف لإعادة بنائه في الساعة 2 صباحًا، ثبّت على إصدار معين أو digest ودع الأتمتة تخبرك متى تتحرك.

_أخبرني عن أدواتك المفضلة للحفاظ على تحديث صور Docker!_

## 🔐 إدارة الأسرار

- [توليد أسرار قوية](#generate-strong-secrets)
- [رموز الكناري](#canary-tokens)
- [الترقية من `.env` إلى MacOS Keychain](#upgrade-from-env-to-macos-keychain)
{/* - [Placeholder Validation](#placeholder-validation) */}

هناك طرق عديدة لإدارة الأسرار، لكن واحدة من أهم القواعد التي يجب الالتزام بها هي: **لا تقم أبدًا بتضمين الأسرار بشكل ثابت في صور Docker أو إضافتها إلى git.** إنها واحدة من أكثر أخطاء الأمان شيوعًا، وتشكل خطرًا طويل الأمد، ومن الصعب إصلاحها.

تخزين الأسرار بشكل آمن هو موضوع كبير مع العديد من الخيارات، بدءًا من ملفات `.env`، و [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/)، و [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/)، أو مدير أسرار مثل [HashiCorp Vault](https://www.vaultproject.io/) أو AWS Secrets Manager.

سيتعين عليك اختيار المستوى "المناسب" من الجهد والأمان لحالة الاستخدام الخاصة بك.

{/*
TODO: نقل إلى دليل المشرف
// TODO: نقل إلى دليل المشرف

### التحقق من العناصر النائبة

<blockquote>لن تصدق مدى سهولة اختراق رمز JWT عندما لا يكون السر سريًا!</blockquote>

<p className='inset'>💡 تأكد من أن الأسرار فريدة دائمًا. حاول أن تجعل من المستحيل التشغيل بقيم افتراضية غير آمنة/مشفرة.</p>

إذا كنت تستخدم عناصر نائبة مثل `__WARNING_REPLACE_ME__` في أسرارك، فهذا رائع، ربما سيلاحظها أحدهم!

فقط في حالة، يمكنك أيضًا إضافة القليل من الأمان في وقت التشغيل بجهد بسيط. إليك كيف يمكنك القيام بذلك في JavaScript وRust وGo:

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Unsafe secrets detected:", missingSecrets);
    process.exit(1);
  }
};

validateSecrets();
```

```rust
// validate_secrets.rs
use std::env;

fn validate_secrets() {
    let unsafe_placeholder = "__WARNING_REPLACE_ME__";
    for (key, value) in env::vars() {
        if value.contains(unsafe_placeholder) {
            panic!("Unsafe secret in {}", key);
        }
    }
}

fn main() {
    validate_secrets();
}
```

```go
// validate_secrets.go
package main

import (
	"fmt"
	"os"
	"strings"
)

func validateSecrets() {
	placeholder := "__WARNING_REPLACE_ME__"
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		if len(pair) == 2 && strings.Contains(pair[1], placeholder) {
			panic(fmt.Sprintf("Unsafe secret in %s", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```
</CodeTabs>

*/}

### إنشاء أسرار قوية

فيما يلي نص برمجي صغير لإنشاء أسرار جديدة لملف `.env`:

```bash
#!/bin/bash
# generate-secrets.sh

generate_secret() {
    local length=${1:-30}
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}

[ -f .env ] && { echo ".env file already exists!"; exit 1; }

cat > .env << EOL
POSTGRES_PASSWORD=$(generate_secret)
JWT_SECRET=$(generate_secret 64)
SESSION_KEY=$(generate_secret 24)
REDIS_PASSWORD=$(generate_secret 20)
UNSAFE_PLACEHOLDER=__WARNING_REPLACE_RANDOM_TEXT__
EOL

echo "New .env file generated with secure random values!"
```

### رموز الكناري

[**رموز الكناري**](https://canarytokens.org/) هي طريقة ممتازة لاكتشاف ما إذا كانت أسرارك قد تم اختراقها (واستخدامها). إنها أشبه بسلك تعثر يمكنك إضافته إلى أي ملفات حساسة، أو روابط، أو رموز مميزة.

فكر في وضعها بجانب الأسرار التي تقلق بشأنها فعليًا: ملفات `.env`، ومتغيرات CI، ومديري كلمات المرور، ومجلدات النسخ الاحتياطي، وبيانات اعتماد السحابة. لا تحوّل هذا إلى مسرحية؛ ضع الأسلاك المتعثرة حيث يلمسها مهاجم حقيقي أو خطأ منك في المستقبل.

هناك أنواع عديدة من "رموز الكناري" للاختيار من بينها، بدءًا من رموز AWS، وأرقام [بطاقات الائتمان المزيفة](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html)، وملفات Excel وWord، وملفات Kubeconfig، وبيانات اعتماد VPN، وحتى ملفات تفريغ SQL يمكن أن تحتوي على سلك تعثر!

#### أفضل الممارسات لرموز الكناري

- **ضعها في كل مكان**: في كل ملف `.env`، وخط أنابيب CI/CD، و"مدير أسرار" يمكنك التفكير فيه.
  - ضع ملف `passwords.xlsx` أو `passwords.docx` في دليلك الرئيسي.
  - أضف ملف تعريف AWS باسم `billing_prod` مع رمز كناري كالسر.
  - أنشئ ملف `private.key` لدليل `~/.ssh` الخاص بك.
  - أنشئ تفريغ SQL كناري باسم `all_credit_cards.sql` لدليل `~/backups` الخاص بك.
- **راقب**: قم بإعداد قواعد/تنبيهات البريد الإلكتروني لالتقاط وقت تفعيل رمز كناري.

### الترقية من `.env` إلى سلسلة مفاتيح MacOS

لمستخدمي Mac، أحد أبسط الخيارات هو استخدام Keychain.

إليك طريقة بسيطة لأتمتة تحميل الأسرار من سلسلة مفاتيح OSX، وهي تدعم `TouchID`، وأكثر أمانًا قليلاً من ملفات `.env`.

الفضل الأصلي يعود إلى <cite>[Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) و [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "أوامر مساعدة",
  "حفظ الأسرار في البيئة",
  "استخدام الأسرار لكل أمر"
]}>
```bash title="keychain-secrets.sh"
### Functions for setting and getting environment variables from the OSX keychain ###
### Adapted from: https://www.netmeister.org/blog/keychain-passwords.html and 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Use: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Use: set-keychain-secret SECRET_ENV_VAR
# You will be prompted to enter the secret value!
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # prompt user for secret
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Load Env vars into the current shell
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Note: If an attack can run `env` in your shell, then these secrets could be exposed!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Specify all secrets for this project
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Note: Using a shell wrapper helps prevent secrets from staying
# around in the environment. And it's safe to commit.

# Usage:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 مخاطر الشبكة

### الشبكات المخصصة والمنافذ الداخلية

عزل الخدمات بشكل صحيح باستخدام شبكات Docker هو وسيلة مهمة لتقليل مساحة الهجوم الخاصة بك.

كن حذرًا عند فتح ثغرات في شبكتك! إعادة توجيه منفذ واحدة غير صحيحة قد تنتهي بشكل سيء جدًا.

بشكل افتراضي، الخدمات على شبكة LAN خاصة لن تكون مكشوفة للإنترنت—يجب عليك صراحةً إعادة توجيه المنافذ من جهاز التوجيه الخاص بك.

### Docker على شبكة LAN

سواء كنت مطورًا يشغل خوادم تطوير محليًا، أو تستضيف خدمات بنفسك من شبكتك المحلية، **فإن الافتراضات حول نموذج شبكة Docker يمكن أن تؤدي إلى مشاكل.**

غالبًا ما يفاجأ المطورون عندما يجدون أن الطرق 'التقليدية' لتأمين خوادم لينكس (`iptables`، تقييد خيارات tcp/ip sysctl) يمكن أن **تفشل بصمت** على مضيفات Docker! هذا هو الحال بشكل خاص عند **الاستضافة الذاتية—أو التشغيل على شبكة منزلية نموذجية.** (لمن في الخلف: هذا يمكن أن يسمح بالوصول إلى حاويات التطوير على MacBook الخاص بك!!!)

> ⚠️ **تحذير #1:** يمكن للمنافذ المنشورة عبر Docker تجاوز قواعد جدار الحماية التي كنت تعتقد أنها تحمي المضيف، خاصة مع UFW على Ubuntu/Debian. هذا لا يجعل كل قاعدة جدار حماية عديمة الفائدة، لكنه يعني أن "UFW يقول ارفض" ليس دليلاً. [انظر المشكلة #690: Docker يتجاوز قواعد جدار الحماية ufw](https://github.com/moby/moby/issues/690).

> ⚠️ **تحذير #2:** ربط المنافذ بعناوين IP محلية (مثل `-p 127.0.0.1:8080:80`) هو الإعداد الافتراضي الصحيح، لكن إصدارات Docker Engine الأقدم من 28.0.0 كانت بها حالات يمكن فيها للمضيفين على نفس شبكة L2 الوصول إلى المنافذ المنشورة على localhost. [يوثق Docker هذا التحذير في دليل نشر المنافذ](https://docs.docker.com/engine/network/port-publishing/)، ولا تزال عادة التحقق باستخدام nmap أدناه مهمة.

<p class="inset">إذا كنت متفاجئًا بمعرفة هذا، فأنا مثلك!</p>

**ربط المنافذ بعناوين IP محلية لا يزال ممارسة جيدة** وله تأثير ملموس في **بيئات السحابة المُدارة والشبكات المُهيأة خصيصًا.**
{/* لا تفكر في جدار الحماية أو الشبكة الخاصة كدفاعك الرئيسي أو الوحيد، أضف شبكات Docker إلى المزيج لعزل أفضل، وفكر دائمًا فيما إذا كنت بحاجة إلى كشف المنافذ على الإطلاق. */}

### مثال على Docker Compose

فيما يلي مثال لملف `docker-compose.yml` يربط خدمة `app` بـ `127.0.0.1:8080` ويوصل كلتا الحاويتين بالشبكة المخصصة `backend`.

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # Bind to localhost if possible
      - "127.0.0.1:8080:8080"
    # ... other settings
  database:
    image: postgres:17.1
    # No ports needed; accessible inside backend network.
    networks:
      - backend

```

{/* #### اختبار والتحقق

كما هو الحال مع جميع إجراءات الأمان، من الضروري أن **تختبر وتتحقق** من إعداد شبكتك. */}

{/* بينما أمان الشبكة والتدقيق هو مسؤولية بدوام كامل في معظم الشركات، فإن معظم الأشخاص الذين يستضيفون بأنفسهم لا يقضون أي وقت في ذلك! */}

{/* انظر، أنا أفهم، قد يكون الأمر مخيفًا. _(الشبكات الفرعية، أقنعة الشبكة، CIDR، شبكات VLAN، وجداول التوجيه، يا إلهي! إذا لم يكن ذلك منطقيًا، فلا بأس، أنت في المكان الصحيح. أيضًا، لا داعي للقلق بشأن أي من ذلك الآن.)_ */}

### أفضل ممارسات الشبكة

- 🏆 **لا تنشر أي منافذ** تعلمت مؤخرًا أن هذا أكثر فائدة مما قد تتوقع! عند استخدام شبكة مسماة (جسر)، تتمتع الحاويات بوصول غير مقيد لبعضها البعض. تتصرف كما لو كانت خلف شبكة محلية (بوابة NAT).
  - على الرغم من أن هذا غير ممكن في جميع حالات الاستخدام، إلا أنه قد يكون مفيدًا للحاويات التي تشغل وظائف مجمعة، أو التي يتم الوصول إليها بشكل أساسي عبر `attach` أو `exec`.
- 🥇 **استخدم شبكات Docker** لعزل والتحكم في أي الحاويات يمكنها التحدث مع بعضها البعض.
- 🥉 **استخدم الربط بـ Localhost**: على الرغم من [عدم كماله](https://github.com/moby/moby/issues/45610)، فأنت بشكل أفضل حالًا عند ربط المنافذ بعنوان loopback (مثل `127.0.0.1:8080:80`). فقط تأكد من [التحقق من إعدادك.](#-monitoring--verification)

## 🛡️ ضوابط الوصول

ضوابط الوصول هي جزء حاسم من تأمين خدمات Docker الخاصة بك. يشمل ذلك تقييد قدرات الحاويات وأذوناتها، وتقييد الوصول إلى مقبس Docker، والمزيد.

- [تقييد قدرات الحاويات](#limiting-container-capabilities)
- [الوصول إلى مقبس Docker](#docker-socket-access)
- [حظر دولة!](#blocking-country)
- [تقوية وكيل CloudFlare Proxy](#hardening-cloudflare-proxy-host)

### تقييد قدرات الحاويات

ممارسة أخرى صلبة لضوابط الوصول هي تقييد قدرات حاوياتك. هذا يقلل من نصف قطر الانفجار للعديد من التهديدات، من تصعيد الامتيازات إلى اختطاف حركة المرور. إنه ليس مجال قوة، لكنه يزيل الأذونات التي لم تكن معظم الحاويات بحاجة إليها أبدًا.

**ما هي القدرات؟** أذونات أو قدرات مسماة محددة بواسطة نواة لينكس. (صفحة الدليل [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) تحتوي على القائمة الكاملة.) تشمل أشياء مثل `CAP_CHOWN` (تغيير ملكية الملفات)، `CAP_NET_ADMIN` (تكوين واجهات الشبكة)، `CAP_KILL` (قتل أي عملية)، وغيرها الكثير.

الطريقتان لتحديد القدرات المطلوبة هما:

1. **التجربة والخطأ**: هذه الطريقة الأبطأ لكنها فعالة تبدأ بعدم وجود قدرات، ثم إضافتها واحدة تلو الأخرى حتى يعمل تطبيقك.
2. **العثور على عمل سابق**: ابحث عن "`project-name` `cap_drop` Dockerfile" أو "`project-name` `cap_drop` docker-compose.yml" لترى ما إذا كان الآخرون قد قاموا بالفعل بالعمل نيابة عنك. يمكن لنموذج لغوي كبير (LLM) اقتراح نقطة بداية، لكن تعامل معه كتخمين حتى تختبر الحاوية وتقرأ وثائق الصورة.

#### أفضل ممارسات القدرات

- **إسقاط جميع القدرات**: استخدم `cap_drop: [ ALL ]` لإسقاط جميع قدرات لينكس من الحاوية.
- **لا امتيازات جديدة**: استخدم `security_opt: [ no-new-privileges=true ]` لمنع الحاوية من اكتساب امتيازات جديدة.

```yaml title="مثال: إسقاط/تحديد القدرات" {5-14}
services:
  database:
    image: postgres:17.1
    networks: [ db-network ]
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - DAC_READ_SEARCH
      - FOWNER
      - SETGID
      - SETUID
  db-admin:
    image: dpage/pgadmin4:4.1
    networks: [ db-network ]
    ports:
      - "8081:80"
    # ... other settings
networks:
  db-network:
```

الآن يمكن لخدماتك التواصل مع بعضها البعض عبر شبكة `db-network`. سيقوم Docker Compose بإنشاء تلك الشبكة تلقائيًا.

استخدم الخيار `--external`/`external:` للانضمام إلى **شبكة موجودة مسبقًا.** احذفه لإنشاء شبكة جديدة.

### الوصول إلى مقبس Docker

#### ⚠️ تحذير: `docker.sock` هو في الأساس وصول مدير للنظام

<blockquote class="inset">⚠️ الخيار \`:ro\` لا يؤثر على الإدخال/الإخراج المُرسَل عبر المقبس!</blockquote>

إنه يضمن فقط أن مسار المقبس نفسه مُثبَّت للقراءة فقط. لا تزال استدعاءات API المُرسَلة عبر ذلك المقبس قادرة على إنشاء حاويات، وتثبيت مسارات النظام، وفعل أشياء أخرى مثيرة جدًا ربما لم تقصد تفويضها.

{/* أي عملية يمكنها "فتح" المقبس يمكنها (على الأرجح) الحصول على وصول جذر على النظام المضيف. */}

#### أفضل الممارسات للمقبس

- 🥇 **تجنب تثبيت مقبس Docker**، فمن المحتمل وجود بديل أفضل.
- 🫣 إذا كان لا بد من ذلك، **ضع وكيلًا ضيقًا أمامه** واسمح فقط بنقاط نهاية API التي يحتاجها التطبيق فعليًا. اطّلع على مشروع `docker-socket-proxy` الأصلي من Tecnativa، [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). ثم تحقق من أن الاستدعاءات الممنوعة ممنوعة فعليًا.
- 🤢 حسنًا، _ربما_ مشاركته مقبولة في بيئة اختبار **عالية الثقة** و**منخفضة المخاطر**.

#### حظر دولة!

مفيد أحيانًا، لكنه ليس حدودًا أمنية حقيقية.

_أتحدث عن الكيان الجيوسياسي، وليس الموسيقى..._

إذا كنت تستضيف تطبيقات في الغالب لعائلتك وأصدقائك المحليين، يمكنك حظر حركة المرور من الدول التي لا تتوقع استقبال حركة مرور منها. أو السماح فقط بحركة المرور من الدول التي تتوقعها. هذا يقلل الضوضاء؛ لكنه لا يوقف شبكات VPN أو البروكسي أو البوت نت أو أي شخص صبور.

اطّلع على هذا السكريبت لحظر كل حركة المرور من الصين:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

بالمثل، يمكنك السماح فقط بحركة المرور من الولايات المتحدة:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### تعزيز مضيف بروكسي CloudFlare

إذا كان خادمك المنزلي محميًا خلف عنوان IP لـ CloudFlare (بروكسي)، يمكنك تقييد الوصول إلى عناوين IP الخاصة بـ CloudFlare فقط، وشبكتك المحلية.

هذا مشابه قليلاً لـ [حظر الدولة](#blocking-country) أعلاه، لكن مع تحكم أكثر إحكامًا.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Block all incoming!!!
ufw default allow outgoing # Allow all outgoing
ufw allow ssh # Allow SSH

# Allow access for local subnet (preferably dedicated DMZ/VLAN for hosted services)
ufw allow from 10.0.0.0/8 to any port 443

# Allow CloudFlare IPs
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Add IPv6 support
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

لاختبار التغييرات المستندة إلى الموقع الجغرافي، قد يكون استخدام VPN مع مواقع في البلد المطلوب مفيدًا. اطلع على المزيد في قسم [المراقبة والتحقق](#-monitoring--verification).

### أمان طبقة التطبيق

بمجرد أن تكون [الشبكة والمضيف قد تم تعزيز أمانهما،](#-network-hazard) قد تجد أن هناك المزيد مما يجب فعله.

الآن نحتاج إلى التفكير في طبقة "التطبيق" لخدماتنا نفسها.

<p class="inset">هل تحتوي قاعدة البيانات هذه على كلمة مرور صالحة؟ هل يقوم هذا الحاوية بأتمتة HTTPS/الشهادات؟ هل يتضمن التطبيق مصادقة مدمجة؟ هل هناك حدود لأي عناوين بريد إلكتروني يمكنها التسجيل؟ هل هناك بيانات اعتماد افتراضية أو متغيرات بيئية يجب تغييرها؟</p>

الطريقة الوحيدة لـ _المعرفة_ هي التحقق. في هذه الحالة، ابدأ بـ `README` والملفات الرئيسية الأخرى مثل `docker-compose.yml` و `Dockerfile` و `.env.*`. في كل من المشروع، ومن الناحية المثالية خدماته الداعمة أيضًا. (مثل Postgres و Redis وما إلى ذلك).

#### الوكيل العكسي

طبقة دفاع أخرى هي المصادقة الأساسية. لا تستخدمها بدون HTTPS. بالنسبة للخدمات القديمة، غالبًا ما يكون وضع المصادقة الأساسية أمام مسار الإدارة كافيًا لإيقاف الطلبات العشوائية والزواحف غير المصادقة من الوصول المباشر إلى الخدمة.

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

إنشاء بيانات الاعتماد:

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

مع وكيل المصادقة الأساسية، يواجه المهاجمون عقبة إضافية — اسم المستخدم وكلمة المرور — قبل الوصول إلى خدمتك الداخلية.

خيار آخر هو استخدام خدمة مثل [Traefik](https://traefik.io/) أو [Caddy](https://caddyserver.com/) التي يمكنها أتمتة HTTPS والمصادقة الأساسية لك.

إذا كنت ترغب في إدارة العديد من النطاقات والخدمات باستخدام واجهة رسومية، فإنني أوصي بـ [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 المراقبة والتحقق

- [تحقق من منافذك](../#check-your-ports)
- [عرض المنافذ المفتوحة](../#view-open-ports)
- [مراقبة الملفات](../#file-monitoring)

هذه هي **الخطوة الأكثر أهمية والأكثر تجاهلاً.** يمكن أن يكون لديك أفضل جدار ناري، وأفضل شبكة، وأفضل الممارسات، ولكن إذا لم تتحقق، فلن تعرف ما إذا كان الأمر يعمل أم لا.

بالإضافة إلى ذلك، معرفة عدد قليل من الأوامر - أو أين تبحث عنها - يمكن أن يعني الفرق في منع الاختراق. شعور كونك هاكر هو مجرد مكافأة إضافية. (للحصول على التفاصيل والأمثلة، انتقل إلى قسم [المراقبة والتحقق](../#-monitoring--verification).)

<p class="inset">لا تثق، تحقق مرتين</p>

### تحقق من منافذك

<p class="inset">⚠️ هام: لا تقم بمسح المضيفين الذين لا تملكهم.</p>

سواء كنت على شبكة منزلية أو VPS، سترغب في معرفة المنافذ المفتوحة للعالم.

هناك طريقتان للقيام بذلك:

- فحص الشبكة (`nmap`, `masscan`)
- سؤال نظام التشغيل (`lsof`, `netstat`, `ss`)

#### الاختبار خارج شبكتك

ستحتاج إلى عنوان IP الحالي (العام) الخاص بك، بسهولة باستخدام خدمات مثل `ifconfig.me`: `curl https://ifconfig.me`. أو ابحث عنه في لوحة تحكم مزود الاستضافة الخاص بك.

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

بمجرد حصولك على عنوان IP العام، تحتاج الآن إلى **الاتصال بشبكة خارجية.** يمكنك استخدام كمبيوتر صديق، أو نقطة اتصال هاتف/5G، أو مضيف خادم مخصص.

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# ملاحظة: تأكد من أن `target_host` هو عنوان IP المطلوب

# فحص منافذ محددة:
nmap -A -p 80,443,8080 --open --reason $target_host
# أعلى 100 منفذ:
nmap -A --top-ports 100 --open --reason $target_host
# جميع المنافذ
nmap -A -p1-65535 --open --reason $target_host

```

#### اختبر داخل شبكتك

تدرب على استخدام `nmap`، امسح شبكتك المحلية أو أحد خوادمك، وتحقق من جهاز التوجيه والطابعة والثلاجة الذكية.

{/* على الرغم من أن فحص المنافذ أمر شائع، إلا أنه قد يُعتبر انتهاكًا لقانون الاحتيال وإساءة استخدام الحاسوب (CFAA) في الولايات المتحدة. لذا، امسح فقط الأجهزة التي تملكها. */}

#### أمثلة لأوامر الفحص

```bash

# امسح جهازك المحلي لجميع المنافذ المفتوحة
nmap -sT localhost

# امسح عنوان IP الخاص بجهازك للخدمات
nmap -sV 192.168.1.10

# ابحث عن تفاصيل الخدمات على شبكتك
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# أو على شبكة دوكر 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="nmap Scan" frame="terminal"
% nmap -A --open --reason 192.168.0.87

Starting Nmap 7.95 ( https://nmap.org ) at 2025-01-06 13:51 MST
Nmap scan report for dev02.local (192.168.0.87)
Host is up, received syn-ack (0.0067s latency).
Not shown: 995 closed tcp ports (conn-refused)
PORT     STATE SERVICE     REASON  VERSION
22/tcp   open  ssh         syn-ack OpenSSH 9.6p1 Ubuntu 3ubuntu13.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|_  256 {FINGERPRINT} (ED25519)
80/tcp   open  http        syn-ack Caddy httpd
|_http-server-header: Caddy
|_http-title: Dev02.DanLevy.net
443/tcp  open  ssl/https   syn-ack
|_http-title: Dev02.DanLevy.net
1234/tcp open  http        syn-ack Node.js Express framework
|_http-cors: GET POST PUT DELETE PATCH
|_http-title: Dev02.DanLevy.net (application/json; charset=utf-8).
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 13.36 seconds
```

### عرض المنافذ المفتوحة

تعرف على `lsof` – فهو متوفر على MacOS وLinux. يُظهر حالة الشبكة التفصيلية ونشاط القرص.

```bash title="lsof Commands"
# مراقبة منفذ معين
sudo lsof -i:80 -Pn

# مراقبة الاتصالات المُنشأة
sudo lsof -i -Pn | grep ESTABLISHED
# عرض الاستماع
sudo lsof -i -Pn | grep LISTEN

# لعرض أسماء الشبكات بدلاً من عناوين IP (قد يكون بطيئًا جدًا في إجراء استعلامات DNS عكسية)
sudo lsof -i -P | grep LISTEN
```

# مراقبة جميع اتصالات الشبكة
sudo watch -n1 "lsof -i -Pn"

```

#### مثال على المخرجات

![فحص nmap للمستمعين](lsof-scan-listen.webp)

### مراقبة الملفات

لتحديد أي **العمليات** تستخدم أكبر **عرض نطاق للقرص الصلب**، يمكنك استخدام `iotop`:

```bash

sudo iotop

```

لمشاهدة تغييرات الملفات الفردية، يمكنك استخدام `inotifywait` على لينكس أو `fswatch` على ماك:

قد يكون هذا مفيدًا لاكتشاف السلوك غير المصرح به أو الغريب لكل مجلد أو على مستوى النظام.

```bash

# مراقبة جميع تغييرات الملفات في دليل
sudo inotifywait -m /path/to/directory

```

على ماك يمكنك استخدام `fswatch`:

قم بالتثبيت باستخدام `brew install fswatch`

```bash

fswatch -r /path/to/directory

```

## ⏰ نصائح غالبًا ما تُغفل

1. **تحديد المعدل** لمحاولات المصادقة وأي نقاط نهاية رئيسية أخرى. سواء عبر وحدة `limit_req` في Nginx أو `fail2ban` للوصول عبر SSH، فإن تقييد القوة الغاشمة هو _على الأرجح_ فكرة جيدة. أقول _على الأرجح_ لأنه في عصر IPv6 والشبكات الآلية الرخيصة، حسنًا، لم يعد الأمر كما كان.

2. **استخدام وحدات تخزين للقراءة فقط** حيثما أمكن:
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   إلى جانب أفضل الممارسات الأخرى (المستخدمون غير الجذر، أذونات المجلدات الدنيا)، يوفر خيار تحميل الوحدة `:ro` حماية إضافية ضد التغييرات العرضية وبعض محاولات الكتابة من داخل الحاوية. لا يحمي المضيف من عملية لديها صلاحيات أوسع بالفعل.

3. **تدقيق الوصول إلى الحاويات** بانتظام.
   إذا كانت الحاوية لا تحتاج إلى سر، منفذ أو تحميل، قم بإزالته!

4. **احذر من المتطفلين عبر WiFi**
   أنا متأكد من أنك لن تعطي كلمة مرور WiFi الخاصة بك أبدًا، خاصة لأي غرباء، أليس كذلك؟ حسنًا، باستثناء بعض الأصدقاء... ربما العائلة أيضًا. لا تعرف أبدًا ما هي التطبيقات التي لديهم والتي قد تشارك SSID وكلمة المرور الخاصة بك مع العالم.

### الشبكة المنزلية مقابل المزود العام مقابل النفق

1. **العزل الافتراضي/DMZ**: بالنسبة للخوادم المنزلية، ضعها على VLAN منفصل أو DMZ إن أمكن. هذا يبقي أجهزتك الداخلية بعيدة عن متناول الاختراق المحتمل من جانب الخادم.
   - استخدم راوتر منفصل أو VLAN للخادم المنزلي.
   - استخدم شبكة WiFi منفصلة للخادم المنزلي.
   - استخدم شبكة فرعية منفصلة للخادم المنزلي.

2. **مزودو الخدمات السحابية**: يقدم كل من Hetzner وVultr وDigitalOcean وLinode وAWS وAzure وGoogle Cloud ميزات جدار حماية مختلفة.
   - بعض المزودين والخدمات يحجبون المنافذ افتراضيًا. البعض الآخر يوفر خيارات الاشتراك أو الإضافات. راجع وثائق مزود الخدمة الخاص بك.
   - يقدم العديد من المزودين خدمات متقدمة للمراقبة وكشف التهديدات.

3. **الشبكات الخاصة الافتراضية (VPN) والأنفاق**: فكر في استخدام خيار يشبه VPN أو خدمة أنفاق لتوصيل الخدمات بأمان عبر الإنترنت دون تعريضها للإنترنت العام.
   - TailScale، ngrok، ZeroTier.
   - WireGuard، OpenVPN.

{/* 3. **تعزيز الأمان ضد الهجمات الداخلية/الجانبية**: يمكن لجهاز واحد مصاب أن يخترق شبكة بأكملها. يساعد تقسيم خدمات Docker على شبكات مخصصة، واستخدام الأجهزة، وقواعد UFW، وحظر المنافذ غير الضرورية في تقليل المخاطر (عند تكوينها بشكل صحيح). */}

## 🚀 قائمة التحقق للإنتاج

- [ ] **الأسرار**: جميع الأسرار مولّدة عشوائيًا ومخزنة بشكل آمن
- [ ] **التحديثات**: استراتيجية تحديث الحاويات موثقة ومؤتمتة. (لا بأس إذا كانت مجرد بضعة أوامر في ملف نصي.)
- [ ] **الشبكة**: فقط المنافذ الضرورية مكشوفة، والشبكات الداخلية منشأة.
- [ ] **قواعد جدار الحماية**: رفض افتراضي، سماح صريح، حظر حسب الدولة إذا لزم الأمر.
- [ ] **الوكيل العكسي**: يمكن لـ Nginx أو Caddy أو Traefik إضافة طبقة من المصادقة الأساسية
- [ ] **رموز الطعم (Canary Tokens)**: ضعها بالقرب من الملفات الحساسة وبيانات الاعتماد التي ستحقق فيها فعليًا إذا تم لمسها.
- [ ] **المراقبة**: اعرف أنظمتك باستخدام `nmap`، `lsof`، `inotifywait`، `glances`، إلخ.
- [ ] **استراتيجية النسخ الاحتياطي**: مختبرة، ويفضل أن تكون مؤتمتة، وخارج الموقع.
- [ ] **أقل صلاحية**: مستخدمي حاويات غير جذر، وحدات تخزين للقراءة فقط.

## 📚 قراءات إضافية

- [أفضل ممارسات أمان Docker](https://docs.docker.com/develop/security-best-practices/)
- [ورقة غش أمان Docker من OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [معيار CIS Docker](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org لرموز الطعم](https://canarytokens.org/)

## شكر وتقدير

تحية لبعض مستخدمي Reddit النشطين:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [الموضوع](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

شكرًا للقراءة! آمل أن يكون هذا الدليل مفيدًا لك. إذا كانت لديك أي أسئلة أو اقتراحات، فلا تتردد في التواصل معي عبر حساباتي على وسائل التواصل أدناه، أو لا تتردد في النقر على رابط `Edit on GitHub` لإنشاء PR! ❤️
````
