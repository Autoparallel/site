+++
title = "today's lab"
date = "2024-08-22"
template = "blog.html"
description = "I love DIY and computers, so what better combination is there than being a self-hoster? To get the ball rolling, I'll just describe how my setup exists today and how I got here. Details on how to do this yourself isn't inside here, but I am happy to talk about this -- so just reach out to me."
[taxonomies]
tags = ["home lab", "self hosted", "computers", "networking", "DIY"]
+++


# intro
I care a lot about technology and learning how to do things myself.
So, given that, I have fallen victim to being one of those people that obsesses quite a bit over dialing in my "homelab".
The notes I'm writing here are meant to be a way for me to talk through the choices I made, why I made them, and how you can replicate from this what you want.

It also seems to be a bit of a lost art today.
In a sense, it's a bit disturbing to me that many developers today don't touch hardware or networking and, rather, they just use services that charge exorbitant fees to simplify things that are already fairly simple.
I don't want this to be the case.

Should you self host everything you ever want?
No, I won't say that. 
Can you self host a lot of things easily and get a lot out of it?
Absolutely.
Plus, you get to learn how more things work, and knowing how things work is a super power.

Let's dive in.

## ideology
My homelab, as I will refer to it from here on out, must satisfy the following:
1. **Run my home and be stable.**
The lab is useless if I have downtime.

2. **Be minimalist and simple.** 
The lab should be low power, only run what I need, and let me engage with these services with little overhead.

3. **Allow for experimentation.**
The lab should be able to spin up new tools with a few commands and not interfere with other running services.

## the past
What I use today is not what I started with at all.
Previously, I have ran with a homelab that was a single PC or even just a Single Board Computer (SBC) like a Raspberry Pi (RPi).

My previous setup used a CPU from 2011, mismatched DDR3 RAM, some off-brand NVME SSD, and a case that had newer USB standards than the old motherboard supported.
None of that really mattered because, as I'll describe more shortly, hardware is all good today and most services require little to no "oomph" behind them.
Actually, the fatal flaw with that hardware in particular was that the ethernet port on the motherboard no longer allowed cables to clip in securely, so they could easily be knocked out.
I had, on a few occasions, had my cats unplug this cable.
When this is the biggest vulnerability of your homelab, you should probably address it.

That box ran some version of Fedora Server and I did everything with Docker.
Much of what I ran then, I run now.
I regularly got uptimes of 100+ days before I'd consider doing any sort of updates.

In summary, old computer do job good.

# hardware
Let's get to the nuts and bolts of today's build now.
Hardware is even cheaper and faster since 2011 -- don't let anyone convince you otherwise.
A $200 mini PC can run so much shit, it's astounding.
In my opinion, don't buy a RPi or any other SBC unless you have a specific reason why you want that.
Here's the kicker: 10W of power doesn't matter, don't do it for efficiency reasons.

My lab consists of two AMD 5800H based mini PCs with 16GB of RAM and a RPi 4B for compute and storage.
Yes, I just duped you, no I'm not happy about it -- I just had one from previous mistakes in life.

For networking I use a TP-Link ER605v2 router, TP-Link TL-SG2210MP managed PoE switch, and TP-Link EAP615-Wall WAPs. 

If I were you, I'd avoid TP-Link Omada based systems.
I wish I knew this before.
It's fine and all, but there's certainly better.
Moving forward I'd probably go with Ubiquiti if I want that Apple-like experience (for the premium), or just use OPNSense and some other off-the-shelf enterprise style equipment.
Realistically I, and likely you, do not even need a managed switch.
Though, PoE is very nice.

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

# software
The core piece of software I am using is Proxmox.
Proxmox is a hypervisor that runs on Debian Linux/GNU that provides a nice GUI for managing Virtual Machines (VMs) and Linux Containers (LXC).
Proxmox also offers the important service of clustering using `corosync` and High Availability (HA) on top of this.
It even allows for a built in cluster file storage service called Ceph, but I do not currently use it.
I plan to implement Ceph or LINSTOR in the future.

