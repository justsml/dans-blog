# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/he/index.mdx
- Validation: deferred
- Runtime seconds: 3.10
- Input tokens: 7164
- Output tokens: 3098
- Thinking tokens: unknown
- Cached input tokens: 3200
- Cache write tokens: 0
- Estimated cost: $0.000837
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: 'אבטחת Docker: המדריך האבוד למפתחים'
subTitle: למד כיצד להגן על הרשת שלך מפני איומים וקונפיגורציה מסוכנת!
date: '2025-01-04'
modified: '2025-01-13'
tags:
  - local development
  - security
  - devops
  - best-practices
category: Security
cover_full_width: ../flame-whale-wide.webp
cover_mobile: ../flame-whale-head-square-200.webp
cover_icon: ../flame-whale-head-square-200.webp
cover_credit: ©️ 2025 Dan Levy
---
import {CodeTabs} from '../../../../components/CodeTabs';

## Work in progress

**Table of Contents**

1. [⚠️ רשתות מקומיות בסיכון](#-local-networks-at-risk)
2. [🛡️ קונפיגורציית חומת אש](#-firewall-configuration)
3. [🔐 ניהול סודות לפיתוח מקומי](#-secrets-management-for-local-development)
4. [🕵️‍ דליפות אישורים והתקפות צד‑ערוץ](#-credential-leaks-and-side-channel-attacks)
5. [🔍 ניטור וטוקנים קנריים](#-monitoring--canary-tokens)
6. [❌ תפיסות מוטעות נפוצות](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ רשתות מקומיות בסיכון

בואו נודה, כולנו עשינו את זה. התחברתם לרשת Wi‑Fi של בית קפה אקראי או אפשרתם למישהו להשתמש ברשת הבית שלכם בלי לחשוב פעמיים. אולי אפילו סומכים שהמקרר החכם שלכם לא יפגע ברשת. המציאות? החלטות מזדמנות כאלה יכולות לחשוף את סביבת הפיתוח המקומית שלכם לסיכונים מיותרים. תוקפים לא מכוונים רק למערכות ייצור — סביבות מקומיות הן לעיתים קרובות מטרה רכה, שמספקת דרך לגשת לפרויקטים רגישים.

### תרחישי התקפה

1. **תעבורה נלכדת:** תעבורה בלתי מוצפנת ניתנת ללכידה וקריאה בקלות.
2. **שירותים ללא הגנה:** מסדי נתונים מקומיים או API חשופים ב‑`0.0.0.0`.
3. **זיוף רשת:** הפנייה של תעבורה למכשיר של התוקף.

### תיקונים מהירים

- העדיפו רשתות Docker פרטיות על פני חומות אש כדי להגביל חשיפת רשת.
- הימנעו משימוש ברשת Wi‑Fi ציבורית או משותפת; עדיף להשתמש בנקודת החיבור של הטלפון שלכם.
- עקבו אחרי הרשת המקומית שלכם עבור מכשירים לא מוכרים בעזרת כלים כמו `arp-scan` ו‑`nmap`.

## 🛡️ קונפיגורציית חומת אש

### UFW עם Docker (אובונטו)

> ⚠️ **אזהרה:** בברירת מחדל Docker על אובונטו/דביאן מדלג על כללי UFW/iptables, מה שעלול לחשוף את המערכת שלכם להתקפות.  
> זה לא משנה אם אתם משייכים פורטים לכתובות IP מקומיות (לדוגמה `-p 127.0.0.1:8080:80`).

זה מפתיע אותי בכל פעם שאני לומד על זה! [Docker מדלג על כללי UFW בברירת מחדל](https://github.com/moby/moby/issues/4737), ומאפשר למכולות לתקשר עם המארח ועם מכולות אחרות ללא הגבלה.

### שיטה מומלצת

1. 🥇 **השתמשו ברשתות Docker** כדי לבודד ולשלוט במה שיכול להתחבר לכל מכולה או רשת.

###
2. 🥉 **עדכנו iptables** אם חייבים להשתמש ברשת `host`, או אם אינכם יכולים להשתמש ברשתות מותאמות, ניתן להפחית את הסיכון על‑ידי קונפיגורציית iptables. לא למתחילים, [הסתכלו על הכלי למטה.](#uf)

#### בידוד רשת Docker

```bash
# Create a new Docker network
docker network create my-network

# Run your container with the new network
docker run --network my-network my-container
```

#### קונפיגורציית UFW (לרשתות `host`)

יש הרבהעצות שגויות על איך לתקן את הבעיה הזאת. קבעו את UFW לעבודה עם Docker כפי שהייתם מצפים.

השתמשתי ב‑`ufw-docker` כדי להגדיר מערכת עצמאית והוא נראה שעובד היטב.

```bash title="install-ufw-docker.sh"
# התקנת הבינארי כ‑root (בכל מקרה נדרשות הרשאות root)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# התקנה ושינוי של קובץ `after.rules` של `ufw`
ufw-docker install

ufw-docker help

```

הפקודה הזו מבצעת את הפעולות הבאות:

- מגבה את הקובץ `/etc/ufw/after.rules`.
- מוסיפה כללים הקשורים ל‑Docker בסוף הקובץ כדי לשלב אותם כראוי עם UFW.

**מקור:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**דוגמה לשימוש:**

```bash

# לאפשר מכולת Docker על הפורט 8080
ufw-docker allow <container_name> 8080/tcp

# לנהל כללים בצורה בטוחה לצד תצורת ה‑UFW שלכם
ufw-docker status

```

**הערה:** רוב ה„תיקונים” למחלוקות Docker‑UFW כוללים כללי iptables ידניים, שיכולים להיות שגויים ושבירים במהלך עדכונים.

### חומת אש של macOS

1. עברו ל‑**System Preferences > Security & Privacy > Firewall**.  
2. הפעילו את חומת האש ולחצו על „Firewall Options”.  
3. חסמו את כל החיבורים הנכנסים פרט לשירותים החיוניים.

**הערה:** ייתכן שתצטרכו לחפש כיצד להגדיר את חומת האש שלכם כדי לאפשר מכשירים חכמים מסוימים – למשל Google Cast/AirPlay ושירותים נוספים.

### פקודות למשתמשים מתקדמים (macOS ולינוקס)

#### macOS:

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # חסימת הכל
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # לאפשר אפליקציה ספציפית

```

#### לינוקס (ufw):

```bash

ufw default deny incoming  # חסימת כל החיבורים הנכנסים
ufw allow ssh  # לאפשר SSH
# לאפשר 443 ו‑80 לתעבורת אינטרנט
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # הפעלת חומת האש

```

**פרו‑טיפ:** השתמשו בכלים כמו [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) ב‑macOS ו‑[ufw](https://help.ubuntu.com/community/UFW) בלינוקס לקבלת תצורות ידידותיות יותר למשתמש.

## 🔐 ניהול סודות לפיתוח מקומי

### אימות מקדים של מצייני מיקום

<p>💡 ודאו שהסודות מוגדרים עם ערכים אמיתיים לפני הרצת היישום.</p>

אם אתם משתמשים במצייני מיקום כמו `__WARNING_REPLACE_ME__` בסודות שלכם, מצוין, אולי מישהו יבחין. למקרה הצורך, אפשר גם להוסיף אימות קטן כדי לספק בטחון בזמן ריצה.

לא תאמינו כמה קל לשבור (לשנות ולחתום מחדש) אסימון JWT כאשר תוקפים יכולים לנחש את הסוד!

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

### יצירת סודות ואחסונם

<p class="inset">לעולם אל תכתבו סודות בקוד המקור. העדיפו משתני סביבה וכספות מאובטחות.</p>


במקום `.env.example`, השתמשו ב‑`.env.generate.sh` כדי לאפשר למשתמשים לקבל קובץ `.env` עם "ברירות מחדל" מאובטחות.

#### דוגמה ל‑`.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# Generates a secure .env file for local development

generate_secret() {
    local length=${1:-30}
    # add 4 bytes to account for padding
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# Bail out if .env file already exists
[ -f .env ] && { echo ".env file already exists!"; exit 1; }

cat <<EOL > .env
# Database settings & secrets
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# Session secrets
SESSION_KEY=$(generate_secret 32)
JWT_SECRET=$(generate_secret 64)
EOL

echo "New .env file generated!"
```

{/*

```zig
// validate_secrets.zig
const std = @import("std");

pub fn main() void {
    var env = std.os.getenv_map();
    const placeholder = "__WARNING_REPLACE_ME__";

    for (env.items()) |entry| {
        if (std.mem.contains(u8, entry.value, placeholder)) {
            std.debug.panic("Unsafe secret in {}", .{entry.key});
        }
    }
}
``` */}

## 🕵️‍ Monitoring & Double-checking

### דוגמאות `nmap`

#### בדיקה בתוך הרשת שלכם

```bash

# Scan your localhost for all open ports
nmap -sT localhost
```

# סרוק את כתובת ה‑IP הפרטית של המכונה שלך עבור שירותים
nmap -sV 192.168.1.10

# גלה מכשירים ברשת שלך
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

#### בדיקה מחוץ לרשת שלך

כדי לקבל את כתובת ה‑IP הציבורית הנוכחית שלך בקלות, השתמש בשירותים כמו `ifconfig.me`: `curl https://ifconfig.me`.

השתמש ברשת חיצונית או בשרת מרוחק כדי לבדוק את ה‑IP הציבורי שלך:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# שנה את target_host ל‑IP הציבורי או שם המארח שלך
# בדוק את המארח באמצעות טכניקות מתקדמות
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**למה לבדוק את שניהם?**
בדיקה מבפנים חושפת חשיפה פנימית, בעוד שבדיקות חיצוניות מזהות שירותים שנגישים לתוקפים.

## 🛡️ תפיסות מוטעות נפוצות

1. **הסביבה המקומית שלי איננה מטרה.**
   - עובדה: תוקפים יכולים לעבור מהמכונה שלך למערכות הייצור.
2. **חומות אש חוסמות הכל.**
   - עובדה: הן חוסמות רק מה שאתה מגדיר להן.
3. **כתובות IP פרטיות בטוחות.**
   - עובדה: ניצול פרצות כמו עקיפת NAT עדיין יכול להשפיע על הרשת שלך.
````
