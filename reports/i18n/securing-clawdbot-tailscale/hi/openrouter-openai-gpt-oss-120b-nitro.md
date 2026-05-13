# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/hi/index.mdx
- Validation: deferred
- Runtime seconds: 7.31
- Input tokens: 12420
- Output tokens: 4495
- Thinking tokens: unknown
- Cached input tokens: 6272
- Cache write tokens: 0
- Estimated cost: $0.001293
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: आपके AI सहायक ने मुझे शेल एक्सेस दिया
subTitle: अपने स्थानीय या VPS OpenClaw/Moltbot सेटअप को सुरक्षित कैसे करें
date: '2026-01-15'
modified: '2026-01-28'
tags:
  - security
  - moltbot
  - clawdbot
  - tailscale
  - ai
  - vpn
  - devops
  - ssh
category: Security
subCategory: AI Infrastructure
draft: false
cover_full_width: ../hero_wide.webp
cover_mobile: ../icon_square_200.webp
cover_icon: ../icon_square_200.webp
---
OpenClaw (पहले Clawdbot/Moltbot) आपको एक व्यक्तिगत AI सहायक देता है जो WhatsApp, Slack, Discord, iMessage और अन्य चैनलों पर काम करता है। लेकिन यदि आप इसका गेटवे, नोड कंट्रोल या SSH को सार्वजनिक इंटरनेट पर बिना मजबूत प्रमाणीकरण के रख देते हैं, तो आप अजनबियों को आपके मशीन पर शेल एक्सेस का रास्ता दे रहे होते हैं।

यह गाइड सबसे सुरक्षित डिफ़ॉल्ट दिखाता है: OpenClaw का गेटवे लूपबैक पर रखें, इसे केवल आपके टेलनेट के साथ Tailscale Serve के ज़रिए एक्सपोज़ करें, SSH को लॉक डाउन करें, और बाहर से यह सत्यापित करें कि गेटवे सार्वजनिक नहीं है।