Note: I do not use Docker anymore and I could not be happier.
Docker is needlessly annoying in my opinion, at least I think so.
The way to manage your container versions and networking is just far more convoluted, especially if you are just more familiar with Linux/GNU.

Proxmox, all together, attains (1), and (3) in [#ideology](#ideology).
Arguably (2) as well, but I think it could be made simpler.
You will find contention with (2) if you ever want to change node network info.

## Cluster
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
The VM itself would have been moved too, except for I had tried to do USB passthrough and hadn't removed this device, so Proxmox HA refused to move the VM over as it could not then produce that device on the other node.
I remedied that right after.

Clustering addresses (1) in [#ideology](#ideology).
To an extent, I'd say it helps towards (3) since a crashing experiment of mine won't take out the whole cluster.
Yet, it also hurts a bit towards (2) since it's just more to manage.

## PVE
Proxmox Virtual Environment (PVE) is the interface for managing VMs and LXCs which I'm now just going to call Virtualized Instances (VIs). 
Basically, you get templates for your VIs, then you can click a few buttons or run a few commands and spin up a new VI based on the template.

For example, I use the Debian 12 LXC template routinely (aside for Omada -- thanks TP-Link).
I choose this template, set a container ID, hostname, and a few other hardware and networking items, lo-and-behold I have a container running ready to do with it what I please.
I can't tell you how many times I have spawned a VI, tried a thing, broke some stuff, deleted it, spawned a new VI, tried thing differently, was happy.

This is huge for (3) in [#ideology](#ideology). 
I love it love it love it!

Ultimately, I'd like to work more with something like NixOS to make more refined templates for VIs.
It seems like a dream for rapid deployment even though `nix` the language is infuriating.

Proxmox PVE satisfies (2) in [#ideology](#ideology) for me, it's just the other bells and whistles in the UI that are a bit tedious.
I swear, if there was a nice Nix builder and a VE set up around Nix deployments that also had more cluster storage options, that'd probably take the cake.

## backups
Owing to (1) in [#ideology](#ideology) again, Proxmox makes backing up your VIs incredibly easy.
Just select what VIs you want to back up, where you want to back them up to, when you want to back them up, and how many backups you want to keep.

Backups in PVE are insanely helpful beyond just for recovering from a total device loss or corrupted state of a VI.
One use case I have is that owes to (3) is to be able to backup a VI, try to change how the VI is currently running in some way, and just restore the backup if need be.
Similarly, if you want to work with a service, but decide to stop using it, you can create a backup of that service in case you want to go back to using it in the future.
Two examples of the latter for me are Tailscale and NextCloud -- I may want to use those again some time down the road, but currently don't.

Backups in PVE are unlike what I had used prior.
They just restore and work exactly where you left off. 
It's a whole new kind of confidence.
Furthermore, I don't bother with in-service backups for the most part either unless I have to for an odd reason (e.g., migrating sites with Omada).

## storage
Argueably this could have gone in the hardware section, but whatever.
Each device including the Q device has its own local storage that I also re-expose as an NFS drive.

This gives me the ability to have storage shared across my network to be used for whatever I need. 
Once again, this is a benefit in redundancy.
If a drive fails on Node 1, a backup can be found on Node 2 or the Q device and restored from there easily.

I may add a larger NAS build in the future, but for now I don't have a high storage requirement and the redundant 500GB-1TB drives I have serves my purpose today.

# services
I don't run a ton of services, but what I do run are things I deem critical, or at least very useful, as well as the odd experiment.
I constantly look for new services to run to make my life better.
I constantly look for services to remove to make my life simpler.

My current list hits the mark rather well.

## network
First things first, none of this works without networking.
The core to any good lab is a solid, stable, and changeable network setup.

### Omada SDN
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

### dynamic DNS
ISPs will almost certainly give you a dynamic IPv4 address which means it will probably change on you at some point in the future.
With my domain name provider, I have set up with Omada a service that monitors my WAN IP and will send a request to my domain name provider to then update the associated A record.

This makes connecting to my home easier and reliable.
Nothing crazy, but worth pointing out.

## LAN
Locally, I use a larger LAN subnet like `x.y.0.0/22` to have a bit clearer delineation between my devices.
On this subnet, I provision devices (like router, APs, etc.) into the `x.y.0.0/24` range, services into the `x.y.1.0/24` range, known clients such as personal devices or IoT into `x.y.2.0/24` range, and finally I use `x.y.3.0/24` for DHCP.

Like I said before, I use a local DNS resolver so that I don't ever really have to know any IP addresses, but in the off chance that I do, it's convenient, but not really necessary, to have this organization.

### local DNS
With CoreDNS I provide domains for all of my services so that they may be resolved internally in simple ways.
For example, I have `green.home` as my TLD for my network. 
I can reach any host on my LAN by `ping $HOSTNAME.green.home` or `ping $HOSTNAME` since every device will know to search within `.green.home` if they connect to this network. 

Specific services I am running I provide their own domain.
For example, Proxmox (running on two nodes, remember) I can reach the GUI by a single address `https://proxmox.green.home`. 
Or `https:/omada.green.home` to reach my Omada GUI.

CoreDNS runs in the same container as Omada in my case, though that isn't necessary. 
It seemed logical to do so as I'd likely just drop both of these for something better in the future.
Most other routers will natively handle hostname resolution anyway; this is a specifically dumb aspect of my particular TP-Link router.

### (reverse) proxy
The above DNS also is paired with Caddy as a (reverse) proxy and certificate handler.
I run Caddy by itself in a Debian 12 LXC.
Services run over their own ports, e.g., `8043`, so if I have CoreDNS with Omada running on IP `x.y.0.2` and on Caddy on `x.y.1.2`, then I can assign the domain `omada.green.home` to look to `x.y.1.2` which will also pass on the port information.
Caddy sees this request to, for example, `omada.green.home:8043` from CoreDNS, reverse proxies this into `https://omada.green.home` (really just port mapping `443:8043`), and also generates an internal certificate for this domain (this way I get local HTTPS/TLS).

I do this with all of my services that I need to reach and I can also do things like reverse proxy `proxmox.green.home` to both IP addresses of my nodes, pick a default, but if the default IP is unresponsive, use the other.
Reverse proxy and DNS are my most used LAN tools.
Reverse proxy is also massively useful for WAN forwarding as well.

Local TLS is really not necessary in my case, but Caddy does it for free and I'll take the minor improvement.
I just take the cert file and put it on the devices I commonly use to connect.

Also, Caddy will automate doing ACME challenges for you if you want to get TLS certs for a service you host on WAN which is really nice.
It's a remarkably simple service, so 90% of the time things just work and are easy to set up, but the other 10% of the time things can get a bit dicey.

### blocky
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

### VPN
Honestly, this VPN section should probably come earlier because it is likely the most explicitly used network infrastructure for me, but I felt like explaining things from the inside out here.
Perhaps I saved the best for last, then.

My VPN of choice is Wireguard. 
It is amazingly simple and it just fuckin' works. 

I choose to minimize the amount of openness I give my LAN to WAN.
Running Wireguard, I solely have to open a single UDP port for forwarding from my LAN to WAN.
Since the port is UDP, it's not really possible to tell its even alive there if you're knocking.

Likewise, Wireguard uses simple but powerful cryptography.
In essence, if a message sent to my Wireguard instance over the internet isn't signed by one of my devices that have given a private key to, then Wireguard throws away that message.

Wireguard is how I connect to my LAN when I'm away which is of immense importance.
If I'm not home, I still need to monitor my services and make sure everything there is okay.
One service (Home Assistant) uses location based automation, so I also want to maintain a secure connection to it at all times.
This has other advantages too, such as the ability to work on VMs as if I am on my LAN.
Minor things like having my traffic routed the way I want since I can use my home WAN connection from anywhere is a perk.
I still get to use Blocky, for instance.
Furthermore, if I wanted to have an upstream VPN from my LAN gateway, I can just keep my persistent Wireguard connection on all of my devices, and enable the upstream VPN anywhere.
Things like travel routers become simpler.

### summary
My network services stack includes:
- Omada SDN + Omada CoreDNS
- Caddy reverse proxy
- Blocky DNS proxy/cache/adblocker
- Wireguard VPN

Other worthy mentions to try within this realm would be OPNSense, PFSense, OpenWRT, Nginx, and Traefik.

## home
I'm going to combine a handful of my other services under the category of "home". 
These are things I use for life around the house and currently don't want to live without at all.

### home assistant
Probably the most important non-network service I run.
This software is unbelievably good with only few exceptions of problems I have had over years of use. 
Basically, Home Assistant is/was designed for home automation, but it has grown in scope over time to allow for many integrations that fall into a greater category of "home" use (much like my own categorization here).
Hell, I'm pretty sure you can set up Nginx, PiHole, and Wireguard within Home Assistant with a few clicks.

Home Assistant is running in VM inside of Home Assistant OS (HAOS). 
In fact, this is the only service I have in a VM, the rest are in containers.
HAOS is its own Linux distribution that has a lot of convenience factors.
You can easily manage versions of components and get access to add-ons using it.
Similarly, it now comes with a Matter server implementation.
Today, Matter is a bit clunky and rough around the edges, but I do imagine it progresses.

I use a minimal but enjoyable amount of IoT hardware and I use Home Assistant to manage it.
My use cases are predominantly lights and light switches, blinds, and doors/locks.
Once again, I try to be minimal but effective here. 
I connect none of this to the internet. 
Everything is ran locally.
Access to Home Assistant is done via Wireguard.

An important related note here is that many of these IoT devices can actually be built from scratch and designed yourself.
I have worked a bit with ESP32 devices and plan to build my own Thread network with them, and slowly build my own smart devices to replace others.
This is not only to exit lock in of ecosystem (e.g., Apple), but just as a hobby.
It's fun to tinker with hardware (incase this post has not made that blatantly obvious!).
Plus, ESP32 development can be done in Rust and there's even a nice async library to use!

I don't want to ramble about smart home things in the body of this post here, so I will just link to an appendix section that contains it: [#automations](#automations).
There are some good nuggets in there though, in my opinion.

### cameras
In my home we have a few cameras for a few different purposes, but they are not a huge thing for me.
The most used camera is my doorbell cam which is certainly indespensible. 
Knowing when someone comes by or a package is delivered is super useful.
Being able to speak to someone through it while you're away has also been great.
Unfortunately, I have even had to submit recordings from it to the police.
The other cameras essentially are used to watch our pets when we're away or things that can go wrong (e.g., garage door stuck). 

I use Reolink cameras and I use Neolink as a re-streamer so I can get access to all my feeds from one spot.
These feeds get piped to Home Assistant so I can view everything there if I want.
I also do use Scrypyted to get Homekit Secure Video from the doorbell camera.

So, I run both Neolink and Scrypted in their own LXCs.
There's some other cool technology out there too such as the NVRs Blue Iris and Frigate if cameras are things that really get you going.
If you look around, people have projects that use pretty nice "AI" recognition to do things based on these feeds.
If, for instance, I lived in a more rural area where animals may come by, I'd probably set up recognition to capture and sort the different animal clips.
Currently, I don't care enough to do that and I almost didn't put this section, but these services are important to me for sure, just less so than others.

## other
Outside of what I've already mentioned, I have a few other services and use cases for my lab.

### syncthing
I love this service a ton.
Essentially, Syncthing provides peer-to-peer synchronization of files on different machines. 
The service itself is dead simple and you don't actually need to run it on a server at home as any two devices can use it together.

I run a central node at home to synchronize certain files I have on my machines such as dotfiles and PDFs.
The reason why I did it this way is to, yet again, minimize any sort of escape of important data to the internet as I can just connect to this over Wireguard.
Syncthing has its own cryptography as the peers require key sharing, but to make life simpler, I connect my peers to the service at home, they sync to this as if it were a cloud storage, then other devices can receive new state from this central hub.
There are some settings to be careful with if you want to forward this service through Wireguard, so just be careful with that!

Likewise, it can be used for things like Obsidian to get the same sync experience they have, but ran on your own.
Couple this with good backups and a cronjob to periodically commit to a git repository, and you have yourself a pretty bulletproof, redundant, cloud-storage-like solution.
This is essentially my goal moving forward -- use more native apps on my devices and use Syncthing as my synchronization primitive.
One such example would be for a password and 2FA vault shared securely across devices.

### VMs
Proxmox gives me the ability to spin up VMs as I please, and these VMs can have a given template.
Given I mostly use an ARM based machine (for better or worse), it has been convenient for me to be able to create an x86 VM to try certain things out there.
For example, in my work I've come across repos that have optimizations for x86 ASM which have been worth looking into.

Another case is to be able to have a destructible machine which I don't have to worry about at all.
Sometimes it can be tough to get an install correct, or I just want to try out something without having to make my own machine in some odd state of disrepair.
So, this makes going from a VM template to a testing ground quite useful.

Another use case in the realm of VMs is to be able to use them to offload compute completely. 
If I want to run expensive processes such as computing a zero knowledge proof, then I can run it on a VM and not waste battery on my laptop.
I would absolutely like to set up Github runners within this system.
Moving forward I will probably offload almost all my heavier compute to a node so I can maximize battery life on a laptop.

### sunlight/moonlight
Going off the previous, there are also other use cases such as games where running from a VM is convenient. 
For example, I have no Windows machines at home, but some games require Windows.
At the moment I can deploy a VM running Sunlight and connect to it from my Mac machine with Moonlight so that I can use it as a machine with a full-blown desktop environment.

This is actually a point of current development of mine. 
NixOS is convenient for creating templates that will have this setup automatically.
Also, Windows VMs can be stored as templates within Proxmox itself.
I've yet to do the same with Windows as I have with a NixOS instance, but that'll happen soon enough in the future!

Currently I have a NixOS VM template that runs sunlight and my client machine has moonlight installed.
My issue now is just to spend the time to do GPU passthrough for the VM -- not hard, I just haven't done it yet.

### website
One final category worth mentioning is self hosting a website.
I used to do this for the site you're on now, but have instead moved to Github pages. 
Quite simply, if I can easily avoid forwarding TCP ports on my gateway, I'm going to.
The repo for this site is already on Github anyway.

Using a Rust-based static web server was pretty easy to get going in an LXC. 
Just had to set up a systemd service and point it to the HTML files.

### diagnostics
It's also worth noting that I do run Prometheus and Grafana in their own LXCs.
Currently, I only have two data feeds set up with these, but I do plan to make this more functional in the future.

In the same vein, I do also have Gotify notifications set up for my Proxmox cluster.
Basically, if certain things happen such as a failed backup or a VM, LXC, or node crash, I can receive notifications.
Unfortunately, there is no good iOS app for this, but the service is helpful.
When I switch back to Android/Linux, then this will actually be helpful.

As I add more over time, I plan to keep the diagnostics and alerting system improving as well. 
Keep in mind (1) and (2) from [#ideology](#ideology).

## summary
My list of services here is actually pretty small compared to many others, but there's beauty in simplicity in my opinion.
If you go visit places like [r/selfhosted](https://reddit.com/r/selfhosted), [r/homelab](https://reddit.com/r/homelab), or [r/homeassistant](https://reddit.com/r/homeassistant), you will see tons of amazing stuff.

As I move away from proprietary software over time, there's some likely additions to have here such as
- immich
- Ollama (tried this, it's just slow on these machines)

Otherwise, I have mentioned some of my intended changes previously.

There's also some honorable mentions that I have tried, but found I didn't need:
- Tailscale/Headscale: I don't need to manage site to site VPNs, so this was just overkill. 
Great tech though!
- NextCloud: Simply just overcomplicated for me.
I don't really use anything like Google Cloud these days anyway, so I don't need this for the same reason.
Though this may be amazing for someone else.


# TODOs
I'm going to organize this based on ideology:

## ideology 1
- Have a separate backup server in a different geographical location. 
It may share some services for redundancy, e.g., also host syncthing.
Proxmox has its own backup server implementation which I'd probably use.

- Add another PC to replace RPi and use cluster storage.
Currently, my HA uses ZFS cloning and every thirty minutes, running services offload state to the other node so that the node can reload from that state.
This leaves a thirty minute window of changes that can be lost if a node crashes.
Instead, cluster storage like Ceph or LINSTOR is a distributed storage system that maintains parity actively between nodes.
As a bonus, could use this PC to run an LLM such as Ollama if it had more memory and a faster GPU than my mini PCs.

- If I was in a different home, I'd put all my homelab equipment on its own set of circuits. 
This way I wouldn't have other devices take out this stuff.
For example, having a microwave trip a breaker on the same circuit as your cluster would be pretty unfortunate.
Funny enough, I've had a kettle trip fault the same circuit as my cluster is on so my UPS saved me there while I figured out what the hell had actually happened.

## ideology 2
- Move to Thread/Matter for all IoT devices.
At the moment, some devices connect with RFID, clear connect (~900MHz), 2.4GHz WiFi, HomeKit over Thread, and Matter over Thread. 
It would be simpler to just use Matter over Thread everywhere and then gain the ability to distribute border routers throughout my home for redundancy (owing to (1) as well) and also get to remove two hubs that are mostly single purpose.
Plus, I want to build more of my own hardware anyway.

- Drop Omada and use something simpler and better like Ubiquiti, OPNSense, OpenWRT.
Also, while I'm at it, reduce the footprint of the network devices.
What I have now works though, so this is something I probably won't do until I move homes.

- Consider a different set of node hardware that can also be used for routing and switching.
It's pretty easy to find mini PCs these days with dual 10GB ports and to run OPNSense or OpenWRT as a cluster service.
This would also owe to (1) as well.
Not high priority for me at all, but something I'd consider on a future build.

## ideology 3
- Develop with NixOS and utilizing VMs/LXCs.
There's a lot to do here and I know there's more fun to unlock.
This distribution was made for it.
Ultimately, it may become my daily driver on client devices as well, so using it throughout would be a mission of mine.

- Sunlight/Moonlight cloud gaming.
I'm not a crazy gamer at all, so I don't need much power in a machine and I also don't need to worry about latency that much either.
But having a host I can use to run the games I want (easier with x86 and VM can be Windows too) would be a nice thing to have.

- Develop with local "AI". 
I don't want to rely on any "AI" hosting service at all -- it's easy enough to run this stuff yourself and you can get more power from it anyway; just get a GPU and some RAM.
Another perk of a third machine with more power would be to run models and games. 

- Develop with IPv6.
IPv4 and NAT are a bit of a mess.
I would love to be able to properly use IPv6 addressing to make LAN/WAN easier to manage.
IPv6 itself is a bit of a mess in its own way, so this is a challenge.
Nuking your network is also painful.

- Key management.
Without getting into too much detail here, I'd also like to have better personal private key management.
I've been trying to cook together a mini app for this over time. 
We'll see where that goes!
Could at least be useful to add to KeepPassXC

# summary
That's all I got for now.
I probably missed a bunch of things, went into too much depth in some spots, and not enough in others.
In short: Proxmox gud, Wireguard good, I like simplicity and reliability, and I want to build more of my own things.

Please reach out to me if you would like to talk. 
You can find my contact info on this site, but you probably found this from X or something anyway.

Below are the "appendix" sections.

---

# automations
In reverse order, having persistent status of doors and locks is helpful to me. 
I can know if the garage door is closed or my door is locked with more certainty.
If need be, I can control these devices while away to let someone in my home. 
The devices I currently use in this case are alright, but do have a bit of a lock-in to the Apple ecosystem which can be partially bypassed directly by Home Assistant, actually.
I hope to replace these moving forward with devices that operate with Matter/Thread.

I also automate lighting using millimeter wave presence detectors. 
For one floor of my home, I haven't touched a light switch since setting this up and have never felt the need to and I wouldn't ever go back. 
Ultimately I plan to set this up around the house, but don't want to do it poorly.
I mostly use smart switches with Philips dim to warm lights as I don't want LAN connectivity to break control of my lights.
Some day as Thread networks progress, bypassing switches likely becomes more reasonable, but we're not there yet.

Finally, we have lots of plants inside and these plants love natural light!
We also, fortunately, have lots of windows.
We replaced the coverings we had with Matter/Thread honeycomb covers.
These open during at sunrise, and close at sunset.
Future work is to track sun position and outdoor temperature to selectively close blinds to reduce heating of the home in summer.
Also, having blackout versions of the blinds in a bedroom is huge for sleep quality.

Other small things are automating my porch light to come on after sunset and to turn off after sunrise and having robovacs clean when both of us leave the home.
Likewise, I can hit a single button on my phone at night to check that my doors are closed and lock, lock/close them if they aren't, set an alarm, run a robovac in the kitchen, turn on my bedroom fan, and turn on my bedroom lamps which then dim off for 30 minutes.

One of my absolute favorite automations is my morning sequence.
Thirty minutes prior to when I want to get up (which I can change easily), my bedroom lamps start to dim on for 30 minutes, my bedroom fan turns off, and after the thirty minutes the alarm disarms.
I haven't woken up with a noisy alarm in so many years at this point and it is my number one suggestion for mornings.
Having lights come on seems to wake me up very naturally and the fan turning off makes me warm up as well -- both these are known to help trigger your body and brain to wake up.

Aside: I recently got an Eight Sleep which also warms at the time I need to wake up as well.
Sleep is important, people!
And one last sleeping based tool I have is an air quality monitor in my bedroom which detects CO2 levels and when they increase beyond a certain point, the central air turns on until it goes below a target.

I want this stuff to make my life simpler.
I refuse to add needless smart-things just because. 
Most of this was honed over time and I scrutinize things before I add or change them.

# helpful things
- If you use Proxmox, use [tteck's scripts](https://tteck.github.io/Proxmox/#proxmox-ve-tools).
I heard lately that tteck is now on hospice care which is terrible news.
I didn't find his project until a few months back, but it has been undeniably helpful.
Thank you for creating a great project!

- Plan out your network first when you do this stuff. 
Everything else layers on this, it is important.
Migrating nodes, for example, to a new IP is a bit annoying and you do expose yourself to the risk of having to redo your cluster. 
Though, given Proxmox backups are really nice, that isn't actually that bad.
If you are using Docker or something, then you'll probably still get rekt by Docker network on top of your underlying network if you don't plan it out before hand.
Otherwise, all your services depend on addressing in some way, so this is guaranteed to be a point of headache.

- Use your router to manage DHCP.
You will hate yourself when your PiHole instance that manages your DNS and DHCP crashes and you can't even get a lease to access the network at all.
I made this mistake once and I will never do it again.
Seriously, this is a warning to tread carefully especially if you don't know what DHCP really does.
