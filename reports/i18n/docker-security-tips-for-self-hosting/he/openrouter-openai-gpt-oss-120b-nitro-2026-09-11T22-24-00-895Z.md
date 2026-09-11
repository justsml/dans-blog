# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/he/index.mdx
- Validation: deferred
- Runtime seconds: 9.21
- Input tokens: 19288
- Output tokens: 10574
- Thinking tokens: unknown
- Cached input tokens: 6656
- Cache write tokens: 0
- Estimated cost: $0.002656
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: טיפים חיוניים לאבטחת Docker לאירוח עצמי
subTitle: 'הגן על השירותים המארחים שלך, מהגנה ועד ניטור!'
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

**תוכן עניינים**

- 🧗‍♀️ [למתמודדים](#-למתמודדים)
- 🔄 [ריקוד `:latest`](#-ריקוד-latest)
- 🔐 [ניהול סודות: הדרך הנכונה](#-ניהול-סודות-הדרך-הנכונה)
- 🌐 [סכנת רשת](#-סכנת-רשת)
- 🛡️ [בקרות גישה](#-בקרות-גישה)
- 🔍 [ניטור ואימות](#-ניטור-אימות)
- ⏰ [טיפים שנשכחים לעיתים קרובות](#-טיפים-שנשכחים-לעיתים-קרובות)
- 🚀 [רשימת בדיקה לייצור](#-רשימת-בדיקה-לייצור)
- 📚 [קריאה נוספת](#-קריאה-נוספת)

## 🧗‍♀️ למתמודדים

אם אתה מארח שירותי Docker בעצמך, האבטחה היא באחריותך מהקצה לקצה — אין ספקן ענן שיגן אותך מסריקות פורטים או קונפיגורציה רשלנית. בין אם אתה מריץ אפליקציות ברשת הביתית שלך או שוכר VPSים מספקים כמו Vultr, DigitalOcean, Linode, AWS, Azure או Google Cloud, תצטרך לנעול את המערכת — ולאמת שעשית זאת נכון.

במדריך זה נעבור על אבטחת Docker — מטכניקות `פחות מוכרות` ועד ל`קשות להשגה`; נחקור אסימוני קנרי, נפחי קריאה בלבד, חוקים לחומת אש, סגמנטציה וחיזוק רשת, הוספת פרוקסי מאומת ועוד.

נשווה גם רשתות ביתיות לסביבות ענן ציבוריות ונראה איך להקים פרוקסי בסיסי עם Nginx. בסיום יהיו לך מספר אפשרויות למנוע גישה למזיקים (חברים, משפחה, ולפעמים אפילו לעצמך…).

זה הרבה חומר! אבל רובו רלוונטי, ותוכל לבחור מהמתאים ביותר לסביבה שלך. 🍀

## 🔄 ריקוד `:latest`

שמירת תמונות מעודכנות היא קריטית לאבטחה. עם זאת, הסתמכות על `:latest` יכולה להכניס שינויים שבורים או בניות פגיעות ללא שלב ביקורת.

### הדרך הבטוחה לעדכן

שילוב פקודות עדכון עם `pull` או `build` מאפשר רענון מכוון של התמונות, ולאחר מכן הפעלה מחדש בחלון שבו ניתן לשים לב לשבירות.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### קיבוע גרסה מול Latest

בחירת גרסה לקיבוע היא איזון בין יציבות לאבטחה. הנה כמה אסטרטגיות נפוצות:

```yaml
# docker-compose.yml
# ...
  # קיבוע גרסה מדויק, אידיאלי לשירותים קריטיים
  image: postgres:17.2

  # קיבוע גרסת תיקון, מתאים לשירותים לא קריטיים
  image: postgres:17.2

  # קיבוע גרסה ראשית, מושלם לפרויקטים תחביביים
  image: postgres:17

  # יולו, להימנע אם אפשר
  image: postgres:latest
```

השתמש ב-[Dependabot](https://github.com/features/security) או ב-[Renovate](https://github.com/renovatebot/renovate) כדי לפתוח בקשות משיכה שניתנות לביקורת. לכל דבר שתצטרך לבנות מחדש בשעה 2 לפנות בוקר, קבע גרסה ספציפית או דיגסט ותן לאוטומציה להודיע מתי לעדכן.

_ספר לי על הכלים האהובים עליך לשמירת עדכניות של תמונות Docker!_

## 🔐 ניהול סודות

- [יצירת סודות חזקים](#generate-strong-secrets)
- [אסימוני קנרי](#canary-tokens)
- [שדרוג מ-`.env` ל‑Keychain של macOS](#upgrade-from-env-to-macos-keychain)
{/* - [אימות מצייני מקום](#placeholder-validation) */}

ישנן דרכים רבות לניהול סודות, אך אחד הכללים החשובים ביותר לשמור עליו הוא: **לעולם אל תכתוב סודות בקוד של תמונות Docker או תדחף אותם ל‑git.** זו אחת הטעויות השכיחות ביותר בתחום האבטחה, היא יוצרת סיכון ארוך‑טווח, ותיקונה כואב.

אחסון סודות בצורה מאובטחת הוא נושא משמעותי עם מגוון אפשרויות, מקבצי `.env`, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), או מנהל סודות כמו [HashiCorp Vault](https://www.vaultproject.io/) או AWS Secrets Manager.

תצטרך לבחור את רמת המאמץ והאבטחה „המתאימה” למקרה השימוש שלך.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Placeholder Validation

<blockquote>You wouldn't believe how easy it is to hack a JWT token when the secret isn't secret!</blockquote>

<p className='inset'>💡 Ensure secrets are always unique. Try make it impossible to run with unsafe/hard-coded defaults.</p>

If you use placeholders like `__WARNING_REPLACE_ME__` in your secrets, great, maybe someone will notice!

Just in case, you can also add a little runtime safety with little effort. Here’s how you might do it in JavaScript, Rust, and Go:

<CodeTabs client:load tabs={["Helper commands", "Persist secrets in environment", "Use secrets per command"]}>

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

### יצירת סודות חזקים

הנה סקריפט קטן ליצירת סודות חדשים עבור קובץ `.env`:

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

### אסימוני קנרי

[**Canary Tokens**](https://canarytokens.org/) הם דרך מצוינת לאתר אם הסודות שלך נחשפו (והשתמשו בהם). הם כמו חוט רגיש שניתן להוסיף לכל קבצים רגישים, כתובות URL, וטוקנים.

שקול למקם אותם ליד הסודות שאתה באמת מודאג מהם: קבצי `.env`, משתני CI, מנהלי סיסמאות, תיקיות גיבוי, ופרטי גישה לענן. אל תהפוך זאת לתיאטרון; הנח חוטי רגישות במקומות שבהם תוקף אמיתי או טעות של „העתיד‑אני” יגעו.

קיימים סוגים רבים של אסימוני קנרי לבחירה, כגון אסימוני AWS, מספרי כרטיסי אשראי מזוייפים, קבצי Excel & Word, קבצי Kubeconfig, פרטי VPN, ואף קבצי dump של SQL יכולים לכלול חוט רגיש!

#### שיטות עבודה מומלצות לאסימוני קנרי

- **הצבה בכל מקום**: בכל קובץ `.env`, צינור CI/CD, ו"מנהל סיסמאות" שבו תוכל לחשוב.
  - הצב קובץ `passwords.xlsx` או `passwords.docx` בתיקיית הבית שלך.
  - הוסף פרופיל AWS `billing_prod` עם אסימון קנרי כסוד.
  - צור קובץ `private.key` עבור תיקיית `~/.ssh` שלך.
  - צור dump של SQL קנרי `all_credit_cards.sql` עבור תיקיית `~/backups` שלך.
- **מעקב**: הגדר כללי/התראות דוא"ל כדי לתפוס כאשר אסימון קנרי מופעל.

### שדרוג מ-`.env` ל-Keychain של macOS

למשתמשי Mac, אחת האפשרויות הפשוטות היא להשתמש ב-Keychain.

הנה דרך פשוטה לאוטומציה של טעינת סודות מ-Keychain של OSX, תומכת ב-`TouchID`, והיא בטוחה במקצת יותר מקבצי `.env`.

מקור: [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) ו-[Jan Schaumann](https://www.netmeister.org/).

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### Functions for setting and getting environment variables from the OSX keychain ###
### Adapted from: https://www.netmeister.org/blog/keychain-passwords.html and 
Original credit: [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) and [Jan Schaumann](https://www.netmeister.org/).

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
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ...
```
</CodeTabs>

## 🌐 סכנת רשת

### רשתות מותאמות אישית ויציאות פנימיות

בידוד שירותים עם רשתות Docker הוא דרך חשובה להפחתת שטח ההתקפה שלך.

היה זהיר בפתיחת חורים ברשת! פורט פורוורדינג לא מוגדר כראוי יכול להסתיים בצורה גרועה.

בברירת מחדל, שירותים ברשת LAN פרטית לא יחשפו לאינטרנט – עליך להעביר פורטים במפורש מהנתב שלך.

### Docker ב-LAN

בין אם אתה מפתח שמריץ שרתי פיתוח מקומיים, או שמארח שירותים מהרשת המקומית שלך, **הנחות לגבי מודל הרשת של Docker יכולות לגרום לבעיות**.

מפתחים רבים מופתעים לגלות שהשיטות 'המסורתיות' לאבטחת שרתי לינוקס (`iptables`, הגבלת אפשרויות sysctl של tcp/ip) יכולות **להיכשל בשקט** במארחי Docker! זה במיוחד נכון כאשר **מתארחים בעצמכם או מריצים ברשת ביתית טיפוסית**. (לאנשים שבפינה: זה יכול לאפשר גישה למכולות פיתוח על ה-MacBook שלכם!!!)

> ⚠️ **אזהרה #1:** פורטים שפורסמו על‑ידי Docker יכולים לעקוף את כללי חומת האש שחשבת שמגנים על המארח, במיוחד עם UFW ב‑Ubuntu/Debian. זה לא הופך כל כלל חומת אש לחסר תועלת, אך משמעותו ש-"UFW אומר deny" אינו הוכחה. [ראה נושא #690: Docker מדלג על כללי ufw](https://github.com/moby/moby/issues/690).

> ⚠️ **אזהרה #2:** קשירת פורטים לכתובות IP מקומיות (למשל, `-p 127.0.0.1:8080:80`) היא ברירת המחדל הנכונה, אך גרסאות Docker Engine לפני 28.0.0 כללו מקרים שבהם מארחים באותה רשת L2 עדיין יכלו להגיע לפורטים שפורסמו ל‑localhost. [Docker מתעדת את האזהרה במדריך פרסום הפורטים שלה](https://docs.docker.com/engine/network/port-publishing/), וההרגל של אימות עם nmap למטה עדיין רלוונטי.

<p class="inset">אם זה הפתיע אותך, אתה לא לבד!</p>

**קישור ל‑IP מקומי עדיין נוהל טוב** ויש לו השפעה משמעותית ב**סביבות ענן מנוהלות ורשתות מוגדרות במיוחד**. 
{/* אל תחשוב על חומת האש או הרשת הפרטית שלך כהגנה הראשית או היחידה, הוסף רשתות Docker לתערובת לקבלת **בידוד** טוב יותר, ותמיד שקול אם אתה צריך לחשוף פורטים בכלל. */}

### דוגמת Docker Compose

הנה קובץ `docker-compose.yml` לדוגמה שמקשר את שירות `app` ל‑`127.0.0.1:8080` ומחבר את שני המכולות לרשת המותאמת `backend`.

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

{/* #### בדיקה ואימות

כמו בכל אמצעי אבטחה, חשוב **לבדוק ולאמת** את תצורת הרשת שלך. */}

{/* בעוד אבטחת רשת וביקורת היא אחריות מלאה ברוב החברות, רוב המארחים העצמאיים לא משקיעים שום זמן בזה! */}

{/* תראו, אני מבין – זה יכול להיראות מרתיע. _(תתי‑רשתות, מסכות רשת, CIDR, VLAN‑ים, וטבלאות ניתוב – אם זה לא ברור, זה בסדר, אתם במקום הנכון. כרגע לא נצטרך לדאוג לכל זה.)_ */}

### שיטות מיטביות לרשת

- 🏆 **אל תפרסמו אף פורט** – למדתי לאחרונה שזה מועיל יותר ממה שחשבתם! כאשר משתמשים ברשת ממוסגרת (bridge), למכולות יש גישה בלתי מסוננת זו לזו. הן פועלות כאילו הן מאחורי רשת מקומית (שער NAT).
  - למרות שלא תמיד אפשרי, זה יכול להיות שימושי למכולות שמריצות משימות אצווה, או שניגשות בעיקר דרך `attach` או `exec`.
- 🥇 **השתמשו ברשתות Docker** כדי לבודד ולשלוט באילו מכולות ניתן לתקשר.
- 🥉 **קיבוע ל‑localhost**: למרות שהדבר **לא מושלם** ([פרטים](https://github.com/moby/moby/issues/45610)), בדרך כלל עדיף לקשור פורטים לכתובת לולאה (למשל `127.0.0.1:8080:80`). רק ודאו שאתם **מאמתים את ההגדרה** שלכם. ([אימות והמעקב](#-monitoring--verification))

## 🛡️ בקרות גישה

בקרות גישה הן חלק קריטי באבטחת שירותי Docker שלכם. זה כולל הגבלת יכולות וההרשאות של המכולות, הגבלת הגישה לשקע Docker, ועוד.

- [הגבלת יכולות קונטיינר](#הגבלת-יכולות-קונטיינר)
- [גישה לשקע Docker](#גישה-לשקע-docker)
- [חסימת מדינה!](#חסימת-מדינה)
- [חיזוק מארח פרוקסי של CloudFlare](#חיזוק-מארח-פרוקסי-של-cloudflare)

### הגבלת יכולות קונטיינר

פרקטיקה נוספת לבקרת גישה היא להגביל את היכולות של המכולות. זה מצמצם את רדיוס הפגיעה של איומים שונים, מהסליקה של הרשאות ועד חטיפת תעבורה. זה לא שדה כוח, אך הוא מסיר הרשאות שרוב המכולות אינן זקוקות להן.

**מהן יכולות?** הרשאות או יכולות מוגדרות בליבת לינוקס, בעלות שם. (דף ה‑man [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) מכיל רשימה מלאה.) הן כוללות, למשל, `CAP_CHOWN` (שינוי בעלות קובץ), `CAP_NET_ADMIN` (הגדרת ממשקי רשת), `CAP_KILL` (הריגת תהליך), ועוד רבים.

שתי השיטות לקבוע אילו יכולות נדרשות:

1. **נסיון וטעייה** – מתחילים ללא יכולות, מוסיפים אחת אחרי השנייה עד שהאפליקציה עובדת.
2. **חיפוש עבודה קיימת** – חפשו `"project-name" "cap_drop" Dockerfile` או `"project-name" "cap_drop" docker-compose.yml` כדי לראות אם אחרים כבר טיפלו בזה. מודל שפה גדול יכול להציע נקודת התחלה, אך יש להתייחס אליו כהשערה עד לבדיקת המכולה וקריאת תיעוד התמונה.

#### פרקטיקת יכולות

- **השלכת כל היכולות**: השתמשו ב‑`cap_drop: [ ALL ]` כדי להסיר את כל היכולות הלינוקסיות מהמכולה.
- **אין הרשאות חדשות**: השתמשו ב‑`security_opt: [ no-new-privileges=true ]` כדי למנוע מהמכולה לקבל הרשאות חדשות.

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

כעת השירותים שלכם יכולים לתקשר זה עם זה דרך רשת `db-network`. Docker Compose ייצור רשת זו אוטומטית.

השתמשו באופציית `--external`/`external:` כדי להצטרף ל‑**רשת קיימת**. השאירו אותה ריקה כדי ליצור רשת חדשה.

### גישה לשקע Docker

#### ⚠️ אזהרה: `docker.sock` הוא בעצם גישה מנהלית למארח

<blockquote class="inset">⚠️ האפשרות `:ro` אינה משפיעה על I/O שנשלח דרך השקע!</blockquote>

האפשרות רק מבטיחה שהנתיב של השקע עצמו מותקן כקריאה‑רק. קריאות ה‑API שנשלחות דרך השקע עדיין יכולות ליצור מכולות, לעגן נתיבי מארח, ולעשות פעולות מרגשות אחרות שאולי לא התכוונת לאפשר.

{/* כל תהליך שיכול "לפתוח" את השקע יכול (כנראה) לקבל גישה שורשית למארח. */}

#### פרקטיקת שקע

- 🥇 **הימנעו מהצמדת שקע Docker**, יש סביר יותר פתרון חלופי.
- 🫣 אם חייבים, **הציבו פרוקסי צר לפניו** והאפשרו רק את נקודות הקצה של ה‑API שהאפליקציה באמת צריכה. ראו את פרויקט `docker-socket-proxy` של Tecnativa, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). לאחר מכן וודאו שהקריאות שנדחו אכן נדחו.
- 🤢 אולי שיתוף השקע מקובל בסביבת בדיקה **באמון גבוה**, **סיכון נמוך**.

#### חסימת מדינה!

לפעמים זה שימושי, אך לא גבול אבטחה אמיתי.

_מדברים על הישות הגיאופוליטית, לא על המוזיקה..._

אם אתם מארחים אפליקציות בעיקר למשפחה ולחברים המקומיים, אפשר לחסום תעבורה ממדינות שלא מצפים לקבל תעבורה מהן. או לאפשר רק תעבורה ממדינות שמצפים אליהן. זה מצמצם רעש; הוא לא עוצר VPN‑ים, פרוקסי, בוטנטים או כל גורם אחר.

בדקו את הסקריפט הבא לחסימת כל התעבורה מסין:
---

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

באופן דומה, ניתן לאפשר רק תעבורה מארה״ב:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### חיזוק מארח פרוקסי של CloudFlare

אם השרת הביתי שלך מוגן מאחורי כתובת IP של CloudFlare (פרוקסי), ניתן להגביל גישה רק לכתובות IP של CloudFlare ולרשת המקומית שלך.

זה דומה במקצת ל[חסימת מדינה](#blocking-country) שלמעלה, אך עם שליטה הרבה יותר קפדנית.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # חסימת כל התעבורה הנכנסת!!!
ufw default allow outgoing # לאפשר כל התעבורה היוצאת
ufw allow ssh # לאפשר SSH

# לאפשר גישה לתת‑רשת המקומית (עדיף רשת DMZ/VLAN ייעודית לשירותים המארחים)
ufw allow from 10.0.0.0/8 to any port 443

# לאפשר כתובות IP של CloudFlare
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# הוספת תמיכה ב‑IPv6
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

כדי לבדוק שינויים מבוססי גאוגרפיה, VPN עם מיקומים במדינה הרצויה יכול להיות שימושי. ראה עוד בקטע [מעקב & אימות](#-monitoring--verification).

### אבטחת שכבת האפליקציה

לאחר שה-[רשת והשרת הקשיחים](#-network-hazard), ייתכן שתגלו שיש עוד מה לעשות.

עכשיו צריך לחשוב על שכבת ה„אפליקציה” של השירותים עצמם.

<p class="inset">האם למסד הנתונים הזה יש סיסמה תקפה? האם הקונטיינר הזה מייצר אוטומטית HTTPS/תעודות? האם האפליקציה כוללת אימות מובנה? האם יש מגבלות על אילו אימיילים יכולים להירשם? האם קיימים אישורים ברירת מחדל או משתני סביבה שיש לשנות?</p>

הדרך היחידה *לדעת* זאת היא לבדוק. במקרה זה, התחילו עם קובץ `README` וקבצים מרכזיים אחרים כמו `docker-compose.yml`, `Dockerfile`, ו‑`.env.*`. גם בפרויקט עצמו וגם, במידת האפשר, בשירותים התומכים שלו (למשל Postgres, Redis, וכו').

#### פרוקסי הפוך

שכבת הגנה נוספת היא אימות בסיסי. אל תשתמשו בו ללא HTTPS. עבור שירותים ישנים, הצבת אימות בסיסי לפני נתיב ניהול היא לרוב מספיקה כדי לעצור בקשות אקראיות וסורקים בלתי מאומתים מלהגיע ישירות אל המערכת.

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

יצירת אישורים:

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

עם פרוקסי אימות בסיסי, לתוקפים יש מכשול נוסף — שם משתמש וסיסמה — לפני שהם מגיעים לשירות הפנימי שלכם.

אפשרות נוספת היא להשתמש בשירות כמו [Traefik](https://traefik.io/) או [Caddy](https://caddyserver.com/) שיכול לאוטומט את HTTPS והאימות הבסיסי עבורכם.

אם אתה רוצה לנהל תחומים ושירותים רבים עם ממשק גרפי, אני ממליץ על [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 ניטור & אימות

- [בדוק את הפורטים](#בדוק-את-הפורטים)
- [הצג פורטים פתוחים](#הצג-פורטים-פתוחים)
- [ניטור קבצים](#ניטור-קבצים)

זהו **הצעד החשוב ביותר והמתעלמים ממנו ביותר**. אפשר שיהיה לך חומת אש מצוינת, רשת מושלמת, וכל הפרקטיקות הטובות, אבל אם אינך מאמת, אין לך שום מושג אם זה עובד.

בנוסף, ידיעת כמה פקודות – או היכן לחפש אותן – יכולה להיות ההבדל במניעת פריצה. תחושת היותך האקר היא רק בונוס. (לפרטים ולדוגמאות, קפוץ קדימה לקטע [ניטור & אימות](#-ניטור-אימות).)

<p class="inset">אל תסמוך, אמת פעמיים</p>

### בדוק את הפורטים

<p class="inset">⚠️ חשוב: אל תסרוק מארחים שאינם שלך.</p>

בין אם אתה ברשת הביתית או ב‑VPS, תרצה לדעת אילו פורטים פתוחים לעולם.

יש 2 דרכים לעשות זאת:

- לבדוק את הרשת (`nmap`, `masscan`)
- לשאול את מערכת ההפעלה (`lsof`, `netstat`, `ss`)

#### בדיקה מחוץ לרשת שלך

תזדקק ל‑IP הציבורי הנוכחי שלך, שניתן לקבל בקלות משירותים כמו `ifconfig.me`: `curl https://ifconfig.me`. או לבדוק זאת בלוח הבקרה של ספק האחסון שלך.

```bash title="קבל IP ציבורי"
curl -fsSL https://ifconfig.me
# --> IP ציבורי נוכחי
```

לאחר שיש לך את ה‑IP הציבורי, עליך **להתחבר לרשת חיצונית**. אפשר להשתמש במחשב של חבר, בטלפון/חיבור 5G, או בשרת ייעודי.

```bash title="סריקת nmap חיצונית"
target_host="$(curl -fsSL https://ifconfig.me)"

# הערה: ודא ש‑`target_host` הוא ה‑IP הרצוי

# סרוק פורטים ספציפיים:
nmap -A -p 80,443,8080 --open --reason $target_host
# 100 הפורטים המובילים:
nmap -A --top-ports 100 --open --reason $target_host
# כל הפורטים
nmap -A -p1-65535 --open --reason $target_host
```

#### בדיקה בתוך הרשת שלך

תרגל עם `nmap`, סרוק את הרשת המקומית או אחד השרתים שלך, בדוק את הנתב, המדפסת, המקרר החכם.

{/* בעוד שסורקי פורטים הם עובדה קבועה, הם עלולים להוות הפרה של חוק ה‑CFAA (Computer Fraud and Abuse Act) בארה״ב. לכן, סרוק רק מה שבבעלותך. */}

#### פקודות סריקה לדוגמה

```bash
# סרוק את localhost לכל הפורטים הפתוחים
nmap -sT localhost

# סרוק את ה‑IP הפרטי של המחשב שלך לשירותים
nmap -sV 192.168.1.10

# מצא פרטי שירות ברשת שלך
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# או על Docker 172.18.0.1/16
nmap -sn 172.18.0.1/16
```

```text title="סריקת nmap" frame="terminal"
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

### הצג פורטים פתוחים

היכרות עם `lsof` – הוא זמין ב‑macOS וב‑Linux. הוא מציג מצב רשת מדויק ופעילות דיסק.

```bash title="פקודות lsof"
# ניטור פורט ספציפי
sudo lsof -i:80 -Pn
```

# ניטור חיבורים במצב ESTABLISHED
sudo lsof -i -Pn | grep ESTABLISHED
# הצגת LISTEN
sudo lsof -i -Pn | grep LISTEN

# כדי לראות שמות רשת במקום כתובות IP (יכול להיות איטי מאוד לבצע חיפושי DNS הפוכים)
sudo lsof -i -P | grep LISTEN

# ניטור כל החיבורים ברשת
sudo watch -n1 "lsof -i -Pn"

```

#### פלט לדוגמה

![nmap scan for listeners](lsof-scan-listen.webp)

### ניטור קבצים

כדי לזהות אילו **תהליכים** משתמשים ברוחב פס הדיסק הגדול ביותר, אפשר להשתמש ב‑`iotop`:

```bash

sudo iotop

```

כדי לראות שינויים בקבצים באופן פרטני, ניתן להשתמש ב‑`inotifywait` בלינוקס או ב‑`fswatch` ב‑MacOS:

זה יכול להיות שימושי לזיהוי פעילות לא מורשית או מוזרה בתיקייה ספציפית או ברמת המערכת כולה.

```bash

# ניטור כל שינויי הקבצים בתיקייה
sudo inotifywait -m /path/to/directory

```

ב‑MacOS אפשר להשתמש ב‑`fswatch`:

התקנה עם `brew install fswatch`

```bash

fswatch -r /path/to/directory

```

## ⏰ טיפים שנשכחים לעיתים קרובות

1. **הגבלת קצב** (Rate Limiting) לניסיונות אימות ולכל נקודות קצה חשובות אחרות. בין אם באמצעות מודול `limit_req` של Nginx או `fail2ban` לגישה ל‑SSH, האטת brute‑force היא _כנראה_ רעיון טוב. אני אומר _כנראה_ כי בעידן IPv6 ורשתות בוטים זולות, המצב כבר לא כמו פעם.

2. **שימוש בנפחים קריאה‑רק** (Read‑Only Volumes) כשאפשר:
   ```yaml
services:
     webapp:
       volumes:
         - ./config:/config:ro
   ```
   בשילוב עם שאר השיטות הטובות (משתמשים ללא הרשאות root, הרשאות מינימליות לתיקיות), אפשרות ההרכבה `:ro` מוסיפה הגנה נוספת מפני שינויי בטעות ומניסיונות כתיבה מתוך הקונטיינר. היא לא מגנה על המארח מפני תהליך שכבר בעל הרשאות רחבות יותר.

3. **ביקורת גישה לקונטיינרים** באופן קבוע. אם קונטיינר אינו זקוק לסוד, פורט או mount, יש להסיר אותם!

4. **זהירות עם רשת ה‑WiFi**  
   בטח לא תחשוף את סיסמת ה‑WiFi שלך למישהו זר, נכון? חוץ מאולי כמה חברים… או משפחה. אף אחד לא יודע אילו אפליקציות יש להם ואילו מהן עשויות לשתף את ה‑SSID והסיסמה שלך עם העולם.

### רשת ביתית vs. ספק ציבורי vs. חיבור דרך מנהור (Tunneling)

1. **בידוד וירטואלי/DMZ**: עבור שרתים ביתיים, מומלץ למקם אותם ב‑VLAN נפרד או DMZ אם אפשר. כך המכשירים הפנימיים נשארים מחוץ להיקף של פגיעה אפשרית מהצד של השרת.  
   - השתמש בנתב נפרד או VLAN לשרת הבית שלך.  
   - השתמש ברשת WiFi נפרדת לשרת הבית שלך.  
   - השתמש בתת‑רשת נפרדת לשרת הבית שלך.

2. **ספקי ענן**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure ו‑Google Cloud מציעים תכונות חומת אש שונות.  
   - חלק מהספקים חוסמים פורטים כברירת מחדל. חלק מציעים אפשרויות opt‑in או תוספות. בדוק את תיעוד הספק שלך.  
   - רבים מהספקים מציעים ניטור מתקדם ושירותי זיהוי איומים.

3. **VPNים וחיבורי מנהור**: שקול להשתמש באפשרות דמויית VPN או שירות מנהור כדי לחבר שירותים בצורה מאובטחת דרך האינטרנט מבלי לחשוף אותם לאינטרנט הציבורי.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.

{/* 3. **Hardening Against Internal/Lateral Attacks**: One infected device can compromise an entire network. Segmenting Docker services on custom networks, using hardware, UFW rules, and blocking unneeded ports can all help reduce risk (when properly configured.) */}

## 🚀 רשימת בדיקה לייצור

- [ ] **סודות**: כל הסודות נוצרו באופן רנדומלי ונשמרים בצורה מאובטחת  
- [ ] **עדכונים**: אסטרטגיית עדכון קונטיינרים מתועדת ומאוטומטת (בסדר אם מדובר בכמה פקודות בקובץ טקסט).  
- [ ] **רשת**: נחשפים רק הפורטים הדרושים, רשתות פנימיות מוגדרות.  
- [ ] **כללי חומת אש**: ברירת מחדל של חסימה, הרשאות מפורשות, חסימות לפי מדינה אם נדרש.  
- [ ] **פרוקסי הפוך**: Nginx, Caddy או Traefik יכולים להוסיף שכבת אימות בסיסי.  
- [ ] **טוקני קנרי**: מיקום הטוקנים ליד הקבצים והקרדנציות הרגישים שהיית חוקר אם נגעו בהם.  
- [ ] **ניטור**: דע את המערכות שלך עם `nmap`, `lsof`, `inotifywait`, `glances` וכו'.  
- [ ] **אסטרטגיית גיבוי**: נבדקת, רצוי אוטומטית, וממוקמת מחוץ למיקום הראשי.  
- [ ] **עקרון המינימום**: משתמשים בקונטיינרים ללא הרשאות root, נפחים קריאה‑רק.

## 📚 קריאה נוספת

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org for Canary Tokens](https://canarytokens.org/)

## תודה

קרדיט למספר משתמשים ערים ב‑Reddit:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) – [שיחה](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

תודה על הקריאה! מקווה שהמדריך היה מועיל. אם יש לכם שאלות או הצעות, אפשר לפנות אליי ברשתות החברתיות למטה, או ללחוץ על הקישור `Edit on GitHub` כדי לפתוח PR! ❤️
````
