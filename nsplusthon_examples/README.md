# Examples

This folder contains several single-file examples using [NSplusthon].

## Requisites

You should have the `nsplusthon` library installed with `pip`.
Run `python3 -m pip install --upgrade nsplusthon` if you don't
have it installed yet (this is the most portable way to install it).

NSplusthon ships with default credentials, so **most examples run without
any API ID or hash** — just start them and log in with your phone number.

Optional environment variables:

* `SPLUS_SESSION` — the name of the `*.session` file to use (`TG_SESSION` still accepted)
* `SPLUS_BOT_TOKEN` — bot token for `assistant.py`

## Running Examples

```sh
git clone https://github.com/Amogrotex/NSplusthon.git
cd NSplusthon/nsplusthon_examples
python3 print_updates.py
```

All examples are licensed under the [CC0 License], so you can use
them as the base for your own code without worrying about copyright.

## Available Examples

### [`print_updates.py`]

* Usable as: **user and bot**.
* Difficulty: **easy**.

Trivial example that just prints all the updates Soroush Plus originally
sends. Your terminal should support UTF-8, or Python may fail to print
some characters on screen.

### [`print_messages.py`]

* Usable as: **user and bot**.
* Difficulty: **easy**.

This example uses the different `@client.on` syntax to register event
handlers, and uses the `pattern=` variable to filter only some messages.

There are a lot other things you can do, but you should refer to the
documentation of [`events.NewMessage`] since this is only a simple example.

### [`replier.py`]

* Usable as: **user and bot**.
* Difficulty: **easy**.

This example showcases a third way to add event handlers (using decorators
but without the client; you should use the one you prefer) and will also
reply to some messages with different reactions, or to your commands.

It also shows how to enable `logging`, which you should always do, but was
not really needed for the previous two trivial examples.

### [`assistant.py`]

* Usable as a: **bot**.
* Difficulty: **medium**.

A simple assistant bot that showcases how to build an extremely simple
"plugins" system with NSplusthon — you're free to borrow ideas from it and
make it as fancy as you like (perhaps you want to add hot reloading?).

The plugins are separate Python files that get loaded dynamically from a
`plugins` folder next to `assistant.py`. Drop your own plugin files there
to see them loaded at startup.

The content of the plugins or how they work is not really relevant. You can
disable them by moving them elsewhere or deleting the file entirely. The point
is to learn how you can build fancy things with your own code and NSplusthon.

### [`interactive_soroush_client.py`]

* Usable as: **user**.
* Difficulty: **medium**.

Interactive terminal client that you can use to list your dialogs,
send messages, delete them, and download media. The code is a bit
long which may make it harder to follow, and requires saving some
state in order for downloads to work later.

### [`quart_login.py`]

* Usable as: **user**.
* Difficulty: **medium**.

Web-based application using [Quart](https://pgjones.gitlab.io/quart/index.html)
(an `asyncio` alternative to [Flask](http://flask.pocoo.org/)) and NSplusthon
together.

The example should work as a base for Quart applications *with a single
global client*, and it should be easy to adapt for multiple clients by
following the comments in the code.

It showcases how to login manually (ask for phone and code), and once the
user is logged in, some messages and photos will be shown in the page.

There is nothing special about Quart. It was chosen because it's a
drop-in replacement for Flask, the most popular option for web-apps.
You can use any `asyncio` library with NSplusthon just as well,
like [Sanic](https://sanic.readthedocs.io/en/latest/index.html) or
[aiohttp](https://docs.aiohttp.org/en/stable/). You can even use Flask,
if you learn how to use `threading` and `asyncio` together.

### [`gui.py`]

* Usable as: **user and bot**.
* Difficulty: **high**.

A simple GUI written with [`tkinter`] which becomes more complicated
when there's a need to use [`asyncio`] (although it's only a bit of additional
setup). The code to deal with the interface and the commands the GUI supports
also complicates the code further and requires knowledge and careful reading.

The file is a bit big and assumes some [`asyncio`] knowledge, but otherwise
is easy to follow.

![Screenshot of the tkinter GUI][tkinter GUI]

### [`payment.py`]

* Usable as: **bot**.
* Difficulty: **medium**.

This example shows how to make invoices (Soroush Plus's way of requesting
payments) via a bot account. The example does not include how to add
shipping information, though.

You'll need to obtain a "provider token" to use this example, so please read
the [Soroush Plus documentation](https://web.splus.ir) on payments before
using this example.

It makes use of the ["raw API"] (that is, no friendly `client.` methods),
which can be helpful in understanding how it works and how it can be used.


[NSplusthon]: https://github.com/Amogrotex/NSplusthon
[CC0 License]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/LICENSE
["raw API"]: https://Amogrotex.github.io/NSplusthon/concepts/full-api/
[`assistant.py`]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/assistant.py
[`quart_login.py`]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/quart_login.py
[`gui.py`]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/gui.py
[`interactive_telegram_client.py`]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/interactive_telegram_client.py
[`payment.py`]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/payment.py
[`print_messages.py`]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/print_messages.py
[`print_updates.py`]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/print_updates.py
[`replier.py`]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/replier.py
[`asyncio`]: https://docs.python.org/3/library/asyncio.html
[`tkinter`]: https://docs.python.org/3/library/tkinter.html
[tkinter GUI]: https://github.com/Amogrotex/NSplusthon/blob/main/nsplusthon_examples/screenshot-gui.jpg
[`events.NewMessage`]: https://Amogrotex.github.io/NSplusthon/concepts/events/
