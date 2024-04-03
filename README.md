# bytes.dev newsletter notifier

<img width="872" alt="hld architecture diagram for notifier" src="https://github.com/PranjalAgni/bytesdotdev-notifier/assets/26196076/427c9b1c-b8d8-4249-9feb-e9e3921b09b9">

### Tech Stack

- [val.town](https://www.val.town/) - Infrastructure
- [SQLite](https://www.sqlite.org/index.html) - Database
- [Deno](https://deno.com/) - Runtime
- [Pushover](https://pushover.net/) - Notifications


### How it works

At the lowest level it is powered by `3` main scripts, which are invoked by a scheduled cron job that runs daily

- *scraper* Goes to bytes.dev and scrapes latest published newsletter
- *inserter* Insert it to SQLite if this newsletter already not exists
- *notifier* Uses Pushover API to send ios mobile notifications

### Pushover notifications

![image](https://github.com/PranjalAgni/bytesdotdev-notifier/assets/26196076/f0a73a88-7bbe-4af8-b633-22fa5121f4f8)
