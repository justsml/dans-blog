# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ar/index.mdx
- Validation: deferred
- Runtime seconds: 30.35
- Input tokens: 22363
- Output tokens: 9556
- Thinking tokens: unknown
- Cached input tokens: 7680
- Cache write tokens: 0
- Estimated cost: $0.002592
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: نصائح أساسية لأمان Docker عند الاستضافة الذاتية
subTitle: آمن خدماتك المستضافة ذاتيًا، من الدفاع إلى المراقبة!
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
- 🌐 [مخاطر الشبكة](#-network-hazard)
- 🛡️ [ضوابط الوصول](#️-access-controls)
- 🔍 [المراقبة والتحقق](#-monitoring--verification)
- ⏰ [نصائح غالبًا ما تُهمل](#-often-overlooked-tips)
- 🚀 [قائمة التحقق للإنتاج](#-production-checklist)
- 📚 [قراءات إضافية](#-further-reading)

## 🧗‍♀️ للشجعان

إذا كنت تستضيف خدمات Docker بنفسك، فإن الأمان يقع على عاتقك من القمة إلى القاع — لا مزود سحابي يحميك من فحص المنافذ أو التكوين الفوضوي. سواءً كنت تشغّل التطبيقات على شبكتك المنزلية أو تستأجر خوادم VPS من مزودين مثل Vultr، DigitalOcean، Linode، AWS، Azure، أو Google Cloud، ستحتاج إلى تأمين كل شيء — والتحقق من أنك فعلت ذلك بشكل صحيح.

في هذا الدليل، سنستعرض أمان Docker — من بعض التقنيات `الأقل شهرة` إلى تقنيات `صعبة التنفيذ`؛ سنستكشف رموز الكناري، الأحجام للقراءة فقط، قواعد الجدار الناري، تقسيم الشبكة وتحصينها، إضافة بروكسيات موثقة، والمزيد.

سنقارن أيضًا بين الشبكات المنزلية وإعدادات السحابة العامة ونظهر لك كيفية إعداد بروكسي توثيق أساسي باستخدام Nginx. بنهاية القراءة، ستحصل على عدة خيارات لإبعاد المتطفلين (الأصدقاء، العائلة، وأحيانًا حتى نفسك...)

هذا كثير من المحتوى! لكن معظم هذه العناصر مترابطة، ويمكنك اختيار ما يناسب إعدادك. 🍀

## 🔄 رقصة `:latest`

إبقاء الصور محدثة أمر حاسم للأمان. ومع ذلك، الاعتماد على `:latest` قد يجرّب تغييرات كسرية أو بنى معرضة للثغرات دون خطوة مراجعة.

### الطريقة الآمنة للتحديث

ادمج أوامر التحديث مع `pull` أو `build` لتقوم بتحديث الصور عن قصد، ثم أعد تشغيلها خلال نافذة يمكنك فيها ملاحظة أي عطل.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### تثبيت الإصدار مقابل `latest`

اختيار الإصدار المناسب لتثبيته هو موازنة بين الاستقرار والأمان. إليك بعض الاستراتيجيات الشائعة:

```yaml
# docker-compose.yml
# ...
  # تثبيت نسخة دقيقة، الأفضل للخدمات الحرجة
  image: postgres:17.2

  # تثبيت نسخة تصحيحية، مناسب للخدمات غير الحرجة
  image: postgres:17.2

  # تثبيت نسخة رئيسية، مثالي للمشاريع الهواية
  image: postgres:17

  # يولو، تجنبه إذا أمكن
  image: postgres:latest
```

استخدم [Dependabot](https://github.com/features/security) أو [Renovate](https://github.com/renovatebot/renovate) لإنشاء طلبات سحب قابلة للمراجعة. لأي شيء قد يزعجك إعادة بنائه في الساعة 2 صباحًا، ثبت إلى نسخة محددة أو إلى تجزئة ودع الأتمتة تخبرك متى يجب الترقية.

_أخبرني عن أدواتك المفضلة للحفاظ على تحديث صور Docker!_

## 🔐 إدارة الأسرار

- [إنشاء أسرار قوية](#generate-strong-secrets)
- [رموز الكناري](#canary-tokens)
- [الترقية من `.env` إلى مخزن مفاتيح macOS](#upgrade-from-env-to-macos-keychain)
{/* - [التحقق من العناصر النائبة](#placeholder-validation) */}

هناك طرق عديدة لإدارة الأسرار، لكن القاعدة الأهم التي يجب الالتزام بها هي: **لا تقم أبدًا بترميز الأسرار داخل صور Docker أو الالتزام بها في Git.** هذا أحد أكثر الأخطاء الأمنية شيوعًا، يخلق خطرًا طويل الأمد، ويصعب إصلاحه.

تخزين الأسرار بأمان موضوع واسع مع خيارات متعددة، من ملفات `.env`، [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/)، [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/)، أو مدير أسرار مثل [HashiCorp Vault](https://www.vaultproject.io/) أو AWS Secrets Manager.

سيتعين عليك اختيار مستوى الجهد والأمان المناسب لحالتك.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Placeholder Validation

<blockquote>You wouldn't believe how easy it is to hack a JWT token when the secret isn't secret!</blockquote>

<p className='inset'>💡 Ensure secrets are always unique. Try make it impossible to run with unsafe/hard-coded defaults.</p>

If you use placeholders like `__WARNING_REPLACE_ME__` in your secrets, great, maybe someone will notice!

Just in case, you can also add a little runtime safety with little effort. Here’s how you might do it in JavaScript, Rust, and Go:

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

إليك برنامج صغير لتوليد أسرار جديدة لملف `.env`:

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

[**رموز الكناري**](https://canarytokens.org/) طريقة ممتازة لاكتشاف ما إذا كانت أسرارك قد تم اختراقها (واستخدامها). إنها تشبه الفخ الذي يمكنك إضافته إلى أي ملفات حساسة، عناوين URL، ورموز.

فكّر في وضعها بجوار الأسرار التي تقلق بشأنها فعليًا: ملفات `.env`، متغيّرات CI، مديري كلمات المرور، مجلدات النسخ الاحتياطي، واعتمادات السحابة. لا تجعلها مسرحية؛ ضع الفخاخ حيث قد يلمسها مهاجم حقيقي أو خطأ مستقبلي منك.

هناك العديد من أنواع "الرموز" الكناري للاختيار منها، من رموز AWS، أرقام بطاقات ائتمان **مزيفة**، ملفات Excel وWord، ملفات Kubeconfig، اعتمادات VPN، وحتى ملفات تفريغ SQL يمكن أن تحتوي على فخ!

#### أفضل ممارسات رموز الكناري

- **ضعها في كل مكان**: في كل ملف `.env`، خط أنابيب CI/CD، و"مدير الأسرار" الذي يمكنك التفكير فيه.  
  - ضع ملف `passwords.xlsx` أو `passwords.docx` في دليل المنزل.  
  - أضف ملف تعريف AWS `billing_prod` مع رمز كناري كسر.  
  - أنشئ ملف `private.key` لدليل `~/.ssh`.  
  - أنشئ تفريغ SQL كناري `all_credit_cards.sql` لدليل `~/backups`.  
- **المراقبة**: اضبط قواعد/تنبيهات بريد إلكتروني لتصيد أي تشغيل لرمز كناري.

### الترقية من `.env` إلى مخزن مفاتيح macOS

لمستخدمي ماك، أحد أبسط الخيارات هو استخدام Keychain.

إليك طريقة بسيطة لأتمتة تحميل الأسرار من مخزن مفاتيح macOS، تدعم `TouchID`، وتُعد أكثر أمانًا قليلًا من ملفات `.env`.

الائتمان الأصلي يعود إلى [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) و[Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "أوامر المساعدة",
  "حفظ الأسرار في البيئة",
  "استخدام الأسرار per command"]
}>
```bash title="keychain-secrets.sh"
### وظائف لتعيين وإحضار متغيّرات البيئة من مخزن مفاتيح macOS ###
### مقتبسة من: https://www.netmeister.org/blog/keychain-passwords.html و 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# الاستخدام: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# الاستخدام: set-keychain-secret SECRET_ENV_VAR
# سيُطلب منك إدخال قيمة السر!
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # طلب السر من المستخدم
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# تحميل متغيّرات البيئة إلى الصدفة الحالية
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# ملاحظة: إذا تمكن مهاجم من تشغيل `env` في صدفتك، قد تُكشف هذه الأسرار!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# تحديد كل الأسرار لهذا المشروع
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# ملاحظة: استخدام غلاف صدفة يساعد على منع بقاء الأسرار
# في البيئة. وهو آمن للالتزام.

# الاستخدام:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 خطر الشبكة

### الشبكات المخصّصة والمنافذ الداخلية

عزل الخدمات بشكل صحيح باستخدام شبكات Docker يُعد طريقة مهمة لتقليل مساحة سطح الهجوم.

احذر من حفر ثقوب في شبكتك! أي توجيه منفذ غير مُعدّ بشكل صحيح قد يفضي إلى عواقب سيئة.

افتراضيًا، الخدمات على شبكة LAN خاصة لن تُعرض على الإنترنت—يجب عليك صراحةً توجيه المنافذ من الموجّه.

### Docker على LAN

سواء كنت مطوّرًا تشغّل خوادم تطوير محليًا، أو تستضيف خدمات ذاتيًا من شبكتك المحلية، **الافتراضات حول نموذج شبكة Docker يمكن أن تؤدي إلى مشاكل.**

غالبًا ما يُفاجئ المطوّرون أن الأساليب “التقليدية” لتأمين خوادم لينكس (`iptables`، تقييد خيارات `tcp/ip` في `sysctl`) قد **تفشل بصمت** على مضيفي Docker! وهذا يحدث خصوصًا عند **الاستضافة الذاتية أو التشغيل على شبكة منزلية عادية.** (لمن يقرأ في الخلف: هذا يمكن أن يسمح بالوصول إلى حاويات التطوير على جهاز MacBook الخاص بك!!!)

> ⚠️ **تحذير #1:** يمكن للمنافذ التي ينشرها Docker أن تتجاوز قواعد الجدار الناري التي ظننت أنها تحمي المضيف، خاصةً مع UFW على Ubuntu/Debian. هذا لا يجعل كل قاعدة جدار ناري عديمة الفائدة، لكنه يعني أن “UFW يقول deny” ليس دليلًا قاطعًا. [انظر المشكلة #690: Docker يتجاوز قواعد ufw للجدار الناري](https://github.com/moby/moby/issues/690).

> ⚠️ **تحذير #2:** ربط المنافذ بعناوين IP محلية (مثلًا `-p 127.0.0.1:8080:80`) هو الإعداد الافتراضي الصحيح، لكن إصدارات Docker Engine الأقدم من 28.0.0 كان لديها حالات يمكن فيها للمضيفين على نفس شبكة L2 الوصول إلى المنافذ المنشورة على localhost. [توثّق Docker هذه الملاحظة في دليل نشر المنافذ](https://docs.docker.com/engine/network/port-publishing/)، ولا يزال عادة التحقق باستخدام nmap مهمًا.

<p class="inset">إذا فوجئت بهذا، فأنت لست وحدك!</p>

**الربط إلى عناوين IP محلية لا يزال ممارسة جيدة** وله تأثير ملحوظ في **بيئات السحابة المدارة والشبكات المكوّنة خصيصًا**.  
{/* لا تعتبر جدارك الناري أو شبكتك الخاصة دفاعك الرئيسي أو الوحيد، أضف شبكات Docker إلى المزيج للحصول على **عزل** أفضل، وفكر دائمًا إذا ما كنت بحاجة إلى كشف المنافذ أصلاً. */}

### مثال Docker Compose

فيما يلي ملف `docker-compose.yml` يربط خدمة `app` بـ `127.0.0.1:8080` ويصل كلا الحاويتين بشبكة مخصصة تسمى `backend`.

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

كما هو الحال مع جميع تدابير الأمان، من الضروري أن **تختبر وتتحقق** من إعدادات شبكتك. */}

{/* بينما أمان الشبكة والتدقيق مسؤولية بدوام كامل في معظم الشركات، فإن معظم مستخدمي الاستضافة الذاتية لا يقضون أي وقت على الإطلاق في ذلك! */}

{/* انظر، أفهم ذلك، قد يبدو مخيفًا. _(الشبكات الفرعية، أقنعة الشبكة، CIDR، VLANs، وجداول التوجيه، يا إلهي! إذا لم يكن ذلك واضحًا، لا بأس، أنت في المكان الصحيح. ولا حاجة للقلق بشأن كل ذلك الآن.)_ */}

### أفضل ممارسات الشبكة

- 🏆 **لا تنشر أي منافذ** تعلمت مؤخرًا أن هذا أكثر فائدة مما قد تتوقع! عند استخدام شبكة مسماة (جسر)، تكون الحاويات لديها وصول غير مفلتر إلى بعضها البعض. إنها تتصرف كما لو كانت خلف شبكة محلية (بوابة NAT).
  - رغم أن ذلك غير ممكن في جميع الحالات، قد يكون مفيدًا للحاويات التي تشغل وظائف دفعات، أو التي تُستَخدم أساسًا عبر `attach` أو `exec`.
- 🥇 **استخدم شبكات Docker** لعزل والتحكم في الحاويات التي يمكنها التواصل مع بعضها.
- 🥉 **استخدم ربط localhost**: رغم أنه [غير كامل](https://github.com/moby/moby/issues/45610)، فإن ربط المنافذ عادةً إلى عنوان loopback (مثلًا `127.0.0.1:8080:80`) يكون أفضل. فقط تأكد من أنك [تحقق من إعدادك.](#-monitoring--verification)

## 🛡️ ضوابط الوصول

ضوابط الوصول جزء أساسي من تأمين خدمات Docker الخاصة بك. يشمل ذلك تقييد قدرات الحاويات وأذوناتها، تقييد الوصول إلى مقبس Docker، وأكثر.

- [تقييد قدرات الحاوية](#limiting-container-capabilities)
- [الوصول إلى مقبس Docker](#docker-socket-access)
- [حجب الدول!](#blocking-country)
- [تقوية مضيف CloudFlare Proxy](#hardening-cloudflare-proxy-host)

### تقييد قدرات الحاوية

ممارسة قوية أخرى لضبط الوصول هي تقييد قدرات الحاويات. هذا يقلل من نطاق الضرر للعديد من التهديدات، من تصعيد الامتيازات إلى اختطاف المرور. ليست درعًا حصينيًا، لكنها تحذف الأذونات التي لا تحتاجها معظم الحاويات.

**ما هي القدرات؟** أذونات أو إمكانات مسماة يعرّفها نواة Linux. (صفحة الدليل [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) تحتوي على القائمة الكاملة.) تشمل أمورًا مثل `CAP_CHOWN` (تغيير ملكية الملفات)، `CAP_NET_ADMIN` (تهيئة واجهات الشبكة)، `CAP_KILL` (قتل أي عملية)، وغيرها الكثير.

الطريقتان لتحديد القدرات المطلوبة:

1. **التجربة والخطأ**: هذه الطريقة الأبطأ لكن الفعّالة تبدأ بدون أي قدرات، ثم تُضيفها واحدةً تلو الأخرى حتى يعمل تطبيقك.
2. **البحث عن عمل مسبق**: ابحث عن "`project-name` `cap_drop` Dockerfile" أو "`project-name` `cap_drop` docker-compose.yml" لترى إذا كان آخرون قد أجروا ذلك بالفعل. يمكن للـ LLM أن يقترح نقطة انطلاق، لكن اعتبره تخمينًا حتى تختبر الحاوية وتقرأ وثائق الصورة.

#### أفضل ممارسات القدرات

- **إسقاط جميع القدرات**: استخدم `cap_drop: [ ALL ]` لإسقاط جميع قدرات Linux من الحاوية.
- **لا امتيازات جديدة**: استخدم `security_opt: [ no-new-privileges=true ]` لمنع الحاوية من اكتساب امتيازات جديدة.

```yaml title="Example: Drop/Limit Capabilities" {5-14}
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

الآن يمكن لخدماتك التواصل مع بعضها عبر شبكة `db-network`. سيقوم Docker Compose بإنشاء تلك الشبكة تلقائيًا.

استخدم خيار `--external`/`external:` للانضمام إلى **شبكة موجودة مسبقًا**. احذف الخيار لإنشاء شبكة جديدة.

### وصول مقبس Docker

#### ⚠️ تحذير: `docker.sock` هو أساسًا وصول مسؤول المضيف

<blockquote class="inset">⚠️ خيار `:ro` لا يؤثر على عمليات الإدخال/الإخراج المرسلة عبر المقبس!</blockquote>

إنه يضمن فقط أن مسار المقبس نفسه مُركب للقراءة فقط. يمكن لاستدعاءات API المرسلة عبر ذلك المقبس ما زالت إنشاء حاويات، ربط مسارات المضيف، والقيام بأشياء أخرى مثيرة ربما لم تقصد تفويضها.

{/* أي عملية يمكنها "فتح" المقبس يمكن (على الأرجح) الحصول على صلاحيات الجذر على المضيف. */}

#### أفضل ممارسات المقبس

- 🥇 **تجنب تركيب مقبس Docker،** فغالبًا هناك بديل أفضل.
- 🫣 إذا اضطررت، **ضع بروكسي ضيق أمامه** واسمح فقط بنقاط النهاية في API التي يحتاجها التطبيق فعليًا. اطلع على مشروع `docker-socket-proxy` الأصلي من Tecnativa، [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). ثم تحقق من أن المكالمات المرفوضة محظورة فعلاً.
- 🤢 حسنًا، _ربما_ مشاركة المقبس مقبولة في بيئة اختبار **عالية الثقة** و**منخفضة المخاطر**.

#### حظر الدول!

أحيانًا يكون مفيدًا، لكنه ليس حدًا أمنيًا حقيقيًا.

_نتحدث عن الكيان الجيوسياسي، ليس الموسيقى..._

إذا كنت تستضيف التطبيقات في الغالب لعائلتك وأصدقائك المحليين، يمكنك حظر حركة المرور من الدول التي لا تتوقع استقبالها. أو السماح فقط بحركة المرور من الدول التي تتوقعها. هذا يقلل الضوضاء؛ لكنه لا يوقف VPNs أو البروكسيات أو بوت نت أو أي شخص صبور.

تحقق من هذا السكريبت لحظر كل الحركة الواردة من الصين:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

وبالمثل، يمكنك السماح فقط لحركة المرور من الولايات المتحدة:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### تقوية استضافة وكيل CloudFlare

إذا كان خادمك المنزلي محميًا خلف عنوان IP من CloudFlare (وكيل)، يمكنك تقييد الوصول إلى عناوين IP الخاصة بـ CloudFlare فقط، وشبكتك المحلية.

هذا مشابه قليلاً لـ[حجب الدول](#blocking-country) أعلاه، لكنه يوفر تحكمًا أكثر صرامة.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # حظر كل الوارد!!!
ufw default allow outgoing # السماح بكل الصادر
ufw allow ssh # السماح بالوصول عبر SSH

# السماح بالوصول للشبكة الفرعية المحلية (يفضل أن تكون DMZ/VLAN مخصصة للخدمات المستضافة)
ufw allow from 10.0.0.0/8 to any port 443

# السماح لعناوين IP الخاصة بـ CloudFlare
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# إضافة دعم IPv6
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

لاختبار التغييرات القائمة على الموقع الجغرافي يمكن أن يكون VPN يملك نقاط وصول في الدولة المطلوبة مفيدًا. راجع المزيد في قسم [المراقبة والتحقق](#-monitoring--verification).

### أمان طبقة التطبيق

بعد أن تكون [شبكتك والمضيف صُقلتا أمنيًا](#-network-hazard)، قد تكتشف أن هناك المزيد للقيام به.

الآن علينا التفكير في طبقة "التطبيق" الخاصة بخدماتنا نفسها.

<p class="inset">هل قاعدة البيانات هذه لديها كلمة مرور صالحة؟ هل هذا الحاوية تُؤتمت HTTPS/الشهادات؟ هل التطبيق يتضمن مصادقة مدمجة؟ هل هناك حدود على عناوين البريد التي يمكنها التسجيل؟ هل توجد بيانات اعتماد افتراضية أو متغيّر بيئي لتغييره؟</p>

الطريقة الوحيدة لـ _معرفة_ ذلك هي الفحص. في هذه الحالة، ابدأ بملف `README` والملفات الرئيسية الأخرى مثل `docker-compose.yml` و `Dockerfile` و `.env.*`. في كل من المشروع، ويفضل أيضًا في الخدمات الداعمة له. (مثل PostgreSQL، Redis، إلخ.)

#### وكيل عكسي

طبقة دفاع أخرى هي المصادقة الأساسية. لا تستخدمها بدون HTTPS. بالنسبة للخدمات القديمة، وضع المصادقة الأساسية أمام مسار الإدارة غالبًا ما يكون كافيًا لإيقاف الطلبات العشوائية والزواحف غير الموثقة من الوصول مباشرةً إلى العنصر.

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

مع وكيل المصادقة الأساسية، يحصل المهاجمون على عائق إضافي — اسم مستخدم وكلمة مرور — قبل أن يصلوا إلى خدمتك الداخلية.

خيار آخر هو استخدام خدمة مثل [Traefik](https://traefik.io/) أو [Caddy](https://caddyserver.com/) التي يمكنها أتمتة HTTPS والمصادقة الأساسية لك.

إذا كنت تريد إدارة العديد من النطاقات والخدمات عبر واجهة رسومية، فأنا أوصي بـ [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 المراقبة والتحقق

- [تحقق من منافذك](#check-your-ports)
- [عرض المنافذ المفتوحة](#view-open-ports)
- [مراقبة الملفات](#file-monitoring)

هذه هي **أهم خطوة وأشدها إهمالًا**. يمكنك أن تمتلك أفضل جدار ناري، وأفضل شبكة، وأفضل الممارسات، ولكن إذا لم تتحقق منها، فلن تعرف ما إذا كانت تعمل.

بالإضافة إلى ذلك، معرفة عدد قليل من الأوامر—أو أين تبحث عنها—يمكن أن تكون الفارق بين منع اختراق أو لا. الشعور بأنك مخترق هو مجرد مكافأة. (للتفاصيل والأمثلة، انتقل إلى قسم [المراقبة والتحقق](#-monitoring--verification).)

<p class="inset">لا تثق، تحقق مرتين</p>

### تحقق من منافذك

<p class="inset">⚠️ مهم: لا تقم بمسح المضيفين الذين لا تملكهم.</p>

سواء كنت على شبكة منزلية أو خادم VPS، ستحتاج إلى معرفة أي المنافذ مفتوحة للعالم.

هناك طريقتان للقيام بذلك:

- فحص الشبكة (`nmap`، `masscan`)
- سؤال نظام التشغيل (`lsof`، `netstat`، `ss`)

#### اختبار خارج شبكتك

ستحتاج إلى عنوان IP العام الحالي، ويمكنك الحصول عليه بسهولة عبر خدمات مثل `ifconfig.me`: `curl https://ifconfig.me`. أو ابحث عنه في لوحة تحكم مزود الاستضافة الخاص بك.

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

بعد حصولك على عنوان IP العام، تحتاج الآن إلى **الاتصال بشبكة خارجية**. يمكنك استخدام جهاز صديق، هاتف/نقطة اتصال 5G، أو خادم مخصص.

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"
```

# ملاحظة: تأكد من أن `target_host` هو عنوان الـ IP المطلوب

# فحص منافذ محددة:
nmap -A -p 80,443,8080 --open --reason $target_host
# أعلى 100 منفذ:
nmap -A --top-ports 100 --open --reason $target_host
# جميع المنافذ
nmap -A -p1-65535 --open --reason $target_host

```

#### اختبار داخل شبكتك

جرّب استخدام `nmap`، افحص شبكتك المحلية أو أحد خوادمك، وتحقق من الراوتر، الطابعة، الثلاجة الذكية.

{/* بينما فحص المنافذ هو واقع مستمر، قد يُعدّ انتهاكًا لقانون CFAA (قانون الاحتيال والاعتداء على الحواسيب) في الولايات المتحدة. لذا، افحص فقط ما تملكه. */}

#### أوامر فحص مثال

```bash

# فحص جهازك المحلي لجميع المنافذ المفتوحة
nmap -sT localhost

# فحص IP الخاص بجهازك للخدمات
nmap -sV 192.168.1.10

# العثور على تفاصيل الخدمات في شبكتك
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# أو على شبكة Docker 172.18.0.1/16
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

تعرّف على `lsof` – وهو متاح على macOS وLinux. يعرض حالة الشبكة التفصيلية ونشاط القرص.

```bash title="lsof Commands"
# مراقبة منفذ محدد
sudo lsof -i:80 -Pn

# مراقبة الاتصالات المثبتة (ESTABLISHED)
sudo lsof -i -Pn | grep ESTABLISHED
# عرض LISTEN
sudo lsof -i -Pn | grep LISTEN

# لرؤية أسماء الشبكات بدلًا من عناوين IP (قد يكون بطيئًا بسبب عمليات البحث العكسية DNS)
sudo lsof -i -P | grep LISTEN
```

# مراقبة جميع اتصالات الشبكة
sudo watch -n1 "lsof -i -Pn"

#### مثال على المخرجات

![nmap scan for listeners](../lsof-scan-listen.webp)

### مراقبة الملفات

لتحديد أي **العمليات** تستهلك أكبر قدر من **عرض النطاق الترددي للقرص الصلب**، يمكنك استخدام `iotop`:

```bash
sudo iotop
```

لرؤية تغييرات الملفات الفردية، يمكنك استعمال `inotifywait` على لينكس أو `fswatch` على macOS:

يمكن أن يكون هذا مفيدًا لاكتشاف سلوك غير مصرح به أو غريب على مستوى المجلد أو على مستوى النظام بأكمله.

```bash
# مراقبة جميع تغييرات الملفات في دليل
sudo inotifywait -m /path/to/directory
```

على macOS يمكنك استعمال `fswatch`:

التثبيت عبر `brew install fswatch`

```bash
fswatch -r /path/to/directory
```

## ⏰ نصائح غالبًا ما تُهمل

1. **تحديد معدل** لمحاولات المصادقة وأي نقاط نهاية حساسة أخرى. سواءً عبر وحدة `limit_req` في Nginx أو `fail2ban` للوصول عبر SSH، فإن تقييد هجمات القوة الغاشمة *ربما* فكرة جيدة. أقول *ربما* لأن عصر IPv6 وشبكات البوتات الرخيصة غير ما كان عليه من قبل.

2. **استخدام وحدات تخزين للقراءة فقط** حيثما أمكن:
   ```yaml
   services:
     webapp:
       volumes:
         - ./config:/config:ro
   ```
   مع ممارسات أخرى (مستخدمون غير جذريين، أذونات مجلدات محدودة)، يوفر خيار تركيب `:ro` طبقة إضافية من الحماية ضد التغييرات غير المقصودة وبعض محاولات الكتابة من داخل الحاوية. لكنه لا يحمي المضيف من عملية لديها صلاحيات أوسع بالفعل.

3. **تدقيق وصول الحاويات** بانتظام. إذا لم تكن الحاوية بحاجة إلى سر، أو منفذ، أو تركيب، فأزلها!

4. **احذر من فوضى الواي‑فاي**  
   من المؤكد أنك لن تعطي كلمة مرور الواي‑فاي لأي شخص غريب، أليس كذلك؟ ربما تستثني بعض الأصدقاء… أو العائلة. لا يمكنك معرفة التطبيقات التي يستخدمونها والتي قد تشارك SSID وكلمة المرور مع العالم.

### الشبكة المنزلية مقابل المزود العام مقابل النفق

1. **العزل الافتراضي/DMZ**: للخوادم المنزلية، ضعها على VLAN أو DMZ منفصل إذا أمكن. هذا يبقي أجهزتك الداخلية بعيدًا عن أي اختراق محتمل من جانب الخادم.  
   - استخدم راوترًا منفصلًا أو VLAN لخادمك المنزلي.  
   - استخدم شبكة Wi‑Fi منفصلة لخادمك المنزلي.  
   - استخدم شبكة فرعية منفصلة لخادمك المنزلي.

2. **مزودو السحابة**: Hetzner، Vultr، DigitalOcean، Linode، AWS، Azure، وGoogle Cloud جميعهم يقدمون ميزات جدار ناري مختلفة.  
   - بعض المزودين والخدمات تحجب المنافذ افتراضيًا. بعضها يتيح خيارات اختيارية أو إضافات. راجع وثائق مزود الخدمة الخاص بك.  
   - العديد من المزودين يقدمون خدمات مراقبة متقدمة واكتشاف تهديدات.

3. **الشبكات الافتراضية الخاصة (VPN) والنفق**: فكر في استخدام خيار شبيه بـ VPN أو خدمة نفق لتوصيل الخدمات عبر الإنترنت بأمان دون كشفها للإنترنت العام.  
   - TailScale، ngrok، ZeroTier.  
   - WireGuard، OpenVPN.

{/* 3. **Hardening Against Internal/Lateral Attacks**: One infected device can compromise an entire network. Segmenting Docker services on custom networks, using hardware, UFW rules, and blocking unneeded ports can all help reduce risk (when properly configured.) */}

## 🚀 قائمة التحقق للإنتاج

- [ ] **الأسرار**: جميع الأسرار مُولَّدة عشوائيًا ومخزَّنة بأمان  
- [ ] **التحديثات**: استراتيجية تحديث الحاويات موثقة ومؤتمتة. (يكفي أن تكون بضع أوامر في ملف نصي.)  
- [ ] **الشبكة**: فقط المنافذ الضرورية مكشوفة، والشبكات الداخلية مُعدَّة.  
- [ ] **قواعد الجدار الناري**: رفض افتراضي، السماح الصريح، حجب دول إذا لزم الأمر.  
- [ ] **الوكيل العكسي**: Nginx أو Caddy أو Traefik يمكن أن يضيف طبقة من المصادقة الأساسية.  
- [ ] **رموز الكناري**: ضعها قرب الملفات الحساسة والاعتمادات التي ستتحقق منها فعليًا إذا تم لمسها.  
- [ ] **المراقبة**: تعرف على أنظمتك باستخدام `nmap`، `lsof`، `inotifywait`، `glances`، إلخ.  
- [ ] **استراتيجية النسخ الاحتياطي**: مختبرة، ويفضل أن تكون مؤتمتة، ومخزَّنة خارج الموقع.  
- [ ] **أقل صلاحية**: مستخدمو الحاوية غير جذر، أحجام قراءة‑فقط.

## 📚 قراءة إضافية

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)  
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)  
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)  
- [Canarytokens.org for Canary Tokens](https://canarytokens.org/)

## Thanks

تحية لبعض مستخدمي Reddit المتحمسين:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>  
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>  
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>  
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>  
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

شكرًا للقراءة! آمل أن يكون هذا الدليل مفيدًا لك. إذا كان لديك أي أسئلة أو اقتراحات، لا تتردد في التواصل معي عبر وسائل التواصل الاجتماعي أدناه، أو اضغط على رابط `Edit on GitHub` لإنشاء طلب سحب! ❤️
````
