+++
title = "today's lab"
date = "2024-08-22"
template = "blog.html"
description = "It's good to start with an example, and one I am quite fond of is the construction with vector spaces by creating sum types and product types. These all are miraculously ubiquitous objects whether you are in physics, computer science, or mathematics. We will see how one can go from the algebraic perspective straight into implementation and how we can extract additional features of these objects naturally."
[taxonomies]
tags = ["math", "algebra", "category theory"]
+++
---

Notes:

one of the things that's so nice about proxmox is just testing out services quickly and easily. Also, other perks like backing up a VM or LXC and destroying it but saving those backups just incase I want to bring back the service later is sweet (e.g., headscale and ollama).


---


# intro
I care a lot about technology and learning how to do things myself.
So, given that, I have fallen victim to being one of those people that obsesses quite a bit over dialing in my "homelab".
The notes I'm writing here are meant to be a way for me to talk through the choices I made, why I made them, and how you can replicate from this what you want.

It also seems to be a bit of a lost art today.
In a sense, it's a bit disturbing to me that many developers today don't touch hardware or networking and, rather, they just use services that charge exorbitant fees to simplify things that are already fairly simple.

Should you self host everything you ever want?
No, I won't say that. 
Can you self host a lot of things easily and get a lot out of it?
Absolutely.
Plus, you get to learn how more things work, and knowing how things work is a super power.

## ideaology
My homelab, as I will refer to it from here on out, must satisfy the following:
1. Run my home and be stable.
The lab is useless if I have downtime.

2. Be minimalism and simple. 
The lab should be low power and only run what I need.

3. Allow for experimentation.
The lab should be able to spin up new tools with a few commands and not interfere with other running services.

## hardware
Let's get to the nuts and bolts now.
Hardware is cheap and fast these days -- don't let anyone convince you otherwise.
A $200 mini PC can run so much shit, it's astounding.
In my opinion, don't buy a Raspberry Pi (RPi) or any other SBC unless you have a specific reason why you want that.
Here's the kicker: 10W of power doesn't matter, don't do it for efficiency reasons.

My lab consists of two AMD 5800H based mini PCs and a RPi 4B for compute and storage.
Yes, I just duped you, no I'm not happy about it -- I just had one from previous mistakes in life.

For networking I use a TP-Link ER605v2 router, TP-Link TL-SG2210MP managed PoE switch, and TP-Link EAP615-Wall WAPs. 

If I were you, I'd avoid TP-Link Omada based systems.
I wish I knew this before.
It's fine and all, but there's certainly better.
Moving forward I'd probably go with Ubiquiti if I want that Apple-like experience (for the premium), or just use OPNSense.

