---
layout: post
title:  "New AWS EC2 Instances Feature 70% I/O Boost"
subTitle: "NVMe SSD Head-to-Head: AWS, DigitalOcean, Packet.net"
date:   2017-04-15
modified:   2017-05-05
category: programming
tags: [cloud, servers, architecture, scaling, digital-ocean, amazon-web-services, google-cloud-engine, azure, packet.net, online.net, ovh.net]
cover: solaiman-hossen-553024-unsplash.jpg
---

# Boost Cloud Performance up to 70%

![credit: solaiman-hossen-553024-unsplash.jpg](solaiman-hossen-553024-unsplash.jpg)

> General notes & sections for select hosting providers below (mid-2017).

* [AWS (Amazon Web Services), EC2 (Elastic Compute Cloud), EBS (Elastic Block Storage),  etc.](#aws_tips)
* [Digital Ocean](#do_tips)
* [Packet.net](#packet_tips)


<a id='aws_tips'></a>
## Amazon Web Services / EC2 / EBS / S3

> TLDR; AWS features restrictive hardware & pricing tiers.
The **i3** hardware series is the only type I would consider from a Price/performance (and absolute performance) perspective.

<br />
<br />

<iframe style="margin-left: -50%;" width="1257.9607023411372" height="777.8727573309395" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=13370750&amp;format=interactive"></iframe>


![image](https://cloud.githubusercontent.com/assets/397632/25599756/081d0572-2e9c-11e7-855b-12b695f1494b.png)

Note the **i3.*xlarge** is the only hardware to feature competitively priced NVMe storage (ultra-fast +1GB/s speeds). The major limiting factor I found was the real network speed. Servers with advertised speeds "up to 10/Gb/s" struggled to get close to 1/Gb/s (60-80MB/s).

Network tests used up to 9 additional instances in the same availability zone. Any erroneous data points I replaced with a 0. Additional tests are needed as only 1-2 samples were collected.




## Head to Head

<iframe style="margin-left: -50%;" width="1004.51" height="620.9271970262294" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1qQ62m1RFj73YScdS77Q9R2GpRqJOk7JHuTEOFDR4jJE/pubchart?oid=116848524&amp;format=interactive"></iframe>





### Credits

* [ec2instances.info](http://www.ec2instances.info/?region=us-west-2&cost_duration=monthly&selected=t2.nano,t2.micro,t1.micro,t2.small,m1.small,t2.medium,m3.medium,m1.medium,t2.large,c4.large,c3.large,m4.large,c1.medium,m3.large,r4.large,m4.xlarge,i3.xlarge,i3.2xlarge,i2.xlarge)