परियोजना की तेज़ अपनाने ने वास्तविक सुरक्षा चिंताएँ उजागर कीं: पहले कुछ हफ़्तों में [Shodan स्कैन ने 2,847 एक्सपोज़्ड इंस्टेंस पाए](https://socradar.io/blog/clawdbot-is-it-safe/), और कोडबेस में एक [GitHub सुरक्षा ऑडिट इश्यू ने 512 फाइंडिंग्स रिपोर्ट कीं](https://github.com/moltbot/moltbot/issues/1796)। इनमें से कुछ स्वचालित स्कैनर आउटपुट था और कुछ जनवरी 2026 में OpenClaw में नाम बदलने के बाद बदल गया है, इसलिए इस संख्या को एक चेतावनी संकेत के रूप में लें, न कि सटीक वर्तमान भेद्यता गिनती के रूप में। आपको सुरक्षा विशेषज्ञ बनने की ज़रूरत नहीं है—सिर्फ़ यह सुनिश्चित करें कि आप ऑपरेटर सतहों को प्रकाशित करने से पहले ही उन्हें डिप्लॉय न करें।

---

## आप वास्तव में क्या एक्सपोज़ कर रहे हैं

आपने इसे कैसे इंस्टॉल और एक्सपोज़ किया है, इस पर निर्भर करते हुए, जांचने योग्य तीन सतहें हैं:

- **पोर्ट 22**: VPS पर SSH पहुँच  
- **पोर्ट 18789**: गेटवे कंट्रोल UI और WebSocket API  
- **ब्राउज़र/नोड कंट्रोल**: गेटवे/नोड पेयरिंग मॉडल के माध्यम से रिमोट नोड निष्पादन और ब्राउज़र ऑटोमेशन  

वर्तमान [OpenClaw रिमोट‑एक्सेस दस्तावेज़](https://docs.molt.bot/gateway/remote) बताते हैं कि गेटवे WebSocket डिफ़ॉल्ट रूप से लूपबैक से बंधा रहता है और जब तक आप जानबूझकर LAN/टेलनेट/कस्टम बाइंड नहीं चुनते, इसे केवल लूपबैक पर रखना चाहिए। यह सही दिशा है। जोखिम तब उत्पन्न होता है जब आप इस डिफ़ॉल्ट को ओवरराइड करते हैं, Docker पोर्ट प्रकाशित करते हैं, रिवर्स प्रॉक्सी जोड़ते हैं, Funnel चालू करते हैं, या SSH को दुनिया के लिए खुला छोड़ देते हैं।  

गेटवे सबसे बड़ा सतह है। यह आपके सहायक के ऑपरेटर इंटरफ़ेस को उजागर करता है, जिसमें टूल कॉल पाथ शामिल हैं। यदि यह इंटरनेट से पहुँचा जा सकता है और प्रमाणीकरण अनुपस्थित, कमजोर, बायपास किया गया, या लीक हो गया, तो हमलावर आपके उपयोगकर्ता की अनुमतियों के साथ एजेंट को चलाने या टूल्स को कॉल करने में सक्षम हो सकता है।  

ब्राउज़र कंट्रोल भी लगभग उतना ही संवेदनशील है। वर्तमान OpenClaw दस्तावेज़ ब्राउज़र मशीन पर पेयर किए गए नोड होस्ट के माध्यम से ब्राउज़र कंट्रोल चलाने की सलाह देते हैं और नोड पेयरिंग को ऑपरेटर एक्सेस की तरह मानते हैं। यदि गेटवे पेयर किए गए नोड पर `system.run` को कॉल कर सकता है, तो यह उस नोड पर रिमोट कोड निष्पादन बन जाता है, जो गेटवे की नोड नीति और नोड की अपनी निष्पादन अनुमोदनों के अधीन है।  

SSH, SSH ही है। यदि आप पासवर्ड‑आधारित प्रमाणीकरण सक्षम रखते हैं, तो सार्वजनिक VPS पर ब्रूट‑फ़ोर्स प्रयास अनिवार्य रूप से होंगे।

## Tailscale समाधान

OpenClaw के लिए, Tailscale आपको ऑपरेटर सेवाओं को प्रकाशित किए बिना रिमोट एक्सेस देता है:

1. आपका OpenClaw इंस्टेंस एक VPS या स्थानीय मशीन पर चलता है  
2. गेटवे लूपबैक से बंधा रहता है और Tailscale Serve के माध्यम से पहुँचा जाता है, या वह स्पष्ट प्रमाणीकरण के साथ सीधे टेलनेट IP से बंधता है  
3. आप सर्वर और अपने व्यक्तिगत डिवाइस दोनों पर Tailscale स्थापित करते हैं  
4. आप OpenClaw को उसके Tailscale IP या MagicDNS नाम से एक्सेस करते हैं  
5. इंटरनेट पर बाकी सभी को कुछ नहीं दिखता, जब तक आप जानबूझकर Funnel या कोई अन्य सार्वजनिक प्रॉक्सी सक्षम नहीं करते  

### क्या OpenClaw को Tailscale प्रबंधित करने देना चाहिए?

OpenClaw में [बिल्ट‑इन Tailscale इंटीग्रेशन](https://docs.molt.bot/gateway/tailscale) है जो गेटवे के लिए `tailscale serve` या `tailscale funnel` को कॉन्फ़िगर कर सकता है।

**Serve मोड** चीज़ों को केवल आपके टेलनेट तक सीमित रखता है। गेटवे `127.0.0.1` से बंधा रहता है जबकि Tailscale रूटिंग और HTTPS संभालता है। जब `gateway.auth.allowTailscale` सक्षम होता है, तो OpenClaw Control UI/WebSocket ट्रैफ़िक को Tailscale पहचान हेडर्स के माध्यम से प्रमाणित कर सकता है और स्रोत को `tailscale whois` से सत्यापित कर सकता है। यह अधिकांश व्यक्तिगत डिप्लॉयमेंट्स के लिए सही मोड है।

**Funnel mode** गेटवे को सार्वजनिक रूप से Tailscale की public endpoint सुविधा के माध्यम से उजागर करता है। Tailscale की अपनी दस्तावेज़ीकरण Funnel को व्यापक इंटरनेट से स्थानीय सेवा तक ट्रैफ़िक रूट करने के रूप में वर्णित करती है। OpenClaw `gateway auth mode` को `password` पर सेट न होने पर Funnel शुरू नहीं करने से इनकार करता है, फिर भी आप ऑपरेटर सतह के लिए सार्वजनिक एक्सपोज़र चुन रहे हैं।

OpenClaw की [security documentation](../docs.molt.bot/gateway/security) स्पष्ट करती है कि प्रॉम्प्ट इंजेक्शन और टूल एक्सेस व्यक्तिगत सहायक के लिए मुख्य जोखिम हैं। एजेंट को चुपके से खुद को सार्वजनिक बनाने का रास्ता न दें। Serve को जानबूझकर उपयोग करें, Funnel को तभी अपनाएँ जब वास्तव में सार्वजनिक पहुंच की आवश्यकता हो, और किसी भी `tailscale` कमांड के लिए exec अनुमोदन अनिवार्य करें।

---

## OpenClaw को सुरक्षित रूप से सेट अप करना

### चरण 1: Tailscale स्थापित करें

अपने VPS या स्थानीय सर्वर पर:

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate (opens a browser to log in)
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
# Output: 100.x.x.x
```

अपने क्लाइंट मशीन पर, आधिकारिक डाउनलोड पेज से Tailscale स्थापित करें और उसी टेलनेट में साइन‑इन करें।

अब दोनों मशीनें एक ही निजी नेटवर्क पर हैं। आप अपने VPS को उसके Tailscale IP से पिंग कर सकते हैं, और ट्रैफ़िक एन्क्रिप्टेड टनल के माध्यम से रूट हो जाएगा।

### चरण 2: OpenClaw को Tailscale के साथ कॉन्फ़िगर करें

सबसे सुरक्षित वर्तमान पैटर्न यह है: गेटवे को लूपबैक पर रखें और उसे Tailscale Serve के ज़रिए अपने टेलनेट पर एक्सपोज़ करें।

OpenClaw कॉन्फ़िग में:

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

फिर Serve के साथ गेटवे शुरू करें:

```bashopenclaw gateway --tailscale serve
```

OpenClaw की दस्तावेज़ीकरण कहती है कि यह गेटवे को `127.0.0.1` पर रखता है जबकि Tailscale HTTPS और टेलनेट रूटिंग प्रदान करता है। आप इसे `https://<magicdns-name>/` पर खोलते हैं, न कि अपने सार्वजनिक VPS IP पर।

यदि आप Serve के बजाय सीधे टेलनेट बाइंड पसंद करते हैं, तो स्पष्ट गेटवे ऑथ का उपयोग करें:

```js
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "replace-with-a-long-random-token",
    },
  },
}
```

फिर किसी अन्य टेलनेट डिवाइस से कनेक्ट करें:

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

यदि आप Docker या किसी अन्य कंटेनर रनटाइम में चलाते हैं, तो पोर्ट पब्लिशिंग के साथ अतिरिक्त सावधानी बरतें। `-p 18789:18789` जैसा पब्लिश आमतौर पर सभी होस्ट इंटरफ़ेस पर बाइंड करता है। लूपबैक प्लस Tailscale Serve को प्राथमिकता दें, या कंटेनर अभी भी ट्रैफ़िक प्राप्त कर रहा है यह पुष्टि करने के बाद होस्ट साइड को स्पष्ट रूप से Tailscale IP पर बाइंड करें:

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

किसी भी Docker परिवर्तन के बाद, बाहर से `nmap` और स्थानीय रूप से `ss` से जाँचें। यदि आप इसे ध्यान में नहीं रखते तो Docker होस्ट फ़ायरवॉल धारणाओं को बायपास या पुनः क्रमित कर सकता है।

### चरण 3: SSH को सुरक्षित करें

यहाँ तक कि Tailscale का उपयोग करते समय भी, आपको SSH को सही ढंग से सुरक्षित करना चाहिए:

```bash
# इस प्रक्रिया के दौरान अपनी मौजूदा SSH सत्र को खुला रखें।
# पहले, अपने क्लाइंट मशीन से पुष्टि करें कि आप Tailscale के माध्यम से SSH कर सकते हैं:
ssh your-user@SERVER_TAILSCALE_IP

# sshd_config को पुनः लिखने के बजाय हार्डनिंग को एक ड्रॉप‑इन फ़ाइल में रखें।
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# रीलोड करने से पहले वैधता जांचें। इसे स्किप न करें।
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

यह पासवर्ड‑आधारित लॉगिन और रूट लॉगिन को निष्क्रिय कर देता है। अगला चरण UFW का उपयोग करके सार्वजनिक SSH को पूरी तरह रोकता है, जबकि `tailscale0` पर SSH की अनुमति देता है।

### चरण 4: फ़ायरवॉल नियम

दूसरी परत के रूप में फ़ायरवॉल सेट करें:

```bash
# UFW (Ubuntu/Debian) का उपयोग करते हुए
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

Tailscale के आधिकारिक Ubuntu हार्डनिंग गाइड में भी यही रूपरेखा उपयोग की जाती है: `tailscale0` को अनुमति दें, अन्य सभी इनबाउंड ट्रैफ़िक को अस्वीकार करें, फिर पुष्टि करें कि सार्वजनिक SSH टाइम‑आउट हो जाता है जबकि `100.x.y.z` पते पर SSH अभी भी काम करता है। यदि आप उसी VPS पर सार्वजनिक वेबसाइट चलाते हैं, तो केवल वही सार्वजनिक नियम रखें जिनकी वास्तव में आवश्यकता है, जैसे `80/tcp` और `443/tcp`।

## एक्सपोज़र की जाँच

### बाहर से खुले पोर्ट्स की जाँच

एक मशीन से जो आपके Tailscale नेटवर्क में नहीं है:

```bash
# सामान्य सार्वजनिक पोर्ट्स खुले हैं या नहीं, जाँचें
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# सुरक्षित इंस्टेंस के लिए अपेक्षित आउटपुट:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

यदि `22` या `18789` `filtered` या `closed` की बजाय `open` दिखाता है, तो आपको समस्या है। यदि `80` या `443` खुला है, तो सुनिश्चित करें कि यह केवल आपका जानबूझकर सार्वजनिक वेबसाइट या Tailscale Funnel एन्डपॉइंट है, न कि गलती से OpenClaw गेटवे।

### स्थानीय रूप से क्या सुन रहा है, जाँचें

आपके OpenClaw सर्वर पर:

```bash
# Show all listening ports and what they're bound to
sudo ss -tulpn | grep LISTEN

# Look for lines like this (good for Serve):
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# Or this (acceptable for direct tailnet bind with auth):
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# NOT like this (bad):
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

यदि आप `0.0.0.0` या `:::` (IPv6 समकक्ष) देखते हैं, तो वह सेवा पूरी दुनिया के लिए खुली है।

### Built-in Security Audit

OpenClaw में एक [सुरक्षा ऑडिट कमांड](https://docs.molt.bot/gateway/security) शामिल है जो आपकी कॉन्फ़िगरेशन को सुरक्षा सर्वोत्तम प्रथाओं के विरुद्ध जांचता है:

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

ऑडिट गेटवे एक्सपोज़र, Tailscale मोड, ऑथ सेटिंग्स, चैनल एक्सेस, टूल पॉलिसी, प्लगइन इन्वेंटरी, और फ़ाइल अनुमतियों की जाँच करता है। `--fix` को एक सहायक टूल के रूप में उपयोग करें, निष्कर्षों को पढ़ने के विकल्प के रूप में नहीं।

---

## What This Doesn't Solve


Tailscale सबसे बड़ी गलती को दूर करता है: सार्वजनिक ऑपरेटर एक्सपोज़र। यह सब कुछ हल नहीं करता:

**क्रेडेंशियल स्टोरेज**: OpenClaw सत्र ट्रांसक्रिप्ट, OAuth टोकन, और API कुंजियों को डिस्क पर संग्रहीत करता है। सुनिश्चित करें कि इनकी फ़ाइल अनुमतियाँ सही हों (`chmod 600` फ़ाइलों के लिए, `chmod 700` निजी कॉन्फ़िग डायरेक्टरीज़ के लिए) और वे संस्करण नियंत्रण में न हों। अंतर्निहित ऑडिट इस बात की जाँच करता है।

**प्लगइन सैंडबॉक्सिंग**: प्लगइन्स आपके उपयोगकर्ता की पूरी अनुमतियों के साथ चलते हैं। केवल उन स्रोतों से प्लगइन्स स्थापित करें जिनपर आप भरोसा करते हैं, और यह समीक्षा करें कि वे कौन‑सी क्षमताएँ माँगते हैं। ऑडिट टूल स्थापित प्लगइन्स की सूची बनाता है।

**डिवाइस सुरक्षा**: यदि कोई आपका Tailscale खाता समझौता कर लेता है या आपके टेलनेट पर कोई डिवाइस चोरी हो जाता है, तो वह आपके OpenClaw इंस्टेंस तक पहुँच सकता है। नए डिवाइसों के लिए अनुमोदन आवश्यक करने हेतु [Tailscale डिवाइस प्राधिकरण](https://tailscale.com/kb/1099/device-authorization/) सक्षम करें।

---

## Deployment Checklist

प्रोडक्शन‑तैयार OpenClaw/Moltbot इंस्टेंस मानने से पहले:

- [ ] सर्वर और क्लाइंट दोनों पर Tailscale स्थापित और प्रमाणित हो
- [ ] गेटवे को लूपबैक पर Tailscale Serve के साथ रखें, या स्पष्ट प्रमाणीकरण के साथ `tailnet` पर बाइंड करें
- [ ] SSH को पासवर्ड प्रमाणीकरण और root लॉगिन को निष्क्रिय करने के लिए कॉन्फ़िगर करें
- [ ] फ़ायरवॉल (UFW या iptables/nftables) को `tailscale0` की अनुमति देने और अनावश्यक सार्वजनिक इनग्रेस को ब्लॉक करने के लिए सेट करें
- [ ] बाहरी nmap स्कैन सभी पोर्ट को `filtered` या `closed` दिखाए
- [ ] आंतरिक `ss -tulpn` गेटवे को केवल `127.0.0.1`, `::1`, या Tailscale IP पर बाइंड दिखाए
- [ ] क्रेडेंशियल फ़ाइलों की अनुमति 600 हो और निजी कॉन्फ़िग डायरेक्टरी की अनुमति 700 हो
- [ ] `openclaw security audit --deep` चलाएँ और सभी निष्कर्षों को ठीक करें
- [ ] यदि OpenClaw Tailscale प्रबंधन उपयोग कर रहे हैं, तो exec अनुमोदन सक्षम हों
- [ ] नियमित बैकअप कॉन्फ़िगर हों (OpenClaw डेटा + कॉन्फ़िग)

## संसाधन

- [OpenClaw Security Guide](https://docs.molt.bot/gateway/security)
- [OpenClaw Tailscale Integration](https://docs.molt.bot/gateway/tailscale)
- [Tailscale Serve CLI Reference](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [Use UFW to Lock Down an Ubuntu Server](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [Security Audit: 512 Findings (GitHub Issue)](https://github.com/moltbot/moltbot/issues/1796)
- [Nmap Network Scanning Guide](https://nmap.org/book/man.html)
````