Other relevant things:
- APC UPSs (BE600M1, BX1500M).
Get an Uninterruptible Power Supply (UPS).
Thank me later.
Basically, keep your devices online for a while if power goes out.
You don't want a small <5 second blackout to disable everything in your home.
They also typically have built in surge protection.
Mine keep my devices online for at least 30 or so minutes (I've never pushed it, though).

- Apple HomePod as a Thread border router. 
Avoid this at all costs. 
These things are awful.
Just build your own or something -- that's what I'm planning to do.
Thread is cool, this product is just unstable and feature locked (of course).

## software
The key management software I am using is Proxmox.
Proxmox is a hypervisor that runs on Debian Linux/GNU that provides a nice GUI for managing Virtual Machines (VMs) and Linux Containers (LXC).
Proxmox also offers the important service of clustering using `corosync` and High Availability (HA) on top of this.
It even allows for a built in cluster file storage service called Ceph, but I do not currently use this.
I plan to implement Ceph or LINSTOR in the future.

Note: I do not use Docker anymore and I could not be happier.
Docker is needlessly annoying in my opinion, at least I think so.
The way to manage your container versions and networking is just far more convoluted, especially if you are just more familiar with Linux/GNU.

Proxmox, all together, attains (1), and (3) in [#ideaology](#ideaology).
Arguably (2) as well, but I think it could be made simpler.
You will find contention with (2) if you ever want to change node network info.

### Cluster
My cluster consists of the two PCs and a RPi as stated earlier.
The two PCs are nodes in the cluster, the RPi is a quorum device (Q device).
Put simply: the PCs run all my services and the RPi is there to put in a vote if something bad happens.

What is the point of this cluster set up and how does it work?
The point is that if one node were to crash for any reason, then if the other is online, it will take over running the services that the dead node was running.
You need voting majority to do this, hence the need for the Q device. 
If Node 1 crashes, Node 2 and Q device will notice a lost heartbeat, wait to see if it returns for a bit of time, then vote to move those HA services over to Node 2.

This has already saved me.
I have had a service on a VM crash a machine and all remaining services moved over to the other.
If I had a single machine running this, and this happened, my services would have all been down indefinitely until I intervened manually.

Clustering addresses (1) in [#ideaology](#ideaology).

### PVE
Proxmox Virtual Environment (PVE) is the interface for managing VMs and LXCs which I'm now just going to call Virtualized Instances (VIs). 
Basically, you get templates for your VIs, then you can click a few buttons or run a few commands and spin up a new VI based on the template.

For example, I use the Debian 12 LXC template routinely (aside for Omada -- thanks TP-Link).
I choose this template, set a container ID, hostname, and a few other hardware and networking items, lo-and-behold I have a container running ready to do with it what I please.
I can't tell you how many times I have spawned a VI, tried a thing, broke some stuff, deleted it, spawned a new VI, tried thing differently, was happy.

This is huge for (3) in [#ideaology](#ideaology). 
I love it love it love it!

Ultimately, I'd like to work more with something like NixOS to make more refined templates for VIs.
It seems like a dream for rapid deployment even though `nix` the language is infuriating.

Proxmox PVE satisfies (2) in [#ideaology](#ideaology) for me, it's just the other bells and whistles in the UI that are a bit tedious.
I swear, if there was a nice Nix builder and a VE set up around Nix deployments that also had more cluster storage options, that'd probably take the cake.

### backups
Owing to (1) in [#ideaology](#ideaology) again, Proxmox makes backing up your VIs incredibly easy.
Just select what VIs you want to back up, where you want to back them up to, when you want to back them up, and how many backups you want to keep.

Backups in PVE are insanely helpful beyond just for recovering from a total device loss or corrupted state of a VI.
One use case I have is that owes to (3) is to be able to backup a VI, try to change how the VI is currently running in some way, and just restore the backup if need be.
Similarly, if you want to work with a service, but decide to stop using it, you can create a backup of that service in case you want to go back to using it in the future.
Two examples of the latter for me are Tailscale and NextCloud -- I may want to use those again some time down the road, but currently don't.

## services
I don't run a ton of services, but what I do run are things I deem critical, or at least very useful, as well as the odd experiment.
I constantly look for new services to run to make my life better.
I constantly look for services to remove to make my life simpler.

My current list hits the mark rather well.

### network
First things first, none of this works without networking.
The core to any good lab is a solid, stable, and changeable network setup.

#### Omada SDN
Begrudgingly, I use TP-Link's Omada SDN as a controller for managing all of my network equipment and clients in one spot.
Omada provides a nice portal to work with routers, switches, and access points pretty simply.
The interface is a bit limited on its own, it's a bit clunky at the same time.
It gets the job done, but it took me quite a while to get this where I wanted and I certainly could have done it more quickly with something like OPNSense (if you can call that an SDN application).

Anyway, I learned a lot by going into my home network with this route.
Using your ISP's hardware is horrible.
If I say Omada is "meh", then Comcast's (or whoever's) routers are an abomination.

It's extremely easy to get PPPoE credentials from your ISP and connect straight to the internet (I'll just say WAN for Wide Area Network instead).
You'll just connect your fiber ONT plus ethernet/RJ45 to your router, and go to some login page that has PPPoE settings.
If you have cable, you'll use a modem instead of fiber ONT.

Omada's control of my router provides my WAN gateway, NAT, and firewall.

I run Omada on a Ubuntu LXC in Proxmox.
Alongside Omada, I also run a CoreDNS instance that was specially made to work with Omada.
The reason why is that Omada (or at least my router) does not provide local hostname resolution or any local DNS for that matter.
Yet another point off here.
Not to mention, getting Omada set up in a container was a pain and it is not indicative of the typical experience of launching a container.
There's weird versions to manage and Omada only liked some specific Ubuntu version.

#### LAN
Locally, I use a larger LAN subnet like `x.y.0.0/22` to have a bit clearer delineation between my devices.
On this subnet, I provision devices (like router, APs, etc.) into the `x.y.0.0/24` range, services into the `x.y.1.0/24` range, known clients such as personal devices or IoT into `x.y.2.0/24` range, and finally I use `x.y.3.0/24` for DHCP.

Like I said before, I use a local DNS resolver so that I don't ever really have to know any IP addresses, but in the off chance that I do, it's convenient, but not really necessary, to have this organization.

#### local DNS
With CoreDNS I provide domains for all of my services so that they may be resolved internally in simple ways.
For example, I have `green.home` as my TLD for my network. 
I can reach any host on my LAN by `ping $HOSTNAME.green.home`. 

Specific services I am running I provide their own domain.
For example, Proxmox (running on two nodes, remember) I can reach the GUI by a single address `https://proxmox.green.home`. 
Or `https:/omada.green.home` to reach my Omada GUI.

CoreDNS runs in the same container as Omada in my case, though that isn't necessary. 
It seemed logical to do so as I'd likely just drop both of these for something better in the future.

#### (reverse) proxy
The above DNS also is paired with Caddy as a (reverse) proxy and certificate handler.
I run Caddy by itself in a Debian 12 LXC.
Services run over their own ports, e.g., `8043`, so if I have CoreDNS with Omada running on IP `x.y.0.2` and on Caddy on `x.y.1.2`, then I can assign the domain `omada.green.home` to look to `x.y.1.2` which will also pass on the port information.
Caddy sees this request to `omada.green.home:8043` from CoreDNS, reverse proxies this into `https://omada.green.home` (really just port mapping `443:8043`), and also generates an internal certificate for this domain (this way I get local HTTPS/TLS).

I do this with all of my services that I need to reach and I can also do things like reverse proxy `proxmox.green.home` to both IP addresses of my nodes, pick a default, but if the default IP is unresponsive, use the other.
Reverse proxy and DNS are my most used LAN tools.
Reverse proxy is also massively useful for WAN forwarding as well.

#### blocky
Now connecting back to things in WAN world, I also serve Blocky on a container of its own at `x.y.1.1`. 
Blocky is multi-use upstream DNS proxy for me. 
That is, I have my gateway point to resolve DNS at CoreDNS, but CoreDNS will see requests to names outside its managed LAN TLD and pass these to Blocky to handle.

Blocky is a customizable DNS cache, pre-fetcher, and ad blocker.
For the latter, I chose a few curated lists of known ad hosts and have those blocked.
This just cuts down on the amount of ads I get all together, though some still make it through.

The former two properties make internet browsing a bit quicker.
I tend (and you probably do too) to visit many of the same sites throughout the day, and Blocky keeps a running cache of this information so that it does not need to look to upstream DNS resolution (such as Cloudflare or Google) each time you make a request.

It's not some crazy tech here, but having it remove ads and store this cache makes browsing cleaner and a bit snappier.
Better than PiHole in my opinion.

